# cmmk
[Catan](https://www.catan.com/board-games) map maker.
*Générateur de cartes pour [Les colons de Catane](https://www.catan.com/board-games).*

`cmmk` generates random maps for the [Catan board game](https://www.catan.com/board-games),
preventing 2 adjacent tiles to produce the same resource.

*`cmmk` génère aléatoirement des cartes pour [le jeu de plateau 'les Colons de Catane'](https://www.catan.com/board-games),
en empêchant que 2 tuiles adjacentes produisent la même ressource.*

## Installation

```
sudo npm install -g
```

## Usage

```
$ cmmk --big --tileSize 5
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
