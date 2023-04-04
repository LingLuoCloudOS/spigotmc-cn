---
sidebar_position: 7
---

# 着色粒子效果

有 3 种类型的粒子是可着色的，然而其工作原理尚不清楚。

`REDSTONE`、`SPELL_MOB` 和 `SPELL_MOB_AMBIENT` 粒子也可以通过在生成它们时提供一些特定的数据来使用自定义颜色。

你将需要使用 [`Player.spwnParticle`](https://hub.spigotmc.org/javadocs/spigot/org/bukkit/entity/Player.html#spawnParticle(org.bukkit.Particle,%20double,%20double,%20double,%20int,%20double,%20double,%20double,%20double)) 方法，该方法需要全部可用的粒子参数。具体来说，你将需要调整偏移量 X,Y,Z 参数来控制颜色，"extra" 用于亮度，"count" 用于切换着色。

在这个特定的情况下，这些参数的作用：

- `count`：必须设置为 0，这就启用了着色的粒子。请注意，这意味着你不能一次产生一个以上的彩色粒子（通过一个调用/数据包）。
- `extra`：这控制粒子颜色的亮度，一般来说，你只想把它设置为 1。
- `offsetX`：在这里传递一个从 0 到 1 的值来控制粒子颜色的红色部分。
- `offsetY`：在这里传递一个从 0 到 1 的值来控制粒子颜色的绿色部分。
- `offsetZ`：在这里传递一个从 0 到 1 的值来控制粒子颜色的蓝色分量。

所以要生成一个绿色的红石粒子，你可以这样调用：

```java
player.spawnParticle(Particle.REDSTONE, x, y, z, 0, 0.001, 1, 0, 1);
```

你可能已经注意到，红色分量没有被设置为零。这是为了解决一些特殊的客户端行为，如果红色分量为零，粒子就会一直呈现为红色（当然……）。

这只影响到 `REDSTONE` 粒子。如果你想完全没有红色，你可以使用 `Float.MIN_VALUE`，它将几乎没有红色。

[跳转至官网原文](https://www.spigotmc.org/wiki/colored-particles/)