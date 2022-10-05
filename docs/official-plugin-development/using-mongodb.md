---
sidebar_position: 8
---

# 使用 MongoDB 数据库

## NoSQL 数据库

NoSQL 数据库并不遵循 SQL 数据库的表状结构。相反，许多人使用文档风格的格式（见 MongoDB 等）或键 -> 值结构（见 Aerospike、Redis 等）。

本文特别针对 MongoDB，即许多 Minecraft 网络使用的数据库。

## MongoDB 的概念

像在 SQL 中一样，你在 MongoDB 中也有数据库。在这些数据库中，有像表一样的东西，称为集合。但是这些表没有定义列。每个集合只是一个小 JSON 对象的列表。这些 JSON 对象可以包含任何他们想要的字段，他们不一定要有一个共同的字段。为了更快地搜索，你可以定义一个在每个 JSON 对象中都能找到的字段，比如说玩家的 UUID。这就是所谓的索引。这样，DB 只在内存中保留这些值（UUID），并在加载其他对象之前只搜索它们。你仍然可以搜索 JSON 对象中的其他值，但搜索的速度不会像搜索索引那样快。

## Morphia

除了本教程中所涉及的内容外，还有一种方法可以从 MongoDB 中保存和访问数据，那就是使用一个名为 Morphia 的 API。它是完全可选的，但它使从 Java 对象创建新集合的过程变得非常精简。关于 Spigot 的教程可以在这里找到：[结合 Morphia 使用 MongoDB](mongodb-with-morphia.md)

## 安装数据库

当你在 Debian Linux 上时，你可以简单地运行:

```bash
apt-get install mongodb
```

这将自动安装和设置你的数据库。
当不在Linux上时，你可以从他们的主页上获得MongoDB。[下载](https://www.mongodb.com/try/download/community)

## 确保你的数据库安全

默认情况下，数据库将绑定在 127.0.0.1 上，这意味着它只能从根目录下访问。

如果你想把绑定 IP 改为 0.0.0.0（可以从任何地方访问），并为你的数据库创建一个用户和密码，请按照以下说明进行。[启用验证功能](http://docs.mongodb.org/manual/tutorial/enable-authentication/)

0.0.0.0不能从任何地方 "访问"，它只是与每台本地机器的IP绑定。

## 开始使用 MongoDB

在你的根目录下，只要在控制台输入 `mongo`，你就会进入所谓的 mongo shell。在那里你可以简单地分配命令。我们的目的是用 Java 调度这些命令，所以我们继续下载 MongoDB 的 Java 驱动。将`.jar` 作为库导入到你的项目中。或者，更有经验的开发者可以通过其 maven 工件导入。

我建议使用旧的 2.x 驱动，因为这里会用到它。如果你想试试新的，可以随意使用。我没能让新驱动工作，因为它的引用缺失了 :/

## 使用 Java 连接到 MongoDB

```java
    private DBCollection players;
    private DB mcserverdb;
    private MongoClient client;
    public boolean connect(String ip, int port){
        //连接到指定的IP和端口
        //默认为localhost, 27017
        try {
            client = new MongoClient(ip, port);
        } catch (UnknownHostException e) {
            //当你在这里结束时，无法找到数据库所运行的服务器!
            System.out.println("Could not connect to database!");
            e.printStackTrace();
            return false;
        }
        //获取名为 "mcserver "的数据库
        //如果它不存在，将被自动创建, 一旦你在其中保存了一些东西
        mcserverdb = client.getDB("mcserver");
        //获取数据库 "mcserver "中名为 "player "的集合。
        //相当于MySQL中的表，你可以在这里存储对象
        players = mcserverdb.getCollection("players");
        return true;
    }
```

## 存储玩家信息

```java
    public void storePlayer(UUID uuid, String name, long tokens, String rank){
        //让我们存储我们的第一个玩家!
        //这个玩家以前从未玩过，我们只想为他创建一个对象。
        DBObject obj = new BasicDBObject("uuid", uuid);
        obj.put("name", name);
        obj.put("tokens", tokens);
        obj.put("rank", rank);
        //让我们把它插入我们的集合。
        players.insert(obj);
    }
```

## 读取玩家信息

这里有两种方法。你可以使用游标来循环浏览所有的对象，或者使用 `findOne()` 来只在服务器端寻找一个对象。对于只搜索一个对象，就像我们现在做的那样，`findOne()` 更快。对于其他操作，即搜索多个对象，Cursor 非常有用。

### 选项 1：使用 `findOne()`

```java
    public void readPlayer(UUID uuid){
        //让我们建立一个最小的对象，以获得集合 "player "中的所有对象，其中包含字段 "uuid"，其值为uuid（我们正在搜索的内容）。
        DBObject r = new BasicDBObject("uuid", uuid);
        //使用findOne来只获得一个对象!
        DBObject found = players.findOne(r);
        if(found==null){
            //用户尚未保存。在数据库中添加他!
            return;
        }
        //找到用户了! 得到我们想要的值!
        //你可以把这些对象转变成String/Long等。
        //因为它们是作为二进制对象被传递的，而不是像MySQL中的字符串。
        String name = (String) found.get("name");
        long tokens = (long) found.get("tokens");
        String rank = (String) found.get("rank");
     }
```

### 选项2：使用 DBCursor

```java
    public void readPlayer(UUID uuid){
        //让我们建立一个最小的对象，以获得集合 "player "中的所有对象，其中包含字段 "uuid"，其值为uuid（我们正在搜索的内容）。
        DBObject r = new BasicDBObject("uuid", uuid);
        //创建一个游标对象来循环浏览所有的结果。
        //得到所有的对象，并得到我们正在搜索的一个对象
        DBObject found = null;
        // try-with-resources将处理资源的关闭。
        try (DBCursor cursor = players.find(r)){
               while(cursor.hasNext()) {
                   found = cursor.next();
               }
        }

        if (found == null) {
            //用户尚未保存。在数据库中添加他!
            return;
        }
        //找到用户了! 得到我们想要的值!
        //你可以将这些对象转变成String/Long等。
        //因为它们是作为二进制对象被传递的，而不是像MySQL中的字符串。
        String name = (String) found.get("name");
        long tokens = (long) found.get("tokens");
        String rank = (String) found.get("rank");
    }
```

## 更新数据库中的玩家信息

更新的工作方式和阅读一样。你搜索对象，修改它并把它送回服务器。

### 选项1：更新所有对象

```java
    public void updatePlayer(UUID uuid, String name, long tokens, String rank) {
        DBObject r = new BasicDBObject("uuid", uuid);
        DBObject found = players.findOne(r);
        if (found == null){
            return;
        }
        //用户被找到了! 让我们创建一个新的替换对象!
        DBObject obj = new BasicDBObject("uuid", uuid);
        obj.put("name", name);
        obj.put("tokens", tokens);
        obj.put("rank", rank);
        //更新它! 这就简单地替换了我们找到的对象!
        players.update(found, obj);
    }
```

###  只更新1个对象

```java
    public void updatePlayer(UUID uuid, String rank) {
        DBObject r = new BasicDBObject("uuid", uuid);
        DBObject found = players.findOne(r);
        if (found == null){
            return;
        }
        BasicDBObject set = new BasicDBObject("$set", r);
        set.append("$set", new BasicDBObject("rank", rank));
        players.update(found, set);
    }
```

## 在你的服务器中使用 MongoDB 驱动

所以，我假设在阅读完这个主题后，你已经做了一个成功使用 MongoDB 作为数据库系统的插件，耶！现在你把插件放在服务器上，启动它，然后...什么？

现在你把这个插件放在服务器上，启动它，然后......等等......什么？"错误"？

NoClassDefFound？NoClassFoundException: com.mongodb.MongoClient.?

这怎么可能呢？

一切都应该是正常的。

Oooooh 我忘了把驱动放到插件文件夹里了

~Places mongo-java-driver-{Version here}.jar into plugins folder~。

现在应该可以......等等，还是不能用？

~将mongo-java-driver-{这里的版本}.jar移到{服务器文件夹}/lib~。

发生了什么？

现在，你应该知道，MongoDB Java驱动并没有作为bukkit插件加载，因为它并不是一个插件。因此，漂浮在空中的问题是:

> 我怎样才能在我的服务器中使用MongoDB？

### 选项1：`--classpath`

有一个很酷的命令行选项允许我们解决这个问题，那就是 `-classpath`，它的作用是告诉 JRE。

> Hey! We need to execute this program with these classes!

该参数的用法是:

```
java –classpath ${CLASSPATH} {MAIN CLASS}
```

因此，对应地我们应该使用:

```
java -classpath "spigot.jar:lib/*" org.bukkit.craftbukkit.Main
```

这将把 `{spigot.jar 文件夹}/lib` 中的 jar 文件作为依赖项载入！现在我们可以使用 MongoDB 了，并且可以永远地快乐地运行下去了！

!!! note "注意"
    - 如果使用 Windows 作为你的操作系统，你需要在上述命令中使用分号而不是冒号。
    - 在使用 classpath 选项时，不要使用 `-jar spigot.jar`，classpath 将执行服务器而不带 `-jar 参数`

## 选项 2：将[ java 驱动 shading](https://cn.bing.com/search?q=maven+shading)到插件中。

shading 有它的优点也有它的缺点。缺点是最终编译的 JAR 的文件大小将包括 MongoDB Java 驱动的大小。好处是没有版本不匹配的风险（与选项 1 相反）。

如果您使用的是 Maven，请打开 `pom.xml` 文件，在插件部分添加 Maven shade 插件:

```xml
<plugin>
    <artifactId>maven-shade-plugin</artifactId>
    <version>3.2.2</version>
    <configuration>
    </configuration>
    <executions>
        <execution>
            <phase>deploy</phase>
            <goals>
                <goal>shade</goal>
            </goals>
        </execution>
    </executions>
</plugin>
```

将 MongoDB 驱动的依赖范围设置为 "scope":

```xml
<dependency>
    <groupId>org.mongodb</groupId>
    <artifactId>mongodb-driver-sync</artifactId>
    <version>4.0.1</version>
    <scope>compile</scope>
</dependency>
```

[跳转至官网原文](https://www.spigotmc.org/wiki/using-mongodb/)