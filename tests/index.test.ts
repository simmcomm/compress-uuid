import { describe, expect, test } from 'vitest';
import { CHARSETS, compressUuid, decompressUuid } from '../src';

type TestCase<T extends (...args: any) => any> = [...Parameters<T>, ReturnType<T>, string | undefined];

describe('frid util', () => {

  /* ---------------------------------------- decompressUuid tests ---------------------------------------- */

  const decompressCases: TestCase<typeof decompressUuid>[] = [
    ['27uwZiKEt7aMhY8j8Q08EU', 'base62', '45e8fc08-04b8-4418-b517-edfd2e5e3782', undefined],
    ['44ZY1EV4JFJ2PSON0GT8CNI4I', 'base36', '45e8fc08-04b8-4418-b517-edfd2e5e3782', undefined],
    ['dzvFTTIImVqcrcTRJaDZ', 'base62', '0057863f-4f31-4686-bd48-bdf443137b51', undefined],
    ['', 'base62', '', 'decompressUuid: input string is empty or contains invalid characters'],
    [' ', 'base62', '', 'decompressUuid: input string is empty or contains invalid characters'],
    ['invalidVariantTest', '' as keyof typeof CHARSETS, 'xx', 'decompressUuid: invalid variant'],
    ['thisInputSeemsToBeOk', 'base62', '', 'decompressUuid: could not decompress uuid'],
  ];

  test.each(decompressCases)('decompress', (compressed, variant, uuid, errorMessage) => {
    if (errorMessage) {
      expect(() => decompressUuid(compressed, variant)).toThrow(errorMessage);
    } else {
      expect(decompressUuid(compressed, variant)).toEqual(uuid);
    }
  });

  /* ---------------------------------------- compressUuid tests ---------------------------------------- */

  const compressCases: TestCase<typeof compressUuid>[] = [
    ['45e8fc08-04b8-4418-b517-edfd2e5e3782', 'base62', '27uwZiKEt7aMhY8j8Q08EU', undefined],
    ['45e8fc08-04b8-4418-b517-edfd2e5e3782', 'base36', '44ZY1EV4JFJ2PSON0GT8CNI4I', undefined],
    ['0057863f-4f31-4686-bd48-bdf443137b51', 'base62', 'dzvFTTIImVqcrcTRJaDZ', undefined],
    ['', 'base62', '', 'compressUuid: input string is empty or does not match valid uuid'],
    [' ', 'base62', '', 'compressUuid: input string is empty or does not match valid uuid'],
    ['45e8fc08-04b8-4418-b517-edfd2e5e3782', '' as keyof typeof CHARSETS, '', 'compressUuid: invalid variant'],
  ];

  test.each(compressCases)('compress', (uuid, variant, compressed, errorMessage) => {
    if (errorMessage) {
      expect(() => compressUuid(uuid, variant)).toThrow(errorMessage);
    } else {
      expect(compressUuid(uuid, variant)).toEqual(compressed);
    }
  });

});
