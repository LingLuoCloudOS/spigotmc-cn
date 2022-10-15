---
sidebar_position: 5
---

# 绕过玩家人数限制

现在大多数小型服务器都受到服务器的玩家人数限制。
下面的例子将展示绕过服务器玩家人数限制的众多概念之一。

首先，让我们为这个例子创建我们的**主类**:

```java
package me.web.playerlimitbypass;

import org.bukkit.event.Listener;
import org.bukkit.plugin.java.JavaPlugin;

public class PlayerBypass extends JavaPlugin implements Listener {

    @Override
    public void onEnable() {

    }
}
```

很简单。
接下来，我们将创建我们的**事件处理程序**，并**注册该事件**。

```java
    @EventHandler
    public void onPlayerLoginEvent(PlayerLoginEvent event){

    }
```

```java
    @Override
    public void onEnable() {
        // 注册该事件
        getServer().getPluginManager().registerEvents(this, this);
    }
```

下面的代码是这个概念的基础:

```java
    @EventHandler
    public void onPlayerLoginEvent(PlayerLoginEvent event){
        // 检查我们被踢的原因是否是服务器爆满
        if (event.getResult() == PlayerLoginEvent.Result.KICK_FULL) {
            // 如果上述条件为真，我们执行以下代码，即允许服务器上的玩家
            event.allow();
        }
    }
```

你可以以任何方式对基础进行调整。例如，检查玩家是否有绕过玩家限制的权限:

```java
    @EventHandler
    public void onPlayerLoginEvent(PlayerLoginEvent event) {
        // 检查我们被踢的原因是否是服务器爆满
        if (event.getResult() == PlayerLoginEvent.Result.KICK_FULL) {
            // 检查玩家是否有指定的权限节点
            if (event.getPlayer().hasPermission("playerlimit.bypass"))
                // 如果上述条件为真，我们执行以下代码，即允许服务器上的玩家
                event.allow();
        }

    }
```