import { paint , loadImage , linear_paint , paintbg , drawImageWithDelay} from './visuals.js';
import { paint_bon , paint_bonus } from './bonusvisuals.js';
import { check, check_bon } from './gameLogic.js';

const plusbtn = document.getElementById("plusless")
const lessbtn = document.getElementById("pluslesss")
const canvas = document.getElementById("canva");
const improve = document.getElementById("improve");
const context = canvas.getContext("2d");
const turbo = document.getElementById("turbo")
const bonusscore = document.getElementById("lowscore")
const bonustext = document.getElementById("lowscore2")

let specialType = false
let monret = 0
let in_bonus = false
let countbono = 0
let tiradas = 1
let speed = 0
let varianca = true
let monTotal = 2000
let monAposta = 20
let playing=false;

const cellWidth = (0.7 * window.innerWidth) / 5;
const cellHeight = (0.7 * window.innerHeight) / 5;
const cellWidthBon = cellWidth*1.125

const fondoAudio = document.getElementById("fondoAudio");
const soScroll = document.getElementById("sonidoScroll");

fondoAudio.play()
updateCanvasSize(canvas);
paintbg(context)
let matrix = Array.from({ length: 5 }, () => Array.from({ length: 5 }, () => Math.floor(Math.random() * 10000) + 1));

const montot = document.getElementById("montot")
const monrettxt = document.getElementById("monret")
const aposHTML = document.getElementById("bet")

async function playf(context,matrix){
  await paint(context,matrix,speed,specialType);
  monret = await check(context,matrix,countbono,monAposta,specialType, varianca, speed, in_bonus, monret);
  monTotal+=monret;
  montot.innerHTML = monTotal.toFixed(2) + "$";
  if (monret!=0){
    monrettxt.innerHTML = "+"+monret.toFixed(2)+"$"
  }
}

improve.addEventListener("click",function(){
  if (tiradas==1){tiradas = 10;}
  else if (tiradas==10){tiradas = 25;}
  else if (tiradas==25){tiradas = 50;}
  else if (tiradas==50){tiradas = 100;}
  else if (tiradas==100){tiradas = 250;}
  else if (tiradas==250){tiradas = 1000;}
  else if (tiradas==1000){tiradas = 1;}
  if (tiradas!=1){
    btn.innerHTML = "Spin\n"+tiradas
  }else{btn.innerHTML = "Spin"}
})

btn.addEventListener("click", async function() {
  if (!playing && !in_bonus){
      for (let count=0;count<tiradas;count++){
        bonusscore.innerHTML="";
        bonustext.innerHTML="";
        if (monTotal>=monAposta ){
          if (count+1==tiradas){
            playing=false
            tiradas=1 
          }
          else{playing=true}
          if ((Math.random()*71)<70){
            if (tiradas-count-1 >0){
              btn.innerHTML = (tiradas-count-1)
            }else{btn.innerHTML="Spin"}  

            soScroll.play()
            specialType=false
            monTotal-=monAposta
            montot.innerHTML = monTotal.toFixed(2) + "$";

            monrettxt.innerHTML = "-"+monAposta+"$"
            monret=0
            context.clearRect(0, 0, canvas.width, canvas.height);
            matrix = Array.from({ length: 5 }, () => Array.from({ length: 5 }, () => Math.floor(Math.random() * 10000) + 1));
            await playf(context,matrix)
            await new Promise(resolve => setTimeout(resolve, 200-speed*1.5));
            if (monret!=0){
              monrettxt.innerHTML = "+"+monret.toFixed(2)+"$"
            }
            if (in_bonus){
              tiradas=1;
              btn.innerHTML = "Spin"
              playing=false;
              break;
            }
          }else{
            if (tiradas-count-1 !=0){
              btn.innerHTML = (tiradas-count-1)
            }else{btn.innerHTML="Spin"}
            specialType=true
            soScroll.play()
            monTotal-=monAposta
            montot.innerHTML = monTotal.toFixed(2) + "$";
            monrettxt.innerHTML = "-"+monAposta+"$"
            monret=0
            context.clearRect(0, 0, canvas.width, canvas.height);
            matrix = Array.from({ length: 5 }, () => Array.from({ length: 5 }, () => Math.floor(Math.random() * 10000) + 1));
            await playf(context,matrix)
            await new Promise(resolve => setTimeout(resolve, 200-speed*1.5));
            if (in_bonus){
              tiradas=1;
              btn.innerHTML = "Spin"
              playing=false;
              break;
            }
          }
       }   
    }
  }else if (!playing && in_bonus){
    //Sale del while anterior
    playing =true;
    let win=await paint_bonus(context, countbono, specialType, monAposta, speed,soScroll, monTotal, monrettxt, canvas, monret,montot, varianca, in_bonus)
    monTotal+=win
    montot.innerHTML = monTotal.toFixed(2) + "$";
    monrettxt.innerHTML = "+"+win.toFixed(2)+"$"
    in_bonus=false;
    playing=false;
  }
  
});

lessbtn.addEventListener("click", function() {
  if (monAposta > 1) {
    monAposta = Math.floor(monAposta / 2); // Utiliza Math.floor para asegurar que obtengas un número entero
    aposHTML.innerHTML = monAposta + "$";
  }
});

plusbtn.addEventListener("click", function() {
  if (monAposta < 1280) {
    monAposta *= 2;
    aposHTML.innerHTML = monAposta + "$";
  }
});

turbo.addEventListener("click", function() {
  if (speed ==0) {
    speed=50;
    turbo.innerHTML="Fast"
    turbo.style.backgroundColor = "#E4DA00";
  }else if (speed==50){
    speed=100;
    turbo.innerHTML="Fast ++"
    turbo.style.backgroundColor = "#FFA500";
  }else{
    speed=0;
    turbo.innerHTML="Normal"
    turbo.style.backgroundColor = "#888988";
  }
});

window.addEventListener("resize", function () {
  updateCanvasSize();
  paint();
});

export function loadImageAsync(src) {
  return new Promise((resolve, reject) => {
    const image = new Image();
    image.onload = () => resolve(image);
    image.onerror = (error) => reject(error);
    image.src = src;
  });
}
function updateCanvasSize(canvas) {
  canvas.width = 0.7 * window.innerWidth;
  canvas.height = 0.7 * window.innerHeight;
}
export function setmultip(value,i,j){
  if (!in_bonus){
    setTimeout(function () {
      context.clearRect(j * cellWidth, i * cellHeight, cellWidth-2, cellHeight); // Limpiar el área
  
      context.fillStyle = "#321e34";
      context.fillRect(j * cellWidth, i * cellHeight, cellWidth-2, cellHeight);
  
      context.fillStyle = "white"; // Color del texto (blanco en este caso)
      if (value==8){
        context.font = "60px Arial";
        context.fillText("x2", (j) * cellWidth + cellWidth/3, (i) * cellHeight + cellHeight*3/4);
      }else if (value==9){
        context.font = "64px Arial";
        context.fillText("x5", (j) * cellWidth + cellWidth/3, (i) * cellHeight + cellHeight*3/4);
      }else if (value==10){
        context.font = "68px Arial";
        context.fillText("x10", (j) * cellWidth + cellWidth/4.5, (i) * cellHeight + cellHeight*3/4);
      }else if (value==11){
        context.font = "72px Arial";
        context.fillText("x20", (j) * cellWidth + cellWidth/4.5, (i) * cellHeight + cellHeight*3/4);
      }
    }, 600-speed*6);  
  }else{
    setTimeout(function () {
      context.clearRect(j * cellWidthBon, i * cellHeight, cellWidthBon-2, cellHeight); // Limpiar el área
  
      context.fillStyle = "#321e34";
      context.fillRect(j * cellWidthBon, i * cellHeight, cellWidthBon-2, cellHeight);
  
      context.fillStyle = "white"; // Color del texto (blanco en este caso)
      if (value==8){
        context.font = "60px Arial";
        context.fillText("x2", (j) * cellWidthBon + cellWidthBon/3, (i) * cellHeight + cellHeight*3/4);
      }else if (value==9){
        context.font = "64px Arial";
        context.fillText("x5", (j) * cellWidthBon + cellWidthBon/3, (i) * cellHeight + cellHeight*3/4);
      }else if (value==10){
        context.font = "68px Arial";
        context.fillText("x10", (j) * cellWidthBon + cellWidthBon/4.5, (i) * cellHeight + cellHeight*3/4);
      }else if (value==11){
        context.font = "72px Arial";
        context.fillText("x20", (j) * cellWidthBon + cellWidthBon/4.5, (i) * cellHeight + cellHeight*3/4);
      }
    }, 600-speed*6);  
  }
  
}

export function start_bonus(bonus){
  countbono=bonus;
  context.clearRect(0, 0, canvas.width, canvas.height);
  context.fillStyle= "#383737"
  context.fillRect(0, 0, canvas.width -cellWidth/2, canvas.height);
  context.fillStyle= "#000"
  context.fillRect((canvas.width -2-cellWidth/2), 0,(canvas.width-cellWidth/2),canvas.height);
  context.fillStyle= "#87CEEB"
  context.fillRect(canvas.width -cellWidth/2, 0,canvas.width,canvas.height);
  context.fillStyle = "white";
  context.font = "64px Arial";
  const textLine1 = "YOU WON";
  
  const textLine2 = (8 + (countbono - 3) * 4) + " FREE SPINS!!";
  context.fillText(textLine1, canvas.width/6, canvas.height*2/5);
  context.font = "64px Arial";
  context.fillText(textLine2, canvas.width/7, canvas.height*3/5);
  in_bonus  = true;
}
