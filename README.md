# Iterateur

A powerful iterator for JavaScript.

[![npm][npm]][npm-url]
[![node][node]][node-url]
[![size][size]][size-url]

[//]: # ([![coverage][cover]][cover-url])
[//]: # ([![tests][tests]][tests-url])

# How to use

## Node.js

* by require `node -r iterateur/register`
* by optional require
  * `require('iterateur').registerNumberIterator()`
  * `require('iterateur').registerRegExpIterator()`
  * ...

## Browser

TODO

## Demo

### Number
```js
console.log([...10]); // [ 0, 1, 2, 3, 4, 5, 6, 7, 8, 9 ]
console.log([...-10]); // [ 0, -1, -2, -3, -4, -5, -6, -7, -8, -9 ]
console.log([...2.5]); // [ 2, 3, 4 ]
console.log([...-2.5]); // [ 5, 4, 3 ]
console.log([...10.2]); // [ 10, 9, 8, 7, 6, 5, 4, 3 ]
console.log([...-5.2]); // [ 2, 3, 4 ]
console.log([...10..step(2)]); // [ 0, 2, 4, 6, 8 ]

console.log([...NaN]); // throw TypeError
console.log([...Infinity]); // a infinite iterator
console.log([...-Infinity]); // a infinite iterator
```

### RegExp
```js
console.log([.../10/]); // [ 0, 1, 2, 3, 4, 5, 6, 7, 8, 9 ]
console.log([.../-10/]); // [ 0, -1, -2, -3, -4, -5, -6, -7, -8, -9 ]
console.log([.../2~5/]); // [ 2, 3, 4 ]
console.log([.../10:2/]); // [ 0, 2, 4, 6, 8 ]
console.log([.../1~10:2/]); // [ 1, 3, 5, 7, 9 ]
```

### Function
```js
console.log([...function i2_20$3(i) {
  return i < 10 ? `foo-${i}` : null;
}]);
// [ 'foo-2', 'foo-5', 'foo-9' ]
console.log([...() => [
  50,
  i => i < 10 ? `foo-${i}` : null
]]);
// [ 'foo-2', 'foo-5', 'foo-9' ]
```

[npm]:       https://img.shields.io/npm/v/iterateur.svg
[npm-url]:   https://npmjs.com/package/iterateur
[node]:      https://img.shields.io/node/v/iterateur.svg
[node-url]:  https://nodejs.org
[tests]:     https://github.com/webpack-contrib/iterateur/workflows/iterateur/badge.svg
[tests-url]: https://github.com/webpack-contrib/iterateur/actions
[cover]:     https://codecov.io/gh/webpack-contrib/iterateur/branch/master/graph/badge.svg
[cover-url]: https://codecov.io/gh/webpack-contrib/iterateur
[size]:      https://packagephobia.now.sh/badge?p=iterateur
[size-url]:  https://packagephobia.now.sh/result?p=iterateur
