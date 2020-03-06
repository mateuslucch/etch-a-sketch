const container = document.querySelector('#container'); //adiciona o div com a id "container" a uma variavel
container.style.display = "block";
container.style.textAlign = "center";
container.style.fontFamily = "Arial";

let allSquares = [];
let gridColumn = [];
let rgbMode = false;
let backColor = "rgba(0, 0, 0 , 0.5)";

//grid size
let gridSize = 16;
const totalSize = 720;
let squareSize = (totalSize / gridSize) + "px";
let transp = 0;

//box only for buttons
var buttonsBox = document.createElement("p");

var clearGrid = document.createElement("button");
clearGrid.textContent = "CLEAR BOARD";
clearGrid.classList.add("buttons");
clearGrid.setAttribute("id", "resetColors");

var resetGridBtn = document.createElement("button");
resetGridBtn.textContent = "CHANGE GRID SIZE";
resetGridBtn.classList.add("buttons");
resetGridBtn.setAttribute("id", "resetGrid");

var changeColor = document.createElement("button");
changeColor.textContent = "RANDOM COLOR OFF";
changeColor.classList.add("buttons");
changeColor.setAttribute("id", "changeColor");

buttonsBox.appendChild(resetGridBtn);
buttonsBox.appendChild(clearGrid);
buttonsBox.appendChild(changeColor);
container.appendChild(buttonsBox);

//buttons detect
const sketchButtons = document.querySelectorAll(".buttons");
sketchButtons.forEach((button) => {
    button.addEventListener('click', (e) => {
        if (button.id == "resetColors") {
            resetSquareColors();
        }
        if (button.id == "resetGrid") {
            resetGrid();
        }
        if (button.id == "changeColor") {
            changeColorMode();
        }
    })
})

function changeColorMode() {

    rgbMode = !rgbMode; //true->false or false->true
    if (rgbMode == true) {
        changeColor.style.backgroundColor = "#999999";
        changeColor.textContent = "RANDOM COLOR ON";

    }
    else {
        changeColor.style.backgroundColor = "#f2f2f2";
        changeColor.textContent = "RANDOM COLOR OFF";

    }
}

//functions that start when open the html
createGrid();
onLoadRun();

function createGrid() { //create the grid

    for (let i = 0; i < gridSize; i++) {

        var lineParent = document.createElement("div");
        lineParent.style.position = "relative";
        lineParent.style.display = "inline-block";
        lineParent.classList.add("columnLines");

        for (let j = 0; j < gridSize; j++) {

            let squareId;
            squareId = ("square" + i + "." + j);   //create variable for "id" with "i" and "j". not being in use, but it could be useful

            let oneSquare = document.createElement("div");
            oneSquare.setAttribute("id", squareId); //set an "id" to each square
            oneSquare.classList.add("squares");

            //squares style and size
            oneSquare.style.border = "0.1px solid #9a9a9a";
            oneSquare.style.height = squareSize;
            oneSquare.style.width = squareSize;

            lineParent.appendChild(oneSquare);

        }
        container.appendChild(lineParent);
    }

    allSquares = document.getElementsByClassName("squares");
    gridColumn = document.getElementsByClassName("columnLines");

}

function resetGrid() {

    //call prompt
    userPrompt();

    if (gridSize === null) { //press cancel in the prompt returns null (standard)
        return; //break out of the function early
    }

    if (!isNaN(gridSize)) { //test if is a number

        if (Number.isInteger(+gridSize)) {//test if is integer. why "+gridsize" i have no idea, but it work
            if (gridSize >= 65 || gridSize <= 0) {
                resetGrid();
            }

            else {//make new grid with new size

                //clean grid
                while (gridColumn.length > 0) gridColumn[0].remove(); //search more about "remove()"

                squareSize = totalSize / gridSize + "px";
                createGrid();
                onLoadRun();
            }
        }

        else { resetGrid(); }//if not integer, call resetGrid
    }
    else { resetGrid(); }//if not number, reset    
}

function userPrompt() {
    gridSize = prompt("Please, enter with the grid size(from 1-64), or press cancel to close this prompt:");
}

function onLoadRun() {
    for (let i = 0; i < allSquares.length; i++) {
        allSquares[i].style.opacity = "0.1";
        allSquares[i].addEventListener("mouseenter", function () { mouseEnterSquare(i) }); //anonimous function (function()) and add the function you want to call, with parameter inside
    }
}

//change color
function mouseEnterSquare(squareI) {

    console.log(allSquares[squareI].id);

    if (rgbMode == false) {
        backColor = "rgb(" + 0 + "," + 0 + "," + 0 + ")";        
        allSquares[squareI].style.opacity = (allSquares[squareI].style.opacity == 1) ? 1 : parseFloat(allSquares[squareI].style.opacity) + 0.1;

    }

    if (rgbMode == true) {

        let redRGB = Math.floor(Math.random() * 255);
        let greenRGB = Math.floor(Math.random() * 255);
        let blueRGB = Math.floor(Math.random() * 255);
        allSquares[squareI].style.opacity = "1";
        let rgbColors = "rgb(" + redRGB + "," + greenRGB + "," + blueRGB + ")";
        backColor = rgbColors;

    }
    allSquares[squareI].style.backgroundColor = backColor;
}

//clear colors
function resetSquareColors() {
    for (let i = 0; i < allSquares.length; i++) {
        allSquares[i].style.backgroundColor = "white";
        //        allSquares[i].style.opacity = allSquares[i].style.opacity++;
    }
}

//not in use
/*allSquares.forEach(element => {//!!!!search more about this!!
    console.log(allSquares[i]);
});*/