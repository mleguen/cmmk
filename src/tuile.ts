import { Ressource } from "./ressource";

export class Tuile {
  static base = 5;

  constructor(
    public x: number,
    public y: number,
    public ressource?: Ressource
  ) {}

  affiche(buffer: string[][]) {
    const { minX, minY, maxX, maxY } = this.getBoundingBox();

    buffer[minY + 2][minX] = '+';
    buffer[minY + 1][minX + 1] = '/';
    buffer[maxY - 1][minX + 1] = '\\';
    buffer[minY][minX + 2] = '+';
    buffer[maxY][minX + 2] = '+';
    for (let x = minX + 3; x < maxX - 2; x++) {
      buffer[minY][x] = '-';
      buffer[maxY][x] = '-';
    }
    buffer[minY][maxX - 2] = '+';
    buffer[maxY][maxX - 2] = '+';
    buffer[minY + 1][maxX - 1] = '\\';
    buffer[maxY - 1][maxX - 1] = '/';
    buffer[minY + 2][maxX] = '+';

    if (this.ressource) {
      const espaces = (Tuile.base + 3 - this.ressource.length) / 2
      buffer[minY + 2].splice(minX + 1 + espaces, this.ressource.length, ...this.ressource.split(''))
    }
  }

  getBoundingBox() {
    const minX = (2 + Tuile.base) * this.x;
    const minY = 2 * this.y;
    return {
      minX,
      minY,
      maxX: minX + 2 + Tuile.base + 2,
      maxY: minY + 4,
    }
  }
}
