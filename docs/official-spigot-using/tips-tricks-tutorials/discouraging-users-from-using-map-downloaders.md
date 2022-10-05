---
sidebar_position: 3
---

# 阻止世界下载者

## 模组内权限系统

世界下载器 mod 实现了一个[基于插件通道的权限系统](http://wiki.vg/Plugin_channels/World_downloader)。这可以用来根据你的意愿禁用 MOD（或将其切换到仅请求模式）。

## (弃用)Anti-xray-based 系统

:::caution
由于 Anti-Xray 在 1.9 中被从 spigot 中移除，这个方法不再起作用了。仍然可以使用其他 Anti-Xray 插件。一个可以做到这一点的插件是 [Orebfuscator](https://www.spigotmc.org/resources/orebfuscator.22818/)。
:::

### 先决条件

运行在 engine mode 2 下的 Spigot Anti-Xray 

### 理论

通过使用 engine mode 2 的混淆作用，如果用户用这种方法加载一个下载的世界，会导致世界爆炸，或者在一些低端电脑上，冻结他们的游戏。

这是由于客户端在不接触空气的地方收到红石块（持续的红石输出）和 TNT，但由于它们不是真实的，所以你的服务器不会勾选它们。在本地保存地图文件的过程中，用户也会保存这些方块，但却是真实的形式，一旦文件被加载，这些方块就会被勾选，并按预期爆炸。

这并不是万无一失的，而且有几种方法可以绕过，但它可以完成对付低端的工作。

:::info
这对 hubs、生存游戏、迷你游戏等会有更好的效果。任何涉及采矿的操作都可能对一些玩家产生明显的 "滞后"。
:::

### 方法

- 访问你的 `spigot.yml`
- 启用 anti-xray 的功能
- 将 engine mode 改为 2
- 将 46 号区块（TNT）和 152 号区块（红石区块）添加到隐藏区块中。
- 保存配置并重新上传至服务器
- 重新启动服务器

另外，如果你想尝试完全阻止世界下载，可以尝试查找反 WDL 插件。一些 WDL mods 的插件可以在特定的服务器上禁用该 mod!

[跳转至官网原文](https://www.spigotmc.org/wiki/discouraging-users-from-using-map-downloaders/)