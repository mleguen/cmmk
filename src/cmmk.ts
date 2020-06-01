#!/usr/bin/env node
import { genereCartesAleatoires } from './generation';
import { evalueCarte } from './evaluation';
import { Carte } from './carte';

let carte: Carte;
let note: number;
do {
  [{carte, note}] = genereCartesAleatoires({nbCartes: 1, nbPermutations: 100})
  .map(evalueCarte);
} while(note < 2);

carte.affiche();
console.log(note)