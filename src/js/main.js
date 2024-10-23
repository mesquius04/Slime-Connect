const plusbtn = document.getElementById("plusless")
const lessbtn = document.getElementById("pluslesss")
const canvas = document.getElementById("canva");
const improve = document.getElementById("improve");
const context = canvas.getContext("2d");
const turbo = document.getElementById("turbo")
let specialType = false
let monret = 0
let in_bonus = false
let countbono = 0
let tiradas = 1
let speed = 0
let varianca = true
let monTotal = 2000
let monAposta = 20
const cellWidth = (0.7 * window.innerWidth) / 5;
const cellHeight = (0.7 * window.innerHeight) / 5;
const cellWidthBon = cellWidth*1.125

const fondoAudio = document.getElementById("fondoAudio");
const sonidoExtra = document.getElementById("sonidoExtra");
const soScroll = document.getElementById("sonidoScroll");

fondoAudio.play()
updateCanvasSize(canvas);

let matrix = Array.from({ length: 5 }, () => Array.from({ length: 5 }, () => Math.floor(Math.random() * 10000) + 1));

const montot = document.getElementById("montot")
const monrettxt = document.getElementById("monret")
const aposHTML = document.getElementById("bet")

async function playf(context,matrix){
  await paint(context,matrix);
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

let playing=false;

btn.addEventListener("click", async function() {
  if (!playing && !in_bonus){
      for (let count=0;count<tiradas;count++){
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
          }
       }   
    }
  }else if (!playing && in_bonus){
    //Sale del while anterior
    paint_bonus()
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
function loadImage(src, callback) {
  const image = new Image();
  image.onload = function () {
    callback(image);
  };
  image.src = src;
}
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
async function paint(context,matrix) {
  for (let i = 0; i < matrix.length; i++) {
    for (let j = 0; j < matrix[i].length; j++) {
      setTimeout(function () {
          if (1 <= matrix[i][j] && matrix[i][j] <= 3600) {
              matrix[i][j] = 1;
              context.fillStyle = "brown";
              context.fillRect(j * cellWidth, i * cellHeight, cellWidth, cellHeight);
              if (!specialType){
                loadImage(`./assets/images/slime_earthi.png`, function (image) {
                  context.drawImage(image, (j - 1) * cellWidth + cellWidth * 1.3, (i - 1) * cellHeight + cellHeight * 1.3, cellWidth * 0.4, cellHeight * 0.4);
                });
              }else{
                loadImage(`./assets/images/slime_earthiii.png`, function (image) {
                  context.drawImage(image, (j - 1) * cellWidth + cellWidth * 1.1, (i - 1) * cellHeight + cellHeight * 1.1, cellWidth * 0.8, cellHeight * 0.8);
                });
              }
              
          } 
          else if (3601 <= matrix[i][j] && matrix[i][j] <= 5600) {
              matrix[i][j] = 2;
              context.fillStyle = "red";
              context.fillRect(j * cellWidth, i * cellHeight, cellWidth, cellHeight);
              if (!specialType){
                loadImage(`./assets/images/slime_firei.png`, function (image) {
                  context.drawImage(image, (j - 1) * cellWidth + cellWidth * 1.2, (i - 1) * cellHeight + cellHeight * 1.2, cellWidth * 0.6, cellHeight * 0.6);
              });
              }else{
                loadImage(`./assets/images/slime_fireiii.png`, function (image) {
                  context.drawImage(image, (j - 1) * cellWidth + cellWidth * 1.05, (i - 1) * cellHeight + cellHeight * 1.05, cellWidth * 0.9, cellHeight * 0.9);
              });
              }
              
          } else if (5601 <= matrix[i][j] && matrix[i][j] <= 7600) {
              matrix[i][j] = 3;
              context.fillStyle = "blue";
              context.fillRect(j * cellWidth, i * cellHeight, cellWidth, cellHeight);
              if (!specialType){
                loadImage(`./assets/images/slime_icei.png`, function (image) {
                  context.drawImage(image, (j - 1) * cellWidth + cellWidth * 1.21, (i - 1) * cellHeight + cellHeight * 1.21, cellWidth * 0.58, cellHeight * 0.58);
              });
              }else{
                loadImage(`./assets/images/slime_iceiii.png`, function (image) {
                  context.drawImage(image, (j - 1) * cellWidth + cellWidth * 1.05, (i - 1) * cellHeight + cellHeight * 1.05, cellWidth * 0.9, cellHeight * 0.9);
              });
              }
              
          } else if(7601 <= matrix[i][j] && matrix[i][j] <= 8580){
            matrix[i][j] = 4;
            context.fillStyle = "yellow";
            context.fillRect(j * cellWidth, i * cellHeight, cellWidth, cellHeight);
            if (!specialType){
              loadImage(`./assets/images/slime_thunderi.png`, function (image) {
                context.drawImage(image, (j - 1) * cellWidth + cellWidth * 1.22, (i - 1) * cellHeight + cellHeight * 1.22, cellWidth * 0.56, cellHeight * 0.56);
            });
            }else{
              loadImage(`./assets/images/slime_thunderiii.png`, function (image) {
                context.drawImage(image, (j - 1) * cellWidth + cellWidth * 1.05, (i - 1) * cellHeight + cellHeight * 1.05, cellWidth * 0.9, cellHeight * 0.9);
            });
            }
          }else if (8581 <= matrix[i][j] && matrix[i][j] <= 9350) {
              matrix[i][j] = 5;
              context.fillStyle = "#354f35";
              context.fillRect(j * cellWidth, i * cellHeight, cellWidth, cellHeight);
              if (!specialType){
                loadImage(`./assets/images/Slime Windi.png`, function (image) {
                  context.drawImage(image, (j - 1) * cellWidth + cellWidth * 1.21, (i - 1) * cellHeight + cellHeight * 1.21, cellWidth * 0.58, cellHeight * 0.58);
              });
              }else{
                loadImage(`./assets/images/Slime Windiii.png`, function (image) {
                  context.drawImage(image, (j - 1) * cellWidth + cellWidth * 1.05, (i - 1) * cellHeight + cellHeight * 1.05, cellWidth * 0.9, cellHeight * 0.9);
              });
              }
              
          } else if (9351 <= matrix[i][j] && matrix[i][j] <= 9690) {
              matrix[i][j] = 6;
              context.fillStyle = "#c2b79b";
              context.fillRect(j * cellWidth, i * cellHeight, cellWidth, cellHeight);
              loadImage(`./assets/images/slime_holyii.png`, function (image) {
                  context.drawImage(image, (j - 1) * cellWidth+ cellWidth * 1.2, (i - 1) * cellHeight + cellHeight * 1.2, cellWidth * 0.6, cellHeight * 0.6);
              });
          } else if (9691 <= matrix[i][j] && matrix[i][j] <= 9840) {
              matrix[i][j] = 7;
              context.fillStyle = "#c2b79b";
              context.fillRect(j * cellWidth, i * cellHeight, cellWidth, cellHeight);
              loadImage(`./assets/images/slime_holyiii.png`, function (image) {
                  context.drawImage(image, (j - 1) * cellWidth + cellWidth * 1.1, (i - 1) * cellHeight + cellHeight * 1.1, cellWidth * 0.8, cellHeight * 0.8);
              });
          }else if (9841 <= matrix[i][j] && matrix[i][j] <= 9980){
              if (matrix[i][j]<=9875){matrix[i][j]=8}
              else if (matrix[i][j]<=9940){matrix[i][j]=9;}
              else if(matrix[i][j]<=9970){matrix[i][j]=10;}
              else{matrix[i][j]=11;}             
              context.fillStyle = "#321e34";
              context.fillRect(j * cellWidth, i * cellHeight, cellWidth, cellHeight);
              loadImage(`images/Darkness Slime GhastMallow.png`, function (image) {
                  context.drawImage(image, (j - 1) * cellWidth + cellWidth * 1.15, (i - 1) * cellHeight + cellHeight * 1.15, cellWidth * 0.7, cellHeight * 0.7);
              });

          }else{
            matrix[i][j] = -1;
            context.fillStyle = "#87CEEB";
            context.fillRect(j * cellWidth, i * cellHeight, cellWidth, cellHeight);
            loadImage(`./assets/images/slimebono.png`, function (image) {
                context.drawImage(image, (j - 1) * cellWidth + cellWidth * 1.15, (i - 1) * cellHeight + cellHeight * 1.15, cellWidth * 0.7, cellHeight * 0.7);
            });
          }  
      }, 10-(speed/10)); // Ajusta el valor aquí según tus necesidades
      await new Promise(resolve => setTimeout(resolve, (10-(speed/10))*(matrix[i].length-1)));
      context.fillStyle = "black";
      if (specialType){
        context.fillStyle = "#111";
      }
      context.fillRect((j + 1) * cellWidth - 5 / 2, i * cellHeight, 3, cellHeight);
      if (i < matrix.length - 1) {
        context.fillRect(j * cellWidth, (i + 1) * cellHeight - 2 / 2, cellWidth, 2);
      }
      
    }
  }
}
async function linear_paint(m,i,numconvi){
  if (!in_bonus){
    const startX = cellWidth / 2;
    const startY = i * cellHeight + 10 * cellHeight / 21;
    const endX = cellWidth * (numconvi - 1) + cellWidth / 2;
    const endY = i * cellHeight + 11 * cellHeight / 21;
    await new Promise(resolve => setTimeout(resolve, 300-speed*3));
  
    if (context) {
      sonidoExtra.play();
      context.fillStyle = "black";
      context.fillRect(startX, startY, endX - startX, endY - startY);
    }
  }else{
    const startX = cellWidthBon / 2;
    const startY = i * cellHeight + 10 * cellHeight / 21;
    const endX = cellWidthBon * (numconvi - 1) + cellWidthBon / 2;
    const endY = i * cellHeight + 11 * cellHeight / 21;
    await new Promise(resolve => setTimeout(resolve, 300-speed*3));
  
    if (context) {
      sonidoExtra.play();
      context.fillStyle = "black";
      context.fillRect(startX, startY, endX - startX, endY - startY);
    }
  }
}
function drawImageWithDelay(image,i, j) {
  if (!in_bonus){
    setTimeout(function () {
      context.fillStyle = "#c2b79b";
      context.fillRect(j * cellWidth, i * cellHeight, cellWidth-2, cellHeight);
      context.drawImage(image, (j - 1) * cellWidth + cellWidth * 1.1, (i - 1) * cellHeight + cellHeight * 1.1, cellWidth * 0.8, cellHeight * 0.8);
    }, 100-speed);
  }else{
    setTimeout(function () {
      context.fillStyle = "#321e34";
      context.fillRect(j * cellWidthBon, i * cellHeight, cellWidthBon-2, cellHeight);
      context.drawImage(image, (j - 1) * cellWidthBon + cellWidthBon * 1.1, (i - 1) * cellHeight + cellHeight * 1.1, cellWidthBon * 0.8, cellHeight * 0.8);
    }, 120-speed);
    
  }
  
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
  for (i=0;i<m.length;i++){
    for (j=0;j<m[0].length;j++){
      if (i<m.length && m[i][j]==7){
        const image = await loadImageAsync(`./images/slime_holyiii.png`);
        let a=i;
        while (a<m.length){
          if (m[a][j]<8 && m[a][j]!=-1){
            m[a][j]=7
            drawImageWithDelay(image,i, j);
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

  for (i=0;i<m[1].length;i++){
    j=1
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
        linear_paint(m,i,3)
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
        linear_paint(m,i,4)
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
 
        linear_paint(m,i,5)
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
  in_bonus=true;
  context.clearRect(0, 0, canvas.width, canvas.height);
  context.fillStyle= "#383737"
  context.fillRect(0, 0, canvas.width -cellWidth/2, canvas.height);
  context.fillStyle= "#000"
  context.fillRect((canvas.width -2-cellWidth/2), 0,(canvas.width-cellWidth/2),canvas.height);
  context.fillStyle= "#87CEEB"
  context.fillRect(canvas.width -cellWidth/2, 0,canvas.width,canvas.height);
  context.fillStyle = "white";
  context.font = "64px Arial";
  const textLine1 = "HAS GANADO";
  
  const textLine2 = (8 + (countbono - 3) * 4) + " TIRADAS GRATIS!!";
  context.fillText(textLine1, canvas.width/6, canvas.height*2/5);
  context.font = "72px Arial";
  context.fillText(textLine2, canvas.width/7, canvas.height*3/5);
  playing=false;

}
async function paint_bonus(){
  playing=true
  for (let index=0;index<countbono;index++){
    let numrand=Math.random()*100 +1;
    if (numrand<=45){
      loadImage(`images/Slime RPG Buffer.png`, function (image) {
        context.drawImage(image, canvas.width-cellWidth/2, canvas.height*(index+2)/(countbono+4) , cellWidth * 0.5, cellHeight * 0.5);
      });
    }else if(numrand<=65){
      loadImage(`images/Slime RPG Defender.png`, function (image) {
        context.drawImage(image, canvas.width-cellWidth/2, canvas.height*(index+2)/(countbono+4) , cellWidth * 0.5, cellHeight * 0.5);
      });
    }else if (numrand<=80){ 
      loadImage(`images/Slime RPG Healer.png`, function (image) {
        context.drawImage(image, canvas.width-cellWidth/2, canvas.height*(index+2)/(countbono+4) , cellWidth * 0.5, cellHeight * 0.5);
      });
    }else if (numrand<=95){
      loadImage(`images/Slime RPG Defender.png`, function (image) {
        context.drawImage(image, canvas.width-cellWidth/2, canvas.height*(index+2)/(countbono+4) , cellWidth * 0.5, cellHeight * 0.5);
      });
    }else{
      loadImage(`images/Slime RPG Attacker.png`, function (image) {
        context.drawImage(image, canvas.width-cellWidth/2, canvas.height*(index+2)/(countbono+4) , cellWidth * 0.5, cellHeight * 0.5);
      });
    }
  }
  for (let k=0;k<(8+(countbono-3)*4);k++){
    soScroll.play()
    montot.innerHTML = monTotal.toFixed(2) + "$";
    monrettxt.innerHTML = "-"+monAposta+"$"
    monret=0
    context.clearRect(0,0,canvas.width-cellWidth/2,canvas.height)
    let matriu = Array.from({ length: 5 }, () => Array.from({ length: 4 }, () => Math.floor(Math.random() * 10000) + 1));
    await paint_bon(context,matriu)
    await check_bon(matriu,monAposta)
    monTotal+=monret
    await new Promise(resolve => setTimeout(resolve, 700-speed*6));
  }  
  playing=false
  in_bonus=false
  countbono=0;
}

async function paint_bon(context,matrix) {

  for (let i = 0; i < matrix.length; i++) {
    for (let j = 0; j < matrix[i].length; j++) {
      setTimeout(function () {
          if (1 <= matrix[i][j] && matrix[i][j] <= 3300) {
              matrix[i][j] = 1;
              context.fillStyle = "brown";
              context.fillRect(j * cellWidthBon, i * cellHeight, cellWidthBon, cellHeight);
              if (!specialType){
                loadImage(`./images/slime_earthi.png`, function (image) {
                  context.drawImage(image, (j - 1) * cellWidthBon + cellWidthBon * 1.3, (i - 1) * cellHeight + cellHeight * 1.3, cellWidthBon * 0.4, cellHeight * 0.4);
                });
              }else{
                loadImage(`./images/slime_earthiii.png`, function (image) {
                  context.drawImage(image, (j - 1) * cellWidthBon + cellWidthBon * 1.1, (i - 1) * cellHeight + cellHeight * 1.1, cellWidthBon * 0.8, cellHeight * 0.8);
                });
              }
              
          } 
          else if (3301 <= matrix[i][j] && matrix[i][j] <= 5200) {
              matrix[i][j] = 2;
              context.fillStyle = "red";
              context.fillRect(j * cellWidthBon, i * cellHeight, cellWidthBon, cellHeight);
              if (!specialType){
                loadImage(`./images/slime_firei.png`, function (image) {
                  context.drawImage(image, (j - 1) * cellWidthBon + cellWidthBon * 1.2, (i - 1) * cellHeight + cellHeight * 1.2, cellWidthBon * 0.6, cellHeight * 0.6);
              });
              }else{
                loadImage(`./images/slime_fireiii.png`, function (image) {
                  context.drawImage(image, (j - 1) * cellWidthBon + cellWidthBon * 1.05, (i - 1) * cellHeight + cellHeight * 1.05, cellWidthBon * 0.9, cellHeight * 0.9);
              });
              }
              
          } else if (5201 <= matrix[i][j] && matrix[i][j] <= 7200) {
              matrix[i][j] = 3;
              context.fillStyle = "blue";
              context.fillRect(j * cellWidthBon, i * cellHeight, cellWidthBon, cellHeight);
              if (!specialType){
                loadImage(`./images/slime_icei.png`, function (image) {
                  context.drawImage(image, (j - 1) * cellWidthBon + cellWidthBon * 1.21, (i - 1) * cellHeight + cellHeight * 1.21, cellWidthBon * 0.58, cellHeight * 0.58);
              });
              }else{
                loadImage(`./images/slime_iceiii.png`, function (image) {
                  context.drawImage(image, (j - 1) * cellWidthBon + cellWidthBon * 1.05, (i - 1) * cellHeight + cellHeight * 1.05, cellWidthBon * 0.9, cellHeight * 0.9);
              });
              }
              
          } else if(7201 <= matrix[i][j] && matrix[i][j] <= 8280){
            matrix[i][j] = 4;
            context.fillStyle = "yellow";
            context.fillRect(j * cellWidthBon, i * cellHeight, cellWidthBon, cellHeight);
            if (!specialType){
              loadImage(`./images/slime_thunderi.png`, function (image) {
                context.drawImage(image, (j - 1) * cellWidthBon + cellWidthBon * 1.22, (i - 1) * cellHeight + cellHeight * 1.22, cellWidthBon * 0.56, cellHeight * 0.56);
            });
            }else{
              loadImage(`./images/slime_thunderiii.png`, function (image) {
                context.drawImage(image, (j - 1) * cellWidthBon + cellWidthBon * 1.05, (i - 1) * cellHeight + cellHeight * 1.05, cellWidthBon * 0.9, cellHeight * 0.9);
            });
            }
          }else if (8281 <= matrix[i][j] && matrix[i][j] <= 9250) {
              matrix[i][j] = 5;
              context.fillStyle = "#354f35";
              context.fillRect(j * cellWidthBon, i * cellHeight, cellWidthBon, cellHeight);
              if (!specialType){
                loadImage(`./images/Slime Windi.png`, function (image) {
                  context.drawImage(image, (j - 1) * cellWidthBon + cellWidthBon * 1.21, (i - 1) * cellHeight + cellHeight * 1.21, cellWidthBon * 0.58, cellHeight * 0.58);
              });
              }else{
                loadImage(`./images/Slime Windiii.png`, function (image) {
                  context.drawImage(image, (j - 1) * cellWidthBon + cellWidthBon * 1.05, (i - 1) * cellHeight + cellHeight * 1.05, cellWidthBon * 0.9, cellHeight * 0.9);
              });
              }
              
          } else if (9251 <= matrix[i][j] && matrix[i][j] <= 9850) {
              matrix[i][j] = 6;
              context.fillStyle = "#c2b79b";
              context.fillRect(j * cellWidthBon, i * cellHeight, cellWidthBon, cellHeight);
              loadImage(`./images/slime_holyii.png`, function (image) {
                  context.drawImage(image, (j - 1) * cellWidthBon+ cellWidthBon * 1.2, (i - 1) * cellHeight + cellHeight * 1.2, cellWidthBon * 0.6, cellHeight * 0.6);
              });
          }else if (9851<= matrix[i][j] && matrix[i][j] <= 10001){
              if (matrix[i][j]<=9875){matrix[i][j]=8}
              else if (matrix[i][j]<=9910){matrix[i][j]=9;}
              else if(matrix[i][j]<=9926){matrix[i][j]=10;}
              else{matrix[i][j]=11;}             
              context.fillStyle = "#321e34";
              context.fillRect(j * cellWidthBon, i * cellHeight, cellWidthBon, cellHeight);
              loadImage(`images/Darkness Slime GhastMallow.png`, function (image) {
                  context.drawImage(image, (j - 1) * cellWidthBon + cellWidthBon * 1.15, (i - 1) * cellHeight + cellHeight * 1.15, cellWidthBon * 0.7, cellHeight * 0.7);
              });

          }
      }, 30-(speed/10));
      await new Promise(resolve => setTimeout(resolve, (30-(speed/10))*(matrix[i].length-1)));
      context.fillStyle = "black";
      if (specialType){
        context.fillStyle = "#111";
      }
      context.fillRect((j + 1) * cellWidthBon - 5 / 2, i * cellHeight, 3, cellHeight);
      if (i < matrix.length - 1) {
        context.fillRect(j * cellWidthBon, (i + 1) * cellHeight - 2 / 2, cellWidthBon, 2);
      }
      
    }
  }
}
async function check_bon(m,money){
  for (i=0;i<m.length;i++){
    for (j=0;j<m[0].length;j++){
      if (i<m.length && m[i][j]>=8){
        const image = await loadImageAsync(`./images/Darkness Slime GhastMallow.png`);
        let a=i;
        while (a<m.length){
          if (m[a][j]<8 && m[a][j]!=-1){
            m[a][j]=m[i][j]
            drawImageWithDelay(image,i, j);
            await new Promise(resolve => setTimeout(resolve, 120-speed));
          }
          a++
        }
      }
    }
  }
  for (i=0;i<m.length;i++){
    for (j=0;j<m[0].length;j++){
      if (m[i][j]>=8){
        setmultip(m[i][j],i,j)
        await new Promise(resolve => setTimeout(resolve, 700-speed*6));
      }
    }
  } 

  for (i=0;i<m.length;i++){
    j=1
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
        linear_paint(m,i,3)
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
        linear_paint(m,i,4)
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
 
        linear_paint(m,i,5)
        await new Promise(resolve => setTimeout(resolve, 300-speed*3));
        //showgain(monret)
        break;
      }
    }
  }
}