const Board =document.querySelector(".Board");
const ElementoPuntaje=document.querySelector(".puntaje");
const ElementoMaximo=document.querySelector(".max-puntaje");
let gameOver=false;
let foodX,foodY;
let snakeX=11,snakeY=8;
let cuerpoSnake =[];
let velocidadX=0,velocidadY=0;
let setIntervalId;
let score=0;
let PuntajeMaximo = localStorage.getItem("max-puntaje") || 0;
ElementoMaximo.innerHTML = `Maximo Puntaje: ${PuntajeMaximo}`;
const posicioncomida =() =>{
    foodX= Math.floor(Math.random()*30) +1;
    foodY= Math.floor(Math.random()*30) +1;
}
const ManejoGameOver=() =>
{
    clearInterval(setIntervalId); 
    alert("Game Over");
    location.reload();
}
const changeDirection= (e) =>{
    console.log(e);
    if(e.key === "ArrowUp" && velocidadY != 1)
    {
        velocidadX=0;
        velocidadY=-1;
    }else if(e.key === "ArrowDown"  && velocidadY != -1)
    {
        velocidadX=0;
        velocidadY=1;
    }else if(e.key === "ArrowLeft" && velocidadX != 1)
    {
        velocidadX=-1;
        velocidadY=0;
    }else if(e.key === "ArrowRight" && velocidadX != -1)
    {
        velocidadX=1;
        velocidadY=0;
    }
   initGame();
}

const initGame =() =>
{
    if(gameOver) return ManejoGameOver();
    let Pintar = `<div class="food" style= "grid-area: ${foodY} / ${foodX}"> </div>`;
   if(snakeX === foodX && snakeY===foodY)
   {
    posicioncomida();
    cuerpoSnake.push([foodX,foodY]);
    score++;
    PuntajeMaximo = score >= PuntajeMaximo ? score : PuntajeMaximo;
    localStorage.setItem("max-puntaje",PuntajeMaximo);
    ElementoPuntaje.innerHTML = `Puntaje : ${score}`;
    ElementoMaximo.innerHTML = `Maximo Puntaje: ${PuntajeMaximo}`;
   }

   for(let i=cuerpoSnake.length -1; i>0; i--)
   {
    cuerpoSnake[i]= cuerpoSnake[i-1];
   }
    cuerpoSnake[0]=[snakeX,snakeY];

    snakeX += velocidadX;
    snakeY += velocidadY;
    if(snakeX <=0 || snakeX>30 || snakeY <=0 || snakeY>30 )
    {
        gameOver=true;
    }
    for(let i=0;i<cuerpoSnake.length;i++)
    {
     Pintar += `<div class="head" style= "grid-area: ${cuerpoSnake[i][1]} / ${cuerpoSnake[i][0]}"> </div>`;
     if(i !==0 && cuerpoSnake[0][1] === cuerpoSnake[i][1] && cuerpoSnake[0][0] === cuerpoSnake[i][0]){
        gameOver=true;
     }
    }
    Board.innerHTML= Pintar;
}
posicioncomida();
//initGame();
 setIntervalId = setInterval(initGame,125);
document.addEventListener("keydown",changeDirection)