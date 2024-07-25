---
sidebar_position: 8
---

# 创建加入信息

讲述如何简单地创建玩家加入服务器地消息。

## 主类

该类扩展了 `JavaPlugin`，默认情况下应该如下所示。

```java
package com.example.joinmessages;

import org.bukkit.plugin.java.JavaPlugin;

public final class JoinMessages extends JavaPlugin {

    @Override
    public void onEnable() {
    }
}
```

## 监听器

现在我们有了主类，可以开始制作监听器了。监听器是一个监听特定事件的类，如加入事件或死亡事件，如果使用得当，这些事件会非常有用！

我们先从一个空的 Java 类开始：

```java
package com.example.joinmessages;

public class JoinListener {
}
```

现在，我们实现 Bukkit Listener “监听器”，它应该是这样的：

```java
package com.example.joinmessages;

import org.bukkit.event.Listener;

public class JoinListener implements Listener {
}
```

然后，我们创建第一个函数，在本例中将其命名为 `onPlayerJoinEvent`：

```java
package com.example.joinmessages;

import org.bukkit.event.EventHandler;
import org.bukkit.event.Listener;

public class JoinListener implements Listener {

    @EventHandler
    public void onPlayerJoinEvent(){
    }
}
```

在括号中，我们添加了监听器，在本例中，由于我们试图获取一个加入消息，所以使用了 `PlayerJoinEvent`，在这之后，我们添加了对事件的调用方式，在本例中，我使用了 `event`，但你也可以使用任何你想要的方式，但建议使用 `e`或 `event`！我们还导入了 `org.bukkit.event.player.PlayerJoinEvent`，现在你的监听器类应该是这样的：

```java
package com.example.joinmessages;

import org.bukkit.event.Listener;
import org.bukkit.event.EventHandler;
import org.bukkit.event.player.PlayerJoinEvent;
import org.bukkit.entity.Player;

public class JoinListener implements Listener {

    @EventHandler
    public void onPlayerJoinEvent(PlayerJoinEvent event){
        Player player = event.getPlayer();
    }

}
```

在我们的函数中，我们现在用

```java
Player player = event.getPlayer();
```

现在，我们可以输入有效字符串来编辑加入信息，下面是一个例子：

```java
event.setJoinMessage("[+] " + player.getName());
```

我们的事件类现在应该是这样的：

```java
package com.example.joinmessages;

import org.bukkit.entity.Player;
import org.bukkit.event.Listener;
import org.bukkit.event.EventHandler;
import org.bukkit.event.player.PlayerJoinEvent;

public class JoinListener implements Listener {

    @EventHandler
    public void onPlayerJoinEvent(PlayerJoinEvent event){
        Player player = event.getPlayer();
        event.setJoinMessage("[+] " + player.getName());
    }

}
```

## 注册事件/监听器

现在，我们回到主类，在 `onEnable()`中添加以下代码

```java
Bukkit.getPluginManager().registerEvents(new JoinListener(), this);
```

变量 “this”，因为是在主类中，所以是插件（实例）。
我们的主类最终应该是这样的:

```java
package com.example.joinmessages;

import org.bukkit.Bukkit;
import org.bukkit.plugin.java.JavaPlugin;

public final class JoinMessages extends JavaPlugin {

    @Override
    public void onEnable() {
        Bukkit.getPluginManager().registerEvents(new JoinListener(), this);
    }
}
```

## 额外

如果您想为您的 “加入信息 ”或 “一般信息 ”添加额外的亮点（颜色），您可以添加此选项：

```java
ChatColor.RED
ChatColor.YELLOW
ChatColor.GREEN
ChatColor.BLUE
ChatColor.AQUA
```

我们的 “加入信息 ”中的色彩使用示例：

```java
event.setJoinMessage(ChatColor.GRAY + "[" + ChatColor.GREEN + "+" + ChatColor.GRAY + "] " + ChatColor.GRAY + player.getName());
```

[跳转至官网原文](https://www.spigotmc.org/wiki/creating-join-messages/)