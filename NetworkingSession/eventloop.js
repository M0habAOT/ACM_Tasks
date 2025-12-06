// Blocking / non blocking 

// Blocking => Read / write file - setTimeOut - setInterval - promises 

let fs = require("fs");


let x = 0;

setTimeout(() => {
    x = x + 4;
    x = x * 2;
}, 3000)

setTimeout(() => {
    x = x - 2;
    x = x / 2
}, 3000)

setTimeout(() => {
    console.log(x)
}, 4000)

