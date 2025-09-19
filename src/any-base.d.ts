declare module 'any-base' {
  declare function anyBase(
    srcAlphabet: string | string[], dstAlphabet: string | string[],
  ): <T extends string | string[]>(number: T) => T;

  declare namespace anyBase {
    const BIN: '01';
    const OCT: '01234567';
    const DEC: '0123456789';
    const HEX: '0123456789abcdef';
  }

  export = anyBase;
}
