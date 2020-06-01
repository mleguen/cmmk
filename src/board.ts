import { Tile } from "./tile";
import { Resource } from "./resource";

export class Board {
  private tiles: Tile[];
  
  constructor(
    {
      __ = (toTranslate: string) => toTranslate,
      for56Players = false,
      tileSize = 6
    } = {}
  ) {
    const tileOptions = { size: tileSize };
    function tileFactory(x: number, y: number, res: Resource): Tile {
      return new Tile(__, x, y, res, tileOptions);
    }
    this.tiles = [
      tileFactory(0, 0, Resource.Desert),
      tileFactory(1, -1, Resource.Lumber),
      tileFactory(0, -2, Resource.Lumber),
      tileFactory(-1, -1, Resource.Lumber),
      tileFactory(-1, 1, Resource.Lumber),
      tileFactory(0, 2, Resource.Brick),
      tileFactory(1, 1, Resource.Brick),
      tileFactory(2, 0, Resource.Brick),
      tileFactory(2, -2, Resource.Wool),
      tileFactory(1, -3, Resource.Wool),
      tileFactory(0, -4, Resource.Wool),
      tileFactory(-1, -3, Resource.Wool),
      tileFactory(-2, -2, Resource.Grain),
      tileFactory(-2, 0, Resource.Grain),
      tileFactory(-2, 2, Resource.Grain),
      tileFactory(-1, 3, Resource.Grain),
      tileFactory(0, 4, Resource.Ore),
      tileFactory(1, 3, Resource.Ore),
      tileFactory(2, 2, Resource.Ore),
    ];
    if (for56Players) {
      this.tiles = this.tiles.concat([
        tileFactory(3, 1, Resource.Desert),
        tileFactory(3, -1, Resource.Lumber),
        tileFactory(3, -3, Resource.Lumber),
        tileFactory(2, -4, Resource.Brick),
        tileFactory(1, -5, Resource.Brick),
        tileFactory(0, -6, Resource.Wool),
        tileFactory(-1, -5, Resource.Wool),
        tileFactory(-2, -4, Resource.Grain),
        tileFactory(-3, -3, Resource.Grain),
        tileFactory(-3, -1, Resource.Ore),
        tileFactory(-3, 1, Resource.Ore),
      ]);
    }
  }

  private getBoundinBox() {
    let xMin = Infinity, yMin = Infinity, xMax = -Infinity, yMax = -Infinity;
    for (const tile of this.tiles) {
      const tileBBox = tile.getBoundingBox();
      xMin = tileBBox.xMin < xMin ? tileBBox.xMin : xMin;
      yMin = tileBBox.yMin < yMin ? tileBBox.yMin : yMin;
      xMax = tileBBox.xMax > xMax ? tileBBox.xMax : xMax;
      yMax = tileBBox.yMax > yMax ? tileBBox.yMax : yMax;
    }
    return { xMin, yMin, xMax, yMax };
  }

  hasAdjacentTilesProducingSameResource() {
    return this.tiles.some(
      tile1 => this.tiles.some(
        tile2 => tile2.producesSameResourceAs(tile1) && tile2.isAdjacentTo(tile1)
      )
    );
  }

  shuffle(permutations: number) {
    for (let i = 0; i < permutations; i++) {
      const a = Math.floor(Math.random() * this.tiles.length);
      let b = Math.floor(Math.random() * (this.tiles.length - 1));
      if (b >= a) b++;
      this.tiles[a].swapWith(this.tiles[b]);
    }
  }

  toStrings(): string[] {
    const bBox = this.getBoundinBox();

    const lines = new Array(bBox.yMax - bBox.yMin + 1).fill(undefined).map(() => ' '.repeat(bBox.xMax - bBox.xMin + 1));
    this.tiles.forEach(tile =>
      tile.draw((x: number, y: number, s: string) => {
        lines[y - bBox.yMin] = lines[y - bBox.yMin].slice(0, x - bBox.xMin) + s + lines[y - bBox.yMin].slice( x - bBox.xMin + s.length);
      })
    );
    return lines.map(line => line.trimRight());
  }
}
