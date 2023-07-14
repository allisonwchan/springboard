// STRING TEMPLATES
// let msg = `i am ${1+1+1} yrs old`;

// function printReceipt(product, qty, price) {
//     return `${product} * ${qty} = ${qty * price}`;
// }

// // desired function output: butter * 4 = 3.50
// printReceipt('butter', 4, 3.50);

// FOR...OF LOOPS
// let colors = ['red', 'teal', 'cyan', 'yellow']
// // for (let i = 0; i < colors.length; i++) {
// //     console.log(colors[i])
// // }

// for (let color of colors){
//     console.log(color)
// }

// FOR...IN LOOPS
// const chicken = {
//     name: "Lady Gray",
//     age: 4,
//     color: "Black"
// }

// for (let prop in chicken) {
//     console.log(`${prop}->${chicken[prop]}`)
// }

function countDown(time){
    let timer = setInterval(function(){
      time--;
      if(time <= 0){
        clearInterval(timer);
        console.log('DONE!');
      }
      else {
        console.log(time);
      }
  
    },1000)
  }

countDown(4);

function randomGame() {
    let counter = 0;
    let timer = setInterval(function(){

        let num = Math.random(); 

        if (num > 0.75) {
            clearInterval(timer);
            console.log(num);
            console.log(`Number of tries: ${counter}`);
        }

        else {
            counter++;
            console.log(num);
        }

    }, 1000)
}

randomGame();

/*

JS KNOW HOW

Commenting out line(s)
    ctrl + /
    
Declaring variables
    var: can reassign & redeclare, function scope
    let: can reassign, cannot redeclare, block scope
    const: cannot reassign & redeclare, block scope

    If const is an array, can still change the array via push, pop, etc

String templates
    Initiate using `` keys (located on ~ key!)

For...of vs for...in loops
    For...of used on iterables (arrays, strings, etc)
    For...in used on non-iterables (objects aka key-value pairs, etc)

    If for...in used on iterable like array, will iterate using indices, not elements
    Arrays/strings are like special key-value pairs: key = indices, value = elements

Finally
    In try...catch, finally can be used to close files when writing to files
    */