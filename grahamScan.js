import {drawCircle, repaint, drawStack} from './index.js'
export function CH(array, canvas = undefined) {
  let arr = [...array];

  const calcAngle = function (p0, p1) {
    let y = p1.y - p0.y;
    let x = p1.x - p0.x;
    return (Math.atan2(y, x) * 180) / Math.PI;
  };

  const crossProduct = (p1, p2, p3) =>
    (p2.x - p1.x) * (p3.y - p1.y) - (p2.y - p1.y) * (p3.x - p1.x);

  let indexMinY = 0;

  for (let i = 1; i < arr.length; ++i) {
    if (arr[i].y < arr[indexMinY].y) {
      indexMinY = i;
    }
    if (arr[i].y == arr[indexMinY].y && arr[i].x < arr[indexMinY].x) {
      indexMinY = i;
    }
  }

  let P0 = arr.splice(indexMinY, 1)[0];
  arr.forEach((p) => {
    p.polarAngle = calcAngle(P0, p);
  });

  arr.sort((a, b) => a.polarAngle - b.polarAngle);

  let stack = [];
  stack.push(P0);
  stack.push(arr[0]);
  let i = 1;

  if (canvas === undefined) {
    for (let i = 1; i < arr.length; ++i) {
      while (
        crossProduct(
          stack[stack.length - 2],
          stack[stack.length - 1],
          arr[i]
        ) <= 0
      ) {
        stack.pop();
        if (stack.length < 2) break;
      }
      stack.push(arr[i]);
    }
  } else {
    let i = 0;
    let foundConvex = false;
    let interval = setInterval(()=>{
      if(i == arr.length - 1){
        clearInterval(interval);
        foundConvex = true;
        drawStack(stack, foundConvex);
      }
      while (
        crossProduct(
          stack[stack.length - 2],
          stack[stack.length - 1],
          arr[i]
        ) <= 0
      ) 
      {
        stack.pop();
        if (stack.length < 2) break;
      }
      stack.push(arr[i]);
    
    repaint();
    array.forEach( p => {
      drawCircle(p);
    });
    drawStack(stack, foundConvex);
    i++;
    }, 1000/5)
  }



  return stack;
}
