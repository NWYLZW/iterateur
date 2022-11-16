(function (moudle) {
  var exports = {
    INFINITY_LIMIT: -1,
    default: exports,
  }

  class InfinityError extends Error {
    constructor() {
      super('InfinityError');
    }
  }
  exports.InfinityError = InfinityError

  Number.prototype[Symbol.iterator] = function* (step = 1) {
    const val = this.valueOf()
    if (Number.isNaN(val)) {
      throw new TypeError('NaN is not iterable');
    }
    if (val === Infinity) {
      let i = 0
      while (exports.INFINITY_LIMIT === -1 || i++ < exports.INFINITY_LIMIT) {
        console.log()
        yield Infinity
      }
      throw new InfinityError()
    }
    let direction = val < 0 ? -1 : 1
    let start = 0, end = val
    if (!Number.isInteger(val)) {
      const [l, r] = /-?(\d+)\.(\d+)/.exec(val).slice(1)
      ;[start, end] = [+l, +r]
      if (direction === -1) {
        ;[start, end] = [end, start]
        direction = 1
      }
      if (start > end) {
        direction = -direction
      }
    }
    for (
      let i = start;
      direction > 0 ? i < end : i > end;
      i += direction * step
    ) {
      yield i
    }
  }

  Number.prototype.step = function (step) {
    return [...this[Symbol.iterator](step)]
  }

  /**
   * rule
   * [start~]end[:step]
   */
  RegExp.prototype[Symbol.iterator] = function* () {
    const str = this.source
  }

  module
    && typeof module === 'object'
    && typeof module.exports === 'object'
    && (module.exports = exports)
})(module);
