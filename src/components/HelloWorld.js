import * as p5 from 'p5';
import * as _ from 'lodash';
import delay from 'delay';
import alphabet from './alphabetMatrix';

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
let screenWidth = 1000;
let boxSize = 15;
let activeBoxes = {};

window.colorOffset = 100;
window.activeBoxes = activeBoxes;

let convertStringToMatrix = (s) => {
    let arr = _.map(_.compact(s.split("\n")),_.trim);
    arr.width = arr[0].length;
    arr.height = arr.length;
    return arr;
};

window.characterPosition = {index: 0, width: 0, row: 1};

function drawBox(row, column) {
    let x = column * boxSize;
    let y = row * boxSize;
    let k = `${x},${y}`;
    activeBoxes[k] = window.colorOffset;
    fill(50+window.colorOffset,205+window.colorOffset,50+window.colorOffset);
    square(x,y,boxSize);
    updateActiveBoxes(k);
    return k;
}

function drawMatrix(_r, _c, character) {
    if (!character) return;
    if (window.characterPosition.index <= 0) window.characterPosition.width = 0;

    let matrix = convertStringToMatrix(character);
    _c += window.characterPosition.width + 1;
    window.characterPosition.width += matrix.width + 1;

    matrix.forEach ((row, rowIndex) => {
        for (let i=0;i<row.length;i++) {
            if (row[i] == 1) drawBox(_r+rowIndex, _c+i);
        }
    });

    window.characterPosition.index += 1;
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
    return 2;
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

let trackItems = _.debounce((row) => {
    if (row != window.characterPosition.row) return;
    window.characterPosition.index -= 1;
});

function renderGrid() {
    for (let i=0;i<screenWidth/boxSize;i++) {
        let x = i*boxSize;
        for (let ii=0;ii<screenHeight/boxSize;ii++) {
            let y = ii*boxSize;
            fill(50,205,50);
            stroke(40,195,40);
            square(x,y,boxSize);
        }
    }
}

class MatrixCharacter {
    constructor(s) {
        this.matrix = _.map(_.compact(s.split("\n")),_.trim);
        this.width = this.matrix[0].length;
        this.height = this.matrix.length;
        this.boxes = [];
        this.ticks = 0;
        this.maxTicks = 40;
        this.row = null;
        this.column = null;
    }

    draw(position) {
        if (window.characterPosition.index <= 0) {
            window.characterPosition.width = 0;
        }
        this.row = window.characterPosition.row;
        position.c += window.characterPosition.width + 1;
        window.characterPosition.width += this.width + 1;

        if (window.characterPosition.width*boxSize > screenWidth) {
            window.characterPosition.row += 6;
            this.row += 6;
            position.c = 1
            window.characterPosition.width = this.width + 1;
            window.characterPosition.index = 0;
        }
        
        this.matrix.forEach ((row, rowIndex) => {
            for (let colIndex=0; colIndex<row.length;colIndex++) {
                if (row[colIndex] == 1) {
                    let r = this.row + rowIndex;
                    this.boxes.push(drawBox(r, position.c+colIndex));
                }
            }
        });
        window.characterPosition.index += 1;
        this.ticks = this.maxTicks;
        this.animate();
    }

    get fade() {
        if (this.ticks <= 0) return 0;
        return window.colorOffset - window.colorOffset * (this.maxTicks - this.ticks)/(this.maxTicks);
    }

    async animate() {
        if (this.ticks <= 0) {
            trackItems(this.row); // character.position.index -= 1;
            return;
        }

        this.ticks -= 5;
        for (let i=0;i<this.boxes.length;i++) {
            let box = this.boxes[i];
            let [x,y] = box.split(",");
            if (this.ticks <= 0) {
                fill(50,205,50);
                square(x,y,boxSize);
                delete activeBoxes[box];
            } else {
                fill(50+this.fade,205+this.fade,50+this.fade);
                square(x,y,boxSize);
                updateActiveBoxes(box);
            }
        }
        await delay(100);
        this.animate();
    }
}


window.writeWord = async (string) => {
    for (let i=0;i<string.length;i++) {
        let character = new MatrixCharacter(alphabet[string[i].toUpperCase()]);
        character.draw({r: 1, c: 1});
        await delay(100);
    }
}

let s = (sk) => {    
    
    let keyWasPressed = false;
    let keyThatWasPressed = null;
    let r = 1;
    let c = 1;

    sk.keyPressed = (e) => {
        e.preventDefault();
        keyThatWasPressed = e.key.toUpperCase();
        keyWasPressed = true;
    }
    
    sk.setup = () => {
        createCanvas(screenWidth, screenHeight);
        renderGrid();
    }

    sk.draw = () => {
        if (keyWasPressed == true) {
            console.log({keyThatWasPressed});
            if (keyThatWasPressed == "ENTER") {
                window.characterPosition.row += 6;
                window.characterPosition.index = 0;
            }
            if (keyThatWasPressed == "BACKSPACE") {
                window.characterPosition.row -= 6;
                window.characterPosition.index = 0;
            }
            let letter = alphabet[keyThatWasPressed];
            if (letter) {
                let character = new MatrixCharacter(letter);
                character.draw({r, c});
            }
        }
        keyWasPressed = false;
    }
}

async function Init() {
    const P5 = new p5(s);
}

export default Init;