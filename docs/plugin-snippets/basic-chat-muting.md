---
sidebar_position: 4
---

# 基本的聊天静默

## 基础知识

一个非常基本的入门方法是创建一个关于如何取消事件的小例子。这在以后会很有用，所以让我们看一下我们如何取消聊天事件。

在这种情况下，我们使用的是 AsyncPlayerChatEvent，我们想取消所有事件。有效地，这从服务器上删除了聊天功能。让我们看一看:

```java
@EventHandler
public void onAsyncPlayerChat(AsyncPlayerChatEvent event) {
    event.setCancelled(true);
}
```

我们将不讨论如何注册这个监听器，但如果你安装了这个插件，聊天就会被禁用。

## 添加一个切换器

每次需要让聊天静音时都要添加这个插件，这确实很有局限性，对吗？让我们添加一个命令来切换它吧! 首先，让我们修改一下我们的监听器。

```java
private volatile boolean chatEnabled = true;

@EventHandler
public void onAsyncPlayerChat(AsyncPlayerChatEvent event) {
    if (!chatEnabled) {
        event.setCancelled(true);
    }
}
```

我们现在改变了检查方式，并加入了一个新的字段。注意，`volatile` 是必需的，因为聊天事件通常是异步运行的（不在服务器线程上）。

现在我们可以添加我们的命令处理程序（将命令添加到您的 `plugin.YAML` 中不属于本片段的范围）。让我们假设你的监听器和插件是同一个类:

```java
    @Override
    public boolean onCommand(CommandSender sender, Command cmd, String label, String[] args) {
        // (1)
        if (cmd.getName().equalsIgnoreCase("mutechat")) {
            // (2)
            chatEnabled = !chatEnabled;
            // (3)
            sender.sendMessage(ChatColor.GREEN + (chatEnabled ? "Unmuted the chat" : "Muted the chat"));
        }
        // (4)
        return true;
    }
```

1. 检查刚才输入的是什么命令
2. 将 `chatEnabled` 布尔值取反
3. 查看chatEnabled布尔值是否为真，如果是，则打印字符串 "Unmuted the chat"，如果不是则打印 "Muted the chat"
4. 始终返回 `true`，因为除了命令的名称之外，没有实际的用法。

一旦运行这个插件，您可以轻松地使用`/mutechat` 将聊天静音，并再次将其取消静音。就这么简单！

## 练习

- 你如何能更好地改进这个插件的组织？
- 如何让所有发送的聊天信息都得到充分处理，但只有发送者才能看到？
- 请注意，我们没有包括任何权限检查。你可以如何为 `/mutechat` 命令加入权限检查？
- 如果您使用 `/mutechat`，即使是以管理员身份，您的聊天也不会通过。您可以为管理员添加一个覆盖功能吗？

[跳转至官网原文](https://www.spigotmc.org/wiki/basic-chat-muting/)
