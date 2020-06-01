import 'core-js';
import { Ressource } from './ressource';
import { Carte } from './carte';

const objectEntries = <T>(a: T) => <[keyof T, T[keyof T]][]><unknown>Object.entries(a);

const nbRessources: { [ressource in Ressource]: number} = {
  [Ressource.Bois]: 6,
  [Ressource.Argile]: 5,
  [Ressource.Mouton]: 6,
  [Ressource.Ble]: 6,
  [Ressource.Pierre]: 5,
  [Ressource.Desert]: 2,
}

function permuteRessources(ressources: Ressource[], a: number, b: number) {
  const ra = ressources[a];
  const rb = ressources[b];
  ressources.splice(a, 1, rb);
  ressources.splice(b, 1, ra);
}

function melangeRessources(nbPermutations: number) {
  return (ressources: Ressource[]) => {
    ressources = ressources.slice(0);
    for (let i = 0; i < nbPermutations; i++) {
      const a = Math.floor(Math.random() * ressources.length);
      let b = Math.floor(Math.random() * (ressources.length - 1));
      if (b >= a) b++;
      permuteRessources(ressources, a, b);
    }
    return ressources;
  }
}

export function genereCartesAleatoires({
  nbCartes = 100,
  nbPermutations = 100,
}): Carte[] {
  const ressourcesNonMelangees = objectEntries(nbRessources)
  .map(([ressource, nb]) => (new Array<Ressource>(nb)).fill(ressource))
  .flat();
  
  return new Array(nbCartes)
  .fill(ressourcesNonMelangees)
  .map(melangeRessources(nbPermutations))
  .map(ressourcesMelangees => new Carte(ressourcesMelangees));
}
