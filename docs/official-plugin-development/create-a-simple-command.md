---
sidebar_position: 5
---

# 创建一个简单的命令

## 设计命令

首先，你应该已经为这个命令想好了名字。在这个片段中，我们将使用 `/kit` 这个命令的例子。然而，这可以用你在自己的插件中选择使用的任何命令来代替。

建议为每个命令创建一个新的类，这样更有条理。你的类必须实现 `CommandExecutor` 接口。该类文件可能看起来类似于这样。

```java
public class CommandKit implements CommandExecutor {

    // This method is called, when somebody uses our command
    @Override
    public boolean onCommand(CommandSender sender, Command command, String label, String[] args) {
        return false;
    }
}
```

重命名参数，用一些代码填充方法主体。下面是每个参数的含义:

- `CommandSender` 代表发送命令的东西。这可能是一个播放器，`ConsoleCommandSender`，或者 `BlockCommandSender`（一个命令块）。
- 命令代表被调用的命令是什么。这几乎总是提前知道的。
- `label` 表示发送者所输入的命令（不包括参数）的准确的第一个字。
- `args` 是命令语句的剩余部分（不包括标签），由空格分割并放入一个数组中。

在为我们的示例命令向玩家提供物品之前，我们需要一个玩家对象。如果命令发送者是一个玩家，我们可以将其投递。在这种情况下，铸型将给我们带来对玩家对象的访问。

!!! warning "注意"
    在 `onCommand` 方法中传递给我们的 `CommandSender` 对象有时可以不用先投递给一个播放器。如果你想做的只是发送一个消息，那么检查它是否是一个玩家只是无谓地给你的代码增加杂乱无章的内容，并使你的命令的可用性稍微降低。

```java
    @Override
    public boolean onCommand(CommandSender sender, Command cmd, String label, String[] args) {
        if (sender instanceof Player) {
            Player player = (Player) sender;
            // Here we need to give items to our player
        }

        // If the player (or console) uses our command correct, we can return true
        return true;
    }
```

接下来，我们把物品交给我们的玩家。在这个例子中，我们将使用一颗钻石和 20 块砖。一个物品由一个 ItemStack 表示。所以让我们创建一个新的 ItemStack，并设置它们的数量。

我们的示例命令的代码将看起来像这样:

```java
    @Override
    public boolean onCommand(CommandSender sender, Command cmd, String label, String[] args) {
        if (sender instanceof Player) {
            Player player = (Player) sender;

            // Create a new ItemStack (type: diamond)
            ItemStack diamond = new ItemStack(Material.DIAMOND);

            // Create a new ItemStack (type: brick)
            ItemStack bricks = new ItemStack(Material.BRICK);

            // Set the amount of the ItemStack
            bricks.setAmount(20);

            // Give the player our items (comma-seperated list of all ItemStack)
            player.getInventory().addItem(bricks, diamond);
        }

        // If the player (or console) uses our command correct, we can return true
        return true;
    }
```

:::note 
也可以通过创建一个新的ItemStack来直接设置金额，使用起来更容易，也更短:

```java
ItemStack bricks = new ItemStack(Material.BRICK, 20);
```
:::

## 注册命令

接下来，我们注册我们的命令。要做到这一点，请进入主类中的 `onEnable()` 方法。我们只需要添加如下高亮的一行:

```java hl_lines="4"
    @Override
    public void onEnable() {
        // Register our command "kit" (set an instance of your command class as executor)
        this.getCommand("kit").setExecutor(new CommandKit());
    }
```

## 添加到 `plugin.yml`

最后一步是将我们的命令添加到 `plugin.yml` 中。打开它并添加与我们的例子类似的行，然后测试你的插件:

```yaml
# Replace "kit" with the name of your command.
commands:
   kit:
      description: Your description
      usage: /<command>
      permission: yourplugin.yourcommandpermission
```

有些事情要记住:

- 你在注册命令时使用的字符串必须与你的 `plugin.yml` 中使用的字符串相同。
- 如果有必要，你可以用构造器参数提前初始化你的 `CommandExecutor` 实例，比如你的主插件类。
- 在你的 `onCommand` 方法中，如果你想让 `CommandSender` 收到支配你的命令的正确用法的信息（如 `plugin.yml` 中定义的），返回 `false`。返回 `true` 以静静地停止执行。
- 当一个无效的 `CommandSender` 试图使用一个命令时（例如当控制台使用/kit命令时），发送一个错误是推荐做法。

现在你已经完成了! 我们希望你学到了一些关于创建命令的基本知识。

[跳转至官网原文](https://www.spigotmc.org/wiki/create-a-simple-command)