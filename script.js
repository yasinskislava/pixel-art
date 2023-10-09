// alert(`Width: ${window.innerWidth}, Height: ${window.innerHeight}`);
const menu = document.querySelector(".menu");
const btns = document.querySelectorAll(".open-btn");
const rgbPalette = document.querySelector(".rgb-palette");

const canvas = document.querySelector("canvas");
const main = canvas.getContext("2d");
canvas.addEventListener("contextmenu", e => {
    e.preventDefault();
});

let box;
let boxX = 512;
let boxY = 70;
let color = "black";
let bodyWidth;
let bodyHeight;
let spaceX;
let spaceY;
const filledBoxes = [];
let isDraw = true;
let hold = false;
// for (let i of btns) {
//     i.addEventListener("click", openCanvas);
// }

btns[0].addEventListener("click", openCanvas);
btns[1].addEventListener("click", openCanvas);

function openCanvas(e) {
    canvas.style.display = "block";
    rgbPalette.style.display = "block";
    menu.style.display = "none";
    box = Number(e.target.value);
    for (let i = 0; i < 512 / box; i ++)
    {
        let row = [];
        for (let j = 0; j < 512 / box; j ++)
        {
            row.push("white");
        }
        filledBoxes.push(row);
    }
    bodyWidth = window.innerWidth;
    bodyHeight = window.innerHeight;
    spaceX = (bodyWidth - 512) / 2;
    spaceY = (bodyHeight - 512) / 2;
    canvas.style.marginTop = `${spaceY}px`;
}

document.addEventListener("mousemove", e => {
    if (boxX / box < 512 / box && boxY / box < 512 / box && boxX / box >= 0 && boxY / box >= 0) {
        main.fillStyle = filledBoxes[boxY / box][boxX / box];
        main.fillRect(boxX, boxY, box, box);
    }
    boxX = box * (Math.floor((e.clientX - spaceX) / box));
    boxY = box * (Math.floor((e.clientY - spaceY) / box));
    main.fillStyle = "rgba(0, 0, 0, 0.2)";
    main.fillRect(boxX, boxY, box, box);
});
let funcObj;
canvas.addEventListener("mousedown", (e) => { hold = true; funcObj = e; });
document.addEventListener("mouseup", () => { hold = false; });

setInterval(checking, 0.5);
function checking() {
    if (hold === true) {
        drawPixel(funcObj);
    }
}

function drawPixel(res) {
    if (res.button === 0) {
        main.fillStyle = color;
        main.fillRect(boxX, boxY, box, box);   
        filledBoxes[boxY / box][boxX / box] = main.fillStyle;
    }
    else if(res.button === 2) {
        main.clearRect(boxX, boxY, box, box);
        filledBoxes[boxY / box][boxX / box] = "white";
        main.fillStyle = "rgba(0, 0, 0, 0.2)";
        main.fillRect(boxX, boxY, box, box);
    }
}

const red = document.querySelector("#red");
const green = document.querySelector("#green");
const blue = document.querySelector("#blue");
const showColor = document.querySelector("#show-color");
const showRgb = document.querySelector("#show-rgb");
let rgb = "rgb(0, 0, 0)";

red.addEventListener("input", changeColor);
green.addEventListener("input", changeColor);
blue.addEventListener("input", changeColor);

function changeColor() {
    rgb = `rgb(${red.value}, ${green.value}, ${blue.value})`;
    color = rgb;
    showRgb.innerHTML = rgb;
    showColor.style.backgroundColor = rgb;
}

// -----------------------------------------------
// mouse holding --- +++++
// different sizes
// filling
// rgb palette --- +++++
// spaces in drawing
// animation
// color picker
// shadow repeating
// return button
// Downloading
// Ctrl + Z
// Clear All
// -----------------------------------------------