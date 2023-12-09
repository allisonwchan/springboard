function getMean(nums) {
    return nums.reduce((a, b) => a + b) / nums.length;
}

function getMedian(nums) {
    nums.sort((a, b) => a - b);
    if (nums.length % 2 === 0) {
        return (nums[nums.length / 2 - 1] + nums[nums.length / 2]) / 2;
    } else {
        return nums[Math.floor(nums.length / 2)];
    }
}

function getMode(nums) {
    let freqCounter = createFrequencyCounter(arr);

    let count = 0;
    let mostFrequent;

    for (let key in freqCounter) {
        if (freqCounter[key] > count) {
        mostFrequent = key;
        count = freqCounter[key];
        }
    }

  return mostFrequent;

}

function stringToNumber(numsList) {
    let result = [];

    for (let i = 0; i < numsList.length; i++) {
        let valToNumber = Number(numsList[i]);

        if (Number.isNaN(valToNumber)) {
        return new Error(
            `The value '${numsList[i]}' at index ${i} is not a valid number.`
        );
        }

        result.push(valToNumber);
    }
    return result;
}

module.exports = {
    getMean,
    getMedian,
    getMode,
    stringToNumber
};