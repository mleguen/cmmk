import { Resource } from "./resource";
import { Y18N } from "y18n";

export class Tile {
  private halfBase = Math.floor(this.base / 2);

  constructor(
    private y18n: Y18N,
    private x: number,
    private y: number,
    public res?: Resource,
    private base = 6
  ) {}

  draw(drawString: (x: number, y: number, c: string) => void) {
    const { xMin, yMin, yMax } = this.getBoundingBox();

    const horizontalSide = '+' + '-'.repeat(this.base - 1) + '+';
    drawString(xMin + this.halfBase, yMin, horizontalSide);
    drawString(xMin + this.halfBase, yMax, horizontalSide);
    
    for (let offset = 1; offset < this.halfBase; offset++) {
      const spaces = ' '.repeat(this.base - 1 + 2 * offset);
      drawString(xMin + this.halfBase - offset, yMin + offset, '/' + spaces + '\\');
      drawString(xMin + this.halfBase - offset, yMax - offset, '\\' + spaces + '/');
    }
    
    let resName = this.res ? this.y18n.__(this.res) : '';
    if (resName.length > this.base + 1) resName = resName.substring(0, this.base) + '.';
    const spaceCount = (2 * this.halfBase + this.base - 1 - resName.length) / 2;
    drawString(xMin, yMin + this.halfBase, '+' + ' '.repeat(Math.floor(spaceCount)) + resName + ' '.repeat(Math.ceil(spaceCount)) + '+');
  }

  getBoundingBox() {
    const xMin = (this.halfBase + this.base) * this.x;
    const yMin = this.halfBase * this.y;
    return {
      xMin,
      yMin,
      xMax: xMin + this.halfBase * 2 + this.base,
      yMax: yMin + this.halfBase * 2,
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
