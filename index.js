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

  exports.regexpNameResolver = function (/** @type {RegExp} */ regexp) {
    // /[start~]end[:step]/
    let [i0, ix = ''] = regexp.source
      .split('~')
    if (ix === '') {
      [ix, i0] = [i0, ix]
    }
    const [i1, i2 = '1'] = ix.split(':')

    return [i0 ? +i0 : 0,  +i1, +i2]
  }

  exports.registerRegExpIterator = function () {
    RegExp.prototype[Symbol.iterator] = function* () {
      const [start, end, step] = exports.regexpNameResolver(this)
      return yield* exports.range(end, start, step)
    }
  }

  exports.functionNameResolver = function (/** @type {string} */ name) {
    // i[start_]end[$step][_functionName]
    const [
      i0 = 0,
      i1,
      i2 = 1
    ] = /i(\d+)?_(\d+)(?:\$(\d+))?/.exec(name)?.slice(1) ?? []

    if (!name.startsWith('i')) {
      throw new TypeError('Invalid function name, must start with "i"')
    }
    if ([i0, i1, i2].some(v => Number.isNaN(+v))) {
      throw new TypeError('Invalid function name, must be i[start_]end[$step][_functionName]')
    }

    return [+i0, +i1, +i2]
  }

  exports.registerFunctionIterator = function ([
    /** @type {boolean} */ s0 = false,
    /** @type {boolean} */ s1 = false
  ]) {
    if (!s0 && !s1) return

    Function.prototype[Symbol.iterator] = function* () {
      /** @type {[number, number, number]} */
      let [start, end, step] = []
      let func = this
      if (this.name) {
        if (!s0) {
          throw new TypeError('Function name is not allowed iterator')
        }
        [start, end, step] = exports.functionNameResolver(this.name)
      } else {
        if (!s1) {
          throw new TypeError('Anonymous function is not allowed iterator')
        }
        [expr, func] = func()
        switch (typeof expr) {
          case 'string':
            [start, end, step] = exports.functionNameResolver(expr)
            break
          case 'number':
            throw new Error('Not implemented')
          case 'object':
            if (expr instanceof RegExp) {
              [start, end, step] = exports.regexpNameResolver(expr)
            }
            break
          default:
            throw new TypeError('Invalid expression')
        }
      }
      for (let i of exports.range(end, start, step)) {
        yield func(i)
      }
    }
  }

  exports.registerAll = function () {
    exports.registerNumberIterator()
    exports.registerRegExpIterator()
    exports.registerFunctionIterator([true, true])
  }
}));
