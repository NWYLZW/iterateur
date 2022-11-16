const iterateur = require('./index.js')

const { expect } = require('chai')

describe('Number', () => {
  iterateur.registerNumberIterator()
  it('should iterate from 0 to 10', () => {
    const numbers = [...10]
    expect(numbers).to.eql([0, 1, 2, 3, 4, 5, 6, 7, 8, 9])
  })
  it('should iterate from 0 to -10', () => {
    const numbers = [...-10]
    expect(numbers).to.eql([0, -1, -2, -3, -4, -5, -6, -7, -8, -9])
  })
  it('should iterate from 2 to 12', () => {
    const numbers = [...2.12]
    expect(numbers).to.eql([2, 3, 4, 5, 6, 7, 8, 9, 10, 11])
  })
  it('should iterate from 10 to 2', () => {
    const numbers = [...10.2]
    expect(numbers).to.eql([ 10, 9, 8, 7, 6, 5, 4, 3 ])
  })
  it('should iterate -2.5', () => {
    const numbers = [...-2.5]
    expect(numbers).to.eql([ 5, 4, 3 ])
  })
  it('should iterate -10.2', () => {
    const numbers = [...-10.2]
    expect(numbers).to.eql([2, 3, 4, 5, 6, 7, 8, 9])
  })
  it('should iterate over the number', () => {
    const numbers = [...-3]
    expect(numbers)
      .to.be.an('array')
      .that.has.lengthOf(3)
      .and.that.deep.equals([0, -1, -2])
  })
  it('should iterate over Infinity', () => {
    try {
      iterateur.INFINITY_LIMIT = 3
      ;[...Infinity]
    } catch (e) {
      expect(e).to.be.an.instanceOf(iterateur.InfinityError)
    }
    iterateur.INFINITY_LIMIT = -1
    let count = 0
    for (const i of Infinity[Symbol.iterator]()) {
      expect(i).to.equal(Infinity)
      if (count++ > 5) {
        break
      }
    }
  })
  it('should throw TypeError when NaN is iterated', () => {
    expect(() => [...NaN]).to.throw(TypeError)
  })
  it('should iterate with step', () => {
    const numbers = [...10..step(2)]
    expect(numbers).to.eql([ 0, 2, 4, 6, 8 ])
  })
})

describe('RegExp', () => {
  iterateur.registerRegExpIterator()
  it('should iterate from 0 to 10', () => {
    const numbers = [.../10/]
    expect(numbers).to.eql([0, 1, 2, 3, 4, 5, 6, 7, 8, 9])
  })
  it('should iterate from 0 to -10', () => {
    const numbers = [.../-10/]
    expect(numbers).to.eql([0, -1, -2, -3, -4, -5, -6, -7, -8, -9])
  })
  it('should iterate from 2 to 12', () => {
    const numbers = [.../2~12/]
    expect(numbers).to.eql([2, 3, 4, 5, 6, 7, 8, 9, 10, 11])
  })
  it('should iterate from 10 to 2', () => {
    const numbers = [.../10~2/]
    expect(numbers).to.eql([ 10, 9, 8, 7, 6, 5, 4, 3 ])
  })
  it('should iterate from 0 to 10 with step', () => {
    const numbers = [.../0~10:2/]
    expect(numbers).to.eql([ 0, 2, 4, 6, 8 ])
  })
})

describe('Function', () => {
  iterateur.registerFunctionIterator()
  // describe('Anonyme', () => {
  //   it('should iterate from 0 to 10', () => {
  //     const numbers = [...() => [10, i => i + 1]]
  //     expect(numbers).to.eql([1, 2, 3, 4, 5, 6, 7, 8, 9, 10])
  //   })
  // })
  describe('Named', () => {
    it('should iterate from 1 to 10', () => {
      const numbers = [...function i0_10$plusOne(i) {
        return i + 1
      }]
      expect(numbers).to.eql([1, 2, 3, 4, 5, 6, 7, 8, 9, 10])
    })
    it('should resolve the function name', () => {
      expect(iterateur.functionNameResolver('i0_10'))
        .to.eql([0, 10, 1])
      expect(iterateur.functionNameResolver('i0_10_plusOne'))
        .to.eql([0, 10, 1])
      expect(iterateur.functionNameResolver('i0_13$2_plusOne'))
        .to.eql([0, 13, 2])
      expect(iterateur.functionNameResolver('i5_13$2_plusOne'))
        .to.eql([5, 13, 2])
    })
    it('should custom the function name resolver', () => {
      const oldResolver = iterateur.functionNameResolver

      iterateur.functionNameResolver = name => name === 'any' ? [0, 10, 1] : oldResolver(name)
      expect([...function any(i) {
        return i + 1
      }]).to.eql([1, 2, 3, 4, 5, 6, 7, 8, 9, 10])

      expect([...function i0_5(i) {
        return i + 1
      }]).to.eql([1, 2, 3, 4, 5])

      iterateur.functionNameResolver = oldResolver
    })
  })
})
