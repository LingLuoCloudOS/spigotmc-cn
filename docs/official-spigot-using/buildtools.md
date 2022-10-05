---
sidebar_position: 1
---

# 构建工具

## 这是什么

`BuildTools.jar` 是我们对构建 Bukkit、CraftBukkit、Spigot 和 Spigot-API 的解决方案。所有这些都是在你的电脑上完成的！一些先决条件的程序是必要的，但下面的说明将指导你完成你需要做的一切。

## 先决条件

要使用 BuildTools，有两个必要的程序。Git 和 Java。

### Windows

下面是让 BuildTools 在 Windows 上运行的手动步骤。

- Git - 为了让 BuildTools 在 Windows 上运行，你需要安装 Git。对于 Windows，它是通过 git-scm 发布的，可以在[这里](http://msysgit.github.io/)下载。在你喜欢的地方安装它，它将提供 git bash，用来运行 BuildTools jar。在运行安装程序时，只需一直点击下一步。

**最新版本的 BuildTools 会自动为你下载并安装 Git。只有在遇到问题时才会手动抓取！**

- Java - 低于 Minecraft 1.17: - 从[这里](http://www.oracle.com/technetwork/java/javase/downloads/jre8-downloads-2133155.html)下载 JRE 8 并安装。只要在运行安装程序时一直点击下一步就可以了。
- Java - Minecraft 1.17 [.1]: - 从[这里](https://adoptium.net/temurin/releases?version=16)下载 OpenJDK 16 并安装。在运行安装程序时继续点击下一步即可。
- Java - Above Minecraft 1.17.1: - 从[这里](https://adoptium.net/temurin/releases?version=17)下载 OpenJDK 17 并安装。在运行安装程序时继续点击下一步即可。

### Linux

git 和 Java，以及 util 命令，都可以通过你的软件包管理器用一个命令来安装。

- Debian/Ubuntu: `sudo apt-get install git openjdk-8-jre-headless`
- CentOS/RHEL：`sudo yum install git java-1.8.0-openjdk-devel`
- Arch: `sudo pacman -S jdk8-openjdk git`

Minecraft 1.17[.1]: 你需要至少安装 OpenJDK 16。你可以通过调整上面的命令（如果你的发行版支持的话）或者在[这里](https://www.azul.com/downloads/?package=jdk)下载一个第三方发行版来完成。
在 Minecraft 1.17.1 以上。你需要至少安装 OpenJDK 17。你可以通过调整上面的命令（如果你的发行版支持的话）或者在[这里](https://www.azul.com/downloads/?package=jdk)下载一个第三方发行版来完成这个任务。

### Mac

Git 可以从以下网站下载：[http://sourceforge.net/projects/git-osx-installer/files/](http://sourceforge.net/projects/git-osx-installer/files/)

Java 可能需要从苹果发布的版本中更新，即使以前更新过，也可能需要为外壳的使用进行链接。
请遵循这里的步骤：[https://gist.github.com/johan/10590467](https://gist.github.com/johan/10590467)

**Minecraft 1.17[.1]**: 从[这里](https://www.azul.com/downloads/?package=jdk)下载 OpenJDK 16 或更高版本并安装。
**在 Minecraft 1.17.1 以上**, 从[这里](https://www.azul.com/downloads/?package=jdk)下载 OpenJDK 17 或更高版本并安装。

## 运行构建工具

1. 从 [https://hub.spigotmc.org/jenkins/job/BuildTools/lastSuccessfulBuild/artifact/target/BuildTools.jar](https://hub.spigotmc.org/jenkins/job/BuildTools/lastSuccessfulBuild/artifact/target/BuildTools.jar) 下载 `BuildTools.jar`。
    1. 请继续关注 [https://hub.spigotmc.org/jenkins/job/BuildTools](https://hub.spigotmc.org/jenkins/job/BuildTools)，以了解任何错误修复和更新。
    2. 如果你想从命令行下载，可以使用第一步中描述的链接，使用 `curl -o BuildTools.jar <url>` 或 `wget -O BuildTools.jar <url>`。
    3. 目录路径中的空格或感叹号可能会破坏 BuildTools! 建议删除这些。

2. 如果你在 Linux 上，打开你的终端，或者在 Windows 上打开 git bash。
    1. Git bash 可以在桌面上或开始菜单中以 "git bash" 的名字找到。也可以通过右键点击任何东西来打开它，因为它现在是你上下文菜单中的一个项目。

3. 导航到你下载 `BuildTools.jar` 的地方，或者使用命令行方式将 jar 下载到你的当前目录。
    1. 在 Windows 上，你可以使用 cd 命令来改变目录，或者你可以在 BuildTools.jar 所在的文件夹的空白处点击右键（不要点击 BuildTools.jar 本身），然后点击 "git bash"，这将在你的当前目录中打开它。

4. 从终端运行 `BuildTools.jar`（不要双击 `BuildTools.jar`），具体操作如下:
    1. 若在 Linux 上，运行 `git config --global --unset core.autocrlf`，然后在 bash 或其他适当的 shell 中运行 `java -jar BuildTools.jar`。
    2. 若在 Windows 上，在打开的 git bash 窗口中运行以下命令：
        ```
        java -jar BuildTools.jar
        ```
        
        :::caution
        你必须拥有 BuildTools #35 或更高版本，旧版本将无法工作。
		:::

    3. 若在 Mac 上，运行下面的命令：
        ```bash
        export MAVEN_OPTS="-Xmx2G"
        java -Xmx2G -jar BuildTools.jar
        ```

5. *可选*（适用于所有操作系统）。
    1. `--rev ` 选项可以用来获取 CraftBukkit/Spigot 的特定 1.8/1.9 版本(**同步于官方发布的 Minecraft 版本**)。
    2. 参见下面的版本，了解可用的选项
   
6. *可选* 在 Windows 上使用此代码创建一个批处理（.bat）文件，以实现安装过程的自动化：
    ```powershell
    @echo off
    title SpigotMC BuildTools Builder
    IF NOT EXIST BuildTools (
        mkdir BuildTools
    )
    cd BuildTools
    curl -z BuildTools.jar -o BuildTools.jar https://hub.spigotmc.org/jenkins/job/BuildTools/lastSuccessfulBuild/artifact/target/BuildTools.jar
    set /p Input=Enter the version: || set Input=latest
    set /p Java=Java 8 or Java 16 (for 1.17.1 only) or Java 17? || set Java=17
    if %Java%==8 "C:\Program Files\Java\jre1.8.0_333\bin\java" -jar BuildTools.jar --rev %Input%
    if %Java%==16 "C:\Program Files\Eclipse Foundation\jdk-16.0.2.7-hotspot\bin\java" -jar BuildTools.jar --rev 1.17.1
    if %Java%==17 "C:\Program Files\Eclipse Adoptium\jdk-17.0.2.8-hotspot\bin\java" -jar BuildTools.jar --rev %Input%
    cls
    if NOT %Java%==8 if NOT %Java%==17 if NOT %Java%==16 echo "Please rerun the .bat file and input 8 or 17 or 16 in java version"
    echo "Done!"
    pause
    ```

    这个批处理脚本将创建一个目录，如果 `BuildTools.jar` 不存在或有更新的版本，将在该目录中下载。之后，你会被问到你想编译哪个 Spigot 版本，如果你没有定义你想要的版本就按下回车键，它将编译最新的版本。然后它将运行 `java -jar BuildTools.jar`，参数为 `--rev <version>`。在很短的时间内（取决于你的网络连接速度和计算机硬件规格），编译后的 `spigot-< 版本 >.jar` 将在 `BuildTools`目录中被发现。
    
    - 等待它构建你的 jar。几分钟后，你就应该有新鲜的编译过的 jar 了！
    - 你可以在你运行 BuildTools.jar 的同一目录下找到 CraftBukkit（直到但不包括 1.14 版）和 Spigot（ `craftbukkit-1.14.jar` 和 `spigot-1.14.jar`）。你可以在 `\Spigot\Spigot-API\target\(（)spigot-api-1.14-R0.1-SNAPSHOT.jar)`找到 Spigot-API。要编译 1.14 及以后的 CraftBukkit，你必须在命令中加入 `--compile craftbukkit` 参数。
    - 享受你的新服务器吧
    - 需要帮助来开始运行服务器吗？请看这里: [开始使用](spigot-installation.md)

## 议题和普遍出现的问题

:::info `BuildData/bin` 中缺少 `jacobe.exe` 或 `jacobe` 的错误
更新 BuildTools.jar
:::

:::info Buildtools 出现错误 `java.io.FileNotFoundException: BuildData/mappings/bukkit-1.8-cl.csrg` 
更新到最新的 BuildTools 以解决这个问题
:::

:::info 线程 "main" 中出现异常 `org.eclipse.jgit.api.errors.TransportException`
BuildTools 在建立与 git 仓库的安全连接时遇到困难，这很可能是由于你的杀毒软件（特别是 Malwarebytes）阻止了连接。请在你的 AV 程序中把 https://hub.spigotmc.org 列入白名单。
:::

:::info "Spigot 的 applyPatches.sh 说 `/bin/bash^M: bad interpreter`"
*待补充*
:::
   
:::info Spigot 的 applyPatches.sh 说 `line 2: $'\r': command not found`
- 当你启用了 git 的 autocrlf 时，这种情况会在 Linux 上发生（偶尔也会在 Windows 上发生）。要解决这个问题，可以运行 `git config --global --unset core.autocrlf`，然后重新拉动/重新运行 BuildTools。
- 在 Windows 上，当使用内置的命令提示符（cmd.exe）时可能会出现这种情况。要解决这个问题，请改用不同的终端，如 Git Bash。
:::

:::info Spigot 的 applyPatches.sh 说 `fatal: sha1 information is lacking or useless`
*待补充*
:::

:::info Spigot 的 applyPatches.sh 说 `Patch failed at ...`
- 如果 git 的 autocrlf 设置为 false（或未设置），这种情况会在 Windows 上发生。要解决这个问题，请运行 `git config --global --replace-all core.autocrlf true` 并重新拉动/运行 BuildTools。
- 如果在 linux 上，运行 `git config --global --unset core.autocrlf` 并重新拉取/重新运行 BuildTools。
:::

:::info java.lang.RuntimeException: Error running command, return status !=0
如果你是在 Linux 上，请设置环境变量。SHELL 为 /usr/bin/bash，在运行 BuildTools 前执行此命令：`export set SHELL="/usr/bin/bash"`。当你没有使用 bash 作为默认的 shell 时，就会发生这种情况。
:::

:::info Failed to create log file: BuildTools.log.txt
*待补充*
:::

:::info Exception in thread "main" org.eclipse.jgit.api.errors.JGitInternalException: Creating directories...
确保你对运行 BuildTools 的目录有写入权限。
:::

:::info [ERROR] ... The import gnu.trove.... cannot be resolved
- 已知 VIPRE 杀毒软件会导致这个问题。其他杀毒软件也有可能导致相同或类似的问题。禁用杀毒软件并再次运行 BuildTools。
- 如果禁用杀毒软件后问题仍然存在，您可能需要通过删除 Windows 用户文件夹中的`.m2` 文件夹（Win+R 并打开 `%userprofile%`）来清除本地 Maven 资源库，然后执行 BuildTools 的清洁运行（在再次运行前删除其先前创建的所有文件和文件夹）。
:::

:::info (针对 Windows 10 用户）... The import gnu.trove.... cannot be resolved
- 在 Windows 10 上的 64 位版本的 Git 有一个已知的问题，导致这个错误。解除 64 位版本的 Git，然后下载并安装 32 位版本，重新运行 BuildTools。
:::

:::info [ERROR] Exception in thread "main" org.eclipse.jgit.api.errors.JGitInternalException: Invalid ref origin/master specified
这似乎是随机发生的。删除 `BuildTools.jar` 创建的所有文件并重新开始。
:::

:::info (对于 Mac OS X 10.11 El Capitan 用户）xcrun: error: invalid active developer path (/Library/Developer/CommandLineTools), missing xcrun at: /Library/Developer/CommandLineTools/usr/bin/xcrun
如果你从以前的 OS X 版本升级，El Capitan 会破坏 Xcode 的安装。要解决这个问题，请运行 `xcode-select --install` 并重新拉取/重新运行 BuildTools。
:::

:::info Git bash for Windows 不让我选择文本
- 右击 git bash 的左上角 >  properties > enable QuickEdit mode > OK
- 左键拖动选择，右键点击一次复制。
- 你也可以右键点击一次来粘贴。
:::
  
:::info 我可以在 CI 服务器上构建这个吗？
是的，能够运行简单 bash 命令的 CI 服务器可以构建这些 Jar。运行下面的命令:
```bash
wget https://hub.spigotmc.org/jenkins/job/BuildTools/lastSuccessfulBuild/artifact/target/BuildTools.jar -O BuildTools.jar && java -jar BuildTools.jar
```
请记住，这些构建只能用于私人用途，不应公开发布或访问。
:::

:::info java.security.InvalidAlgorithmParameterException: the trustAnchors parameter must be non-empty
- 你的服务器上缺少 Java 证书，或者防火墙/杀毒软件阻止了你的连接。
- 安装 ca-certificates-java 或用 `--disable-certificate-check` 参数运行。
:::

:::info error: Your local changes to the following files would be overwritten by merge
- 你可能是在一个被某些外部软件同步的文件夹中运行 BuildTools，试试一个没有同步的文件夹。
- 有人发现，Windows 10 会自动在桌面文件夹上做一些同步工作，尽量避免使用这个文件夹，而使用一个单独的文件夹。
:::
  
:::info org.eclipse.jgit.errors.RepositoryNotFoundException: repository not found
BuildTools 在之前运行时被中止了。删除该文件夹中的其他文件并再次运行 Buildtools。
:::

## 故障排除和支持

如果你在运行 BuildTools 时仍然有问题，你可以在 [IRC](http://www.spigotmc.org/pages/irc/) 上询问，或者查看 [Ticket](https://hub.spigotmc.org/jira/browse/BUILDTOOLS/?selectedTab=com.atlassian.jira.jira-projects-plugin:summary-panel)，看看你的问题是否已经存在。

要在 Debian Stretch 上运行 BuildTools，你可能需要使用以下代码:

```bash
$ git config --global --unset core.autocrlf
$ export _JAVA_OPTIONS="-Djavax.net.ssl.trustStorePassword=changeit"
$ java -jar BuildTools.jar
```

:::caution
请注意，建议将编译后的 jar 移到 BuildTools 文件夹之外（例如移到你的服务器文件夹）来运行你的服务器。不这样做可能会在将来弄乱 buildtools 文件夹。
:::

## 命令行标志

BuildTools 中有几个命令行标志。你不需要在默认情况下使用它们中的任何一个。所有这些都在下面列出：

`--help ` 显示控制台帮助。BuildTools 将在之后退出。

`--disable-certificate-check ` 禁用 HTTPS 证书检查。

`--disable-java-check ` BuildTools 不会检查 Java版本。

`--dont-update ` BuildTools 不会从 Gi t中获取更新。

`--skip-compile ` 跳过编译。

`--generate-source ` 生成源代码 jar。注意：只为 Bukkit 生成源码。

`--generate-docs ` 生成 JavaDoc jar。注意: JavaDoc 只为 Bukkit 生成。

`--dev ` 禁用 BuildTools 版本检查、Java 版本检查和 MC 版本查询。只构建实际的构建环境。

`--output-dir ` 最终的jar输出目录。需要一个现有目录的文件路径参数。默认为 `BuildTools.jar` 所在的目录。

`--rev ` 要构建的版本。需要一个版本参数。默认为最新的可用版本。

`--compile craftbukkit ` 构建 CraftBukkit。由于 BuildTools 默认情况下不会构建 CraftBukkit，这使得 BuildTools 构建 CraftBukkit。

`--compile-if-changed ` 只在 BuildTools 软件库中检测到变化时才编译。这对于需要在构建服务器上依赖 NMS 的项目很有用。

`--remapped ` 在本地 Maven 仓库中安装额外的 Spigot jars，分类器为 remapped-obf 和 remapped-mojang。

[跳转至官网原文](https://www.spigotmc.org/wiki/buildtools/)