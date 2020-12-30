const mainContainer = document.querySelector("#main-container");
const allButtons = document.querySelectorAll("button");

// default parameters for grid
let gridSize = 16;
let backgroundColor = 'default';

function createGrid(n) {
    let gridArea = n * n;
    for (let i=0; i<gridArea; i++) {
        let subSquare = document.createElement("div");
        subSquare.classList.add("square");
        mainContainer.appendChild(subSquare);
    }
}

//ensures all buttons are in their 'not-pressed' state
function clearButtons() {
    allButtons.forEach((button) => {
      if (button.classList.contains("btn-pressed")) {
        button.classList.remove("btn-pressed");
        button.classList.add("btn-not-pressed");
      }
    })
}

// resets grid and size of grid
function reset(e) {
    while (true) {
        let gridSize = parseInt(prompt("Enter the grid size (n) you want: (n x n) (Maximum n value is 100)"));
        console.log(gridSize);
        if (gridSize <= 100 && gridSize >0) {
            while (mainContainer.firstChild) {
                mainContainer.removeChild(mainContainer.lastChild);
            }
            mainContainer.style.gridTemplateColumns = `repeat(${gridSize}, 1fr)`
            mainContainer.style.gridTemplateRows = `repeat(${gridSize}, 1fr)`
            backgroundColor = "default";
            main(gridSize);
            break;
        } else if (isNaN(gridSize)) {
            break;
        }
    }
    
} 
const resetButton = document.querySelector("#reset");
resetButton.addEventListener('click', reset);


function defaultColor() {
    clearButtons();
    defaultButton.classList.add("btn-pressed");
    backgroundColor = 'default';
}

const defaultButton = document.querySelector("#default");
defaultButton.addEventListener('click', defaultColor);


//change to grayscale coloring mode
function changeGrayscale(e) {
    clearButtons();
    grayscaleButton.classList.add("btn-pressed");
    backgroundColor = "grayscale";
}

const grayscaleButton = document.querySelector("#grayscale");
grayscaleButton.addEventListener('click', changeGrayscale);

function changeColorRandom(e) {
    clearButtons();
    randomColorButton.classList.add("btn-pressed");
    backgroundColor = "rgb";
}

const randomColorButton = document.querySelector("#rgb-color");
randomColorButton.addEventListener('click', changeColorRandom);

function randomNumberRGB() {
    return Math.floor(Math.random() * 255);
}

//choose random color from rgb css property
function rgbColor() {
    let randomR = randomNumberRGB();
    let randomG = randomNumberRGB();
    let randomB = randomNumberRGB();

    return `rgb(${randomR}, ${randomG}, ${randomB})`;
}

//choose color of user's choice
function chooseColor(e) {
    clearButtons();
    colorChooseButton.classList.add("btn-pressed");
    backgroundColor = "choose-color";
}

const colorChooseButton = document.querySelector("#choose-color");
colorChooseButton.addEventListener('click', chooseColor);

function main(gridSize) {

    createGrid(gridSize);

    clearButtons();
    defaultButton.classList.add("btn-pressed");

    function changeColor(e) {
        if (backgroundColor === "rgb") {
            e.target.style.backgroundColor = rgbColor();
        } else if (backgroundColor === "default") {
            e.target.style.backgroundColor = "black";
        } else if (backgroundColor === "choose-color") {
            e.target.style.backgroundColor = document.getElementById("color-picker").value;
        } else if (backgroundColor === "grayscale") {
            if (e.target.style.backgroundColor.match(/rgba/)) {
                let currentGrayscale = parseFloat(e.target.style.backgroundColor.slice(-4,-1));
                if (currentGrayscale < 0.9) {
                    e.target.style.backgroundColor = `rgba(0,0,0,${currentGrayscale+0.1})`;
                }
            } else {
                e.target.style.backgroundColor = "rgba(0,0,0,0.1)";
            }
        }
    }
    
    const subSquares = document.querySelectorAll(".square");
    subSquares.forEach((square) => {
        square.addEventListener('pointerover', changeColor);
    });
}

main(gridSize);