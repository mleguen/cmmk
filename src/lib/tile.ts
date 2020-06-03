import { Resource } from "./resource";

export class Tile {
  constructor(
    public x: number,
    public y: number,
    public res?: Resource,
  ) {}

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
