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
  export function range(start: number, end: number, step: number): Generator<number>;
  export function i(number: number): Generator<number>
  export function i(regexp: RegExp): Generator<number>
  export function i<T = number>(strings: string[], ...args: [
    f: (i: number) => T,
  ]): Generator<T>
  export function numberNameResolver(number: number): [number, number];
  export function registerNumberIterator(): void;
  export function regexpNameResolver(regexp: RegExp): [number, number, number];
  export function registerRegExpIterator(): void;
  export function functionNameResolver(name: string): [number, number, number];
  export function registerFunctionIterator(
    switches: [namedSwitch: boolean, AnonymousSwitch: boolean],
  ): void;
  export function registerAll(): void;
}

export = iterateur;
