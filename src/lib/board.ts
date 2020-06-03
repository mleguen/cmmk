import { Tile } from "./tile";
import { Resource } from "./resource";

export class Board {
  public tiles: Tile[];
  
  constructor(
    for56Players = false,
  ) {
    this.tiles = [
      new Tile(0, 0, Resource.Desert),
      new Tile(1, -1, Resource.Lumber),
      new Tile(0, -2, Resource.Lumber),
      new Tile(-1, -1, Resource.Lumber),
      new Tile(-1, 1, Resource.Lumber),
      new Tile(0, 2, Resource.Brick),
      new Tile(1, 1, Resource.Brick),
      new Tile(2, 0, Resource.Brick),
      new Tile(2, -2, Resource.Wool),
      new Tile(1, -3, Resource.Wool),
      new Tile(0, -4, Resource.Wool),
      new Tile(-1, -3, Resource.Wool),
      new Tile(-2, -2, Resource.Grain),
      new Tile(-2, 0, Resource.Grain),
      new Tile(-2, 2, Resource.Grain),
      new Tile(-1, 3, Resource.Grain),
      new Tile(0, 4, Resource.Ore),
      new Tile(1, 3, Resource.Ore),
      new Tile(2, 2, Resource.Ore),
    ];
    if (for56Players) {
      this.tiles = this.tiles.concat([
        new Tile(3, 1, Resource.Desert),
        new Tile(3, -1, Resource.Lumber),
        new Tile(3, -3, Resource.Lumber),
        new Tile(2, -4, Resource.Brick),
        new Tile(1, -5, Resource.Brick),
        new Tile(0, -6, Resource.Wool),
        new Tile(-1, -5, Resource.Wool),
        new Tile(-2, -4, Resource.Grain),
        new Tile(-3, -3, Resource.Grain),
        new Tile(-3, -1, Resource.Ore),
        new Tile(-3, 1, Resource.Ore),
      ]);
    }
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
}
