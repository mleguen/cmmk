# cmmk
[Catan](https://www.catan.com/board-games) map maker.

`cmmk` generates random maps for the Catan board game (with 5-6 players extension),
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
                +----+  Bois  +----+
               /      \      /      \
         +----+ Pierre +----+ Pierre +----+
        /      \      /      \      /      \
  +----+ Mouton +----+ Argile +----+ Mouton +----+
 /      \      /      \      /      \      /      \
+  Ble   +----+  Ble   +----+  Ble   +----+  Ble   +
 \      /      \      /      \      /      \      /
  +----+  Bois  +----+  Bois  +----+  Bois  +----+
 /      \      /      \      /      \      /      \
+ Argile +----+ Mouton +----+ Mouton +----+ Pierre +
 \      /      \      /      \      /      \      /
  +----+ Pierre +----+ Pierre +----+ Argile +----+
 /      \      /      \      /      \      /      \
+  Bois  +----+ Argile +----+  Bois  +----+ Mouton +
 \      /      \      /      \      /      \      /
  +----+ Désert +----+ Désert +----+  Ble   +----+
        \      /      \      /      \      /
         +----+ Mouton +----+ Argile +----+
               \      /      \      /
                +----+  Ble   +----+
                      \      /
                       +----+
2
```
