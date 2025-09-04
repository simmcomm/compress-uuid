import anyBase from 'any-base';
import { validate as validateUuid, version as uuidVersion } from 'uuid';

const isUUID = (u: string) => validateUuid(u) && uuidVersion(u) === 4;

export const CHARSETS: Record<'base36' | 'base62', string> = {
  base36: '0123456789abcdefghijklmnopqrstuvwxyz',
  base62: '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz',
} as const;

export function decompressUuid(compressed: string, variant: keyof typeof CHARSETS = 'base62'): string {
  if (compressed.length === 0 || !compressed.match(/^[0-9a-zA-Z]+$/)) {
    throw new Error('decompressUuid: input string is empty or contains invalid characters');
  }

  if (!(variant in CHARSETS)) {
    throw new Error('decompressUuid: invalid variant');
  }

  const addUuidDashes = (uuid: string) => [
    uuid.slice(0, 8),
    uuid.slice(8, 12),
    uuid.slice(12, 16),
    uuid.slice(16, 20),
    uuid.slice(20, 32),
  ].join('-');

  const input = variant === 'base36' ? compressed.toLowerCase() : compressed;
  const uuid = addUuidDashes(anyBase(CHARSETS[variant], anyBase.HEX)(input));
  if (!isUUID(uuid)) {
    throw new Error('decompressUuid: could not decompress uuid');
  }

  return uuid;
}

export function compressUuid(uuid: string, variant: keyof typeof CHARSETS = 'base62'): string {
  if (uuid.length === 0 || !isUUID(uuid)) {
    throw new Error('compressUuid: input string is empty or does not match valid uuid');
  }

  if (!(variant in CHARSETS)) {
    throw new Error('compressUuid: invalid variant');
  }

  const compressed = anyBase(anyBase.HEX, CHARSETS[variant])(uuid.toLowerCase().replace(/-/g, ''));
  if (variant === 'base36') {
    return compressed.toUpperCase();
  }
  return compressed;
}
