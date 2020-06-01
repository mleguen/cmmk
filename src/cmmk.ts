#!/usr/bin/env node
import { Board } from './board';
import { resolve } from 'path';
import y18nFactory = require('y18n');

const y18n = y18nFactory({
  directory: resolve(__dirname, '..', 'locales'),
  locale: process.env.LANG ? process.env.LANG.split('.')[0] : 'en_US'
});

let board: Board;
do {
  board = new Board(y18n);
  board.shuffle(100);
} while(board.hasAdjacentTilesProducingSameResource());

board.toStrings().reverse().forEach(line => console.log(line));
