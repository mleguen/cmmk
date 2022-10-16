import { Tile } from "./tile";
import { Resource } from "./resource";

const DICE_PROBA = {
  2: 1 / 36,
  3: 2 / 36,
  4: 3 / 36,
  5: 4 / 36,
  6: 5 / 36,
  7: 6 / 36,
  8: 5 / 36,
  9: 4 / 36,
  10: 3 / 36,
  11: 2 / 36,
  12: 1 / 36,
};

const NUMBER_TOKENS = (for56Players: boolean) => for56Players
  ? [2, 5, 4, 6, 3, 9, 8, 11, 11, 10, 6, 3, 8, 4, 8, 10, 11, 12, 10, 5, 4, 9, 5, 9, 12, 3, 2, 6]
  : [5, 2, 6, 3, 8, 10, 9, 12, 11, 4, 8, 10, 9, 4, 5, 6, 3, 11];

const TILES = (for56Players: boolean) => [
  { x: 0, y: 0, res: Resource.Desert },
  { x: 1, y: -1, res: Resource.Lumber },
  { x: 0, y: -2, res: Resource.Lumber },
  { x: -1, y: -1, res: Resource.Lumber },
  { x: -1, y: 1, res: Resource.Lumber },
  { x: 0, y: 2, res: Resource.Brick },
  { x: 1, y: 1, res: Resource.Brick },
  { x: 2, y: 0, res: Resource.Brick },
  { x: 2, y: -2, res: Resource.Wool },
  { x: 1, y: -3, res: Resource.Wool },
  { x: 0, y: -4, res: Resource.Wool },
  { x: -1, y: -3, res: Resource.Wool },
  { x: -2, y: -2, res: Resource.Grain },
  { x: -2, y: 0, res: Resource.Grain },
  { x: -2, y: 2, res: Resource.Grain },
  { x: -1, y: 3, res: Resource.Grain },
  { x: 0, y: 4, res: Resource.Ore },
  { x: 1, y: 3, res: Resource.Ore },
  { x: 2, y: 2, res: Resource.Ore },
].concat(for56Players
  ? [
    { x: 3, y: 1, res: Resource.Desert },
    { x: 3, y: -1, res: Resource.Lumber },
    { x: 3, y: -3, res: Resource.Lumber },
    { x: 2, y: -4, res: Resource.Brick },
    { x: 1, y: -5, res: Resource.Brick },
    { x: 0, y: -6, res: Resource.Wool },
    { x: -1, y: -5, res: Resource.Wool },
    { x: -2, y: -4, res: Resource.Grain },
    { x: -3, y: -3, res: Resource.Grain },
    { x: -3, y: -1, res: Resource.Ore },
    { x: -3, y: 1, res: Resource.Ore },
  ]
  : []
);

export interface BoardTile {
  tile: Tile,
  numberToken?: number,
  proba: number,
};

export class Board {
  public tiles: Tile[];
  private proba: number[];
  private numberTokens: number[];
  
  constructor(
    for56Players = false,
  ) {
    this.tiles = TILES(for56Players).map(({x, y, res}) => new Tile(x, y, res));
    this.numberTokens = NUMBER_TOKENS(for56Players);
    this.proba = this.numberTokens.map(numberToken => DICE_PROBA[numberToken]);
  }

  /** Compute the probability for each resource to be produced in the current state of the board */
  getResourceProba() {
    let deserts = 0;
    return this.tiles.reduce<{ [res in Resource]?: number }>((resProba, tile, index) => {
      if (tile.res === Resource.Desert) {
        deserts++;
      } else {
        resProba[tile.res] = (resProba[tile.res] || 0) + this.proba[index - deserts];
      }
      return resProba;
    }, {});
  }

  getTiles(): BoardTile[] {
    let deserts = 0;
    return this.tiles.reduce<BoardTile[]>((tiles, tile, index) => {
      if (tile.res === Resource.Desert) {
        tiles.push({
          tile,
          proba: DICE_PROBA[7],
        });
        deserts++;
      } else {
        tiles.push({
          tile,
          numberToken: this.numberTokens[index - deserts],
          proba: this.proba[index - deserts],
        });
      }
      return tiles;
    }, []);
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
