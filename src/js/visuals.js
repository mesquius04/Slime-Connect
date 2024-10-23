const cellWidth = (0.7 * window.innerWidth) / 5;
const cellHeight = (0.7 * window.innerHeight) / 5;
const cellWidthBon = cellWidth*1.125
const sonidoExtra = document.getElementById("sonidoExtra");

export function loadImage(src, callback) {
    const image = new Image();
    image.onload = function () {
      callback(image);
    };
    image.src = src;
}
export function drawImageWithDelay(context, image,i, j, in_bonus, speed) {
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
export async function paint(context,matrix,speed,specialType) {
    for (let i = 0; i < matrix.length; i++) {
        for (let j = 0; j < matrix[i].length; j++) {
        setTimeout(function () {
            if (1 <= matrix[i][j] && matrix[i][j] <= 3700) {
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
            else if (3701 <= matrix[i][j] && matrix[i][j] <= 5700) {
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
                
            } else if (5701 <= matrix[i][j] && matrix[i][j] <= 7700) {
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
                
            } else if(7701 <= matrix[i][j] && matrix[i][j] <= 8600){
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
            }else if (8601 <= matrix[i][j] && matrix[i][j] <= 9200) {
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
                
            } else if (9301 <= matrix[i][j] && matrix[i][j] <= 9620) {
                matrix[i][j] = 6;
                context.fillStyle = "#c2b79b";
                context.fillRect(j * cellWidth, i * cellHeight, cellWidth, cellHeight);
                loadImage(`./assets/images/slime_holyii.png`, function (image) {
                    context.drawImage(image, (j - 1) * cellWidth+ cellWidth * 1.2, (i - 1) * cellHeight + cellHeight * 1.2, cellWidth * 0.6, cellHeight * 0.6);
                });
            } else if (9621 <= matrix[i][j] && matrix[i][j] <= 9700) {
                matrix[i][j] = 7;
                context.fillStyle = "#c2b79b";
                context.fillRect(j * cellWidth, i * cellHeight, cellWidth, cellHeight);
                loadImage(`./assets/images/slime_holyiii.png`, function (image) {
                    context.drawImage(image, (j - 1) * cellWidth + cellWidth * 1.1, (i - 1) * cellHeight + cellHeight * 1.1, cellWidth * 0.8, cellHeight * 0.8);
                });
            }else if (9701 <= matrix[i][j] && matrix[i][j] <= 9870){
                if (matrix[i][j]<=9770){matrix[i][j]=8}
                else if (matrix[i][j]<=9815){matrix[i][j]=9;}
                else if(matrix[i][j]<=9850){matrix[i][j]=10;}
                else{matrix[i][j]=11;}             
                context.fillStyle = "#321e34";
                context.fillRect(j * cellWidth, i * cellHeight, cellWidth, cellHeight);
                loadImage(`./assets/images/DarknessSlime.png`, function (image) {
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
export async function linear_paint(context, m,i,numconvi, in_bonus, speed){
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