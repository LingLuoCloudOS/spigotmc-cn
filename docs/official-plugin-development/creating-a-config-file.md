---
sidebar_position: 7
---

# 使用配置 API

为了让玩家能够改变你的插件的设置，可以使用一个配置文件。本教程将介绍如何使用 Bukkit 配置 API 创建一个配置文件。

### 从 JAR 中保存默认的 `config.yml`

要保存你在插件的 JAR 中包含的默认 `config.yml`，你可以直接调用:

```java
this.saveDefaultConfig()
```

### 读取配置文件

为了检索配置对象，你将需要在你的主类中使用 `getConfig()` 方法，像这样:

```java
this.getConfig()
```

### 在配置中添加选项

首先，让我们创建一个配置变量，这样我们就不必反复调用那个函数了。

```java
FileConfiguration config = this.getConfig();
```

现在，我们要在配置中添加一些选项。在本教程中，我们要做的是，如果 `'youAreAwesome'` 为真，它将向控制台记录一条信息，`'youAreAwesome'`。

我们要添加的是以下内容。请确保把它放在你的 `onEnable()` 方法中。

```java
config.addDefault("youAreAwesome", true);
```

我们已经实现了（嗯，差不多），你的插件将生成一个带有 "youAreAwesome" 选项的 `config.yml`。默认情况下，它将被设置为真。(如果你使用 `("youAreAwesome", false)`，它当然会被设置为 `false`。)

在这个例子中，我们使用了一个布尔值。`youAreAwesome` 可以是真，也可以是假。可以使用以下类型:

- boolean
- int
- double
- String
- String List
- [还有更多](https://docs.oracle.com/javase/tutorial/java/nutsandbolts/datatypes.html)

### 检查值

现在我们已经添加了这个选项，我们需要检查这个选项的值是什么。假设用户将 `youAreAwesome` 设置为 `true`，我们需要检查它是否为真（或假）。

如果是假的，我们可以执行一个代码块，如果是真的，也同样适用。

我们可以用下面的代码检查 `youAreAwesome` 的值:

```java
if (config.getBoolean("youAreAwesome")) {
// do something
}
```

我们使用`getBoolean()`是因为 `youAreAwesome` 是一个布尔值。例如，如果它是一个字符串，我们会使用`getString()`。

### 保存配置文件

我们的配置文件现在看起来像这样:

```yaml
youAreAwesome: true
```

我们仍然要保存配置文件。在所有`config.addDefault()`的后面加上以下内容（在你的`onEnable()`方法中）。

```java
config.options().copyDefaults(true);
saveConfig();
```

### 结果

示例代码可以是:

```java linenums="1"
public final class TestPlugin extends JavaPlugin implements Listener {
    FileConfiguration config = getConfig();

    @Override
    public void onEnable() {
        config.addDefault("youAreAwesome", true);
        config.options().copyDefaults(true);
        saveConfig();

       // Enable our class to check for new players using onPlayerJoin()
       getServer().getPluginManager().registerEvents(this, this);
    }

    // This method checks for incoming players and sends them a message
    @EventHandler
    public void onPlayerJoin(PlayerJoinEvent event) {
        Player player = event.getPlayer();

        if (config.getBoolean("youAreAwesome")) {
            player.sendMessage("You are awesome!");
        } else {
            player.sendMessage("You are not awesome...");
        }
    }
}
```

### 附录

关于更详细的信息（例如，如何设置更复杂和嵌套的 YAML 结构或使用列表和地图，以及如何创建和使用新的 YAML 文件），请参阅 [Bukkit wiki](https://bukkit.fandom.com/wiki/Configuration_API_Reference)。

如果你想创建和使用自定义文件，你可以使用[现有的 Spigot API](../plugin-snippets/config-files.md)，或者使用像 [BoostedYAML](https://www.spigotmc.org/threads/%E2%9A%A1-boostedyaml-standalone-yaml-library-with-updater-and-comment-support-much-more-5min-setup-%E2%9A%A1.545585/) 这样的外部库来自动处理一切。

[跳转至官网原文](https://www.spigotmc.org/wiki/creating-a-config-file/)