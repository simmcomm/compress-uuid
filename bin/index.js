#!/usr/bin/env node
import path from 'node:path';
import process from 'node:process';
import console from 'node:console';
import { compressUuid, decompressUuid } from '../dist/index.js';

const subcommand = process.argv[2] ?? undefined;
const value = process.argv[3] ?? undefined;

const SUBCOMMANDS = ['compress', 'decompress', 'd', 'c'];

if (['help', '--help', '-h'].includes(subcommand) || !subcommand || !SUBCOMMANDS.includes(subcommand)) {
  const cmdName = path.basename(process.argv[1]);

  console.log(`Usage: ${cmdName} <command>`);
  console.log('Commands:');
  console.log('  c|compress <value>: Compress a UUID');
  console.log('  d|decompress <value>: Decompress a compressed UUID');
  process.exit(1);
}

if (!value) {
  console.log('Error: Value is required');
  process.exit(1);
}

try {
  if (subcommand === 'compress' || subcommand === 'c') console.log(compressUuid(value));
  if (subcommand === 'decompress' || subcommand === 'd') console.log(decompressUuid(value));
} catch (error) {
  console.log(error.toString());
  process.exit(1);
}
