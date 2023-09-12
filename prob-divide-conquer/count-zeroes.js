function countZeroes(arr) {
    let firstZeroIdx = findFirst(arr)
    if (firstZeroIdx === -1) return 0;

    return arr.length - firstZeroIdx;
}

function findFirst(arr, low=0, high=arr.length-1) {
    if (high >= low) {

        // find middle of arr
        let mid = low + Math.floor((high - low) / 2)

        // if at the spot where there is a 1 in front of 0, return mid (idx where 0 occurs)
        if ((mid === 0 || arr[mid-1] === 1) && (arr[mid] === 0)) {
            return mid;

        // if only 1s in arr, perform function on right half of array
        } else if (arr[mid] === 1) {
            return findFirst(arr, mid+1, high)
        }

        return findFirst(arr, low, mid-1)
    }

    return -1;
}