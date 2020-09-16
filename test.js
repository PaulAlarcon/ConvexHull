import {CH} from './grahamScan.js'

const context = document.querySelector("#myCanvas").getContext("2d");
const height = context.canvas.height;
const width = context.canvas.width;
const scale = 50;
const portion = 5;
const numberYLines = height / scale;
const numberXLines = width / scale;

let ans;

function canvasPaint(){
  context.beginPath();
  context.fillStyle = "white";
  context.fillRect(0, 0, context.canvas.width, context.canvas.height);
  context.stroke();
}

function drawLine(x1, y1, x2, y2, color = "black", lineW = 1) {
  context.beginPath();
  context.moveTo(x1, y1); // Move the pen to (x1, y1)
  context.lineTo(x2, y2); // Draw a line to (x2, y2)
  context.strokeStyle = color;
  context.lineWidth = lineW;
  context.stroke();
}

function drawCircle(p, color = "blue") {
  context.beginPath();
  context.arc(
    p.x * scale,
    height - p.y * scale,
    scale / portion,
    0,
    2 * Math.PI
  );
  context.fillStyle = color;
  context.fill();
}

function drawGrid(){
  for (let i = 1; i < numberYLines; ++i) drawLine(i * scale, 0, i * scale, height);
  for (let i = 1; i < numberXLines; ++i) drawLine(0, i * scale, width, i * scale);
}

canvasPaint();
drawGrid();

let arrPoints = [

];

// arrPoints.forEach( p => drawCircle(p));
// let ans = CH(arrPoints);
// drawConvexHull()

const rect = context.canvas.getBoundingClientRect();

let div = document.createElement("DIV");
document.body.appendChild(div);
div.style.position = "absolute";
div.style.left = 0;
div.style.top = 0;
div.style.backgroundColor = "black";
div.style.width = "auto";
div.style.height = "auto";
div.style.color = "white";
div.style.pointerEvents = "none";
div.style.display = "none";

context.canvas.addEventListener("mousemove", (evt) => {
  div.style.display = "block";
  let x = evt.clientX - rect.left;
  let y = height - (evt.clientY - rect.top);

  div.style.left = evt.clientX + 20 + "px";
  div.style.top = evt.clientY + "px";

  div.innerHTML = "x: " + x/scale + " y: " + y/scale;
});

context.canvas.addEventListener("click", (evt) => {
  let x = (evt.clientX - rect.left)/scale;
  let y =(height - (evt.clientY - rect.top))/scale;
  arrPoints.push({x, y});
  canvasPaint();
  drawGrid();
  arrPoints.forEach( p => drawCircle(p));
  console.log(arrPoints);
  if(arrPoints.length > 2){
    ans = CH(arrPoints);
    console.log(ans);
    drawConvexHull()
  }

});




function drawConvexHull(){
  ans.forEach((p,index) => {
    let next = (index === ans.length - 1) ? 0 : (index + 1);
    drawCircle(p, "red");
    let x1, y1, x2, y2;
    x1 = p.x * scale;
    y1 = height - p.y * scale;
    let nextPoint = ans[next];
    x2 = nextPoint.x * scale;
    y2 = height - nextPoint.y * scale;
    drawLine(x1, y1, x2, y2, "green", 10);
})
}


