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

  RegExp.prototype[Symbol.iterator] = function* () {
    // /[start~]end[:step]/
    let [i0, ix = ''] = this.source
      .split('~')
    if (ix === '') {
      [ix, i0] = [i0, ix]
    }
    const [i1, i2 = '1'] = ix.split(':')

    const [start, end, step] = [i0 ? +i0 : 0,  +i1, +i2]

    let direction = start > end ? -1 : 1

    if (end < 0) {
      direction = -1
    }

    for (
      let i = start;
      direction > 0 ? i < end : i > end;
      i += step * direction
    ) {
      yield i
    }
  }

  module
    && typeof module === 'object'
    && typeof module.exports === 'object'
    && (module.exports = exports)
})(module);
