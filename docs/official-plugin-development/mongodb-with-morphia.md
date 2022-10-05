---
sidebar_position: 9
---

# 结合 Morphia 使用 MongoDB

在深入之前，我建议先看看 MongoDB wiki 的最开始(上一篇文章)。它详细介绍了什么是 NoSQL 以及如何使用它。读到它说到如何连接到 MongoDB 的时候，因为那是这些教程的分歧。它可以在[这里](using-mongodb.md)找到。

## 什么是 Morphia？

Morphia 是由 MongoDB 开发的一个 API，允许开发者轻松地将他们的对象映射到 MongoDB 中，而不需要做太多的努力。你能够创建一个类，创建字段，然后直接将你的对象保存到数据库中，而无需自己再做任何努力。它使使用 MongoDB 成为一个非常精简的过程，并意味着你不需要让自己在早期的设置中感到头疼。

## 将 Morphia 添加到您的项目中

为了在您的项目中开始使用 Morphia，我使用了 Maven，以便在最终编译的项目中构建资源，并处理我的依赖关系。以后我可能会添加一种非 Maven 的方法，但这里是用 Maven。

你需要做的第一件事是在你的项目中添加依赖项。您需要同时添加 Maven 和 Morphia，因此在您的 pom.xml 中添加以下内容:

```xml
<dependency>
    <groupId>org.mongodb.morphia</groupId>
    <artifactId>morphia</artifactId>
    <version>1.3.2</version>
</dependency>
<dependency>
    <groupId>org.mongodb</groupId>
    <artifactId>mongo-java-driver</artifactId>
    <version>3.4.2</version>
</dependency>
```

一旦添加完毕，你需要确保当你的插件编译时，Bukkit 知道在哪里可以找到这些资源。有几种方法可以做到这一点，但我选择在我的一个插件中建立它。在任何实际连接到数据库的插件中进行这项工作。把这个放在 pom.xml 中:

```xml
<build>
    <plugins>
        <plugin>
            <groupId>org.apache.maven.plugins</groupId>
            <artifactId>maven-shade-plugin</artifactId>
            <version>2.3</version>
            <executions>
                <execution>
                    <phase>package</phase>
                    <goals>
                        <goal>shade</goal>
                    </goals>
                    <configuration>
                        <artifactSet>
                            <includes>
                                <include>org.mongodb</include>
                                <include>org.mongodb.morphia</include>
                            </includes>
                        </artifactSet>
                        <createDependencyReducedPom>false</createDependencyReducedPom>
                    </configuration>
                </execution>
            </executions>
        </plugin>
    </plugins>
</build>
```

现在这一切都完成了，你只需要连接!

## 连接到 Mongo 和 Morphia

有两种不同的方式来连接 MongoClient 和 Morphia，一种是带证书的，一种是不带证书的。如果你是在 localhost 上，那么直接禁用凭证，然后直接禁止远程连接会更容易。我将在下面说明这两种方法。

### 使用凭证

```java
    private MongoClient mc;
    private Morphia morphia;

    public DatabaseHandler(int i) {
        ServerAddress addr = new ServerAddress("hostname", port);
        List<MongoCredential> credentials = new ArrayList<>();
        credentials.add(MongoCredential.createCredential("username", "database", "password".toCharArray()));
   
        mc = new MongoClient(addr, credentials);
        morphia = new Morphia();
    }
```

### 不使用凭证

```java
    private MongoClient mc;
    private Morphia morphia;

    public DatabaseHandler(int i) {
        mc = new MongoClient();
        morphia = new Morphia();
    }
```

在其余的代码片段中，我将把假设你的 MongoClient 已经被初始化的代码放进去。

## 创建你的对象

我们稍后将回到你的 DatabaseHandler，但现在我们需要创建我们的对象来进行映射。在这个例子中，我将创建一个要被映射和保存的用户类。代码在下面，我将解释每个注解的含义。

```java
import java.util.ArrayList;
import java.util.List;

import org.mongodb.morphia.annotations.Entity;
import org.mongodb.morphia.annotations.Id;
import org.mongodb.morphia.annotations.IndexOptions;
import org.mongodb.morphia.annotations.Indexed;
import org.mongodb.morphia.annotations.Property;

@Entity(value = "Users", noClassnameStored = true)
public class User {

    @Id
    public int id;

    @Indexed(options = @IndexOptions(unique = true))
    public String uuid;

    @Indexed
    public String username;

    public int ip;

    public long connectionTime;

    @Property("ip_history")
    public List<Integer> ipHistory = new ArrayList<>();

    @Property("name_history")
    public List<String> nameHistory = new ArrayList<>();

   public User() {
   }
}
```

以上代码中注解的含义：

- `@Entity`: 这个注解告诉 Morphia，这个对象将被存储在一个集合中。参数 `value` 声明了这个集合的名称是什么。`noClassnameStored` 参数只是告诉 Morphia，如果你以后改变了你的类的名字，它仍然会允许你保存在同一个集合中。这不是必须的，但强烈推荐。
- `@Id`: 这是唯一的 ID，用于识别每个单独的对象。你不必自己声明这个，如果你不声明，Morphia 会在后台制作一个，但是我喜欢用一个整数来代表我的对象。
- `@Indexed`: 这告诉 Morphia，你要用这个值搜索整个集合，而且你想快速完成。虽然这不是必须的，但它大大增加了搜索时间。我的参数 `@IndexOptions(unique = true)` 只是告诉 Morphia，在数据库中，每次只有一个 UUID 值的对象。
- `@Property`: 默认情况下，Morphia 在数据库中对字段的命名与你在类中的命名相同。如果你想让它不同，请用 `@Property` 来命名。
- `@Transient`: 这个注释告诉 Morphia，你不想在数据库中保存这个字段。在更多的技术意义上，Transient 意味着这个字段将不会被序列化。
- `@Embedded`: 如果你想创建一个存储在数据库中的对象，而这个对象不是下一节中公布的支持的类型之一，你可以创建一个嵌入式对象。只需用你想要的对象类型创建你的字段，并用 `@Embedded` 来注释它。然后，进入你的其他类，在类声明的上方用 `@Embedded` 标记该对象。
- `@Reference`: 对于那些来自 SQL 的人来说，你可能熟悉外键和连接。基本上，这表示这个对象被存储在一个不同的集合中。例如，如果你有一个城镇对象，你想标记哪些用户在一个特定的城镇，而不只是存储他们所有的 ID，这就很方便了。

构造函数: 为了使 Morphia 运行，它需要一个空的构造函数。没有这个，它在最初获取数据时将无法发挥作用。这与 SQL2o 的过程是一样的。

要阅读更多关于注释的细节，请看[这里](https://github.com/mongodb/morphia/wiki/AllAnnotations)。

## 数据类型

Morphia 不允许存储每一种数据类型，但它允许大多数的数据类型。下面这些都是可以接受的:
- 所有基元
- Enums 枚举（作为一个字符串存储）
- java.util.Date
- java.util.Locale

如果你想阅读更多关于数据类型的细节，请看[这里](https://github.com/mongodb/morphia/wiki/PropertyAnnotation)。

## 创建 DAO

这一步不是强制性的，但它将使整个过程变得更容易，我将继续我的教程，假设你这样做。

你将想为你的每个不同的对象创建一个 DAO。要做到这一点，请使用以下方法。我将继续我的例子，从用户开始。

```java
import org.mongodb.morphia.Datastore;
import org.mongodb.morphia.dao.BasicDAO;

public class UserDAO extends BasicDAO<User, String> {

    public UserDAO(Class<User> entityClass, Datastore ds) {
        super(entityClass, ds);
    }

}
```

就这样了！我将在下一节解释如何用 Datastore 构建你的 DAO。只要确保你的类型参数是 `<MyClass, String>`，DAO 的参数是`(Class<MyClass>, Datastore)`。

## 数据存储和映射

现在你有了你的类、你的DAO和你的 MongoClient/Morphia 对象，是时候创建你的数据存储了。数据存储是你与你的特定数据库的连接。

```java
    private MongoClient mc;
    private Morphia morphia;
    private Datastore datastore;
    private UserDAO userDAO;

    public DatabaseHandler(int i) {
        mc = ...;
        morphia = new Morphia();
        morphia.map(User.class);

        datastore = morphia.createDatastore(mc, "dbName");
        datastore.ensureIndexes();

        userDAO = new UserDAO(User.class, datastore);
    }
```

然后你就可以开始了 你可以根据你的 DAO 在这个类中创建方法来保存你的对象。我在下面放了一些基于我的例子的代码片段，你可以用来开始使用。

## 代码片段

### 获取用户

```java
    public DUser getUserByPlayer(Player player) {
        DUser du = userDAO.findOne("uuid", player.getUniqueId().toString());
        if (du == null) {
            du = new DUser();
            du.setUUID(player.getUniqueId().toString());
            du.setIp(PlayerUtils.inetAddressAsInteger(player.getAddress().getAddress()));
            du.setUsername(player.getName());
            userDAO.save(du);
        }
        return du;
    }
```

### 存储用户

```java
    public void saveUser(DUser user) {
        userDAO.save(user);
    }
```

### 获取所有用户

```java
    public List<User> getAllUsers() {
        return userDAO.find().asList();
    }
```

[跳转至官网原文](https://www.spigotmc.org/wiki/mongodb-with-morphia/)