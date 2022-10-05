---
sidebar_position: 14
---

# 向玩家发送标题 - Packets

:::caution
不建议直接使用 NMS。Spigot API 提供了一种[发送标题的方法](https://hub.spigotmc.org/javadocs/bukkit/org/bukkit/entity/Player.html#sendTitle(java.lang.String,java.lang.String,int,int,int))，旨在跨不同 Minecraft 版本工作。
:::

你可能想知道："我怎样才能向玩家发送标题，并使我的插件在所有支持标题的版本中工作？"，答案是：'使用 NMS。

创建一个名为 `Reflection` 的类，包含这两个方法:

```java
    public void sendPacket(Player player, Object packet) {
        try {
            Object handle = player.getClass().getMethod("getHandle").invoke(player);
            Object playerConnection = handle.getClass().getField("playerConnection").get(handle);
            playerConnection.getClass().getMethod("sendPacket", getNMSClass("Packet")).invoke(playerConnection, packet);
        } catch (Exception ex) {
        }
    }

    public  Class<?> getNMSClass(String name) {
        try {
            return Class.forName("net.minecraft.server"
                    + Bukkit.getServer().getClass().getPackage().getName().split("\\.")[3] + "." + name);
        } catch (ClassNotFoundException ex) {
        }
        return null;
    }
```

然后，创建一个名为 Title 的类，它继承了 `Reflection` 类并包含这个方法：

```java
    public void send(Player player, int fadeInTime, int showTime, int fadeOutTime, String title, String subtitle) {
        try {
            Object chatTitle = getNMSClass("IChatBaseComponent").getDeclaredClasses()[0].getMethod("a", String.class)
                    .invoke(null, "{\"text\": \"" + title + "\"}");
            Constructor<?> titleConstructor = getNMSClass("PacketPlayOutTitle").getConstructor(
                    getNMSClass("PacketPlayOutTitle").getDeclaredClasses()[0], getNMSClass("IChatBaseComponent"),
                    int.class, int.class, int.class);
            Object packet = titleConstructor.newInstance(
                    getNMSClass("PacketPlayOutTitle").getDeclaredClasses()[0].getField("TITLE").get(null), chatTitle,
                    fadeInTime, showTime, fadeOutTime);
 
            Object chatsTitle = getNMSClass("IChatBaseComponent").getDeclaredClasses()[0].getMethod("a", String.class)
                    .invoke(null, "{\"text\": \"" + subtitle + "\"}");
            Constructor<?> stitleConstructor = getNMSClass("PacketPlayOutTitle").getConstructor(
                    getNMSClass("PacketPlayOutTitle").getDeclaredClasses()[0], getNMSClass("IChatBaseComponent"),
                    int.class, int.class, int.class);
            Object spacket = stitleConstructor.newInstance(
                    getNMSClass("PacketPlayOutTitle").getDeclaredClasses()[0].getField("SUBTITLE").get(null), chatsTitle,
                    fadeInTime, showTime, fadeOutTime);

            sendPacket(player, packet);
            sendPacket(player, spacket);
        } catch (Exception ex) {
        }
    }
```

[跳转至官网原文](https://www.spigotmc.org/wiki/send-title-to-player-packets/)