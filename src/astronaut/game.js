const canvas=document.querySelector('#game');
const game= canvas.getContext('2d');
const SpanVidas=document.querySelector('#vidas');
const time=document.querySelector('#time');
let SizeCanvas;
let SizeElemnts;
let NNivel=0;
let vidas=3;
let timeStart;
let  poscision={
    x:undefined,
    y:undefined,
};
let poscisionMeta =
{
    x:undefined,
    y:undefined,
};
let poscisionAgujeros= []

const btnUp=document.querySelector('#up');
const btnLeft=document.querySelector('#left');
const btnRigth=document.querySelector('#right');
const btnDown=document.querySelector('#down');

window.addEventListener('load',CanvasResponsive);
window.addEventListener('resize',CanvasResponsive);
function fixNunmber(n){
    return Number(n.toFixed(0));
}

function CanvasResponsive(){

    if(window.innerHeight >window.innerWidth)
    {
        SizeCanvas= window.innerWidth*0.7;
    }
    else{
        SizeCanvas= window.innerHeight*0.7;
    }
    SizeCanvas= Number(SizeCanvas.toFixed(0));
    canvas.setAttribute('width',SizeCanvas)
    canvas.setAttribute('height',SizeCanvas)
    
   SizeElemnts= (SizeCanvas/10);
   poscision.x=undefined;
   poscision.y=undefined;
   starGame();
}
function starGame() {

    game.font = SizeElemnts + "px Verdana";
    game.textAlign = 'end';

    const map = maps[NNivel];
    if(!map)
    {
        TerminarJuego();
        return;
    }
    const mapRows = map.trim().split('\n');
    const mapRowCols = mapRows.map(row => row.trim().split(''));
    console.log({map, mapRows, mapRowCols});
    MostarVidas();
    poscisionAgujeros = []; 
    game.clearRect(0,0,SizeCanvas, SizeCanvas);
    mapRowCols.forEach((row, rowI) => {
      row.forEach((col, colI) => {
        const emoji = emojis[col];
        const posX = SizeElemnts * (colI + 1);
        const posY = SizeElemnts * (rowI + 1);
  
        if (col == 'O') {
            if(!poscision.x && !poscision.y)
            {
                poscision.x=posX;
                poscision.y=posY;
            }
        }else if(col == 'I')
        {
            poscisionMeta.x= posX;
            poscisionMeta.y=posY;
        }else if(col == 'X')
        {
            poscisionAgujeros.push({
                x:posX.toFixed(3),
                y:posY.toFixed(3)
            });
        }
  
        game.fillText(emoji, posX, posY);
      });
    });
    
   movePlayer();
  }
  function movePlayer(){
    const LLegaMetaX= poscision.x.toFixed(3) == poscisionMeta.x.toFixed(3);
    const LLegaMetaY= poscision.y.toFixed(3) == poscisionMeta.y.toFixed(3);
    const LlegaMeta= LLegaMetaX && LLegaMetaY;
    if(LlegaMeta)
    {
        SubirNivel();

    }
    const entraAgujero = poscisionAgujeros.find( agujero => {
        const entraAgujeroX =agujero.x == poscision.x.toFixed(3);
        const entraAgujeroY= agujero.y == poscision.y.toFixed(3);
        return entraAgujeroX && entraAgujeroY;
    });
    if(entraAgujero)
    {
        caida();
    }
    game.fillText(emojis['PLAYER'], poscision.x, poscision.y);
    
  }

btnUp.addEventListener('click',moveUp);
btnDown.addEventListener('click',moveDown);
btnLeft.addEventListener('click',moveLeft);
btnRigth.addEventListener('click',moveRight);

function moveUp(){
    console.log("Mover arriba");
    if(poscision.y<SizeElemnts){
        alert("Perdiste")
    }
    else{
        poscision.y -= SizeElemnts;
        starGame();
    }

}
function moveDown(){
    console.log("Mover abajo");
    if(poscision.y>SizeElemnts*9){
        alert("Perdiste")
    }
    else{
    poscision.y += SizeElemnts;
    starGame();
    }
}
function moveLeft(){
    console.log("Mover Izquierda");
    if(poscision.x <=SizeElemnts)
    {
        alert("Perdiste")
    }else{   
    poscision.x -= SizeElemnts;
    starGame();
    }
}
function moveRight(){
    console.log("Mover Derecha");
    if(poscision.x >SizeElemnts*10){
        alert("Perdiste")
    }else{
        poscision.x += SizeElemnts;
        starGame();
    }
    
}
function SubirNivel(){

    NNivel++;
    vidas=3;
    starGame();
}
function TerminarJuego(){

}
function caida(){
    vidas--;
    if(vidas <=0)
    {
        NNivel=0;
        vidas=3;
    }

    poscision.x =undefined;
    poscision.y =undefined;
    starGame();

}
function MostarVidas(){
 let CantidadVidas = Array(vidas).fill(emojis['HEART']);
 SpanVidas.innerHTML= "";
  CantidadVidas.forEach(corazon => SpanVidas.append(corazon));
}
function MostrarTiempo(){

}
const changeDirection= (e) =>{
    console.log(e);
    if(e.key === "ArrowUp"  )
    {
        moveUp();
    }else if(e.key === "ArrowDown" )
    {
       moveDown()
    }else if(e.key === "ArrowLeft" )
    {
        moveLeft();
    }else if(e.key === "ArrowRight" )
    {
        moveRight();
    }

}

document.addEventListener("keydown",changeDirection)