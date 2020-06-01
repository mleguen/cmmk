import { Tuile } from "./tuile";
import { Ressource } from "./ressource";

export class Carte {
  public tuiles: Tuile[] = [];

  static coordonneesTuiles56Joueurs = [
    { y: 0, x: 3 },
    { y: 1, x: 2 },
    { y: 1, x: 4 },
    { y: 2, x: 1 },
    { y: 2, x: 3 },
    { y: 2, x: 5 },
    { y: 3, x: 0 },
    { y: 3, x: 2 },
    { y: 3, x: 4 },
    { y: 3, x: 6 },
    { y: 4, x: 1 },
    { y: 4, x: 3 },
    { y: 4, x: 5 },
    { y: 5, x: 0 },
    { y: 5, x: 2 },
    { y: 5, x: 4 },
    { y: 5, x: 6 },
    { y: 6, x: 1 },
    { y: 6, x: 3 },
    { y: 6, x: 5 },
    { y: 7, x: 0 },
    { y: 7, x: 2 },
    { y: 7, x: 4 },
    { y: 7, x: 6 },
    { y: 8, x: 1 },
    { y: 8, x: 3 },
    { y: 8, x: 5 },
    { y: 9, x: 2 },
    { y: 9, x: 4 },
    { y: 10, x: 3 },
  ];

  constructor(ressources: Ressource[] = []) {
    this.tuiles = Carte.coordonneesTuiles56Joueurs.map(({ x, y }, index) => new Tuile(x, y, ressources[index]));
  }

  affiche() {
    const boundingBoxes = this.tuiles.map(tuile => tuile.getBoundingBox());
    const [{ maxY }] = boundingBoxes.sort(({ maxY: a }, { maxY: b }) => b - a);
    const [{ maxX }] = boundingBoxes.sort(({ maxX: a }, { maxX: b }) => b - a);

    const buffer = new Array(maxY + 1).fill(undefined).map(() => new Array(maxX + 1).fill(' '))
    this.tuiles.forEach(tuile => tuile.affiche(buffer));

    buffer.forEach(ligne => console.log(ligne.join('').trimRight()));
  }
}
