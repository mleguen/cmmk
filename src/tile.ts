import { Resource } from "./resource";
import { Y18N } from "y18n";

export class Tile {
  private static base = 5;

  constructor(
    private y18n: Y18N,
    private x: number,
    private y: number,
    public res?: Resource
  ) {}

  display(buffer: string[][]) {
    const { xMin, yMin, xMax, yMax } = this.getBoundingBox();

    buffer[yMin + 2][xMin] = '+';
    buffer[yMin + 1][xMin + 1] = '/';
    buffer[yMax - 1][xMin + 1] = '\\';
    buffer[yMin][xMin + 2] = '+';
    buffer[yMax][xMin + 2] = '+';
    for (let x = xMin + 3; x < xMax - 2; x++) {
      buffer[yMin][x] = '-';
      buffer[yMax][x] = '-';
    }
    buffer[yMin][xMax - 2] = '+';
    buffer[yMax][xMax - 2] = '+';
    buffer[yMin + 1][xMax - 1] = '\\';
    buffer[yMax - 1][xMax - 1] = '/';
    buffer[yMin + 2][xMax] = '+';

    if (this.res) {
      let resName = this.y18n.__(this.res);
      if (resName.length > Tile.base + 1) resName = resName.substr(0, Tile.base) + '.';
      const spaces = (Tile.base + 3 - resName.length) / 2
      buffer[yMin + 2].splice(xMin + 1 + spaces, resName.length, ...resName.split(''))
    }
  }

  getBoundingBox() {
    const xMin = (2 + Tile.base) * this.x;
    const yMin = 2 * this.y;
    return {
      xMin,
      yMin,
      xMax: xMin + 2 + Tile.base + 2,
      yMax: yMin + 4,
    }
  }

  private getDistanceTo(other: Tile): number {
    return Math.max(
      Math.abs(this.x - other.x),
      Math.ceil(Math.abs(this.y - other.y) / 2),
    );
  }

  isAdjacentTo(other: Tile): boolean {
    return this.getDistanceTo(other) === 1;
  }

  producesSameResourceAs(other: Tile): boolean {
    return other.res === this.res;
  }

  swapWith(other: Tile): void {
    const oldRes = this.res;
    this.res = other.res;
    other.res = oldRes;
  }
}
