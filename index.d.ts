declare module global {
  interface Number {
    [Symbol.iterator](step): Iterator<Number>;
    step: (step: number) => Iterator<Number>;
  }
}

declare namespace iterateur {
  export class InfinityError extends Error {
    constructor();
  }
  export const INFINITY_LIMIT: number;
}

export = iterateur;
