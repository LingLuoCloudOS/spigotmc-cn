---
sidebar_position: 6
---

# Spigot 命令与权限

:::caution
- 纯净版服务器命令，请参阅：[命令](https://minecraft.fandom.com/zh/wiki/%E5%91%BD%E4%BB%A4)
- Bukkit 服务器命令，请参阅：[CraftBukkit Commands](https://www.spigotmc.org/wiki/spigot-commands/)
:::

### `/restart`

权限节点: `bukkit.command.restart`

该命令将尝试执行服务器重启。为了使其发挥作用，你必须在 [`spigot.yml`](spigot-configuration.md) 中正确定义 "restart-script "值。

默认值: Operator

### `/tps`

权限节点: `bukkit.command.tps`

这个命令将显示你的服务器在过去1、5和15分钟内的TPS（每秒刻度）平均数。

默认值: Operator

### `/timings on`

:::caution
在构建号为 [#1319 - #1537](http://www.spigotmc.org/wiki/disabled-timings-on-command/) 中禁用
:::

权限节点: `bukkit.command.timings`

该命令将关闭服务器的基准时间，而不需要重新启动。

默认值: Operator

### `/timings merged`

:::caution
在构建号为 [#1319 - #1537](http://www.spigotmc.org/wiki/disabled-timings-on-command/) 中禁用
:::

权限节点: `bukkit.command.timings`

此命令将把服务器的基准测试时间写入磁盘。一个名为 `timingsX.txt` 的文本文件将被保存在 `/timings/` 目录中，其中 X 每次以单次递增。

默认值: Operator

### `/timings separate`

权限节点: `bukkit.command.timings`

该命令将为活动的插件产生计时报告，但不是在每个插件的单独文本文件中。

默认值: Operator

### `/timings paste`

权限节点：`bukkit.command.timings`

所有的服务器基准时间将被粘贴到 [Ubuntu Paste](http://paste.ubuntu.com/) 中，而不是写入文件，然后可以通过 [Aikar 的时间查看器](http://www.aikar.co/timings.php)以适当和改进的格式查看。

默认值: Operator

### `/timings reset`

权限节点: `bukkit.command.timings`

该命令将重置之前由服务器收集的基准时间数据。

默认值: Operator

[跳转至官网原文](https://www.spigotmc.org/wiki/spigot-commands/)