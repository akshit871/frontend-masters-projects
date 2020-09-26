// TODO: define polyfill for `Object.is(..)`
if (!Object.is) {
  Object.is = function ObjectIs(par1, par2) {
    function isNegZero(val) {
      // check if number is either of 0 or -0
      if (val === 0) {
        // check if number is -0
        if (1 / val === -Infinity) {
          return true;
        }
        return false;
      }
    }
    function isNaN(val) {
      // A NaN is the only value which is not equal to itself
      if (val !== val) {
        return true;
      }
      return false;
    }

    if (isNegZero(par1) && isNegZero(par2)) {
      return true;
    } else if (isNaN(par1) && isNaN(par2)) {
      return true;
    } else if (par1 === par2) {
      return true;
    }
    return false;
  };
}

// tests:
console.log(Object.is(42, 42) === true);
console.log(Object.is("foo", "foo") === true);
console.log(Object.is(false, false) === true);
console.log(Object.is(null, null) === true);
console.log(Object.is(undefined, undefined) === true);
console.log(Object.is(NaN, NaN) === true);
console.log(Object.is(-0, -0) === true);
console.log(Object.is(0, 0) === true);

console.log(Object.is(-0, 0) === false);
console.log(Object.is(0, -0) === false);
console.log(Object.is(0, NaN) === false);
console.log(Object.is(NaN, 0) === false);
console.log(Object.is(42, "42") === false);
console.log(Object.is("42", 42) === false);
console.log(Object.is("foo", "bar") === false);
console.log(Object.is(false, true) === false);
console.log(Object.is(null, undefined) === false);
console.log(Object.is(undefined, null) === false);
