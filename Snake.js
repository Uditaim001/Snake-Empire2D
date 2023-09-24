let inputDir={x:0,y:0};
let gameover=new Audio('gameover.mp3');
let foodSound=new Audio('food.mp3');
let music=new Audio('music.mp3');
let move=new Audio('move.mp3');
let speed=7;
let score=0;
let lasttime=0;
snakeArr=[
    { x: 11,y: 15}
];
food={x:6,y:7};
function isCollide(snake){
    for(let i=1;i<snakeArr.length;i++){
    if(snake[0].x===snake[i].x && snake[0].y===snake[i].y){
        return true;
    }}
    if(snake[0].x>=18 || snake[0].x<=0 || snake[0].y>=18 || snake[0].y<=0){
       return true;
}
}
function main(ctime){
    music.play()
    window.requestAnimationFrame(main)
    if((ctime-lasttime)/1000 < 1/speed){
        return;
    }
    lasttime=ctime;
    gameEngine();
}
function gameEngine(){
    if(isCollide(snakeArr)){
        gameover.play()
        music.pause()
        inputDir={x:0,y:0};
        alert('Game over!!!!!!!!!!!Press any key to play again');
        snakeArr=[{x:11,y:15}];
        score=0;
    }
    if(snakeArr[0].x===food.x && snakeArr[0].y===food.y){
        foodSound.play();
        snakeArr.unshift({x:snakeArr[0].x+inputDir.x , y:snakeArr[0].y+inputDir.y});
        score+=1
        if(score>hiscoreval){
            hiscoreval=score;
            localStorage.setItem('hiscore',JSON.stringify(hiscoreval));
            hiscorebox.innerHTML="Hiscore:"+hiscoreval;
        }
        scorebox.innerHTML="Score:"+score;
        let a=2;
        let b=16;
        food={x:Math.round(a+(b-a)*Math.random()),y:Math.round(a+(b-a)*Math.random())}
        
    }
    for(let i=snakeArr.length-2; i>=0; i--){
        snakeArr[i+1]={...snakeArr[i]}
    }
    snakeArr[0].x += inputDir.x;
    snakeArr[0].y += inputDir.y;
    board.innerHTML = "";
    snakeArr.forEach((e, index)=>{
        snakeElement = document.createElement('div');
        snakeElement.style.gridRowStart = e.y;
        snakeElement.style.gridColumnStart = e.x;
        if(index === 0){
        snakeElement.classList.add('head');}
        else{
           snakeElement.classList.add('snake'); 
        }
        board.appendChild(snakeElement);
    });
    foodElement = document.createElement('div');
    foodElement.style.gridRowStart = food.y;
    foodElement.style.gridColumnStart = food.x;
    foodElement.classList.add('food');
    board.appendChild(foodElement);
}
let hiscore=localStorage.getItem('hiscore');
if(hiscore===null){
    hiscoreval=0
    localStorage.setItem('hiscore',JSON.stringify(hiscoreval));
}
else{
    hiscoreval=JSON.parse(hiscore)
    hiscorebox.innerHTML="Hiscore:"+ hiscore;
}
window.requestAnimationFrame(main);
window.addEventListener('keydown',e=>{
     inputDir={x:0,y:1}
     switch(e.key){
        case'ArrowUp':
        move.play();
        inputDir.x=0;
        inputDir.y=-1;
        break;
        case'ArrowDown':
        move.play();
        inputDir.x=0;
        inputDir.y=1;
        break; 
        case'ArrowLeft':
        move.play();
        inputDir.x = -1;
        inputDir.y=0;
        break; 
        case'ArrowRight':
        move.play();
        inputDir.x=1;
        inputDir.y=0;
        break; 
        default:
            break;  
     }
})