import * as p5 from 'p5';
import * as _ from 'lodash';

const P5 = new p5();


let R = 'r';
let L = 'l';
let UP = 'u';
let D = 'd';
let UL = 'ul';
let UR = 'ur';
let DR = 'dr';
let DL = 'dl';


let screenHeight = 400;
let screenWidth = 800;
let boxSize = 30;
let activeBoxes = {};
let colorOffset = 100;

window.activeBoxes = activeBoxes;

// let l_a = [D, D, D, UP, R, R, D, UP, UP, UP, L, L];
// let l_b = [D, D, D, D, UP, UP, R, R, D, D, L, R, UP, UP, UP, UP, L, L];
let cA = [[D,D,D,UP,UP,R,R,D,D,UP,UP,UP,UL,DL]];
let cB = [[D,D,D,D,R,R,UP,UL,UR,UP,L,L]];
let cC = [[D,D,D,D,DR,R,UR],[UR,R,DR]];
let cD = [[D,D,D,D,D,D,R,R,UR,UP,UP,UP,UP,UP,UL,L,L]];
let cE = [[D,D,D,D,D,D,R,R,R],[D,D,D,R,R],[R,R,R]];
let cF = [[D,D,D,D,D,D],[D,D,D,R,R],[R,R,R]];
let cG = [[D,D,D,D,DR,R,UR,UP,L],[UR,R,DR]];
let cH = [[D,D,D,D,D,D],[D,D,D,R,R,R,UP,UP,UP],[D,D,D,R,R,R,D,D,D]];
let cI = [[R,D,D,D,D,D,D,L],[R,D,D,D,D,D,D,R],[R,R]];
let cJ = [[D,D,D,D,D,DL,L,UL,UP]];
let cK = [[D,D,D,D,D,D],[D,D,D,R,UR,UR,UP],[D,D,D,R,DR,DR,D]];
let cL = [[D,D,D,D,D,D,R,R,R]];
let cM = [[D,D,D,D,D,D],[DR,DR,UR,UR,D,D,D,D,D,D]];
let cN = [[D,D,D,D,D,D],[DR,DR,UR,UR],[DR,DR,R,D,D,D,D]];
let cO = [[D,D,D,D,DR,R,UR,UP,UP,UP,UP,UL,L]];
let cP = [[D,D,D,D,D,D],[D,D,D,R,R,UR,UP,UL,L]];
let cQ = [[D,D,D,D,DR,UR,DR],[UR,R,DR,D,D,D]];
let cR = [[D,D,D,D,D,D],[D,D,D,R,R,DR,D,D],[R,R,DR,D]];
let cS = [[D,DR,R,DR,D,DL,L,UL],[UR,R,DR]];
let cT = [[R,R,R,R],[R,R,D,D,D,D,D]];
let cU = [[D,D,D,D,D,DR,R,UR,UP,UP,UP,UP,UP]];
let cV = [[D,D,D,D,DR,DR,UR,UR,UP,UP,UP,UP]];
let cW = [[D,D,D,D,D,DR,UR,UP,D,DR,UR,UP,UP,UP,UP,UP]];
let cX = [[D,D,DR,DL,D,D,UP,UP,UR,R,DR,D,D,UP,UP,UR,UL,UP,UP]];
let cY = [[D,D,DR,R,R,D,D,DL,DL,L,UL],[D,D,DR,R,R,UP,UP]];
let cZ = [[R,R,R,R,D,D,DL,L,DL,D,D,R,R,R]];

let alphabet = {A: cA, B: cB, C: cC, D: cD, E: cE, F: cF, G: cG, H: cH, I: cI, J: cJ, K: cK, L: cL, M: cM, N: cN, O: cO, P: cP, Q: cQ, R: cR, S: cS, T: cT, 
U: cU, V: cV, W: cW, X: cX, Y: cY, Z: cZ};
console.log({alphabet});

function drawBox(row, column) {
    let x = column * boxSize;
    let y = row * boxSize;
    let k = `${x},${y}`;
    activeBoxes[k] = colorOffset;
    fill(50+colorOffset,205+colorOffset,50+colorOffset);
    square(x,y,boxSize);
    updateActiveBoxes(k);
  }
  
function drawShape(_r, _c, shapes) {
    shapes.forEach ((shape) => {
        let r = _r;
        let c = _c;
        drawBox(r, c);
        for (let i=0;i<shape.length;i++) {
            if (shape[i] == R) c += 1;
            if (shape[i] == L) c -= 1;
            if (shape[i] == UP) r -= 1;
            if (shape[i] == D) r += 1;
            if (shape[i] == UL) {c -= 1; r -=1;}
            if (shape[i] == UR) {c += 1; r -=1;}
            if (shape[i] == DL) {c -= 1; r +=1;}
            if (shape[i] == DR) {c += 1; r +=1;}            
            drawBox(r, c);
        }   
    });
}
function depletionRate(ticks) {
    // return 6*atan(ticks/colorOffset);
    return 3;
}

function updateActiveBoxes(k) {
    activeBoxes[k] -= depletionRate();
    if (activeBoxes[k] <= 0) activeBoxes[k] = 0;
}

function checkIfMouseInBox(x,y) {
    if (mouseX < x)  return false;
    if (mouseX > x + boxSize) return false;
    if (mouseY < y) return false;
    if (mouseY > y + boxSize) return false;
    return true;
}

function getBox() {
    let i = Math.floor(mouseX/boxSize);
    let ii = Math.floor(mouseY/boxSize);
    return [i,ii];
}

function renderActivity() {
    let [i, ii] = getBox();
    let x = i*boxSize;
    let y = ii*boxSize;

    let k = `${x},${y}`;
    activeBoxes[k] = colorOffset;
    _.each(activeBoxes, (val, key) => {
        let [x,y] = key.split(",");
        if (val <= 0) {
            fill(50,205,50);
            noStroke();
            square(x,y,boxSize);
            delete activeBoxes[key];
        } else {
            fill(50+val,205+val,50+val);
            square(x,y,boxSize);
            updateActiveBoxes(key);
        }
    });

}
function renderGrid() {
    for (let i=0;i<screenWidth/boxSize;i++) {
        let x = i*boxSize;
        for (let ii=0;ii<screenHeight/boxSize;ii++) {
            let y = ii*boxSize;
            fill(50,205,50);
            noStroke();
            square(x,y,boxSize);
        }
    }
}

let s = (sk) => {    
    
    let keyWasPressed = false;    
    sk.keyPressed = (e) => {
        console.log(e.key.toUpperCase());
        keyWasPressed = true;
    }

    sk.setup = () => {
        createCanvas(screenWidth, screenHeight);
        renderGrid();
    }

    sk.draw = () => {
        renderActivity();
        if (keyWasPressed == true) {
            drawShape(1,1,cE);
        }
        keyWasPressed = false;
    }
}

async function Init() {
    // let element = document.createElement('div');
    // element.setAttribute('id', 'container');
    // document.body.appendChild(element);
    const P5 = new p5(s);
}

export default Init;