---
sidebar_position: 12
---

# 创建外部库

## 什么是外部库？

它是一个本地库，只存在于你的计算机上，只能由你自己使用。
它将为你节省大量的时间，而不是重复无数次的代码，你只需在外部库中输入一次就可以了。

## 我怎样才能开始呢？

你首先要做一个项目，就像你做任何普通的插件一样。
然后，你把Spigot的依赖关系添加到你的项目中。
所以，这与创建一个普通的插件非常相似。
然后，我们在库中创建一个新的类，这个类并不扩展任何东西。
这个类将是我们库的主类，我们的插件将只用它来设置和获取值。
例如，JavaPlugin。当你处理像调度器这样的事情时，你需要一个JavaPlugin来运行一个任务。
所以，我们的类将是这样的:

```java
import org.bukkit.plugin.java.JavaPlugin;

public class MyLibrary {

    private static JavaPlugin plugin;

    // For other classes in our library
    public static JavaPlugin getPlugin() {
        return plugin;
    }

    // This method must not be used any where in the library!
    public static void setPlugin(final JavaPlugin plugin) {
        MyLibrary.plugin = plugin;
    }

}
```

现在，在我们为每一个我们想要的数据做了 Setters 和 Getter 之后。
让我们来创建我们真正的库！

你可以把任何你想要的东西放在这个库里，最好是使用几个类，而不是只有一个类。
在这个例子中，我将创建一个有两个方法的 Utils 类，所有这些方法都与玩家互动。

```java
import org.bukkit.Bukkit;
import org.bukkit.ChatColor;
import org.bukkit.command.CommandSender;

public class Utils {

    public static void tell(final CommandSender sender, final String message) {
        sender.sendMessage(colorize(message));
    }

    public static void log(final String message) {
        tell(Bukkit.getConsoleSender(), "[" + MyLibrary.getPlugin().getName() + "] " + message);
    }

    public static String colorize(final String message) {
        return ChatColor.translateAlternateColorCodes('&', message);
    }

}
```

:::caution
库中的所有方法都*必须*是公共静态的(`public static`)，否则你就不能使用它们。
:::

## 如何在你的插件中使用

要在你的插件中使用它，你需要先把它添加到你的 classpath 中。怎么做？
就像你如何将 Spigot 添加到你的插件中一样!

### Maven

在你的 pom.xml 中，添加依赖:

```xml
<dependency>
  <groupId>[Your Library groupId]</groupId>
  <artifactId>[Your Library artifactId]</artifactId>
  <version>1.0.0</version>
  <scope>compile</scope>
</dependency>
```

### 不使用 Maven

将你的库构建成一个 jar 文件，然后像添加 Spigot 一样添加它。

### 获取访问库权限

现在，在我们可以从我们的插件的项目中访问库之后，让我们来设置库的插件。

```java
@Override
public void onEnable() {
    MyLibrary.setPlugin(this);
}
```
现在你就可以开始了!
你可以使用库中的每一个静态方法。

[跳转至官网原文](https://www.spigotmc.org/wiki/creating-external-libraries/)