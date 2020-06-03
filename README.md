# cmmk
[Catan](https://www.catan.com/board-games) map maker.
*Générateur de cartes pour [Les colons de Catane](https://www.catan.com/board-games).*

`cmmk` generates random maps for the [Catan board game](https://www.catan.com/board-games),
preventing 2 adjacent tiles to produce the same resource,
and trying to balance the ressource production probabilities.

*`cmmk` génère aléatoirement des cartes pour [le jeu de plateau 'les Colons de Catane'](https://www.catan.com/board-games),
en empêchant que 2 tuiles adjacentes produisent la même ressource,
et en essayant d'équilibrer les probabilités de production de chaque ressource.*

## Installation

```
sudo npm install -g
```

## Usage

```bash
$ cmmk --help
cmmk [retries]

Map maker for the Catan board game.

Positionals:
  retries  Retries count (only the most balanced map will be kept)
                                                           [number] [default: 1]

Options:
  --help          Show help                                            [boolean]
  --version       Show version number                                  [boolean]
  --big, -b       5-6 players board                                    [boolean]
  --tileSize, -s  Tile size                                [number] [default: 6]
```

```bash
$ cmmk --big --tileSize 5
.
                       +----+
                      /      \
                +----+ Grain  +----+
               /      \      /      \
         +----+ Lumber +----+ Brick  +----+
        /      \      /      \      /      \
  +----+ Grain  +----+  Wool  +----+ Desert +----+
 /      \      /      \      /      \      /      \
+  Wool  +----+  Ore   +----+ Lumber +----+  Wool  +
 \      /      \      /      \      /      \      /
  +----+ Lumber +----+ Brick  +----+ Grain  +----+
 /      \      /      \      /      \      /      \
+ Brick  +----+ Desert +----+  Ore   +----+ Lumber +
 \      /      \      /      \      /      \      /
  +----+  Ore   +----+  Wool  +----+ Brick  +----+
 /      \      /      \      /      \      /      \
+ Grain  +----+ Lumber +----+ Lumber +----+  Ore   +
 \      /      \      /      \      /      \      /
  +----+ Brick  +----+  Ore   +----+ Grain  +----+
        \      /      \      /      \      /
         +----+  Wool  +----+  Wool  +----+          19% Brick
               \      /      \      /                56% Grain
                +----+ Grain  +----+                 67% Lumber
                      \      /                       50% Ore
                       +----+                        53% Wool
```

```bash
$ LANG=fr_FR cmmk 100
....................................................................................................
                     +-----+
                    /       \
                   /         \
            +-----+  Brique   +-----+
           /       \         /       \
          /         \       /         \
   +-----+  Minerai  +-----+   Bois    +-----+
  /       \         /       \         /       \
 /         \       /         \       /         \
+   Bois    +-----+    Blé    +-----+  Brique   +
 \         /       \         /       \         /
  \       /         \       /         \       /
   +-----+   Laine   +-----+   Laine   +-----+
  /       \         /       \         /       \
 /         \       /         \       /         \
+    Blé    +-----+  Minerai  +-----+  Minerai  +
 \         /       \         /       \         /
  \       /         \       /         \       /
   +-----+  Brique   +-----+  Désert   +-----+
  /       \         /       \         /       \
 /         \       /         \       /         \
+   Bois    +-----+    Blé    +-----+    Blé    +
 \         /       \         /       \         /
  \       /         \       /         \       /
   +-----+   Laine   +-----+   Laine   +-----+
          \         /       \         /
           \       /         \       /            31% Blé
            +-----+   Bois    +-----+             31% Bois
                   \         /                    33% Brique
                    \       /                     33% Laine
                     +-----+                      33% Minerai
```
