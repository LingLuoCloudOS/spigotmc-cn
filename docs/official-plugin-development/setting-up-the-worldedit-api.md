---
sidebar_position: 15
---

# 设置 WorldEdit API

要设置 API，首先你要设置 spigot API。然后，去把以下内容粘贴到你的资源库中:

```xml
<repository>
  <id>enginehub-maven</id>
  <url>https://maven.enginehub.org/repo/</url>
</repository>
```

然后将以下任何一个粘贴到你的依赖中:

```xml
<!-- 这取决于 Bukkit API，如果你需要 BukkitAdapter，就使用这个 -->
<dependency>
    <groupId>com.sk89q.worldedit</groupId>
    <artifactId>worldedit-bukkit</artifactId>
    <version>7.2.0-SNAPSHOT</version>
    <scope>provided</scope>
</dependency>

<!-- 这不取决于任何平台 -->
<dependency>
    <groupId>com.sk89q.worldedit</groupId>
    <artifactId>worldedit-core</artifactId>
    <version>7.2.0-SNAPSHOT</version>
    <scope>provided</scope>
</dependency>
```

如果你是为 1.12.2 及以下版本的 MC 构建，你必须使用

```xml
<version>6.1.4-SNAPSHOT</version>
```

关于依赖关系的更多信息，请看 WorldEdit 官方的开发者 [API](https://worldedit.enginehub.org/en/latest/api/)。

稍等片刻，大量的依赖项应该出现在你的 Maven 依赖项中，WorldEdit 应该已经设置好了。

WorldEdit 的命名空间应该是 com.sk89q.worldedit。

关于如何加载和保存原理图的指南，请看[这里](https://madelinemiller.dev/blog/how-to-load-and-save-schematics-with-the-worldedit-api/)。

[跳转至官网原文](https://www.spigotmc.org/wiki/setting-up-the-worldedit-api/)