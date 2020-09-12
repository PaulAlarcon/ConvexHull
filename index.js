import * as Canvas from "./util/canvas.js";
import * as Util from "./util/util.js";

let number = 10;
let limitX = 400;
let limitY = 400;

let arr = Util.createRandomPoints(number, limitX, limitY);

arr.forEach( p => {Canvas.drawCircle(p.x, p.y, 8, 'white')});

const calcAngle = (p0, p1) =>  Math.atan2(p0.y - p1.y/ p0.x - p0.x);


const distance = (p0, p1) => ( Math.pow(p0.y - p1.y,2) + Math.pow(p0.x - p1.x,2))

const det = (p1, p2, p3) => ((p2.x - p1.x) * (p3.y - p1.y)) - ((p2.y - p1.y) * (p3.x - p1.x));


//if det is..
// + represents counter clock wise 
// - represents clock wise 

let indexMinY = 0;

for(let i = 1; i < arr.length; ++i){
    if(arr[i].y < arr[indexMinY].y ){
        indexMinY = i;
    }
    if(arr[i].y == arr[indexMinY].y && arr[i].x < arr[indexMinY].x){
        indexMinY = i;
    }
}

let P0 = arr.splice(indexMinY, 1)[0];

arr.map((p) => {
    p.polarAngle = calcAngle(p.y - P0.y, p.x - P0.x );
})

arr.sort( (a,b) => a.polarAngle - b.polarAngle);
Canvas.drawCircle(P0.x, P0.y, 15, "yellow");

let stack = [];
stack.push(P0);
stack.push(arr[0]);
let i = 1;

for(let i = 1; i < arr.length; ++i){
    while(det( stack[stack.length - 2], stack[stack.length - 1], arr[i]) <= 0){
        stack.pop();
        if(stack.length < 2) break;
    }
    stack.push(arr[i]);
}


stack.forEach((p, index) => {
    Canvas.drawCircle(p.x, p.y, 10, 'red')
});

console.log(stack.length);