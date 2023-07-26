// ES5 Format
function double(arr) {
  return arr.map(function(val) {
    return val * 2;
  });
}

// ES2015 Format
const double = arr => arr.map(val => val * 2);






// ES5 Format
function squareAndFindEvens(numbers){
    var squares = numbers.map(function(num){
      return num ** 2;
    });
    var evens = squares.filter(function(square){
      return square % 2 === 0;
    });
    return evens;
  }

// ES2015 Format
const squareAndFindEvens = numbers => numbers.map(val => val ** 2).filter(square => square % 2 === 0);
