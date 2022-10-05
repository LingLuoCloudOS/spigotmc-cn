---
sidebar_position: 1
---

# 异步处理数据库

## 开始之前

在这个例子中，我们将使用 MongoDB，但本教程应该可以在没有大量 MongoDB 知识的情况下进行学习。如果你想了解 MongoDB，你可以阅读 [使用 MongoDB 数据库](../official-plugin-development/using-mongodb) 。我们还将创建一个命令，请参阅：[创建一个简单的命令](../official-plugin-development/create-a-simple-command)。

## 什么是异步

每个程序都有一个起点，从这个起点开始，程序的执行基本上是逐行进行的，这意味着每个任务都会在前一个任务完成后运行。因为在很多情况下，这不是最理想的情况，有一种方法可以启动一个新的任务，开始做它的事情，同时主程序也在继续。

这些任务被系统和大多数编程语言称为线程，允许你使用它们。如果一个任务被设计为等待输入，而你不希望整个程序在玩家发送聊天信息之前停止，那么使用多个线程就特别有用。线程也会被操作系统智能地分配到处理器的核心上，这意味着如果你有多个核心，你甚至可以从利用线程中获得性能提升，因为Minecraft的主循环是在一个核心上运行的。

异步是同步的反义词，它的意义在于，当你在一个新的或独立的线程中执行一个任务时，你是在异步地调用它，而如果你启动一个任务并等待它在与你启动它的地方相同的线程中完成，你已经同步地调用它。两者本身都不是坏事或好事，两者的使用取决于情况。

## 创建一个 `/playerinfo` 命令

在本教程中，我们将假设与数据库建立了有效的连接，并且存在一个包含一些玩家数据的集合。该命令将接受一个参数，该参数是玩家的名字或UUID。数据库中玩家文件的一个例子:

```json
{
    _id: ObjectId("564bff868ab04da7798b4569"),
    username: "Wouto1997",
    lookupUsername: "wouto1997",
    uuid: "a44c33ce480e486f9f782d1f52db037b",
    money: 17500,
    flying: true,
    friends: [],
    rank: "DEVELOPER",
    lastSeen: ISODate("2015-11-18T11:33:10.852Z"),
    registered: ISODate("2014-08-14T21:15:10.152Z")
}
```

因此，我们将立即从一个完全同步运行的基本 `/playerinfo` 命令开始:

```java
public class CommandPlayerInfo implements CommandExecutor {

    @Override
    public boolean onCommand(CommandSender cs, Command cmd, String label, String[] args) {
        if (args.length < 1) {
            cs.sendMessage("Usage:");
            cs.sendMessage("  /playerinfo <name>");
            cs.sendMessage("  /playerinfo <uuid>");
            return true;
        }
        String param = args[0];
        String key = null;
        if (param.length() <= 16 && param.length() >= 3) {
            key = "lookupUsername";
        } else {
            param = param.replaceAll("-", "");
            if (param.length() != 32) {
                cs.sendMessage("Invalid username or uuid");
                return true;
            }
            key = "uuid";
        }
        param = param.toLowerCase();
        DBCollection playerCollection = DatabaseHelper.getPlayerDatabase();
        DBObject result = playerCollection.findOne(new BasicDBObject(key, param));
        if (result == null) {
            cs.sendMessage("The specified player could not be found");
            return true;
        }
        cs.sendMessage( "Information about " + ((String) result.get("username")) );
        cs.sendMessage( "UUID: " + ((String) result.get("uuid")) );
        cs.sendMessage( "money: " + ((Integer) result.get("money")) );
        cs.sendMessage( "Fly: " + ((Boolean) result.get("fly")).toString() );
        cs.sendMessage( "Friends: " + ((BasicDBList) result.get("friends")).size() );
        cs.sendMessage( "rank: " + ((String) result.get("rank")) );
        cs.sendMessage( "Last online: " + ((Date) result.get("lastSeen")).toLocaleString() );
        cs.sendMessage( "Registered: " + ((Date) result.get("registered")).toLocaleString() );
        return true;
    }

}
```

## 使用 bukkit 的异步

你首先需要了解的是 Bukkit 调度器，你可以从任何地方用 `Bukkit.getScheduler ()` 访问它。你可以向调度器添加 3 种不同类型的任务，每种类型都有一个同步和一个异步的变体。

需要注意的是，在这种情况下，同步任务是在 Minecraft tick 上运行的，而不是在你调用它的线程（通常）。建议在不在 Minecraft-tick 线程内时不要访问 Bukkit 的大部分 API，但另一方面，在主线程之外执行数据库和其他繁重的任务也是明智的。

在这个例子中，我们将只使用 `runTask` 和 `runTaskAsynchronously`，因为我们不希望以后或重复执行一个命令。在解析了所有参数之后，我们要做的第一件事就是 "逃离" 命令线程，并启动一个与 Minecraft 线程分离的新线程。

```java
        Bukkit.getScheduler().runTaskAsynchronously(plugin, new Runnable() {
            @Override
            public void run() {
     
            }
        });
```

现在我们有一个异步任务，我们希望能够将数据传递给它。由于这个运行方法是在命令的其他部分之外，我们需要使这个任务访问的所有变量都是最终变量。将一个变量设为最终变量，就失去了重新赋值的能力，但是，变量上的函数仍然可以如期工作。我们最终得到的代码现在看起来像这样:

```java
    @Override
    public boolean onCommand(final CommandSender cs, Command cmd, String label, String[] args) {
        if (args.length < 1) {
            cs.sendMessage("Usage:");
            cs.sendMessage("  /playerinfo <name>");
            cs.sendMessage("  /playerinfo <uuid>");
            return true;
        }
        String param = args[0];
        String key = null;
        if (param.length() <= 16 && param.length() >= 3) {
            key = "lookupUsername";
        } else {
            param = param.replaceAll("-", "");
            if (param.length() != 32) {
                cs.sendMessage("Invalid username or uuid");
                return true;
            }
            key = "uuid";
        }
        final String fparam = param.toLowerCase();
        final String fkey = key;
 
        Bukkit.getScheduler().runTaskAsynchronously(plugin, new Runnable() {
            @Override
            public void run() {
                DBCollection playerCollection = DatabaseHelper.getPlayerDatabase();
                DBObject result = playerCollection.findOne(new BasicDBObject(fkey, fparam));
                if (result == null) {
                    fcs.sendMessage("The specified player could not be found");
                    return;
                }
                fcs.sendMessage("Information about " + ((String) result.get("username")));
                fcs.sendMessage("UUID: " + ((String) result.get("uuid")));
                fcs.sendMessage("money: " + ((Integer) result.get("money")));
                fcs.sendMessage("Fly: " + ((Boolean) result.get("fly")).toString());
                fcs.sendMessage("Friends: " + ((BasicDBList) result.get("friends")).size());
                fcs.sendMessage("rank: " + ((String) result.get("rank")));
                fcs.sendMessage("Last online: " + ((Date) result.get("lastSeen")).toLocaleString());
                fcs.sendMessage("Registered: " + ((Date) result.get("registered")).toLocaleString());
            }
        });

        return true;
    }
```

请注意我是如何使 `param`、`key` 和 `cs` 变量成为最终变量的，只需创建一个带有 `final` 关键字的新变量，并将原始值分配给新变量。通过在方法的参数部分添加简单的 `final` 关键字，`CommandSender` 被变成了 `final`。你现在可能也注意到，底部的 `return true` 将在命令完成之前被调用，这完全没有问题。现在唯一的问题是，我们在异步任务中访问 Bukkit 函数，即 `sendMessage` 函数。虽然我很确定这可以正常工作，但我还是建议你回到主线程，特别是如果你要做的事情不止是向玩家发送消息。

然而，现在我们已经在一个命令中得到了一个任务，在其中创建另一个任务可能会变得很混乱，所以这就把我带到了下一步，这是一个非常好的方法，可以使这个过程更加优雅。

## 回调

创建回调是一种非常优雅的方式，可以将一个或多个任务隐藏在后台，并在其他任务完成后才返回到你正在编写的代码中。在前面的片段中，调度器使用的 `Runnable` 类基本上也是回调，它们只是非常快速地回调，因为它们所要等待的是 Minecraft tick 的发生。

为了创建我们自己的回调，我们所要做的就是创建一个接口。我把我的接口命名为 `FindOneCallback`，我给了它一个函数，当查询完成时可以被调用。这个回调类看起来像这样:

```java
public interface FindOneCallback {

    public void onQueryDone(DBObject result);

}
```

现在我们要创建一个函数，它具有数据库处理的所有功能。它可能看起来有点乱，但它基本上是我们之前做的调度器的2倍，只是第一个是退出主循环，第二个是回到主循环。

```java
    public static void findPlayerAsync(final DBObject query, final FindOneCallback callback) {
        // Run outside of the tick loop
        Bukkit.getScheduler().runTaskAsynchronously(plugin, new Runnable() {
            @Override
            public void run() {
                DBCollection playerCollection = DatabaseHelper.getPlayerDatabase();
                final DBObject result = playerCollection.findOne(query);
                // go back to the tick loop
                Bukkit.getScheduler().runTask(plugin, new Runnable() {
                    @Override
                    public void run() {
                        // call the callback with the result
                        callback.onQueryDone(result);
                    }
                });
            }
        });
    }
```

## 重组命令

现在我们要做的就是给我们的命令打上补丁，你会发现利用这个命令可以变得更加干净，而且性能也会提高不少。

```java
    @Override
    public boolean onCommand(final CommandSender cs, Command cmd, String label, String[] args) {
        if (args.length < 1) {
            cs.sendMessage("Usage:");
            cs.sendMessage("  /playerinfo <name>");
            cs.sendMessage("  /playerinfo <uuid>");
            return true;
        }
        String param = args[0];
        String key = null;
        if (param.length() <= 16 && param.length() >= 3) {
            key = "lookupUsername";
        } else {
            param = param.replaceAll("-", "");
            if (param.length() != 32) {
                cs.sendMessage("Invalid username or uuid");
                return true;
            }
            key = "uuid";
        }
 
        BasicDBObject query = new BasicDBObject(key, param);
 
        DatabaseHelper.findPlayerAsync(query, new FindOneCallback() {
            @Override
            public void onQueryDone(DBObject result) {
                if (result == null) {
                    cs.sendMessage("The specified player could not be found");
                    return;
                }
                cs.sendMessage("Information about " + ((String) result.get("username")));
                cs.sendMessage("UUID: " + ((String) result.get("uuid")));
                cs.sendMessage("money: " + ((Integer) result.get("money")));
                cs.sendMessage("Fly: " + ((Boolean) result.get("fly")).toString());
                cs.sendMessage("Friends: " + ((BasicDBList) result.get("friends")).size());
                cs.sendMessage("rank: " + ((String) result.get("rank")));
                cs.sendMessage("Last online: " + ((Date) result.get("lastSeen")).toLocaleString());
                cs.sendMessage("Registered: " + ((Date) result.get("registered")).toLocaleString());
            }
        });

        return true;
    }
```

## 总结

在这个例子中，异步编程的使用可能是矫枉过正的，但是对于像用户加入服务器时的玩家数据加载或每当某些事件发生时更新数据库中的值这样的任务，这是一个非常明智的处理方法。异步编程不仅对 MongoDB 有用，而且可以很容易地用于 SQL、文件读/写、从网站传输或接收数据，以及其他许多事情。

[跳转至官网原文](https://www.spigotmc.org/wiki/asynchronously-working-with-a-database/)