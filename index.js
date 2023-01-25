//constant variables
let inputDir={x:0, y:0};
const foodSound=new Audio('/storage/emulated/0/snake game/Tennis.ogg');
const gameOverSound=new Audio('/storage/emulated/0/snake game/Shrink Ray.ogg');
let lastPaintTime=0;
let speed=4;
let snakearr=[
		{x:12,y:15}
	]
food={x:5,y:8};
let score;
//let up=document.getElementById('top');
//let down=document.getElementById('down');
//let left=document.getElementById('left');
//let right=document.getElementById('right');


//main functions
function main(ctime){
	window.requestAnimationFrame(main);
	//console.log(ctime);
	if((ctime - lastPaintTime)/1000 < 1/speed){
		return;
	}
	lastPaintTime=ctime;
	gameEngine();
}
function isCollide(snake){
	//if snake collide with her body
	for(let i=1; i<snakearr.length; i++){
		if(snake[i].x===snake[0].x && snake[i].y===snake[0].y){
			return true;
		}
		
	}
	//if snake cillide with walls
	if(snake[0].x>=18 || snake[0].x<=0 || snake[0].y>=18 || snake[0].y<=0){
		return true;
	}
}
function gameEngine(){
		//part 1: updatting snake array&food
		if(isCollide(snakearr)){
			gameOverSound.play();
			inputDir={x:0, y:0};
			alert("G A M E  O V E R");
			snakearr=[{x:12, y:15}];
			score=0;
			}
		//if you have eaten the food
		if(snakearr[0].y==food.y && snakearr[0].x==food.x){
			foodSound.play();
			score=score+1;
			scoreBox.innerHTML="score"+score;
			snakearr.unshift({x: snakearr[0].x+ inputDir.x, y:snakearr[0].y+ inputDir.y})
			let a=5;
			let b=15;
			food={x:Math.round(a+(b-a)*Math.random()), y:Math.round(a+(b-a)*Math.random())}
		}
		// Moving the snake
		for(let i=snakearr.length - 2;i>=0; i--){

			snakearr[i+1]={...snakearr[i]};
		}
		snakearr[0].x+= inputDir.x;
		snakearr[0].y+= inputDir.y;
		//part 2: display the snake & food
		//display snake
		board.innerHTML="";
		snakearr.forEach((e, index)=>{
				snakeElement = document.createElement('div');
				snakeElement.style.gridRowStart=e.y;
				snakeElement.style.gridColumnStart=e.x;
				
				if(index==0){
					snakeElement.classList.add('head');
				}
				else{
					snakeElement.classList.add('snake');
				}
				board.appendChild(snakeElement);
			});
		//display food
		snakearr.forEach((e, index)=>{
		foodElement = document.createElement('div');
		foodElement.style.gridRowStart=food.y;
		foodElement.style.gridColumnStart=food.x;
		foodElement.classList.add('food');
		board.appendChild(foodElement);
		});
	}

//main logic start from here
window.requestAnimationFrame(main);
window.addEventListener('keydown', e=>{
	inputDir={x:0,y:1};//start the game
	switch(e.key){
		case "ArrowUp":
			inputDir.x=0;
			inputDir.y=-1;
    	   break;
			
		case "ArrowDown":
			inputDir.x=0;
			inputDir.y=1;
	       break;
			
	    case "ArrowLeft":
			inputDir.x=-1;
			inputDir.y=0;
		   break;
		case "ArrowRight":
			inputDir.x=1;
			inputDir.y=0;
		   break;
			
		default:
		   break;	}
	
});

var up= document.getElementById('top');
var down= document.getElementById('down');
var left= document.getElementById('left');
var right= document.getElementById('right');

up.addEventListener("click",moveup);
function moveup(){
     inputDir.x=0;
     inputDir.y=-1;
}
down.addEventListener("click",movedown);
function movedown(){
     inputDir.x=0;
     inputDir.y=1;
}
left.addEventListener("click",moveleft);
function moveleft(){
     inputDir.x=-1;
     inputDir.y=0;
}
right.addEventListener("click",moveright);
function moveright(){
     inputDir.x=1;
     inputDir.y=0;
}