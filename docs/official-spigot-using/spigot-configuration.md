---
sidebar_position: 3
---

# Spigot 配置

`spigot.yml` 文件的作用是为 Spigot 的许多不同功能提供更大的定制和配置。该文件与 bukkit.yml 文件一起使用，因此在你的服务器根目录下看到这两个文件是正常的。有几个不同的选项可以以最适合你的服务器的方式来定制 Spigot，每个设置都在下面有记录。

## 命令

| Name | 默认值 | 类型 | 描述 |
|------|-------|------|------|
|`tab-complete` __*Above#1368*__ |0|Integer|你现在可以指定必须输入多少个字母的命令才会被制表键 ++tab++ 完成，这将有助于阻止人们在所有的命令中乱打一气，看看是否存在错误的设置。|
|`tab-complete` __*Below#1368*__ |0|Integer|控制是否允许玩家按下 TAB 键 ++tab++ 来自动完成命令。如果启用，这可能会带来一定的安全风险，因为玩家在输入/然后按TAB键时可以查看所有注册的命令。|
|`send-namespaced`|true|Boolean|当你按 tab键 ++tab++ 时，显示带有 <插件>:<命令> 语法的命令。例如 `/minecraft:tp`|
|`silent-commandblock-console`|flase|Boolean|控制是否将命令块输出发送到控制台。|
|`log`|true|Boolean|控制是否将玩家的命令打印到控制台/日志中，这些命令将被保存在你的日志文件夹中。|
|`spam-exclusions`|[/skill]|List|从服务器的垃圾邮件过滤器中排除的命令列表。执行这里列出的命令的玩家不会因为垃圾邮件而被断开连接。|
|`replace-commands`|[setblock, summon, testforblock]|List|禁用 Bukkit 对所列命令的实现，并启用这些命令的原始、虚构行为。|

## 消息

| Name | 默认值 | 类型 | 描述 |
|------|-------|------|------|
|`whitelist`|"You are not whitelisted on this server!"|String| 当白名单模式被启用时，这是所有未被列入白名单的用户在连接时显示的信息。你可以通过`/whitelist add {username}`把人添加到你的白名单中。|
|`unknown-command`|"Unknown command. Type "/help" for help."|String|这是在玩家输入未注册/不存在的命令时，将在聊天中显示的信息。|
|`server-full`|"The server is full!"|String|当服务器 "满员 "时（玩家人数与你的最大席位相匹配），这就是将显示给被踢/拒绝加入的玩家的信息，直到有更多的席位开放。|
|`outdated-client`| "Outdated client! Please use {}"|String|将显示给加入Minecraft的玩家的信息，其版本比你的服务器要早。{}将被替换成服务器的当前版本。|
|`outdated-server`| "Outdated server! I'm still on {0}"|String|这是将显示给加入Minecraft的玩家的信息，其版本比你的服务器要新。{0}将被替换成服务器的当前版本。|
|`restart`| "Server is restarting"|String|这是通过`/restart`命令触发服务器重启后将显示给所有在线玩家的信息。|

## 状态

| Name | 默认值 | 类型 | 描述 |
|------|-------|------|------|
|`disable-saving`|false|Boolean|如果启用，那么服务器将不保存玩家的统计数据或成就。建议强制 *'accommentation.openInventory'*（通过设置为1），以防止成就冻结在玩家的屏幕上。|
|`disabled`|[ ]|List| 一个禁用的成就列表。在这个列表中的成就在游戏中是无法实现的，也不会显示在成就GUI中，可以通过 'advancement' 按钮（当按下escape时）或按下绑定的键来打开这个菜单（默认为L）。如果所有属于该成就的子成就没有被禁用，禁用一个成就将导致控制台中出现错误。要禁用所有的成就，请将以下列表粘贴到这个选项中。|

<details><summary>Spoiler: 所有成就的清单</summary>

```
- minecraft:story/root
- minecraft:nether/root
- minecraft:end/root
- minecraft:adventure/root
- minecraft:husbandry/root
- minecraft:story/shiny_gear
- minecraft:end/elytra
- minecraft:adventure/summon_iron_golem
- minecraft:husbandry/break_diamond_hoe
- minecraft:story/obtain_armor
- minecraft:nether/return_to_sender
- minecraft:adventure/sleep_in_bed
- minecraft:story/lava_bucket
- minecraft:end/dragon_breath
- minecraft:end/kill_dragon
- minecraft:adventure/kill_all_mobs
- minecraft:story/enchant_item
- minecraft:nether/all_potions
- minecraft:story/follow_ender_eye
- minecraft:husbandry/tame_an_animal
- minecraft:nether/create_beacon
- minecraft:story/deflect_arrow
- minecraft:story/iron_tools
- minecraft:adventure/totem_of_undying
- minecraft:adventure/kill_a_mob
- minecraft:adventure/adventuring_time
- minecraft:nether/brew_potion
- minecraft:husbandry/plant_seed
- minecraft:end/dragon_egg
- minecraft:adventure/sniper_duel
- minecraft:end/levitate
- minecraft:nether/create_full_beacon
- minecraft:nether/summon_wither
- minecraft:husbandry/balanced_diet
- minecraft:nether/all_effects
- minecraft:nether/fast_travel
- minecraft:nether/get_wither_skull
- minecraft:husbandry/bred_all_animals
- minecraft:story/mine_stone
- minecraft:story/enter_the_nether
- minecraft:adventure/trade
- minecraft:nether/uneasy_alliance
- minecraft:story/mine_diamond
- minecraft:story/upgrade_tools
- minecraft:nether/find_fortress
- minecraft:story/cure_zombie_villager
- minecraft:story/form_obsidian
- minecraft:end/find_end_city
- minecraft:end/enter_end_gateway
- minecraft:nether/obtain_blaze_rod
- minecraft:adventure/shoot_arrow
- minecraft:story/enter_the_end
- minecraft:husbandry/breed_an_animal
- minecraft:end/respawn_dragon
- minecraft:story/smelt_iron
- minecraft:nether/obtain_crying_obsidian
- minecraft:nether/distract_piglin
- minecraft:adventure/very_very_frightening
- minecraft:husbandry/fishy_business
- minecraft:nether/explore_nether
- minecraft:nether/ride_strider
- minecraft:adventure/bullseye
- minecraft:adventure/two_birds_one_arrow
- minecraft:adventure/whos_the_pillager_now
- minecraft:husbandry/tactical_fishing
- minecraft:nether/loot_bastion
- minecraft:husbandry/silk_touch_nest
- minecraft:adventure/arbalistic
- minecraft:nether/charge_respawn_anchor
- minecraft:adventure/voluntary_exile
- minecraft:husbandry/obtain_netherite_hoe
- minecraft:nether/find_bastion
- minecraft:adventure/hero_of_the_village
- minecraft:nether/obtain_ancient_debris
- minecraft:nether/use_lodestone
- minecraft:husbandry/safely_harvest_honey
- minecraft:adventure/throw_trident
- minecraft:adventure/honey_block_slide
- minecraft:adventure/ol_betsy
- minecraft:nether/netherite_armor
- minecraft:husbandry/complete_catalogue
```

</details>

## 主要的、未分组的设置

| Name | 默认值 | 类型 | 描述 |
|------|-------|------|------|
|`debug`|false|Boolean|可以切换低于Level.INFO的日志级别（如CONFIG、FINER）是否被记录到控制台/文件，**需要确认!** 默认情况下，只有INFO、WARNING、SEVERE被记录下来。|
|`netty-threads`|4|Integer|控制Netty用于执行联网的线程数量。|
|`bungeecord`|false|Boolean|切换各种BungeeCord专用的功能。这包括IP白名单（这不应该被视为一个完整的解决方案，而是一个额外的安全层，你仍然需要设置IPTables！）和直通IP（这样服务器将能够看到玩家的真实IP）。|
|`timeout-time`|60|Integer|在控制台中执行线程转储之前，服务器应在多长时间内（以秒为单位）没有反应，如果配置了，则尝试关闭和重新启动。|
|`restart-on-crash`|true|Boolean|控制服务器在发生崩溃时是否会自动**尝试**重新启动你的服务器。|
|`restart-script`|`./start.sh`|String(文件路径)|你的服务器的启动脚本的位置。这个路径将被用于`/restart`命令和崩溃时重启选项。对于Windows，将`.sh`改为`.bat`扩展名。|
|`late-bind`|false|Boolean|这将推迟玩家进入服务器的时间，直到所有的插件都加载完毕。请注意，建议在付诸实施之前先进行测试，因为有些插件可能会出现问题。|
|`sample-count`|12|Integer|控制悬停在客户端服务器列表中的玩家数量上时显示的（随机选择的）样本玩家数量。|
|`player-shuffle`|0|Integer|这可以防止玩家 "博弈 "服务器，并战略性地重新登录以增加他们在勾选顺序中的位置。基本上，玩家的数据包是根据他们加入的时间来处理的，重新登录会改变你在队列中的位置，这意味着你的行动会比别人早。启用这个功能可以防止重新登录者获得优势。对PVP服务器很有用。这个值是以ticks为单位的，所以20 = 每秒洗牌。设置这个选项低于100可能会导致性能问题（不过0也行）。 |
|`filter-creative-items`|true|Boolean|控制创造型玩家不能产生的物品的虚构黑名单。|
|`user-cache-size`|1000|Integer| 控制存储在`usercache.json`中的玩家的最大数量。|
|`save-user-cache-on-stop-only`|false|Boolean| 切换是否不断将新的用户缓存数据保存到磁盘，或仅在服务器停止时才保存。|
|`moved-wrongly-threshold`|0.0625|Decimal|控制 "错误移动 "检查的阈值。增加这个数字可以减少服务器上的弹性绑定的数量，但也有可能被玩家滥用。|
|`moved-too-quickly-multiplier`|10|Decimal|控制 "移动过快 "检查的倍数。这实际上是服务器将允许玩家移动的最大速度。这在某些情况下会造成问题，例如，大型TNT炮。|
|`log-villager-deaths`|true|Boolean|切换是否记录村民的死亡信息。|
|`item-dirty-ticks`|20|Integer| 控制物品清洁检查的时间间隔。Minecraft每隔一段时间就会检查一个项目，看它是否被改变。这可能很昂贵，因为它还需要检查所有的NBT数据。Spigot只检查基本的计数/数据/类型数据，默认情况下每20个ticks做一次深度检查。|

## 每个世界的设置

:::
要在每个世界中应用这些，请在 `world-settings` 下添加一个新的部分，并注明世界目录的文件夹名称。
:::

| Name | 默认值 | 类型 | 描述 |
|------|-------|------|------|
|`below-zero-generation-in-existing-chunks`|true|Boolean|当把世界升级到1.18以上时，是否生成低于y=0的新块。可以在全局或每个世界中禁用/启用。|
|`verbose`|true|Boolean|是否在服务器启动时在控制台/日志中显示每个世界的详细报告和配置。可以在全局或每个世界中禁用/启用。|
|`simulation-distance`|10|Integer| 控制实体、区块和流体在每个玩家周围被更新的块数。这个值不能低于**5**。|
|`view-distance`|10|Integer|控制在每个玩家周围加载的块的数量。如果你有大量的玩家在线，降低这个值可以降低服务器的负载。|
|`merge-radius: exp`|3.0|Integer|控制经验球在地面上 "组合 "的范围（以块为单位）。|
|`merge-radius: item`|2.5|Integer|控制范围--以块为单位--物品在地面上时将 "组合 "在一起。|
|`chunks-per-tick`|650|Integer|控制每个tick将被更新的增长块的数量。降低这个数值可能会使增长速度变慢，同时节省资源，反之亦然。适用于在Spigot 1.9之前|
|`item-despawn-rate`|6000|Integer|控制地面上的物品实体解体前所需的刻度数。降低这个数值会使物品更快消亡（可能会节省资源，因为需要tick的实体更少），而增加这个数值会使它们消亡的时间更长，并消耗更多的资源（因为物品实体必须被勾选更长时间，直到它们消亡）。|
|`mob-spawn-range`|6|Integer|在玩家周围生成怪物的半径。增加它将使怪物看起来更加稀少和分散，尽管降低它可能会阻止某些生成，因为没有足够的位置允许它们生成在那里。更多信息请参见[《Minecraft》的怪物生成机制](https://minecraft.gamepedia.com/File:Mob_spawning_ranges.png)。|
|`growth: x-modifier`|100|Integer|控制每个作物/资源的生长速度，如上所述。当处于默认值（100）时，它们将以 "普通 "的速度生长，但由于其他设置（每分钟的块数），可能会显得更慢。|
|`entity-activation-range`|(animals: 32 monsters: 32 misc: 16)|Integer|控制实体被 "激活 "的区块范围--在此范围之外的实体将以较低的速度跳动，以防止服务器滞后。当改变时，这些数字会对游戏产生不利影响，所以编辑时要小心谨慎。|
|`tick-inactive-villagers`|true|Boolean|切换村民是否应该被 "激活"，即使他们在激活范围之外。|
|`entity-tracking-range`|(players: 48 animals: 48 monsters: 48 misc: 32 other: 64)|Integer|控制实体成为 "可见 "或被称为 "跟踪 "的客户端的块的范围。在这个范围之外的实体将是不可见的，因为它们没有被渲染以保持CPU的利用和带宽。这对PVP服务器特别有用，因为降低玩家范围会在一定程度上 "削弱 "壁垒和雷达。|
|`save-structure-info`|true|Boolean|切换Spigot是否使用1.6.3中新引入的保存方法来保存结构信息。如果禁用，这可能会导致1.7版本中末影之眼不指向据点、枯萎的骷髅不在尼瑟堡垒中生成、女巫不在小屋中生成等问题。|
|`random-light-updates`|false|Boolean|控制服务器是否会随机取样，以验证和修复照明。从1.7版本开始，还可以控制服务器是否会在第一次tick时重新点亮一个小块。|
|`nerf-spawner-mobs`|false|Boolean|启用后，来自刷怪笼的怪物将不具备AI。它们通常只受水的影响，但 "烈焰 "除外，它仍然会发出火球并上下浮动。|
|`zombie-aggressive-towards-villager`|true|Boolean|当禁用时，僵尸将不再试图杀死村民，改变游戏规则。但作为回报，僵尸使用更少的时间来处理AI，因此造成更少的滞后。|
|`enable-zombie-pigmen-portal-spawns`|true|Boolean|当禁用时，下界传送门将不再随机在其中产生僵尸猪人。这可以用来打击利用大型下界传送门刷金子的行为，并且不影响实体的移动，包括僵尸猪人，通过下界传送门在维度之间移动。|
|`max-entity-collisions`|8|Integer|限制单个实体在每个tick中碰撞x次的可配置次数。这个设置降低了被困在1x1 pen中的实体的性能影响。|
|`dragon-death-sound-radius`|0|Integer|限制末影龙的死亡声音大小。|
|`wither-spawn-sound-radius`|0|Integer|限制凋灵的死亡声音大小。|
|`max-bulk-chunks`|10|Integer|设置每个数据包发送多少个分块。适用于Spigot 1.9之前的版本|
|`max-tick-time`|(tile: 50 entity: 50)|Integer|在服务器跳转到下一个任务之前，（岩瓦）实体操作可以消耗的计算时间--以ms为单位。据报道，岩瓦的数值在10-20之间，实体的数值在20-25之间，可以提供良好的性能提升。|
|`clear-tick-list`|false|Boolean|可以潜在地防止tick列表随着时间的推移而增加的可能性，但会引入一些问题，即增长速度减慢和对你们中许多人已经微调的数值的修改。这个选项只适用于那些绝对需要它并且完全理解其后果的人。对于大多数服务器所有者来说，不建议使用这个选项，应该保留默认值。|
|`hopper-alt-ticking`|false|Boolean| 动态tick漏斗，以反映Vanilla，并提供潜在的每秒tick次数的提升。如果有很多空闲的漏斗，最好设置为true。启用该选项可以禁用漏斗检查。|
|`hopper-amount`|1| Integer|控制漏斗在一个漏斗刻度周期内吸入/送出物品的最大数量。最好与每个漏斗传送和检查的较高刻度结合起来使用，以便将行动合二为一。|
|`seed-village`|10387312| Integer|控制用于在你的世界中放置村庄的种子，允许进一步定制其产卵。默认值代表 Vanilla。|
|`seed-feature`|14357617| Integer|控制用于在你的世界中放置下届要塞等特征的种子，允许进一步定制生成。默认值代表 Vanilla。|
|`seed-monument`|10387313|Integer|控制用于在你的世界中生成海底神殿的种子，允许进一步定制其生成。默认值代表 Vanilla。|
|`seed-slime`|987234911|Integer|控制用于怪物生成地点的种子，大概是你的世界中的史莱姆，允许进一步定制它们的生成。默认值代表 Vanilla。|
|`hunger`|*见表格下方备注*|Double|控制执行相应行动时要减去的饥饿值。|
|`hanging-tick-frequency`|100|Integer| 控制悬挂实体（绘画、物品框架、拴绳等）的tick更新时间间隔。|
|`ticks-per: hopper-transfer`|8|Integer|漏斗推送/拉动/接收物品和漏斗推送/拉动更多物品之间的时间--以服务器刻度表示。8的值反映了Vanilla的行为。|
|`ticks-per: hopper-check`|1|Integer|自上次尝试以来，漏斗尝试推/拉物品的时间--以服务器刻度为单位。例如，一个8的值意味着一个空的漏斗每隔8分钟就会寻找上面的物品实体、上面的库存，等等。值为0或1则反映了Vanilla的行为。当`hopper-alt-ticking`被设置为 `true`时，这个选项被禁用。改变这个值会因为不同步而破坏大多数漏斗装置。|


:::info

- `tick`: 游戏循环的一个周期被称之为一刻（tick）, 正常情况下，游戏固定以每秒钟20刻的速率运行，因此一刻的时间为0.05秒（50毫秒，或一秒钟的二十分之一。
- `Vanilla`: 纯净版, 指代 Mojang 官方服务器，未经修改。
- `view-distance`: 从1.14.4开始，对于新的安装和从旧版本升级，*global*选项默认设置为 *default*。当设置为*default*时，服务器会读取`server.properties`中设置的视距。这个设置现在可以用于每个世界的视图距离。
- `growth: x-modifier`: 其中x指代 ` cactus, melon, pumpkin, sapling, cane, mushroom, wheat`。改变这些值并不能提高性能。只有当你想改变作物生长的游戏行为时，你才应该把这些值从100改为100，而不要为了性能而改变。
- `entity-activation-range`: 降低这些数值可以大大提升性能，但代价是影响游戏行为。降低这些数值可能会影响到物品和怪物农场，但对正常行为的影响应该不大。
- `tick-inactive-villagers`: 禁用这个功能意味着村民将不能像在Vanilla中那样工作，玩家必须在村子附近停留一段时间，以便村民的交易能够得到补充。
- `entity-tracking-range`: 杂项控制物品框架、绘画、掉落物品、经验球和标志文本的范围。其他是你服务器上所有实体的一般最大限制。改变这些值不会对服务器的性能产生很大影响。当降低这些值时，主要是缓解客户端的滞后。
- `max-tick-time`: 降低这些值可以大大提升性能，但代价是影响游戏行为。降低实体的这些值可能会导致它们出现滞后/卡顿，但对正常行为应该没有其他影响。
- `seed-village`, `seed-feature`, `seed-monument`, `seed-slime`: 如果保持Vanilla的数值，就有可能被人用蛮力发现你的世界的种子。如果你想不惜一切代价保守种子的秘密，建议在生成你的世界之前将这些值改为任何其他的随机数。
- `ticks-per: hopper-check`: 在2015年3月8日的1.8.3提交中删除，在2017年2月10日的1.11.2提交中重新加入
- `hunger`：默认值： jump-walk-exhaustion: 0.05 jump-sprint-exhaustion: 0.2 combat-exhaustion: 0.1 regen-exhaustion: 6.0 swim-multiplier: 0.01 sprint-multiplier: 0.1 other-multiplier: 0.0

:::


[跳转至官网原文](http://www.spigotmc.org/wiki/spigot-configuration)
    