# SpigotMC 中文文档

[![Netlify Status](https://api.netlify.com/api/v1/badges/cf8ed83d-3813-49d0-8507-8ef64b889ab0/deploy-status)](https://app.netlify.com/sites/spigot-mc/deploys)

SpigotMC，也被称为 Spigot，是流行在 Bukkit 服务器模组的一个分支。Spigot 是为了提高性能和效率，同时保持与 Bukkit 插件的兼容性。

许多大型服务器都使用 Spigot，因为它们往往比普通服务器使用更多的资源。Spigot 也是无法购买硬件升级或支付服务器托管费的家庭服务器的理想选择。家庭服务器往往滞后很多，通常是由于网络滞后，以及你的电脑必须处理游戏、服务器和你的操作系统。

本站文档致力于翻译 Spigot 官方文档与系统性总结 Spigot 的插件开发教程所编写的指南。

此为本文档的源码仓库，采用 [Docusaurus 2.0](https://docusaurus.io/zh-CN/docs) 作为框架

## 快速开始

### 安装

```
$ yarn
```

### 本地开发

```
$ yarn start
```

这个命令启动了一个本地开发服务器并打开了一个浏览器窗口。大多数变化都是实时反映的，而不需要重新启动服务器。

### 构建

```
$ yarn build
```

这个命令生成静态内容到 `build` 目录，可以使用任何静态内容托管服务。
