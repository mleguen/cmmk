#!/usr/bin/env node
import { Board } from '../lib';
import { resolve } from 'path';
import yargs = require('yargs/yargs');
import y18n = require('y18n');
import { BoardDrawer } from './board-drawer';

const { __ } = y18n({
  directory: resolve(__dirname, '..', '..', 'locales'),
  locale: process.env.LANG ? process.env.LANG.split('.')[0] : 'en_US'
});

yargs(process.argv.slice(2))
.scriptName('cmmk')
.command(
  '$0 [retries]',
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
    })
    .positional('retries', {
      description: __('Retries count (only the most balanced map will be kept)'),
      type: 'number',
      default: 1,
    });
  },
  ({ big, retries, tileSize }) => {
    const boards: Board[] = [];
    while (boards.length < retries) {
      const board = new Board(big);
      board.shuffle(board.tiles.length * 2);
      if (!board.hasAdjacentTilesProducingSameResource()) {
        boards.push(board);
        process.stdout.write('.');
      }
    }
    process.stdout.write('\n');

    const [{ board }] = boards
    .map(board => {
      const probas = Object.values(board.getResourceProba());
      const mean = probas.reduce((sum, proba) => sum + proba, 0) / probas.length;
      const stddev = Math.sqrt(probas.reduce((sum, proba) => sum + Math.pow(proba - mean, 2), 0) / probas.length);
      return { board, stddev };
    })
    .sort(({ stddev: a }, { stddev: b }) => a - b);

    const bd = new BoardDrawer(__, tileSize, console);
    bd.drawBoard(board);
  }
)
.parse();
