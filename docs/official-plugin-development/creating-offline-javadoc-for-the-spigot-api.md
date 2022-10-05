---
sidebar_position: 13
---

# 为 Spigot 创建离线 Javadoc

Spigot Javadoc 总是可以通过 URL [https://hub.spigotmc.org/javadocs/spigot/](https://hub.spigotmc.org/javadocs/spigot/) 进行在线访问，大多数基于 Java 的现代 IDE 都可以将其作为 Javadoc 资源来使用，没有任何问题。但是，使用在线资源确实是以效率为代价的，访问本地副本的速度会快很多。

因此，在你有任何使用 `wget`下载所有东西的想法之前，我将向你展示如何轻松地制作你自己的本地拷贝。

## 先决条件

我假设你已经用 Build Tools 安装了 Spigot 服务器的本地拷贝。如果你还没有，那么请[点击链接](https://hub.spigotmc.org/jenkins/job/BuildTools/)，了解如何获得它并使用它来安装你自己的 Spigot 副本和 Spigot API。

你的搜索路径中还需要有 JDK bin 文件夹。

## 用 Maven 创建 Javadoc

### 首要准备工作

在你构建服务器之后，你会在主文件夹中找到主 jar 文件（spigot-x.xx.jar），而 Spigot API 可以在 `Spigot/Spigot-API/target` 子文件夹中找到。然而，我们需要的是访问源代码，而不是编译后的结果。因此，请导航到 `Spigot/Spigot-API/src/main`。

在这里你会注意到两个子文件夹：java 和 javadoc。Javadoc 只是一个粗略的占位符，还不包含任何有用的东西，所以要先删除其内容。在 Windows 上，删除整个文件夹然后重新创建它比较容易：`rmdir javadoc /S`，然后是 `mkdir javadoc`。在类似 Unix 的环境中，你可以使用：`rm -r javadoc/*`。当然，你也可以用文件管理器来做这个，而不是用命令行。

### 生成Javadoc

你只需要一条命令:

```
javadoc -d javadoc -sourcepath ./java -encoding UTF-8 -subpackages org.bukkit:org.spigotmc
```

:::
如果这个命令不起作用，请导航到 Spigot-API 并运行
:::

```
mvn javadoc:javadoc
```

Javadoc 将放在 `Spigot-API/target/site/apidocs` 中。

这个命令确保输出将被放在 javadoc 子文件夹中，该命令开始在 java 子文件夹中寻找源文件，并将尊重 UTF-8 编码格式。最后，它将特别检查 `org/bukkit` 和 `org/spigotmc`（在 Java 中，包的结构是用文件夹设置的）。

使用这个命令的唯一注意事项是，各个包不会像在线 Javadoc 那样被描述，相反，你只会得到链接，你可以点击这些链接来检查包的内容。

## 可选的额外步骤

如果你把服务器安装在你使用 Java IDE 的同一台电脑上，那么你可以考虑简单地把 IDE 指向你的服务器位置。否则，你可以简单地复制 java 和 javadoc 文件夹（或用 ZIP 压缩），然后在另一个地方使用这些文件夹。

这样做的好处是显而易见的：这将确保你在互联网连接出现问题时也能访问 Javadoc（也可以选择访问源代码）。

[跳转至官网原文](https://www.spigotmc.org/wiki/creating-offline-javadoc-for-the-spigot-api)