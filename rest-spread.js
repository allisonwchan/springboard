// ES5 Format
// function filterOutOdds() {
//     var nums = Array.prototype.slice.call(arguments);
//     return nums.filter(function(num) {
//       return num % 2 === 0
//     });
//   }

// ES2015 Format
const filterOutOdds = (...args) => args.filter(num => num % 2 === 0);




// findMin
const findMin = (...args) => Math.min(...args);


// mergeObjects
const mergeObjects = (obj1, obj2) => ({...obj1, ...obj2});


// doubleAndReturnArgs
const doubleAndReturnArgs = (arr, ...args) => [...arr, ...args.map(num => num * 2)];




/** remove a random element in the items array
and return a new array without that item. */
const removeRandom = items => {
    let randomIdx = Math.floor(Math.random() * items.length);
    // let deletedItem = items.splice(randomIdx, 1);
    // return items;
    return [...items.slice(0, randomIdx), ...items.slice(randomIdx + 1)];
}


/** Return a new array with every item in array1 and array2. */
const extend = (array1, array2) => [...array1, ...array2];


/** Return a new object with all the keys and values
from obj and a new key/value pair */
const addKeyVal = (obj, key, val) => {
    let newObj = {...obj};
    newObj[key] = val;
    return newObj;
}

/** Return a new object with a key removed. */
const removeKey = (obj, key) => {
    let newObj = {...obj};
    delete newObj[key];
    return newObj;
}


/** Combine two objects and return a new object. */
const combine = (obj1, obj2) => ({...obj1, ...obj2});


/** Return a new object with a modified key and value. */
const update = (obj, key, val) => {
    let newObj = {...obj};
    newObj[key] = val;
    return newObj;
}