# Iterateur

A powerful iterator for JavaScript.

# How to use

## Node.js
```js
require('iterateur');

console.log([...10]); // [ 0, 1, 2, 3, 4, 5, 6, 7, 8, 9 ]
console.log([...-10]); // [ 0, -1, -2, -3, -4, -5, -6, -7, -8, -9 ]
console.log([...2.5]); // [ 2, 3, 4 ]
console.log([...-2.5]); // [ 5, 4, 3 ]
console.log([...10.2]); // [ 10, 9, 8, 7, 6, 5, 4, 3 ]
console.log([...-5.2]); // [ 2, 3, 4 ]
console.log([...10..step(2)]); // [ 0, 2, 4, 6, 8 ]

console.log([.../10/]); // [ 0, 1, 2, 3, 4, 5, 6, 7, 8, 9 ]
console.log([.../-10/]); // [ 0, -1, -2, -3, -4, -5, -6, -7, -8, -9 ]
console.log([.../2~5/]); // [ 2, 3, 4 ]
console.log([.../10:2/]); // [ 0, 2, 4, 6, 8 ]
console.log([.../1~10:2/]); // [ 1, 3, 5, 7, 9 ]
```
