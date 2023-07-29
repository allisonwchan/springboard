// Quick Question 1
new Set([1,1,2,2,3,4]); // {1,2,3,4}


// Quick Question 2
[...new Set("referee")].join(""); // "ref"


// Quick Question 3
let m = new Map();
m.set([1,2,3], true); 
m.set([1,2,3], false); // 0: {Array(3) => true} 1: {Array(3) => false}


// hasDuplicate function
const hasDuplicate = (arr) => new Set(arr).size === arr.length;


// vowelCount function
const vowelCount = (str) => {
    const vowels = new Set(['a', 'e', 'i', 'o', 'u']);
    const vowelCounts = new Map();

    for (let char of str) {
        let ltr = char.toLowerCase();
        if (vowels.has(ltr)) {
            if (vowelCounts.has(ltr)) {
                vowelCounts.set(ltr, vowelCounts.get(ltr)+1);
            } else {
                vowelCounts.set(ltr, 1);
            }
        }
    }

    return vowelCounts;
}

// turn str into set and then filter out unique letters?
// if vowel in set then add to map