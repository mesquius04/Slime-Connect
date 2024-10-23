import { paint , loadImage , linear_paint , drawImageWithDelay} from './visuals.js';
import { paint_bon , paint_bonus } from './bonusvisuals.js';

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

let matrix = Array.from({ length: 5 }, () => Array.from({ length: 5 }, () => Math.floor(Math.random() * 10000) + 1));

const montot = document.getElementById("montot")
const monrettxt = document.getElementById("monret")
const aposHTML = document.getElementById("bet")

async function playf(context,matrix){
  await paint(context,matrix,speed,specialType);
  await check(matrix,monAposta);
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
    btn.innerHTML = "Tirar"+tiradas
  }else{btn.innerHTML = "Tirar"}
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
            }else{btn.innerHTML="Tirar"}  

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
              btn.innerHTML = "Tirar"
              playing=false;
              break;
            }
          }else{
            if (tiradas-count-1 !=0){
              btn.innerHTML = (tiradas-count-1)
            }else{btn.innerHTML="Tirar"}
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
              btn.innerHTML = "Tirar"
              playing=false;
              break;
            }
          }
       }   
    }
  }else if (!playing && in_bonus){
    //Sale del while anterior
    playing =true;
    let win=await paint_bonus(context, countbono, specialType, monAposta, speed,soScroll, monTotal, monrettxt, canvas, monret,montot)
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
    turbo.style.backgroundColor = "#f2ee00";
  }else if (speed==50){
    speed=100;
    turbo.style.backgroundColor = "#FFA500";
  }else{
    speed=0;
    turbo.style.backgroundColor = "#888988";
  }
});

window.addEventListener("resize", function () {
  updateCanvasSize();
  paint();
});

function loadImageAsync(src) {
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
function setmultip(value,i,j){
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
async function check(m,money){
  countbono=0;
  for (let i=0;i<m.length;i++){
    for (let j=0;j<m[0].length;j++){
      if (i<m.length && m[i][j]==7){
        const image = await loadImageAsync(`./assets/images/slime_holyiii.png`);
        let a=i;
        while (a<m.length){
          if (m[a][j]<8 && m[a][j]!=-1){
            m[a][j]=7
            drawImageWithDelay(context, image,i, j, in_bonus, speed);
            await new Promise(resolve => setTimeout(resolve, 100-speed));
          }
          a++
        }
      }else if (m[i][j]>=8){
        setmultip(m[i][j],i,j)
        await new Promise(resolve => setTimeout(resolve, 600-speed*6));
      }else if (m[i][j]==-1){
        countbono+=1
      }
    }
  }

  for (let i=0;i<m[1].length;i++){
    let j=1
    let multi=1;
    let aux=m[i][0]
    let rettype=0
    
    if (m[i][0]==8){multi*=2}
    else if (m[i][0]==9){multi*=5}
    else if (m[i][0]==10){multi*=10}
    else if (m[i][0]==11){multi*=20}

    while(m[i][j]==m[i][j-1]||m[i][j]==aux ||aux>5 || m[i][j]>5){
      if (varianca){
        if (m[i][j]==8){multi*=2}
        else if (m[i][j]==9){multi*=5}
        else if (m[i][j]==10){multi*=10}
        else if (m[i][j]==11){multi*=20}
      }else{
        if (m[i][j]==8){multi+=2}
        else if (m[i][j]==9){multi+=5}
        else if (m[i][j]==10){multi*=10}
        else if (m[i][j]==11){multi*=20}
      }
      

      if (aux>5 && m[i][j]<6){
      aux=m[i][j]}

      if (aux<6){
        switch(aux){
          case 1:{
            if (varianca){
              rettype=0.4*multi
              if (specialType){rettype*=5}
            }else{
              rettype=1*multi
              if (specialType){rettype*=2}
            }
            break;
          } 
          case 2: {
            if (varianca){
              rettype=0.9*multi
              if (specialType){rettype*=8}
            }else{
              rettype=3*multi
              if (specialType){rettype*=4}
            }
            break;
          } 
          case 3: {
            if (varianca){
              rettype=0.9*multi
              if (specialType){rettype*=8}
            }else{
              rettype=3*multi
              if (specialType){rettype*=4}
            }
            break;
          } 
          case 4: {
            if (varianca){
              rettype=2.5*multi
              if (specialType){rettype*=15}
            }else{
              rettype=7*multi
              if (specialType){rettype*=5}
            }
            
            break;
          } 
          case 5: {
            if (varianca){
              rettype=3*multi
              if (specialType){rettype*=20}
            }else{
              rettype=12*multi
              if (specialType){rettype*=20}
            }
            
            break;
          }
        }
      }
      j++;
    }
    switch (j){
      case 3:{
        if (varianca){
          monret += parseFloat((0.7*money*rettype).toFixed(2));
        }else{
          monret += parseFloat((money*rettype*0.6).toFixed(2));
        }
        linear_paint(context, m,i,3,in_bonus, speed)
        await new Promise(resolve => setTimeout(resolve, 300-speed*3));
        //showgain(monret)
        break;
      }
      case 4:{
        if (varianca){
          monret += parseFloat((money*rettype*2).toFixed(2));
        }else{
          monret += parseFloat((money*rettype*1.2).toFixed(2));
        }
        linear_paint(context, m,i,4,in_bonus, speed)
        await new Promise(resolve => setTimeout(resolve, 300-speed*3));
        break;
        //showgain(monret)
      }
      case 5:{
        if (varianca){
          monret += parseFloat((money*rettype*6).toFixed(2));
        }else{
          monret += parseFloat((money*rettype*4).toFixed(2));
        }
 
        linear_paint(context, m,i,5,in_bonus, speed)
        await new Promise(resolve => setTimeout(resolve, 300-speed*3));
        //showgain(monret)
        break;
      }
    }
  }
  if (countbono>=3){
    await start_bonus()
    
  }
}
function start_bonus(){
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
export async function check_bon(m,money){
  let monret=0;
  for (let i=0;i<m.length;i++){
    for (let j=0;j<m[0].length;j++){
      if (i<m.length && m[i][j]>=8){
        const image = await loadImageAsync(`./assets/images/DarknessSlime.png`);
        let a=i;
        while (a<m.length){
          if (m[a][j]<8 && m[a][j]!=-1){
            m[a][j]=m[i][j]
            drawImageWithDelay(context, image,i, j, in_bonus , speed);
            await new Promise(resolve => setTimeout(resolve, 120-speed));
          }
          a++
        }
      }
    }
  }
  for (let i=0;i<m.length;i++){
    for (let j=0;j<m[0].length;j++){
      if (m[i][j]>=8){
        setmultip(m[i][j],i,j)
        await new Promise(resolve => setTimeout(resolve, 700-speed*6));
      }
    }
  } 

  for (let i=0;i<m.length;i++){
    
    let j=1
    let multi=1;
    let aux=m[i][0]
    let rettype=0
    
    if (m[i][0]==8){multi*=2}
    else if (m[i][0]==9){multi*=5}
    else if (m[i][0]==10){multi*=10}
    else if (m[i][0]==11){multi*=20}

    while(m[i][j]==m[i][j-1]||m[i][j]==aux ||aux>5 || m[i][j]>5){
      if (varianca){
        if (m[i][j]==8){multi*=2}
        else if (m[i][j]==9){multi*=5}
        else if (m[i][j]==10){multi*=10}
        else if (m[i][j]==11){multi*=20}
      }else{
        if (m[i][j]==8){multi+=2}
        else if (m[i][j]==9){multi+=5}
        else if (m[i][j]==10){multi*=10}
        else if (m[i][j]==11){multi*=20}
      }
      

      if (aux>5 && m[i][j]<6){
      aux=m[i][j]}

      if (aux<6){
        switch(aux){
          case 1:{
            if (varianca){
              rettype=0.1*multi
              if (specialType){rettype*=5}
            }else{
              rettype=1*multi
              if (specialType){rettype*=2}
            }
            break;
          } 
          case 2: {
            if (varianca){
              rettype=0.15*multi
              if (specialType){rettype*=8}
            }else{
              rettype=3*multi
              if (specialType){rettype*=4}
            }
            break;
          } 
          case 3: {
            if (varianca){
              rettype=0.15*multi
              if (specialType){rettype*=8}
            }else{
              rettype=3*multi
              if (specialType){rettype*=4}
            }
            break;
          } 
          case 4: {
            if (varianca){
              rettype=2.2*multi
              if (specialType){rettype*=15}
            }else{
              rettype=7*multi
              if (specialType){rettype*=5}
            }
            
            break;
          } 
          case 5: {
            if (varianca){
              rettype=3*multi
              if (specialType){rettype*=20}
            }else{
              rettype=12*multi
              if (specialType){rettype*=20}
            }
            
            break;
          }
        }
      }
      j++;
    }
    switch (j){
      case 3:{
        if (varianca){
          monret += parseFloat((0.75*money*rettype).toFixed(2));
        }else{
          monret += parseFloat((money*rettype*0.6).toFixed(2));
        }
        linear_paint(context, m,i,3, in_bonus,speed)
        await new Promise(resolve => setTimeout(resolve, 300-speed*3));
        //showgain(monret)
        break;
      }
      case 4:{
        if (varianca){
          monret += parseFloat((money*rettype*2.5).toFixed(2));
        }else{
          monret += parseFloat((money*rettype*1.2).toFixed(2));
        }
        linear_paint(context, m,i,4, in_bonus ,speed)
        await new Promise(resolve => setTimeout(resolve, 300-speed*3));
        break;
        //showgain(monret)
      }
      case 5:{
        if (varianca){
          monret += parseFloat((money*rettype*11.5).toFixed(2));
        }else{
          monret += parseFloat((money*rettype*4).toFixed(2));
        }
 
        linear_paint(context, m,i,5,in_bonus, speed)
        await new Promise(resolve => setTimeout(resolve, 300-speed*3));
        //showgain(monret)
        break;
      }
    }
  }
  return monret;
}