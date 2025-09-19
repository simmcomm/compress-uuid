import { compressUuid, decompressUuid } from './dist/index.js';

const uuid = '0057863f-4f31-4686-bd48-bdf443137b51';
console.log({
  uuid,
  compressed: compressUuid(uuid),
  decompressed: decompressUuid(compressUuid(uuid)),
});


['dzvFTTIImVqcrcTRJaDZ', 'base62', '0057863f-4f31-4686-bd48-bdf443137b51', undefined],
  ['0057863f-4f31-4686-bd48-bdf443137b51', 'base62', 'dzvFTTIImVqcrcTRJaDZ', undefined],
