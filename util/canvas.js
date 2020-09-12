let canvasDiv = document.querySelector("#canvas-container");
export let context = document.querySelector("#myCanvas").getContext("2d");

const repaint = () => {
  context.beginPath();
  context.fillStyle = "black";
  context.fillRect(0, 0, context.canvas.width, context.canvas.height);
  context.stroke();
};

export const render = () => {
  context.canvas.width = 400;
  // Math.floor(canvasDiv.offsetWidth/100)*100;
  context.canvas.height = 400;
  //  Math.floor(canvasDiv.offsetHeight/100)*100;
};

export const draw = () => {
  repaint();
};

render();
draw();

export const drawCircle = (x, y, size, color = "white") => {
  context.beginPath();
  context.arc(x, y, size, 0, 2 * Math.PI);
  context.fillStyle = color;
  context.fill();
};

export const DrawRect = (x, y, width, height, color = "white") => {
  context.fillStyle = color;
  context.fillRect(x, y, width, height); 
}

export const drawLine = (x1, y1, x2, y2, color = "white") => {
  context.beginPath(); 
  context.moveTo(x1, y1); // Move the pen to (x1, y1)
  context.lineTo(x2, y2); // Draw a line to (x2, y2)
  context.strokeStyle = color;
  context.stroke();
};

export const drawMaze = (maze, cellSize) => {

	const ROWS = maze.length;
	const COLUMNS = maze[0].length;

	for(let i = 0; i < ROWS; i++)
		for(let j = 0; j < COLUMNS; j++){
		    DrawRect(
        cellSize * i,
        cellSize * j,
				cellSize - 1, 
        cellSize - 1,
        maze[i][j] == true ? 'black' : 'white'
				);
		}
}