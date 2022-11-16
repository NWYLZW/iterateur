(function (root, factory) {
  if (typeof define === 'function' && define.amd) {
    // AMD. Register as an anonymous module.
    define(['exports'], factory);
  } else if (typeof exports === 'object' && typeof exports.nodeName !== 'string') {
    // CommonJS
    factory(exports);
  } else {
    // Browser globals
    factory((root.iterateur = {}));
  }
}(typeof self !== 'undefined' ? self : this, function (exports) {
  // attach properties to the exports object to define
  // the exported module properties.
  exports.INFINITY_LIMIT = -1
  exports.default = exports

  class InfinityError extends Error {
    constructor() {
      super('InfinityError');
    }
  }
  exports.InfinityError = InfinityError

  exports.range = function* (/** @type {number} */ end, start = 0, step = 1) {
    let direction = start < 0 ? -1 : 1

    if (start > end) {
      direction = -direction
    }
    for (
      let i = start;
      direction > 0 ? i < end : i > end;
      i += direction * step
    ) {
      yield i
    }
  }

  exports.registerNumberIterator = function () {
    Number.prototype[Symbol.iterator] = function* (step = 1) {
      const val = this.valueOf()
      if (Number.isNaN(val)) {
        throw new TypeError('NaN is not iterable');
      }
      if (val === Infinity) {
        let i = 0
        while (exports.INFINITY_LIMIT === -1 || i++ < exports.INFINITY_LIMIT) {
          yield Infinity
        }
        throw new InfinityError()
      }
      let start = 0, end = val
      if (!Number.isInteger(val)) {
        const [l, r] = /-?(\d+)\.(\d+)/.exec(val).slice(1)
        ;[start, end] = [+l, +r]
        if (val < 0) {
          ;[start, end] = [end, start]
        }
      }
      return yield* exports.range(end, start, step)
    }

    Number.prototype.step = function (step) {
      return [...this[Symbol.iterator](step)]
    }
  }

  exports.registerRegExpIterator = function () {
    RegExp.prototype[Symbol.iterator] = function* () {
      // /[start~]end[:step]/
      let [i0, ix = ''] = this.source
        .split('~')
      if (ix === '') {
        [ix, i0] = [i0, ix]
      }
      const [i1, i2 = '1'] = ix.split(':')

      const [start, end, step] = [i0 ? +i0 : 0,  +i1, +i2]

      return yield* exports.range(end, start, step)
    }
  }

  exports.registerAll = function () {
    exports.registerNumberIterator()
    exports.registerRegExpIterator()
  }
}));
