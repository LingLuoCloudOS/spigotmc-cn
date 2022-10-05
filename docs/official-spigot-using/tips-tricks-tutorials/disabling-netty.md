---
sidebar_position: 1
---

# 禁用 Netty

:::caution
仅适用于#1138及以下版本的构建
:::

## 警告

请记住，你应该作为最后的手段来处理插件兼容性或 CPU 使用问题。通过禁用 Netty，你就等于禁用了 Spigot 的超高效无阻塞网络 I/O，它为你的服务器做了很多很多非常棒的事情。

## 方法

这比简单的 bukkit.yml 更复杂，因为网络引擎是在加载配置之前启动的，因此你需要编辑服务器的启动脚本来禁用 Netty。

只要在你的服务器启动脚本中添加这个 JVM 标志，Netty 就会被禁用：

```
-org.spigotmc.netty.disabled=true
```

你可以通过检查你的控制台启动日志来验证 Netty 是否被禁用，如果你在日志中没有看到 "Netty is using x threads"，说明 Netty 被正确禁用了，或者你也可以使用 JVM 监视器来检查，比如 VisualVM。

## 为什么我只能在 1138 及以下版本中这样做？

虽然之前 Spigot 重写了 Minecraft 服务器网络引擎以使用 Netty 而不是标准的 vanilla 网络引擎，但随着 Minecraft 1.7 及以上版本的推出，Minecraft 现在默认使用 Netty。由于 Minecraft 与 Netty 的紧密耦合，移除它将使你的服务器无法启动。

[跳转至官网原文](https://www.spigotmc.org/wiki/disabling-netty/)
