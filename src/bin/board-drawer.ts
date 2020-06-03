import { Board, Tile } from "../lib";

export interface Translator {
  (toTranslate: string): string
}

export class BoardDrawer {
  private halfTileSize: number;

  constructor(
    private __: Translator = (toTranslate: string) => toTranslate,
    private tileSize: number = 6,
    private console: Console,
  ) {
    this.halfTileSize = Math.floor(this.tileSize / 2);
  }

  drawBoard(board: Board): void {
    const bBox = this.getBoardBoundingBox(board);

    const lines = new Array(bBox.yMax - bBox.yMin + 1).fill(undefined).map(() => ' '.repeat(bBox.xMax - bBox.xMin + 1));
    board.tiles.forEach(tile =>
      this.drawTile(tile, (x: number, y: number, s: string) => {
        lines[y - bBox.yMin] = lines[y - bBox.yMin].slice(0, x - bBox.xMin) + s + lines[y - bBox.yMin].slice( x - bBox.xMin + s.length);
      })
    );
    
    const resProba = Object.entries(board.getResourceProba())
    .map<[string, number]>(([res, proba]) => [this.__(res), proba])
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([res, proba]) => ` ${Math.round(proba * 100)}% ${res}`);
    
    lines.reverse().forEach((line, index) => {
      this.console.log(index >= lines.length - resProba.length
        ? line + resProba[index - lines.length + resProba.length]
        : line.trimRight()
      );
    });
  }

  private drawTile(tile: Tile, drawString: (x: number, y: number, c: string) => void) {
    const { xMin, yMin, yMax } = this.getTileBoundingBox(tile);

    const horizontalSide = '+' + '-'.repeat(this.tileSize - 1) + '+';
    drawString(xMin + this.halfTileSize, yMin, horizontalSide);
    drawString(xMin + this.halfTileSize, yMax, horizontalSide);

    for (let offset = 1; offset < this.halfTileSize; offset++) {
      const spaces = ' '.repeat(this.tileSize - 1 + 2 * offset);
      drawString(xMin + this.halfTileSize - offset, yMax - offset, '/' + spaces + '\\');
      drawString(xMin + this.halfTileSize - offset, yMin + offset, '\\' + spaces + '/');
    }

    let resName = tile.res ? this.__(tile.res) : '';
    if (resName.length > this.tileSize + 1) resName = resName.substring(0, this.tileSize) + '.';
    const spaceCount = (2 * this.halfTileSize + this.tileSize - 1 - resName.length) / 2;
    drawString(xMin, yMin + this.halfTileSize, '+' + ' '.repeat(Math.floor(spaceCount)) + resName + ' '.repeat(Math.ceil(spaceCount)) + '+');
  }

  private getBoardBoundingBox(board: Board) {
    let xMin = Infinity, yMin = Infinity, xMax = -Infinity, yMax = -Infinity;
    for (const tile of board.tiles) {
      const tileBBox = this.getTileBoundingBox(tile);
      xMin = tileBBox.xMin < xMin ? tileBBox.xMin : xMin;
      yMin = tileBBox.yMin < yMin ? tileBBox.yMin : yMin;
      xMax = tileBBox.xMax > xMax ? tileBBox.xMax : xMax;
      yMax = tileBBox.yMax > yMax ? tileBBox.yMax : yMax;
    }
    return { xMin, yMin, xMax, yMax };
  }

  private getTileBoundingBox(tile: Tile) {
    const xMin = (this.halfTileSize + this.tileSize) * tile.x;
    const yMin = this.halfTileSize * tile.y;
    return {
      xMin,
      yMin,
      xMax: xMin + this.halfTileSize * 2 + this.tileSize,
      yMax: yMin + this.halfTileSize * 2,
    }
  }
}
