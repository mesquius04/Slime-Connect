import { paint , loadImage , linear_paint , drawImageWithDelay} from './visuals.js';
import { start_bonus, setmultip , loadImageAsync } from './main.js';
export async function check_bon(context, m,money, varianca, speed, monret, in_bonus, specialType){
    monret=0;
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
export async function check(context,m,countbono,money, specialType, varianca,speed,in_bonus, monret){
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
        await start_bonus(countbono)
        
    }
    return monret;
}