const express = require('express');
const ExpressError = require('./expressError');

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));


// Mean route
app.get('/mean',(req,res,next)=>{
    try{
        if (!req.query.nums) {
            throw new ExpressError('Invalid numbers: numbers must be separated by commas', 400)
          }
    const nums = req.query.nums.split(',').map(num => parseInt(num));
    let sum = 0;
    for(let num of nums){
        sum += parseInt(num);
    }
    const mean = sum/ nums.length;
    return res.json({operation: 'mean', value: mean});
    } catch (err) {
         next(err);
    }
});

// Median route
app.get('/median',(req,res,next)=>{
    try{
        if (!req.query.nums) {
            throw new ExpressError('Invalid numbers: numbers must be separated by commas', 400)
          }
    const nums = req.query.nums.split(',').map(num => parseInt(num));
    ;

    nums.sort((a,b)=>a-b);
    const mid = Math.floor(nums.length/2);
    if(nums.length % 2 !== 0){
        median = nums[mid];
    } else {
        median = (nums[mid-1] + nums[mid])/2;
    }
    return res.json({operation: 'median', value: median});
    } catch (err) {
        next(err);
    }   
});

// Mode route
app.get('/mode',(req,res,next)=>{
    try{
        if (!req.query.nums) {
            throw new ExpressError('Invalid numbers: numbers must be separated by commas', 400)
          }
    const nums = req.query.nums.split(',').map(num => parseInt(num));
    
    const numCount = {};
    for(let num of nums){
        numCount[num] = numCount[num] ? numCount[num] + 1 : 1;
    }
    let mode;
    let max = 0;
    for(let num in numCount){
        if(numCount[num] > max){
            mode = num;
            max = numCount[num];
        }
    }
    return res.json({operation: 'mode', value: mode});
    } catch (err) {
        next(err);
    }   
});

// All route
app.get('/all',(req,res,nexr)=>{
    try{
        if (!req.query.nums) {
            throw new ExpressError('Invalid numbers: numbers must be separated by commas', 400)
          }
    const nums = req.query.nums.split(',').map(num => parseInt(num));
    
    let sum = 0;
    for(let num of nums){
        sum += parseInt(num);
    }
    const mean = sum/ nums.length;

    nums.sort((a,b)=>a-b);
    let median;
    if(nums.length % 2 === 0){
        median = (nums[nums.length/2-1] + nums[nums.length/2])/2;
    } else {
        median = nums[Math.floor(nums.length/2)];
    }

    const numCount = {};
    for(let num of nums){
        numCount[num] = numCount[num] ? numCount[num] + 1 : 1;
    }
    let mode;
    let max = 0;
    for(let num in numCount){
        if(numCount[num] > max){
            mode = num;
            max = numCount[num];
        }
    }
    return res.json({operation: 'all', mean, median, mode});
    } catch (err) {
        next(err);
    }   
});

// Error handling middleware
app.use((req, res, next) => {
    const e = new ExpressError('Page Not Found', 404);
    next(e)
    });

// Error handling middleware
app.use((err, req, res, next) => {
    // Default error status code and message
    let status = err.status || 500;
    let message = err.message || 'Something went wrong!';

    // Send error response
    res.status(status).json({
        error: {
            message: message,
            status: status
        }
    });
});

app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000');
});