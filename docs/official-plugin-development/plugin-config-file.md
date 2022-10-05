---
sidebar_position: 4
---

# 插件配置文件说明

`plugin.yml` 插件配置文件是一个包含你的插件信息的文件。没有这个文件，你的插件将无法工作。它由一组属性组成，每个属性都定义在一个新的行上，没有缩进。

所有的属性都是区分大小写的。

## 必要的属性

有三个属性是 `plugin.yml` 文件被认为是有效的。

### `main`

- 这个属性指向你的插件的类，它扩展了 JavaPlugin。
- 这必须包含完整的命名空间，包括类文件本身。


:::info 例如

```yaml
main: org.spigotmc.testplugin.Test
```

:::

### `name`

- 这个属性是你的插件的名称。
- *必须*由所有字母数字字符和下划线组成（a-z,A-Z,0-9,_）。
- 用于确定插件的数据文件夹的名称。
- 推荐的做法是将你的 jar 命名为与此相同（例如：MyPlugin.jar）。

:::info 例如

```yaml
name: MyPlugin
```    
:::

### `version`

- 你的插件的版本。
- 最常见的版本格式是[语义版本](https://semver.org/)，写成 MAJOR.MINOR.PATCH（例如：1.4.1或9.12.4）。

:::info 例如

```yaml
version: 1.4.1
```
:::

## 可选的属性

### `description`

- 对你的插件所提供的功能进行人性化的描述。
- 该描述可以有多行。

:::info 例如

```yaml
description: This plugin does so much stuff it can't be contained!
```
:::

### `api-version`

- 你想使用的 API 的版本。
- 1.13、1.14、1.15、1.16、1.17、1.18 和 1.19 是可用版本。
- 这将向服务器发出信号，表明你的插件在编码时已经考虑到了特定的服务器版本，它不应该应用任何形式的向后兼容措施。因此，你还需要确保你的代码编程时考虑到了对旧配置、数据等的读取。每个服务器版本可以决定如何实现兼容性，未知或未来的版本将阻止插件启用。从 1.14 版本开始，仍然允许使用 `api-version 1.13` 然而未来的版本可能会基于这个版本放弃向后支持。

:::info 例如

```yaml
api-version: 1.18
```
:::

### `load`

- 你想使用的API的版本。明确说明插件应该在什么时候被加载。如果不提供将默认为 `POSTWORLD`。
- 有两个可能的值。`STARTUP` 和 `POSTWORLD`。

:::info 例如

```yaml
load: POSTWORLD
```
:::

### `author`

- 唯一标识这个插件的开发者。
- 在一些服务器错误信息中使用，以提供有用的反馈信息，说明发生错误时应与谁联系。
- 建议使用 SpigotMC.org 论坛或电子邮件地址。

:::info 例如

```yaml
author: md_5
```
:::

### `authors`

- 如果是一个合作项目，允许你列出多个作者。
- 必须是有效的 [YAML 列表格式](https://zh.wikipedia.org/wiki/YAML#Lists)。

:::info 例如

```yaml
authors: [md_5, thinkofdeath]
```
:::

### `website`

- 该插件的或作者的网站。
- 如果你没有专门的网站，建议链接到该插件所在的页面。

:::info 例如

```yaml
website: www.spigotmc.org
```
:::

### `depend`

- 插件依赖列表。
- 必须是有效的 [YAML 列表格式](https://zh.wikipedia.org/wiki/YAML#Lists)。
- 使用所需插件的名称属性，以指定依赖关系。
- 如果这里列出的任何插件没有找到，你的插件将无法加载。
- 如果多个插件互相列出依赖关系，以至于没有插件没有可加载的依赖关系，那么所有的插件都会加载失败。

:::info 例如

```yaml
depend: [WorldEdit, Towny]
```
:::

### `prefix`

- 控制台日志所使用的名称，而不是插件的名称。

:::info 例如

```yaml
prefix: Testing
```
:::

### `softdepend`

- 一个插件的列表，这些插件是你的插件拥有完整功能所必需的。
- 必须是有效的 [YAML 列表格式](https://zh.wikipedia.org/wiki/YAML#Lists)。
- 使用所需插件的名称属性，以指定依赖性。
- 你的插件将在这里列出的任何插件之后加载。
- 循环软依赖会被任意加载。

:::info 例如

```yaml
softdepend: [Essentials, AnotherPlugin]
```
:::

### `loadbefore`

- 一个应该在此插件之后加载的插件列表。
- 必须是有效的 [YAML 列表格式](https://zh.wikipedia.org/wiki/YAML#Lists)。
- 处理方法是，如果列出的插件软依赖于这个插件。
- 使用所需插件的名称属性来指定目标。
- 你的插件将在这里列出的任何插件之前加载。
- 循环软依赖会被任意加载。

:::info 例如

```yaml
loadbefore: [OnePlugin, AnotherPlugin]
```
:::

### `libraries`

!!! warning
    Library loading 仍然是一个[预览功能](https://hub.spigotmc.org/javadocs/bukkit/org/bukkit/plugin/PluginDescriptionFile.html#getLibraries())。

- 您的插件需要的库列表，可以从 Maven Central 加载。
- 有助于减少插件的大小并消除重定位的需要。
- 拟用于大型非 Minecraft 的依赖性。专门的库仍然应该被遮蔽和重新定位。

:::info 例如

```yaml
libraries:
    - com.squareup.okhttp3:okhttp:4.9.0
```
:::

### `commands`

- 插件希望注册的命令的名称，以及一个可选的命令属性列表。
- 该命令名称不应包含发布命令所需的前缀 '/'。

:::info 例如

```yaml
commands:
    flagrate:
    [optional command attributes]
```
:::

### `permissions`

- 该插件希望注册的权限。每个节点代表一个要注册的权限。
- 每个权限可以有多个属性。
- 权限注册是可选的，也可以从代码中完成。
- 权限注册允许你设置描述、默认值和上下级关系。
- 权限名称应该保持在 `<pluginname>.[category].[category].<permission>` 的风格上。

:::info 例如

```yaml
permissions:
    inferno.*:
    [optional permission attributes]
    inferno.flagate:
    [optional permission attributes]
```
:::

## 命令

一个命令块以命令的名称开始，然后有一个可选的属性列表。

### `description`

- 对该命令所做工作的简短描述。
- 可以和 `/help` 一起使用

:::info 例如

```yaml
description: A simple description.
```
:::

### `aliases`

- 用户可以使用的替代命令名称。
- 你可以指定任何一个或多个别名。
- 如果你指定一个以上的别名，它们必须是有效的 [YAML 列表格式](https://zh.wikipedia.org/wiki/YAML#Lists)。

:::info 例如

```yaml
aliases: [foobar, fubar] # (1)!
```
:::

    1. 或者是 `aliases: foobar`

### `permission`

- 使用该命令所需的最基本的权限节点。
- 这个权限节点可以用来确定一个用户是否应该能够看到这个命令。

:::info 例如

```yaml
permission: test.foo
```
:::

### `permission-message`

- 如果用户没有使用该命令的必要权限，将向其显示无权限信息。
- 你可以使用空引号来表示不应显示任何内容。

:::info 例如

```yaml
permission-message: You do not have permission to use this command.
```
:::

### `usage`

- 关于如何使用该命令的简短描述。
- 当插件的命令处理程序（通常是 `onCommand`）没有返回 `true` 时，会显示给发出命令的人。
- `<command>` 是一个宏，在它出现的地方会被替换成发出的命令。
- 要使用字符串 "Usage:" (例如: usage: Usage: /test command)，用双引号包围用法标签后的文本。(例如：usage: "Usage: /test command")

:::info 例如

```yaml
usage: "Usage: /<command> [test|stop]"
```
:::

## 权限

一个权限块以权限的名称开始，后面是属性的节点。

### `description`

- 对该权限的简短描述。
- 允许程序性访问，并帮助服务器管理员。

:::info 例如

```yaml
description: Allows you to use the command /test
```
:::

### `default`

- 设置权限的默认值。
- 如果节点不存在, 权限默认为 `op`.
- 允许的默认值是：`true`, `false`, `op`, `not op`

:::info 例如

```yaml
default: true
```
:::

:::note "说明"

- true 默认将总是授予玩家该权限。
- false 默认不会授予玩家权限。
- op 如果玩家是管理员，默认为 true。
- not op 是与 op 相反的行为。
:::

### `children`

- 允许你为权限设置子节点。子节点是权限名称。
- 每个子节点必须设置为真或假。
- `true` 的子节点继承父权限。
- `false` 的子节点继承反向的父权限。
- 也可以包含其他权限节点。

:::info 例如
这些数值不是本文中使用的数值。它们只是为了说明。

```yaml
permissions:
test.all:
    children:
    test.foo: true
    test.bar: false
```
:::

## 示例

```yaml
main: org.spigotmc.annotationtest.Test
name: TestPlugin
version: '1.0'
description: A test plugin
load: POSTWORLD
author: md_5
website: spigotmc.org
prefix: Testing
depend:
- WorldEdit
- Towny
softdepend:
- FAWE
loadbefore:
- Essentials
commands:
  foo:
    description: Foo command
    aliases:
    - foobar
    - fubar
    permission: test.foo
    permission-message: You do not have permission!
    usage: /<command> [test|stop]
permissions:
  test.foo:
    description: Allows foo command
    default: op
  test.*:
    description: Wildcard permission
    default: op
    children:
      test.foo: true
```

## 注解

如果你不想处理为每个项目创建 `plugin.yml` 的麻烦，那么有一个方便的小工具专门为你准备的！它叫做插件注释。它叫做 Plugin Annotations。它是一个简单的注释处理器，可以为你自动生成一个正确的 `plugin.yml`。

要使用它，只需把它作为一个依赖项添加到你的项目中。

```xml
<dependency>
  <groupId>org.spigotmc</groupId>
  <artifactId>plugin-annotations</artifactId>
  <version>1.1.0-SNAPSHOT</version>
  <scope>provided</scope>
</dependency>
```

它使用 spigot-api repo 所在的同一个仓库。

```xml
<repositories>
  <repository>
    <id>spigot-repo</id>
    <url>https://hub.spigotmc.org/nexus/content/repositories/snapshots/</url>
  </repository>
</repositories>
```

:::note Maven -> Gradle
    
在 `pom.xml` 目录下执行：
```bash
gradle init --type pom
```
:::

关于这个工具的更多信息可以在其[维基](https://www.spigotmc.org/wiki/spigot-plugin-yml-annotations/)上找到。

[跳转至官网原文](https://www.spigotmc.org/wiki/plugin-yml/)