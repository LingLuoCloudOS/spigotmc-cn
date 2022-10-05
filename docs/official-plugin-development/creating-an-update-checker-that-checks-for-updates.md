---
sidebar_position: 11
---

# 创建更新检查器

这是一个关于如何为你的插件创建一个更新检查器的简单教程。

要使用这个更新检查器, 你的资源必须上传至 [SpigotMC.org](https://www.spigotmc.org/resources/)。

## 第 1 步 - 获得你的资源 ID

首先，你需要你的资源的 ID，你可以在你的资源的 URL 中找到。
你的资源 URL 应该看起来像这样:

```
https://www.spigotmc.org/resources/<资源的名称>.<资源 ID>。
```

## 第 2 步 - 获取 Spigot API URL

这很简单。这是 Spigot API 的 URL:
```
https://api.spigotmc.org/legacy/update.php?resource=<资源 ID>
```

只要把最后的 id 替换成你的资源的 id 即可。

例如，EssentialsX 的资源页面的 id 是 9089，这意味着它的 API URL 将是这样的:

```
https://api.spigotmc.org/legacy/update.php?resource=9089
```

## 第 3 步 - 创建更新检查器

在你的项目中添加一个新的类。

```java
import org.bukkit.Bukkit;
import org.bukkit.plugin.Plugin;

import java.io.IOException;
import java.io.InputStream;
import java.net.URL;
import java.util.Scanner;
import java.util.function.Consumer;

// From: https://www.spigotmc.org/wiki/creating-an-update-checker-that-checks-for-updates
public class UpdateChecker {

    private final JavaPlugin plugin;
    private final int resourceId;

    public UpdateChecker(JavaPlugin plugin, int resourceId) {
        this.plugin = plugin;
        this.resourceId = resourceId;
    }

    public void getVersion(final Consumer<String> consumer) {
        Bukkit.getScheduler().runTaskAsynchronously(this.plugin, () -> {
            try (InputStream inputStream = new URL("https://api.spigotmc.org/legacy/update.php?resource=" + this.resourceId).openStream(); Scanner scanner = new Scanner(inputStream)) {
                if (scanner.hasNext()) {
                    consumer.accept(scanner.next());
                }
            } catch (IOException exception) {
                plugin.getLogger().info("Unable to check for updates: " + exception.getMessage());
            }
        });
    }
}
```

你必须通过构造函数传递一个扩展了 `JavaPlugin` 的类的实例，以使用 `BukkitScheduler`。`BukkitScheduler` 用于异步运行更新检查，否则整个服务器将在运行时冻结。你还必须通过构造函数传递资源的 id。

然后你可以在你的 `onEnable` 方法中创建一个新的更新检查器的实例，像这样:

```java
    @Override
    public void onEnable() {
        new UpdateChecker(this, 12345).getVersion(version -> {
            if (this.getDescription().getVersion().equals(version)) {
                getLogger().info("There is not a new update available.");
            } else {
                getLogger().info("There is a new update available.");
            }
        });
    }
```

它寻找一个 id 为 `12345` 的资源，并将其版本与 `plugin.yml` 文件中注册的版本进行比较。当然，你需要改变上述方法中的资源 ID。

确保你使用的是 `Consumer` 类的 Java 导入，而不是 Bukkit 的导入： `import java.util.function.Consumer;`

[跳转至官网原文](https://www.spigotmc.org/wiki/creating-an-update-checker-that-checks-for-updates/)