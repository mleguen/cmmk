import { Resource } from "./resource";
import { Y18N } from "y18n";

export class Tile {
  private size: number;
  private halfSize: number;

  constructor(
    private __: (toTranslate: string) => string,
    private x: number,
    private y: number,
    public res?: Resource,
    {
      size = 6,
    } = {}
  ) {
    this.size = size;
    this.halfSize = Math.floor(this.size / 2);
  }

  draw(drawString: (x: number, y: number, c: string) => void) {
    const { xMin, yMin, yMax } = this.getBoundingBox();

    const horizontalSide = '+' + '-'.repeat(this.size - 1) + '+';
    drawString(xMin + this.halfSize, yMin, horizontalSide);
    drawString(xMin + this.halfSize, yMax, horizontalSide);
    
    for (let offset = 1; offset < this.halfSize; offset++) {
      const spaces = ' '.repeat(this.size - 1 + 2 * offset);
      drawString(xMin + this.halfSize - offset, yMax - offset, '/' + spaces + '\\');
      drawString(xMin + this.halfSize - offset, yMin + offset, '\\' + spaces + '/');
    }
    
    let resName = this.res ? this.__(this.res) : '';
    if (resName.length > this.size + 1) resName = resName.substring(0, this.size) + '.';
    const spaceCount = (2 * this.halfSize + this.size - 1 - resName.length) / 2;
    drawString(xMin, yMin + this.halfSize, '+' + ' '.repeat(Math.floor(spaceCount)) + resName + ' '.repeat(Math.ceil(spaceCount)) + '+');
  }

  getBoundingBox() {
    const xMin = (this.halfSize + this.size) * this.x;
    const yMin = this.halfSize * this.y;
    return {
      xMin,
      yMin,
      xMax: xMin + this.halfSize * 2 + this.size,
      yMax: yMin + this.halfSize * 2,
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
