# cmmk
[Catan](https://www.catan.com/board-games) map maker.

`cmmk` generates random maps for the [Catan board game](https://www.catan.com/board-games) (with 5-6 players extension),
preventing 2 adjacent tiles to produce the same resource.

## Installation

```
sudo npm install -g
```

## Usage

```
$ cmmk
                       +----+
                      /      \
                +----+ Grain  +----+
               /      \      /      \
         +----+ Lumber +----+ Lumber +----+
        /      \      /      \      /      \
  +----+  Wool  +----+  Ore   +----+  Ore   +----+
 /      \      /      \      /      \      /      \
+ Brick  +----+ Brick  +----+ Brick  +----+ Grain  +
 \      /      \      /      \      /      \      /
  +----+ Grain  +----+  Wool  +----+  Wool  +----+
 /      \      /      \      /      \      /      \
+  Ore   +----+ Lumber +----+ Lumber +----+ Lumber +
 \      /      \      /      \      /      \      /
  +----+ Desert +----+ Grain  +----+ Brick  +----+
 /      \      /      \      /      \      /      \
+  Wool  +----+  Wool  +----+  Ore   +----+ Desert +
 \      /      \      /      \      /      \      /
  +----+ Grain  +----+ Brick  +----+  Wool  +----+
        \      /      \      /      \      /
         +----+  Ore   +----+ Lumber +----+
               \      /      \      /
                +----+ Grain  +----+
                      \      /
                       +----+
```
