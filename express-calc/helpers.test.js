const { getMean, getMedian, stringToNumber } = require('./helpers');

describe("mean", function() {
    it("calculates the mean of a list of numbers", function() {
        expect(getMean([1, 2, 3, 4])).toBe(2.5);
    })
})

describe("median", function() {
    it("calculates the median of a list of numbers", function() {
        expect(getMedian([1, 2, 3, 4, 5])).toBe(3);
    })
})

describe("mode", function() {
    it("calculates the mode of a list of numbers", function() {
        expect(getMedian([1, 2, 2, 3])).toBe(2);
    })
})

describe("validateNumbers", function() {
    it("converts a list of strings to numbers if valid", function() {
        expect(stringToNumber(['1', '2', '3', '4'])).toBe([1, 2, 3, 4]);
    })
})