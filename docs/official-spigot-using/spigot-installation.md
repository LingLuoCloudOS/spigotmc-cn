---
sidebar_position: 2
---

# Spigot 安装

Spigot 是 CraftBukkit 的一个分支，在上面加上了额外的优化和更多的功能。安装它很简单，因为它可以直接替代典型的 CraftBukkit JAR。

如果你已经成功地安装了 CraftBukkit，安装 Spigot 通常就像用新的 JAR 替换你的服务器一样简单。

另外，为了避免恶意的或旧的 Spigot 为 Minecraft 服务器打开一个大的漏洞，你**不应该**下载任何在互联网上发现的 Spigot jar 文件。它可能是过时的，或者有时可能是一个木马。

:::caution
在过去的几个月里，运行和编译 Spigot/CraftBukkit 的说明一直在变化。请确保查看 [BuildTools 维基页面](http://www.spigotmc.org/wiki/buildtools/)，以获得最新的编译说明。
:::

## 先决条件

1. Java 8 或以上 [[Windows](https://www.java.com/zh-CN/download/), [Ubuntu](https://help.ubuntu.com/community/Java), [CentOS](http://stackoverflow.com/a/20901970), [OS X](https://www.java.com/en/download/)] 。
2. 按照[ BuildTools wiki 页面](buildtools.md)编译的服务器 jar。(运行 BuildTools 后，你会发现 Spigot/CraftBukkit 的服务器 jar 文件在同一个目录下）。
3. 将 Spigot/CraftBukkit 服务器 jar 文件复制到你的服务器专用的新目录中。(不要与 BuildTools 所在的文件夹相同！)

## 安装

### Windows

1. 将以下文本粘贴到一个文本文档中。在与 `spigot.jar` 相同的目录下将其保存为 `start.bat` :
```title="start.bat"
@echo off
java -Xms#G -Xmx#G -XX:+UseG1GC -jar spigot.jar nogui
pause
```
(其中 # 是你分配的服务器内存，单位为 GB)
2. 双击该批处理文件。

### Linux

1. 在服务器目录下创建一个新的启动脚本 `start.sh` 来启动 JAR。
```bash title="start.sh"
#!/bin/sh

java -Xms#G -Xmx#G -XX:+UseG1GC -jar spigot.jar nogui
```
(其中 # 是你分配的服务器内存，单位为 GB)
2. 打开你的终端，在该目录下执行以下内容:
```bash
chmod +x start.sh
```
3. 运行你的启动脚本:
```bash
./start.sh
```

### Screen

如果你想用屏幕启动服务器，同时支持 `/restart` 命令，你可以使用这个脚本:

```bash title="start.sh"
#!/bin/sh

screen -d -m -S "name_of_screen_here" java [your startup flags here] -jar spigot.jar nogui
```

:::caution
注意，`-d -m` 选项是 `/restart` 工作的必要条件。
:::

### Mac OS X

1. 创建一个新的启动脚本 `start.command` 来启动服务器目录中的 JAR:
```bash title="start.command"
#!/bin/sh

cd "$( dirname "$0" )"
java -Xms#G -Xmx#G -XX:+UseG1GC -jar spigot.jar nogui
```
(其中 # 是你分配的服务器内存，单位为 GB)
2. 打开终端，在其中输入：（不要按回车键！）
```bash
chmod a+x
```
3. 将你的启动脚本文件拖入终端窗口。(请确保在 `chmod a+x` 和你的启动脚本之间加一个空格！）。
4. 双击你的启动脚本。

### Multicraft

根据你的 Minecraft 主机的配置，你将有两种方法来通过 Multicraft 启用 Spigot 的使用。

- 如果在 JAR 文件选择菜单中已经有了 Spigot 的选项，你可以简单地选择它，并在保存时重新启动你的服务器。然而，如果你的主机没有及时更新最新的 Spigot 构建，这可能不被推荐。
- 如果你有权限上传自定义服务器 JAR（FTP），请下载 Spigot JAR，并通过面板索引上的 JAR 文件输入框输入文件名。有些主机可能要求你把 JAR 重命名为一个特定的名字（如 `custom.jar`），然后从下拉菜单中选择它。
- 如果你的个人服务器你有 root 权限，把 [`spigot.jar.conf`](http://www.multicraft.org/download/conf?file=spigot.jar.conf) 放在你的 daemon jar 目录中，然后用管理面板更新 jar。现在这个 jar 应该是客户选择的 jar。

## 安装后

在 `Spigot.jar` 第一次运行后，文件夹和配置文件将被创建。你将需要编辑这些配置文件以使服务器在你的环境中正常工作。
你可以在这里获得关于这些文件的进一步说明:

- [server.properties](https://minecraft.fandom.com/zh/wiki/Server.properties)
- [bukkit.yml](https://bukkit.fandom.com/wiki/Bukkit.yml)
- [spigot.yml](spigot-configuration.md)
- [服务器图标](server-icon.md)

如果服务器工作不正常，请确定你已经进行了端口转发，并且你已经严格按照步骤进行了操作。如果你有问题，你可以在 [Spigot 论坛](http://www.spigotmc.org/forums/help.40/)上创建一个帮助主题，或者到 [Discord](https://www.spigotmc.org/link-forums/discord.95/) 或 [IRC](http://www.spigotmc.org/pages/irc/) 上与我们聊天。

由于 Windows 和 Mac OS X 内核的低效率（如高开销、资源分配不均等），我们不建议在这些平台上托管严格/专用服务器。

## 插件

几乎在所有情况下，你的 Bukkit 插件都可能在 Spigot 上运行，除非你的某个插件的作者使用了某些内部的 CraftBukkit/Minecraft 代码。

查看[我们的资源部分](http://www.spigotmc.org/resources/)或 [BukkitDev](http://dev.bukkit.org/bukkit-plugins/)，可以找到各种各样的插件，范围从帮助管理到添加全新的游戏模式。如果你在那里找不到任何东西，你可以在 [Spigot 的服务与招标论坛](http://www.spigotmc.org/forums/hiring-developers.55/)或 [Bukkit 的插件需求论坛](http://forums.bukkit.org/forums/plugin-requests.13/)上请求制作一个插件。请务必遵循如何设置请求的准则。

你可以通过将 JAR 文件丢到服务器目录下的插件文件夹中，然后重新启动服务器来添加你的插件。如果不工作或看到错误，请在 [Spigot 论坛](http://www.spigotmc.org/forums/help.40/)上寻求帮助。

[跳转至官网原文](http://www.spigotmc.org/wiki/spigot-installation/)