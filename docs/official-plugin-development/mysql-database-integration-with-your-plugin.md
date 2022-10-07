---
sidebar_position: 10
---

# 配置 MySQL 数据库与插件集成

## 先决条件

你需要先安装 JDBC，它可以从：[http://dev.mysql.com/downloads/connector/j/5.1.html#downloads](http://dev.mysql.com/downloads/connector/j/5.1.html#downloads) 获取。

## 关于 JDBC 的基本解释

JDBC 是 Java 数据库连接 API，允许使用 SQL 工作。Spigot 提供了 J MySQL 连接器，让你可以连接到 MySQL 数据库并在 Java 语言中运行 MySQL 查询。

## 代码示例

我们必须创建一些可以让我们连接到数据库的变量。这就是我们需要创建的东西。(注意，这些是字段变量而不是局部变量）。

```java
//数据库
final String username="YOUR DB USERNAME"; // (1)
final String password="YOUR DB PASSWORD"; // (2) 
final String url = "jdbc:mysql://db4free.net:3306/DataBaseName"; // (3)

//连接
static Connection connection; // (4)
```

1. 数据库用户名
2. 数据库密码
3. 数据库地址
4. 用于连接数据库的变量

现在我们需要使用我们制作的由 Java 提供的连接变量连接到数据库。我们通过在 onEnable 中给我们的连接变量分配属性，然后尝试进行连接。这就是我们需要使用的代码。

同样，把这段代码放在 `onEnable();` 方法中，因为我们要在启动服务器后立即尝试连接。

```java
try { // (1)
    connection = DriverManager.getConnection(url, username, password);
    // (2)
} catch (SQLException e) { // (3)
    e.printStackTrace(); // (4)
}
```

1. 尝试捕获以获得任何 SQL 错误（例如连接错误）
2. 通过 `DriverManager` 的 `getConnection()` 方法，我们试图将连接的 url、用户名、密码设置为我们之前制作的变量，并试图同时获得一个连接。JDBC 允许我们这样做。
3. 捕获异常
4. 将 SQLException 错误打印到控制台（如果有）

现在是时候让我们的插件关闭连接了，因为我们不希望无用的连接还在附近徘徊。我们将通过在 `onDisable()` 方法中关闭连接变量来做到这一点。因此，当服务器关闭时，我们不需要这个连接还在那里。

```java
public void onDisable() {
    // (1)
    try { // (2)
        if (connection!=null && !connection.isClosed()){ // (3)
            connection.close(); // (4)
        }
    } catch(Exception e) {
        e.printStackTrace();
    }
}
```

1. 禁用时调用
2. 使用 try catch 来捕捉连接错误（如错误的 sql 密码......）
3. 检查连接是否为空，以避免收到空指针
4. 关闭连接字段变量

如果你可以建立一个连接，那么你就可以执行查询和更新。这里有一个快速提示，无论何时你想修改数据库，请使用 Statement#executeUpdate，但如果你只是想从数据库中获取信息，只需执行 Statement#executeQuery。

首先，我们必须创建一个表。

```java
String sql = "CREATE TABLE IF NOT EXISTS myTable(Something varchar(64));"; // (1)
try {
    PreparedStatement stmt = connection.prepareStatement(sql); //(2)
    stmt.executeUpdate();
} catch (SQLException e) {
    e.printStackTrace();
}
```

1. 准备要执行的语句
2. 使用 `executeUpdate()` 来更新数据库表

之后，我们就可以从数据库中进行更新和查询了。

```java
String sql = "SELECT * FROM myTable WHERE Something=?"; // (1)
PreparedStatement stmt = connection.prepareStatement(sql);
stmt.setString(1, "Something"); // (2)
ResultSet results = stmt.executeQuery();
if (!results.next()) {
    System.out.println("Failed");
} else {
    System.out.println("Success");
}
```

1. 注意问号作为输入值的占位符
2. 将第一个`?`设置为查询字符串

这段代码将打印出 "失败"，因为我们没有值可以选择。让我们现在添加一些。

```java
String sql = "INSERT INTO myTable(Something) VALUES ('?');";
PreparedStatement stmt = connection.prepareStatement(sql);
stmt.setString(1, "Something"); // (1)
stmt.executeUpdate();
```

1. 将第一个 `?` 设为 `Something`

现在，如果我们重新运行之前的查询代码，我们会得到 "成功"，因为一个值已经被插入并被选中供我们查看。

如果在 Spigot 插件中使用，你应该确保你的数据库查询不会在主服务器线程上运行（通过使用 BukkitScheduler#runTaskAsynchronously），除非绝对必要。

## 推荐的库

有几个不同类型的库可用于使与 MySQL 数据库的工作更容易。

### 连接池

你可能想要使用的主要设计原则是连接池，以允许共享多个连接，而不必在你当前的连接上等待。Java 的 SQL API 包括一个简单的连接池设计，但像 HikariCP 这样的附加库简化了它们的使用并提高了它们的性能。只要记住在你使用完连接后直接关闭所有的连接，这样它们就可以被池子重新使用。

### 对象关系映射（ORM）

ORM 是一种直接将 Java 对象映射到其在数据库中的表现形式的方法，不需要自己编写查询或表结构，它们为你做这一切。

常用的提供该功能的库有 OrmLite（支持 MySQL、Postgres、Microsoft SQL Server、H2、Derby、HSQLDB，而不仅仅是 Sqlite）以及 Hibernate（一种先进的、可能是行业标准的 ORM 解决方案）。

### 查询简化和一般帮助工具

SansOrm 是一个旨在取代 ORM 的库，它允许你仍然完全控制你的表方案以及你的查询，同时与编写传统的 SQL 查询相比，仍然大量减少模板。

IDB（Intuitive Database Wrapper）旨在简化创建 SQL 查询的模板，并与 HikariCP 集成。

[跳转至官网原文](https://www.spigotmc.org/wiki/mysql-database-integration-with-your-plugin/)