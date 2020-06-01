import { Tile } from "./tile";
import { Resource } from "./resource";
import { Y18N } from "y18n";

export class Board {
  private tiles: Tile[] = [
    new Tile(this.y18n,  0,  1, Resource.Desert),
    new Tile(this.y18n,  1,  0, Resource.Desert),
    new Tile(this.y18n,  0, -1, Resource.Lumber),
    new Tile(this.y18n, -1,  0, Resource.Lumber),
    new Tile(this.y18n, -1,  2, Resource.Lumber),
    new Tile(this.y18n,  0,  3, Resource.Lumber),
    new Tile(this.y18n,  1,  2, Resource.Lumber),
    new Tile(this.y18n,  2,  1, Resource.Lumber),
    new Tile(this.y18n,  2, -1, Resource.Brick),
    new Tile(this.y18n,  1, -2, Resource.Brick),
    new Tile(this.y18n,  0, -3, Resource.Brick),
    new Tile(this.y18n, -1, -2, Resource.Brick),
    new Tile(this.y18n, -2, -1, Resource.Brick),
    new Tile(this.y18n, -2,  1, Resource.Wool),
    new Tile(this.y18n, -2,  3, Resource.Wool),
    new Tile(this.y18n, -1,  4, Resource.Wool),
    new Tile(this.y18n,  0,  5, Resource.Wool),
    new Tile(this.y18n,  1,  4, Resource.Wool),
    new Tile(this.y18n,  2,  3, Resource.Wool),
    new Tile(this.y18n,  3,  2, Resource.Grain),
    new Tile(this.y18n,  3,  0, Resource.Grain),
    new Tile(this.y18n,  3, -2, Resource.Grain),
    new Tile(this.y18n,  2, -3, Resource.Grain),
    new Tile(this.y18n,  1, -4, Resource.Grain),
    new Tile(this.y18n,  0, -5, Resource.Grain),
    new Tile(this.y18n, -1, -4, Resource.Ore),
    new Tile(this.y18n, -2, -3, Resource.Ore),
    new Tile(this.y18n, -3, -2, Resource.Ore),
    new Tile(this.y18n, -3,  0, Resource.Ore),
    new Tile(this.y18n, -3,  2, Resource.Ore),
  ];
  
  constructor(private y18n: Y18N) {}

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
