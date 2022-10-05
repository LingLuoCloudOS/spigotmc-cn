---
sidebar_position: 6
---

# 使用事件 API

使用 Spigot 的最佳功能之一是能够拦截各种各样的事件。本教程将演示如何开始监听和拦截事件以及如何创建你自己的事件。

## 创建你的第一个监听器

假设已经初始化创建好 Spigot 插件开发的基本代码框架，若没有，可以参考本文章: [用 Gradle Groovy 构建你的 Spigot 插件](spigot-gradle.md)。

### 准备监听器

监听器必须实现 `org.bukkit.event.Listener` 接口。你的监听器类现在应该看起来像这样:

```java
import org.bukkit.event.Listener;

public class MyListener implements Listener {

}
```

### 注册监听器

现在有必要注册这个类的一个实例，这样 Spigot 就能把事件传递给你的插件。在主类的 `onEnable()` 方法中，是创建一个新的监听器实例并注册它的常见区域。例如如下高亮行:

```java hl_lines="3"
    @Override
    public void onEnable() {
        getServer().getPluginManager().registerEvents(new MyListener(), this);
    }
```

现在你已经准备好继续向你的监听器添加事件了。

### 监听事件

要在您的监听器类中监听任何给定的事件，您必须创建一个附加有 `org.bukkit.event.EventHandler` 注解的方法，并且该事件是由方法参数中的类型指定。该方法可以任意命名。例如：

```java
import org.bukkit.event.EventHandler;
import org.bukkit.event.Listener;
import org.bukkit.event.player.PlayerJoinEvent;

public class MyListener implements Listener {
     @EventHandler
     public void onPlayerJoin(PlayerJoinEvent event) {

     }
}
```

只要有玩家加入服务器，这个方法就会启动。让接下来实现全服广播。

```java hl_lines="9"
import org.bukkit.Bukkit;
import org.bukkit.event.EventHandler;
import org.bukkit.event.Listener;
import org.bukkit.event.player.PlayerJoinEvent;

public class MyListener implements Listener {
     @EventHandler
     public void onPlayerJoin(PlayerJoinEvent event) {
         Bukkit.broadcastMessage("Welcome to the server!");
     }
}
```

### 操纵事件

你可以修改大多数事件发生的情况，也可以获得有关给定事件的信息。这些功能都存储在你的方法中的事件对象中。让我们来修改一个玩家加入服务器时广播的信息。

```java
import org.bukkit.Bukkit;
import org.bukkit.event.EventHandler;
import org.bukkit.event.Listener;
import org.bukkit.event.player.PlayerJoinEvent;

public class MyListener implements Listener {
     @EventHandler
     public void onPlayerJoin(PlayerJoinEvent event) {
         event.setJoinMessage("Welcome, " + event.getPlayer().getName() + "!");
     }
}
```

:::info 可监听的事件
浏览 `org.bukkit.event` 包，以获得你可以监听的全部事件列表。请阅读 [Spigot JavaDocs](https://hub.spigotmc.org/javadocs/spigot/)
:::

## 高级功能

### 事件处理程序参数

`org.bukkit.event.EventHandler` 注解接受几个参数。

`priority` - 表示你的监听器的优先级。有六个不同的优先级，按执行顺序排列。`LOWEST, LOW, NORMAL[默认], HIGH, HIGHEST, MONITOR`。这些常量参考了 `org.bukkit.event.EventPriority` 枚举。

:::warning 注意
`MONITOR` 的优先级只能用于读取。这个优先级对于日志插件查看事件的结果很有用，修改数值可能会干扰这些类型的插件。
:::

`ignoreCancelled` - 一个布尔值，表示如果事件在轮到监听器处理之前被取消了，你的监听器是否应该启动。默认为 `false`。

例如:

```java
import org.bukkit.event.EventHandler;
import org.bukkit.event.EventPriority;
import org.bukkit.event.Listener;
import org.bukkit.event.player.AsyncPlayerChatEvent;

public class MyListener implements Listener
{
     // Executes before the second method because it has a much lower priority.
     @EventHandler (priority = EventPriority.LOWEST)
     public void onPlayerChat1(AsyncPlayerChatEvent event) {
         event.setCancelled(true);
     }

     // Will not execute unless another listener with a  lower priority has uncancelled the event.
     @EventHandler (priority = EventPriority.HIGHEST, ignoreCancelled = true)
     public void onPlayerChat2(AsyncPlayerChatEvent event) {
         System.out.println("This shouldn't be executing.");
     }
}
```

### 取消注册监听器

不幸的是，取消监听器的注册并不像注册那样简单，尽管它一点也不难。它是这样做的：

```java
// import org.bukkit.event.HandlerList
//import (your listener)
HandlerList.unregisterAll(Listener);
```

## 创建自定义事件

有时你需要创建你自己的事件，一个其他插件可以监听的事件，甚至可以取消。

### 创建事件

首先，你的类必须扩展 Event。

```java
import org.bukkit.event.Event;

public class ExampleEvent extends Event {

}
```

乍一看，这似乎是你需要做的所有事情，但在运行你的程序后，你会收到 `Spigot` 的错误信息。这是因为，虽然没有大量的文档，但你需要在你的事件类中加入以下方法：

```java
import org.bukkit.event.Event;
import org.bukkit.event.HandlerList;

public class ExampleEvent extends Event {

    private static final HandlerList HANDLERS = new HandlerList();

    public static HandlerList getHandlerList() {
        return HANDLERS;
    }

    @Override
    public HandlerList getHandlers() {
        return HANDLERS;
    }

}
```

你需要这些方法，因为 Spigot 使用 `HandlerList` 类将其他 `EventHandlers` 与监听其他事件分开。

我们现在可以添加一些实现来使我们的事件完整:

```java
import org.bukkit.event.Event;
import org.bukkit.event.HandlerList;

public class ExampleEvent extends Event {

    private static final HandlerList HANDLERS = new HandlerList();
    private final String playerName;

    public static HandlerList getHandlerList() {
        return HANDLERS;
    }



    public ExampleEvent(String playerName) {
        this.playerName = playerName;
    }


    @Override
    public HandlerList getHandlers() {
        return HANDLERS;
    }

    public String getPlayerName() {
        return this.playerName;
    }

}
```

### 发送和监听事件

发送事件相对容易些:

```java
ExampleEvent exampleEvent = new ExampleEvent("Msrules123"); // (1)
Bukkit.getPluginManager().callEvent(exampleEvent); // (2)
Bukkit.getPlayer("Msrules123").sendMessage(exampleEvent.getPlayerName()); // (3)
```

1. 初始化事件
2. 这将触发该事件，并允许任何监听器监听该事件。
3. 使用自定义的事件数据

而监听它和其他事件是一样的：

```java
import org.bukkit.event.EventHandler;
import org.bukkit.event.Listener;

public class ExampleListener implements Listener {

   @EventHandler
   public void onExampleEvent(ExampleEvent event) {
       // Handle implementation here
   }

}
```

### 可撤销事件

为了使你的事件可被撤销，只需实现Cancellable。这很简单：

```java
import org.bukkit.event.Cancellable;
import org.bukkit.event.Event;
import org.bukkit.event.HandlerList;

public class ExampleEvent extends Event implements Cancellable {

    private static final HandlerList HANDLERS = new HandlerList();
    private final String playerName;
    private boolean isCancelled;

    public static HandlerList getHandlerList() {
        return HANDLERS;
    }
   


    public ExampleEvent(String playerName) {
        this.playerName = playerName;
        this.isCancelled = false;
    }

    @Override
    public boolean isCancelled() {
        return this.isCancelled;
    }

    @Override
    public void setCancelled(boolean isCancelled) {
        this.isCancelled = isCancelled;
    }

    @Override
    public HandlerList getHandlers() {
        return HANDLERS;
    }

    public String getPlayerName() {
        return this.playerName;
    }

}
```

现在，你不是直接使用你的事件数据，而是在检查你的事件是否被撤销后使用：

```java
ExampleEvent exampleEvent = new ExampleEvent("Msrules123");
Bukkit.getPluginManager().callEvent(exampleEvent);
if (!exampleEvent.isCancelled()) {
    Bukkit.getPlayer("Msrules123").sendMessage(exampleEvent.getPlayerName());
}
```

[跳转至官网原文](https://www.spigotmc.org/wiki/using-the-event-api/)