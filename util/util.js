export const create2Darray = (rows, columns) => {
    let arr = new Array(rows);
    for(let i = 0; i < rows; i++) arr[i] = new Array(columns);
    return arr;
}

export const createMaze = (arr, probability) => {
    for(let i = 0; i < arr.length; i++){
        for(let j = 0; j < arr[i].length; j++){
            arr[i][j] = probability > Math.random() ?  true : false;
        }
    }
    return arr;
}

export const setUpMaze = (r, c, p) => createMaze(create2Darray(r, c), p);


function getSmallestF(arr){
	var ans = 0;
	for(var i = 1; i < arr.length; i++ ){
		if(openSet[i].f < arr[ans].f){
			ans = i;
		}
	}
	return ans;
}

function removeFromArray(arr, a){
	for(var i = arr.length - 1 ; i >= 0; i--){
		if(arr[i] === a){
			arr.splice(i, 1);
		}
	}
}


export const createRandomPoints = (number, limitX, limitY) =>{
    let arr = [];
    for(let i = 0; i < number; i++){
        arr.push(
            	{
					x : randomNumber(limitX * .10, limitX - limitX * .10),
					y : randomNumber(limitY * .10, limitY - limitY * .10)
				}
	        );
	}
	return arr;
}

const randomNumber = (min, max) => {  
    return Math.random() * (max - min) + min; 
}  

