import { Tile } from "./tile";
import { Resource } from "./resource";
import { Y18N } from "y18n";

export class Board {
  private tiles: Tile[] = [
    new Tile(this.y18n, 3,  0, Resource.Desert),
    new Tile(this.y18n, 2,  1, Resource.Desert),
    new Tile(this.y18n, 4,  1, Resource.Lumber),
    new Tile(this.y18n, 1,  2, Resource.Lumber),
    new Tile(this.y18n, 3,  2, Resource.Lumber),
    new Tile(this.y18n, 5,  2, Resource.Lumber),
    new Tile(this.y18n, 0,  3, Resource.Lumber),
    new Tile(this.y18n, 2,  3, Resource.Lumber),
    new Tile(this.y18n, 4,  3, Resource.Brick),
    new Tile(this.y18n, 6,  3, Resource.Brick),
    new Tile(this.y18n, 1,  4, Resource.Brick),
    new Tile(this.y18n, 3,  4, Resource.Brick),
    new Tile(this.y18n, 5,  4, Resource.Brick),
    new Tile(this.y18n, 0,  5, Resource.Wool),
    new Tile(this.y18n, 2,  5, Resource.Wool),
    new Tile(this.y18n, 4,  5, Resource.Wool),
    new Tile(this.y18n, 6,  5, Resource.Wool),
    new Tile(this.y18n, 1,  6, Resource.Wool),
    new Tile(this.y18n, 3,  6, Resource.Wool),
    new Tile(this.y18n, 5,  6, Resource.Grain),
    new Tile(this.y18n, 0,  7, Resource.Grain),
    new Tile(this.y18n, 2,  7, Resource.Grain),
    new Tile(this.y18n, 4,  7, Resource.Grain),
    new Tile(this.y18n, 6,  7, Resource.Grain),
    new Tile(this.y18n, 1,  8, Resource.Grain),
    new Tile(this.y18n, 3,  8, Resource.Ore),
    new Tile(this.y18n, 5,  8, Resource.Ore),
    new Tile(this.y18n, 2,  9, Resource.Ore),
    new Tile(this.y18n, 4,  9, Resource.Ore),
    new Tile(this.y18n, 3, 10, Resource.Ore),
  ];
  
  constructor(private y18n: Y18N) {}

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
    const bBoxes = this.tiles.map(tile => tile.getBoundingBox());
    const [{ yMax }] = bBoxes.sort(({ yMax: a }, { yMax: b }) => b - a);
    const [{ xMax }] = bBoxes.sort(({ xMax: a }, { xMax: b }) => b - a);

    const buffer = new Array(yMax + 1).fill(undefined).map(() => new Array(xMax + 1).fill(' '))
    this.tiles.forEach(tile => tile.display(buffer));

    return buffer.map(line => line.join('').trimRight());
  }
}
