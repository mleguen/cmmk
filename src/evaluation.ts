import { Carte } from './carte';
import { Tuile } from './tuile';
import { Ressource } from './ressource';

export interface Evaluation {
  carte: Carte;
  note: number;
}

function distance(a: Tuile, b: Tuile): number {
  return Math.max(
    Math.abs(a.x - b.x),
    Math.ceil(Math.abs(a.y - b.y) / 2),
  );
}

// Maximiser les distances entres ressources de même type
export function evalueCarte(carte: Carte): Evaluation {
  const distancesMin: { [ressource in Ressource]?: number } = {};
  let tuiles = carte.tuiles.slice(0);
  let tuile: Tuile;
  while (tuile = tuiles.shift()) {
    for (let autreTuile of tuiles) {
      if (autreTuile.ressource === tuile.ressource) {
        const d = distance(tuile, autreTuile);
        if ((distancesMin[tuile.ressource] === undefined) || (distancesMin[tuile.ressource] > d)) {
          distancesMin[tuile.ressource] = d;
        }
      }
    }
  }
  return { carte, note: Math.min(...Object.values(distancesMin)) };
}
