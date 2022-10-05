---
sidebar_position: 5
---

# Spigot 启动参数

如果一个参数的描述没有指定其他内容，下面这些参数应该放在你的启动脚本中的 `.jar` 之后。

### `-DIReallyKnowWhatIAmDoingISwear`

允许你跳过过时的构建（**重要的是，这是不支持的，可能会导致未来的许多错误！**）。

### `--bukkit-settings <file>.yml`

别名：`-b <file>.yml`

默认值：bukkit.yml

这个参数允许你手动定义服务器要使用的Bukkit配置文件。

### `--commands-settings <file>.yml`

默认值：command.yml

这允许你修改 commands.yml 的文件名。请注意第一个别名的大写字母。

### `--config <config file>.yml`

别名：`-c <file>.yml`

默认值：server.properties

这个参数允许你手动定义用于服务器启动的配置文件。

### `--date-format <definition>`

别名：`-d <definition>`

这允许你定义控制台输出和日志文件中使用的日期格式。

### `-Dcom.mojang.eula.agree=true`

(自构建号 #1544 起)

位置：在 `-jar` 之前

这个参数允许你在不编辑eula.txt的情况下运行你的服务器。把这个参数放在 `-jar` 之前。
请注意，这仍然具有法律约束力，你已经阅读并同意《Minecraft EULA》。

### `-DconvertLegacySigns=true`

(适用于 Spigot 1.8)

位置：在 `-jar` 之前

这个参数将把标志上的文本从 1.8 之前的格式转换为新的 1.8 JSON 格式。这对于正确转换带有括号 [text] 的标志是必要的。
你必须加载所有的分块来转换整个世界! 例如，用一个像 [WorldBorder](http://dev.bukkit.org/bukkit-plugins/worldborder/) 这样的插件。
不要在已经加载了 1.8 版本的世界上运行这个软件！那会把你的标志弄得一团糟。

### `-Dfile.encoding=UTF-8`

位置：在 `-jar` 之前

这个参数将确保所有 UTF-8 字符被正确地保存在服务器的日志文件中，所有字符也应该正确地显示在控制台中。把这个参数放在 `-jar` 之前
这个参数只对基于 Linux 的旧版本有用，这可能会在 Windows 操作系统上造成奇怪的字符。

### `-Djline.terminal=jline.UnsupportedTerminal`

位置：在  `-jar`  之前

这个参数将禁用 JLine 控制台和控制台输入栏中的 `>` 字符。
你应该只在 Windows 上没有安装 Microsoft Visual C++ 2008 再分配软件的情况下使用这个参数。把这个参数放在  `-jar`  之前。
Linux 和 UNIX 用户可以安全地忽略这个选项。

### `--help`

别名：`-?`

显示启动参数的帮助菜单。
请注意，这个参数将使你无法启动服务器。JVM 会话将在启动时被终止。
当你试图使用一个错误的/未知的参数时，这个帮助菜单也会显示。

### `--host <IP address>`

别名：`-h <IP 地址>`

默认值：server.properties 中的值（null）。

这个参数允许你手动定义服务器要监听的主机名或 IP 地址。
该参数只能包括 IP 地址；请看下面关于覆盖端口设置的内容。

### `--level-name <name>`

别名：`-w <名称>或--world <名称>`

默认值：server.properties中的值（world）

这个参数允许你修改级别名称，这将绕过 server.properties 文件中的 ` level-name= value`。
请注意第一个别名的小写。

### `--log-strip-color`

(自构建号 #1138 前)

在保存到日志时，这个参数会去除着色。

### `--max-players <amount>`

别名：`-s <amount>` 或 `--size <amount>`

默认值：server.properties 中的值（20）

服务器将允许的最大玩家数量，这将绕过 server.properties 文件中的 `max-players= value`。

### `--noconsole`

完全禁止控制台的使用，日志文件仍将被写入。

### `--nogui`

别名：`-nogui`

这个参数将停止 Vanilla GUI 的启动。

### `--nojline`

这个参数禁用了 Bukkit 的 JLine 控制台，而是模拟虚构的控制台，这对那些在 Windows 上没有 [Microsoft Visual C++ 2008 redistributable](https://www.microsoft.com/en-gb/download/details.aspx?id=29) 的用户很有用。Linux 和 UNIX 用户可以安全地忽略这个选项。

### `--online-mode <true/false>` ([废弃](https://www.spigotmc.org/threads/2800/#post-30901))

别名：`-o <true/false>`

默认值：来自 server.properties 的布尔值（true）

这个参数允许你定义服务器应该在哪个模式下运行，这将绕过 server.properties 文件中的 `online-mode= boolean`。

### `-org.spigotmc.netty.disabled=true`

(自构建号 #1138 前)

这个参数禁用了 Netty 网络引擎，默认为普通网络引擎。
更多信息请参见[本页面](tips-tricks-tutorials/disabling-netty.md)。

### `--plugins <directory>`

别名：`-P <目录>`

默认值：plugins

这个参数允许你手动定义服务器要使用的插件目录。
请注意，要注意别名的大写字母。

### `--port <port number>`

别名： `--server-port <端口号>` 或 `-p <端口号>`

默认值：server.properties 中的值（25565）

这个参数允许你手动定义服务器要监听的端口。请确保你使用的端口是开放的（端口已转发）。
请注意别名的小写。

### `--spigot-settings <config file>.yml`

别名：`-S <file>.yml`

默认值：spigot.yml

这个参数允许你手动定义 Spigot 使用的配置文件。
请注意第一个别名的大写字母。

### `--version`

别名：`-v`

这将在启动时显示服务器的构建号（版本），如果你想避免比最新的构建号晚几个版本，这很有用。

### `--world-dir <directory>`

别名：`-W <目录>` 或 `--universe <目录>` 或 `--world-container <目录>`

默认值：./

这个参数将把你的服务器使用的所有世界放到一个特定的目录中，如果你在主服务器目录里面有很多文件夹，这个参数就很有用。
请注意第一个别名的大写字母。

[跳转至官网原文](https://www.spigotmc.org/wiki/start-up-parameters/)