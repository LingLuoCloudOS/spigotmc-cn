---
sidebar_position: 3
---

# 命令别名

## 创建别名 - 服务器所有者
如果你作为一个服务器所有者希望为你的某个插件提供的命令添加别名，你可以使用你的服务器文件夹根目录下的 `commands.yml` 文件。

关于如何使用这个文件的文档，请看 [https://bukkit.fandom.com/wiki/Commands.yml](https://bukkit.fandom.com/wiki/Commands.yml)

## 创建别名
在插件开发过程中，你可能决定要让多个播放器命令指向相同的代码。这样做有很多原因，但最常见的是消除编写长命令的麻烦，让用户输入一个较短的版本。

在 Bukkit 中，你可以使用 `plugin.yml` 中的别名很容易地做到这一点。
下面是一个例子，你当前的 `plugin.yml` 中定义了一个命令：

```yaml
name: ExamplePlugin
version: 1.0
author: YourName
main: YourPlugin.ExamplePlugin
commands:
  exampleCommand:
    description: Example
    usage: /<command>
```

为了给一个命令做别名，在你的命令子节点上添加一个别名标签。下面是一个**别名**节点的例子:

```yaml
name: ExamplePlugin
main: YourPlugin.ExamplePlugin
version: 1.0
author: YourName
commands:
  exampleCommand:
    description: Example
    usage: /<command>
    aliases: [alias1, alias2]
```

如果你要输入命令 `/alias1`，这个插件就会像你输入 `/exampleCommand` 一样。

:::caution 注意
Minecraft 的标签补全也会列出别名，所以如果你不想淹没标签补全，不要放太多的别名。
:::

检查一个玩家使用的别名
在开发你的插件时，你可能希望每个别名的行为略有不同。例如，你可能需要把玩家使用的别名记录到控制台。

让我们看看我们的例子 `CommandExecutor` 中的 `onCommand()` 方法。

```java
public class ExampleCommand implements CommandExecutor {
    @Override
    public boolean onCommand(CommandSender sender, Command command, String label, String[] args) {
        sender.sendMessage("Yay! You ran /exampleCommand!");
        return true;
    }
}
```

我们要关注的是变量 `command`（类型为 Command）和 `label`（类型为 String）。

如果你知道如何使用 `onCommand()`，你可能记得 `command` 是玩家调用的命令，`command.getName() `返回命令的名称（在 `plugin.yml` 中注册）。需要记住的是，`command.getName()` 返回的是同样的东西 -- 命令名称 -- 不管玩家使用了什么别名。

然而，`label` 则不同。变量 `label` 返回玩家为执行命令所写的任何内容。如果一个玩家输入了 `/alias1`，标签就是 "alias1"，如果一个玩家写了 `/removemanhoodandfeedittothegoats`，标签就是 "removemanhoodandfeedittothegoats"。因此，在确定别名时，标签是非常有用的。

因此，如果我们想让我们的例子命令说明玩家用哪个别名来运行这个命令，我们会这样做。

```java
public class ExampleCommand implements CommandExecutor {

    @Override
    public boolean onCommand(CommandSender sender, Command command, String label, String[] args) {
        sender.sendMessage("Yay! You ran exampleCommand!");
        if (!(command.getName().equalsIgnoreCase(label))) {
            sender.sendMessage("You also ran exampleCommand with alias \"" + label + "!\"");
        }
        return true;
    }
}
```

在游戏中，当我们输入 `/alias1` 并按回车键时，我们会在聊天中得到这些信息:

:::note 聊天框
Yay! You ran exampleCommand!
    
You also ran examplecommand with alias "alias1!"
:::

在 `plugin.yml` 中定义的任何别名也会在上述例子中发挥作用。

要了解如何创建 `plugin.yml`，请看[我们的文档](plugin-config-file.md)。

[跳转至官网原文](https://www.spigotmc.org/wiki/command-alias/)
