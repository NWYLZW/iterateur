declare module global {
  interface Number {
    [Symbol.iterator](step): Iterator<Number>;
    step: (step: number) => Iterator<Number>;
  }

  interface RegExp {
    /**
     * rule: /[start~]end[:step]/
     */
    [Symbol.iterator](): Iterator<Number>;
  }
}

declare namespace iterateur {
  export class InfinityError extends Error {
    constructor();
  }
  export const INFINITY_LIMIT: number;
  export function range(start: number, end: number, step: number): Generator<number>
  export function registerNumberIterator(): void;
  export function registerRegExpIterator(): void;
  export function functionNameResolver(name: string): [number, number, number];
  export function registerFunctionIterator(): void;
  export function registerAll(): void;
}

export = iterateur;
