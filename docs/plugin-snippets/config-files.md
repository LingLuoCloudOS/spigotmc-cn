---
sidebar_position: 3
---

# 使用配置文件

## 配置文件的作用

在你开发的过程中，你会遇到很多需要存储数据的情况。很多时候，你可以将这些数据存储在一个对象中，如 **HashMap** 或 **ArrayList**。那么，为什么要使用配置文件呢？原因是，当服务器关闭或重启时，它会重新创建一切，你存储的所有数据都会丢失。这是因为像这样的对象是存储在虚拟内存中的。换句话说，就像它们被创建一样容易，它们也会被销毁。

现在，这就是文件派上用场的地方。文件是一种保存数据的方式，在你的程序终止后不会被删除。这是因为文件不再存储在虚拟内存中，而是存储在你的实际存储磁盘上。你可以用它来存储信息，如玩家的余额、昵称和各种你想在服务器重新启动后仍能保留的数据。

让我们开始吧。

## 使用默认配置文件

配置文件的创建:

```java
plugin.saveDefaultConfig();
```

`saveDefaultConfig()` 将把你的插件的 jar 文件中的 `config.yml` 文件写到插件的数据文件夹中。(如果该文件夹不存在，它将被创建）它将不会覆盖现有的配置文件。

这基本上是你创建一个快速配置文件所需要的，但记得在你的 `onEnable()` 方法中调用它，以确保在其他事情发生之前你已经准备好了一个配置。

### 使用单个配置文件

为了使用上述方法读写配置文件，我们调用 `getConfig()` 方法。然而，如果你将在主类之外调用 `getConfig()`，你应该使用主类的实例。如果你不知道如何从其他类中获取实例，我建议你查看其他一些关于如何使用构造函数（最常用）的简短指南。一旦你有了一个实例，只需使用该实例并从中调用 `getConfig()`。

现在你有了这个配置，你可以使用它的不同的 getter 和 setter 方法来读写它。一个例子是:

```java
// Reading from the config
String name = plugin.getConfig().getString("player-name");

// Writing to the config
plugin.getConfig().set("player-name", name);
```

它到底是什么？"player-name" 是你在配置中的路径。如果你见过其他 YAML 配置文件，你会注意到它们采取 "label: value" 的格式。要访问某个特定路径的值，你可以使用它的名字。然而，你也会注意到，有时会有一些 "子路径"，其中有一些标签属于另一个标签之下。

```yaml
player-name: Steve

player:
  time:
    join: 6:00pm
```

要访问作为子路径的东西的值，你可以简单地用 `.` 来表示较低层次，像这样:

```java
// Reading from the config
String time = plugin.getConfig().getString("player.time.join");

// Writing to the config
plugin.getConfig().set("player.time.join", time);
```

该插件将把 `.` 作为一个指标，即 "哦！我应该检查子路径"。

请注意，虽然我在获取和设置的例子中使用了一个字符串，但你也可以使用各种不同的类型。对于获取器，存在 `getInt()`、`getBoolean()`、`getList()` 等。对于设置器，它只是把路径作为第一个参数，把一个对象作为第二个参数。这意味着，你基本上可以设置任何对象。

然而，需要注意的一件事是，在你向配置文件写入后，如果你想把数据保存到文件中，你应该始终记得调用 `saveConfig()`。(警告：`saveConfig()` 将删除你所有不在顶部的第一个键之前的注释)

```java
plugin.saveConfig();
```

配置有各种有趣的技巧和工具，你可以用它来制作最好的插件。正确使用它，它可以成为你最强大的工具之一。

## 使用自定义配置

### 创建文件

首先，你想让你的 File 和 FileConfiguration 对象对你的插件中的其他类可用，这样你就可以随时读写你的不同配置文件。你如何做到这一点呢？

你可以使用 Spigot API，或者使用一个外部库，比如 [BoostedYAML](https://www.spigotmc.org/threads/%E2%9A%A1-boostedyaml-standalone-yaml-library-with-updater-and-comment-support-much-more-5min-setup-%E2%9A%A1.545585/)，来自动处理一切。我们建议使用 API，如果你理解了所有的概念，可以转向更高级的库。

在你的主类中，创建字段变量。这些是不包含在方法中的变量，以便它们可以被外部访问。

```java
public class YourPlugin extends JavaPlugin {

    private File customConfigFile;
    private FileConfiguration customConfig;

    @Override
    public void onEnable(){
        createCustomConfig();
    }

    public FileConfiguration getCustomConfig() {
        return this.customConfig;
    }

    private void createCustomConfig() {
        customConfigFile = new File(getDataFolder(), "custom.yml");
        if (!customConfigFile.exists()) {
            customConfigFile.getParentFile().mkdirs();
            saveResource("custom.yml", false);
         }

        customConfig = new YamlConfiguration();
        try {
            customConfig.load(customConfigFile);
        } catch (IOException | InvalidConfigurationException e) {
            e.printStackTrace();
        }
        // 你也可以使用 YamlConfiguration.loadConfiguration(customConfigFile) 来代替上面的 Try/Catch。
    }
}
```

这是做什么的？它是一个基本的插件类的快照，看起来像什么。它所做的其他事情是，它创建了一个配置文件，即 `custom.yml`。当该插件被启用时，它调用 `createCustomConfig()` 方法。它检查自定义配置的文件对象是否存在，如果不存在，就创建父目录和文件。

那 `saveResource(String, boolean) `部分呢？除了类之外，你实际上可以在你的 jar 中存储文件。要做到这一点，根据你的 IDE，你应该在有你的 `plugin.yml` 文件的文件夹中创建一个新文件。现在在你的主类中，你可以调用 `saveResource("name of file in jar here", replaceIfAlreadyExists)` 。这将把存储在你的 jar 中的文件保存到 `< data 文件夹 >/<jar 中的文件名 >` 文件中，如果它还不存在的话（或者如果布尔值为真）。现在，你已经创建了自定义配置文件。

### 读取和写入自定义文件

```java
plugin.getCustomConfig().getString("some-path");
```

基本上，你可以用与[**使用单个配置文件**](#_3)中 `getConfig()` 相同的方式访问配置。如果你想看到更多关于如何操作和访问配置的内容，请阅读该部分。至于保存，对于自定义配置，你需要调用 `FileConfiguration#save(File)`（`saveConfig()` 在引擎盖下为 `config.yml` 做的），将数据写入磁盘中。

[跳转至官网原文](https://www.spigotmc.org/wiki/config-files/)