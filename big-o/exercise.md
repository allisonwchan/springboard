# Part One
1. O(n + 10) => O(n)
2. O(100 * n) => O(n)
3. O(25) => O(1)
4. O(n<sup>2</sup> + n<sup>3</sup>) => O(n<sup>3</sup>)
5. O(n + n + n + n) => O(n)
6. O(1000 * log(n) + n) => O(n)
7. O(1000 * n * log(n) + n) => O(n log n)
8. O(2<sup>n</sup> + n<sup>2</sup>) => O(2<sup>n</sup>)
9. O(5 + 3 + 1) => O(1)
10. O(n + n<sup>1/2</sup> + n<sup>2</sup> + n * log(n)<sup>10</sup>) => O(n<sup>2</sup>)

# Part Two
    function logUpTo(n) {
        for (let i = 1; i <= n; i++) {
        console.log(i);
        }
    }
Time complexity: O(n)

    function logAtLeast10(n) {
        for (let i = 1; i <= Math.max(n, 10); i++) {
            console.log(i);
        }
    }
Time complexity: O(n)

    function logAtMost10(n) {
        for (let i = 1; i <= Math.min(n, 10); i++) {
            console.log(i);
        }
    }
Time complexity: O(1)

    function onlyElementsAtEvenIndex(array) {
        let newArray = [];
        for (let i = 0; i < array.length; i++) {
            if (i % 2 === 0) {
            newArray.push(array[i]);
            }
        }
        return newArray;
    }
Time complexity: O(n)

    function subtotals(array) {
        let subtotalArray = [];
        for (let i = 0; i < array.length; i++) {
            let subtotal = 0;
            for (let j = 0; j <= i; j++) {
                subtotal += array[j];
            }
            subtotalArray.push(subtotal);
        }
        return subtotalArray;
    }
Time complexity: O(n<sup>2</sup>)

    function vowelCount(str) {
        let vowelCount = {};
        const vowels = "aeiouAEIOU";

        for (let char of str) {
            if(vowels.includes(char)) {
            if(char in vowelCount) {
                vowelCount[char] += 1;
            } else {
                vowelCount[char] = 1;
            }
            }
        }

        return vowelCount;
    }
Time complexity: O(n)

# Part Three
1. True or false: n<sup>2</sup> + n is O(n<sup>2</sup>). _True_
2. True or false: n<sup>2</sup> * n is O(n<sup>3</sup>). _True_
3. True or false: n<sup>2</sup> + n is O(n). _False_
4. What’s the time complexity of the .indexOf array method? _O(n)_
5. What’s the time complexity of the .includes array method? _O(n)_
6. What’s the time complexity of the .forEach array method? _O(n)_
7. What’s the time complexity of the .sort array method? _O(n log n)_
8. What’s the time complexity of the .unshift array method? _O(1)_
9. What’s the time complexity of the .push array method? _O(n)_
10. What’s the time complexity of the .splice array method? _O(n)_
11. What’s the time complexity of the .pop array method? _O(1)_
12. What’s the time complexity of the Object.keys() function? _O(n)_