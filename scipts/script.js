const mainContainer = document.querySelector("#main-container");
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

function reset(e) {
    while (mainContainer.firstChild) {
        mainContainer.removeChild(mainContainer.lastChild);
    }
    let gridSize = parseInt(prompt("Enter the grid size (n) you want: (n x n) (Maximum n value is 100)"));
    mainContainer.style.gridTemplateColumns = `repeat(${gridSize}, 1fr)`
    mainContainer.style.gridTemplateRows = `repeat(${gridSize}, 1fr)`
    main(gridSize);
} 

const resetButton = document.querySelector("#reset");
resetButton.addEventListener('click', reset);

function randomNumberRGB() {
    return Math.floor(Math.random() * 255);
}

function changeColorRandom(e) {
    backgroundColor = "rgb";
}

const randomColorButton = document.querySelector("#rgb-color");
randomColorButton.addEventListener('click', changeColorRandom);

function defaultColor() {
    backgroundColor = 'default';
}

const defaultButton = document.querySelector("#default");
defaultButton.addEventListener('click', defaultColor);

function rgbColor() {
    let randomR = randomNumberRGB();
    let randomG = randomNumberRGB();
    let randomB = randomNumberRGB();

    return `rgb(${randomR}, ${randomG}, ${randomB})`;
}

function chooseColor(e) {
    backgroundColor = "choose-color";
}

const colorChooseButton = document.querySelector("#choose-color");
colorChooseButton.addEventListener('click', chooseColor);

function main(gridSize) {

    createGrid(gridSize);

    function changeColor(e) {
        if (backgroundColor === "rgb") {
            e.target.style.backgroundColor = rgbColor();
        } else if (backgroundColor === "default") {
            e.target.style.backgroundColor = "black";
        } else if (backgroundColor === "choose-color") {
            e.target.style.backgroundColor = document.getElementById("color-picker").value;
        }
    }
    
    const subSquares = document.querySelectorAll(".square");
    subSquares.forEach((square) => {
        square.addEventListener('pointerover', changeColor);
    });
}

main(gridSize);