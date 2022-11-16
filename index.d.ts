declare module global {
  interface Number {
    [Symbol.iterator](step): Iterator<Number>;
    step: (step: number) => Iterator<Number>;
  }

  interface RegExp {
    [Symbol.iterator](): Iterator<Number>;
  }
}

declare namespace iterateur {
  export class InfinityError extends Error {
    constructor();
  }
  export const INFINITY_LIMIT: number;
  export function registerNumberIterator(): void;
  export function registerRegExpIterator(): void;
  export function registerAll(): void;
}

export = iterateur;
