---
sidebar_position: 2
---

# 自动销售物品

首先，你要创建一个 YML 文件，或者直接使用默认配置，在那里设置每个项目和成本。例如:

```yaml
IRON_INGOT:
  cost: 10.0
GOLD_INGOT:
  cost: 15.0
DIAMOND:
  cost: 30.0
```

我也会在配置中加入启用的世界，但这取决于你。

然后，你所要做的就是用以下方法获得所有的第一层路径。`JavaPlugin#getConfig()#getKeys(false)` 这将返回一组字符串，这将是你的材料列表。然后在配置中循环，得到每个材料的价格，并把它放在一个 HashMap 中，像这样:

```java
Set<String> materials = JavaPlugin.getConfig.getKeys(false);
HashMap<String, double> prices = new HashMap<>();
 
for (String item : materials)
  {
  double cost = materials.get(item);
  prices.put(item, cost);
}
```

我推荐使用 `BlockBreakEvent`，因为你可以像这样获得块状的掉落：`event#getBlock()#getDrops(e#getItemInHand)` 这个方法考虑了金钱掉落，所以你也不必担心编码问题。

循环浏览你刚才制作的 `ItemStacks` 的集合，看看键的集合是否包含物品的材料。

然后，你所要做的就是获取和设置价格:

```java
for(ItemStack item : drops)
{
String name = item.getType().toString();
  if(prices.keySet().contains(name))
  {
  double cost = prices.get(name);
  //Do things
  }
}
```

然后使用：`event#setDropItems(false)`来防止掉落。

[跳转至官网原文](https://www.spigotmc.org/wiki/auto-selling-items/)