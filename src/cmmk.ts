#!/usr/bin/env node
import { Board } from './board';
import { resolve } from 'path';
import yargs = require('yargs/yargs');
import y18n = require('y18n');

const { __ } = y18n({
  directory: resolve(__dirname, '..', 'locales'),
  locale: process.env.LANG ? process.env.LANG.split('.')[0] : 'en_US'
});

yargs(process.argv.slice(2))
.scriptName('cmmk')
.command(
  '$0',
  __('Map maker for the Catan board game.'),
  cmdY => {
    return cmdY
    .option('big', {
      alias: 'b',
      description: __('5-6 players board'),
      type: 'boolean',
    })
    .option('tileSize', {
      alias: 's',
      description: __('Tile size'),
      type: 'number',
      default: 6,
    });
  },
  ({ big, tileSize }) => {
    let board: Board;
    do {
      board = new Board({ __, for56Players: big, tileSize });
      board.shuffle(100);
    } while (board.hasAdjacentTilesProducingSameResource());

    board.toStrings().reverse().forEach(line => console.log(line));
  }
)
.parse();
