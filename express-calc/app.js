const express = require('express');
const CustomError = require('./error');
const { getMean, getMedian, getMode, stringToNumber } = require('./helpers');

const app = express();

app.get('/mean', (req, res) => {
    
    let nums = req.query.nums;

    if (nums.length === 0) {
        throw new CustomError("No numbers provided", 400);
    }

    const numsList = stringToNumber(nums.split(','));

    if (numsList instanceof Error) {
        throw new CustomError(numsList.message);
    }

    let result = {
        operation: "mean",
        result: getMean(numsList)
    }

    return res.send(result);
})

app.get('/median', (req, res) => {
    
    let nums = req.query.nums;

    if (nums.length === 0) {
        throw new CustomError("No numbers provided", 400);
    }

    const numsList = stringToNumber(nums.split(','));

    if (numsList instanceof Error) {
        throw new CustomError(numsList.message);
    }

    let result = {
        operation: "median",
        result: getMedian(numsList)
    }

    return res.send(result);
})

app.get('/mode', (req, res) => {
    
    let nums = req.query.nums;

    if (nums.length === 0) {
        throw new CustomError("No numbers provided", 400);
    }

    const numsList = stringToNumber(nums.split(','));

    if (numsList instanceof Error) {
        throw new CustomError(numsList.message);
    }

    let result = {
        operation: "mode",
        result: getMode(numsList)
    }

    return res.send(result);
})

/** general error handler */

app.use(function (req, res, next) {
    const err = new CustomError("Not Found",404);
  
    // pass the error to the next piece of middleware
    return next(err);
  });
  
  /** general error handler */
  
  app.use(function (err, req, res, next) {
    res.status(err.status || 500);
  
    return res.json({
      error: err,
      message: err.message
    });
  });

app.listen(3000, function() {
    console.log(`Server starting on port 3000`);
  });