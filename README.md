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
                                                         [number] [default: 100]

Options:
  --help          Show help                                            [boolean]
  --version       Show version number                                  [boolean]
  --big, -b       5-6 players board                                    [boolean]
  --tileSize, -s  Tile size                                [number] [default: 6]
```

```bash
$ cmmk --big --tileSize 5 1
.
                       +----+
                      / (8)  \
                +----+ Lumber +----+
               / (4)  \ 14%  / (10) \
         +----+ Grain  +----+ Grain  +----+
        / (8)  \  8%  / (9)  \  8%  / (11) \
  +----+ Lumber +----+  Wool  +----+  Wool  +----+
 / (6)  \ 14%  / (3)  \ 11%  / (8)  \  6%  / (12) \
+  Wool  +----+  Ore   +----+ Brick  +----+ Brick  +
 \ 14%  / (3)  \  6%  / (2)  \ 14%  / (11) \  3%  /
  +----+ Brick  +----+ Lumber +----+  Ore   +----+
 / (2)  \  6%  / (6)  \  3%  / (5)  \  6%  / (10) \
+ Grain  +----+ Grain  +----+  Wool  +----+ Grain  +
 \  3%  /      \ 14%  / (4)  \ 11%  / (11) \  8%  /
  +----+ Desert +----+  Ore   +----+ Brick  +----+
 / (3)  \ 17%  / (6)  \  8%  /      \  6%  / (5)  \
+ Lumber +----+  Wool  +----+ Desert +----+  Ore   +
 \  6%  / (12) \ 14%  / (10) \ 17%  / (4)  \ 11%  /
  +----+ Grain  +----+ Brick  +----+ Lumber +----+
        \  3%  / (9)  \  8%  / (9)  \  8%  /
         +----+ Lumber +----+  Ore   +----+          36% Brick
               \ 11%  / (5)  \ 11%  /                44% Grain
                +----+  Wool  +----+                 56% Lumber
                      \ 11%  /                       42% Ore
                       +----+                        67% Wool
```

```bash
$ LANG=fr_FR cmmk
....................................................................................................
                     +-----+
                    /       \
                   /   (6)   \
            +-----+  Brique   +-----+
           /       \   14%   /       \
          /   (5)   \       /   (3)   \
   +-----+    Blé    +-----+  Minerai  +-----+
  /       \   11%   /       \   6%    /       \
 /         \       /  (10)   \       /  (11)   \
+  Désert   +-----+   Bois    +-----+   Bois    +
 \   17%   /       \   8%    /       \   6%    /
  \       /   (8)   \       /   (9)   \       /
   +-----+  Minerai  +-----+  Brique   +-----+
  /       \   14%   /       \   11%   /       \
 /   (4)   \       /   (5)   \       /  (12)   \
+  Brique   +-----+   Laine   +-----+   Laine   +
 \   8%    /       \   11%   /       \   3%    /
  \       /   (3)   \       /   (2)   \       /
   +-----+    Blé    +-----+    Blé    +-----+
  /       \   6%    /       \   3%    /       \
 /   (9)   \       /   (6)   \       /  (11)   \
+   Laine   +-----+   Bois    +-----+   Bois    +
 \   11%   /       \   14%   /       \   6%    /
  \       /  (10)   \       /   (4)   \       /
   +-----+  Minerai  +-----+   Laine   +-----+
          \   8%    /       \   8%    /
           \       /   (8)   \       /            33% Blé
            +-----+    Blé    +-----+             33% Bois
                   \   14%   /                    33% Brique
                    \       /                     33% Laine
                     +-----+                      28% Minerai
```
