
// Global selections and variables
const colorDives = document.querySelectorAll('.color');
const generateBtn = document.querySelector ('.generate');
const currentHexes = document.querySelector ('.color h2');
const sliders = document.querySelectorAll('input[type="range"]');
let initialColors;

//Add Event Listeners
 sliders.forEach(slider => {
  slider.addEventListener("input", hslControls);
});
//Update h2 
sliders.forEach(slider => {
   slider.addEventListener("input", hslControls);
});
colorDives.forEach((div, index) => {
    div.addEventListener ("change", () => {
       updateTextUI(index);
    });
});


//Function
/* //Color generator without any library
function generateHex() {
    const letters = "#0123456789ABCDEF";
    let hash = "#";
    for( let i=0; i<6; i++) {
        hash += letters[Math.floor(Math.random() * 16)];
    }
    return hash;
} */

// Colors generator with chroma library

function generateHex() {
    const hexColor = chroma.random();
    return hexColor;
}


function randomColors () {
    colorDives.forEach((div,index) => {
       const hexText = (div.children[0]);
       const randomColors = generateHex();

       //Add the color to the background
       div.style.backgroundColor = randomColors;
       hexText.innerText = randomColors;
       //Check for contranst
       checkTextContrast(randomColors, hexText);
       //Initial Colorize Sliders
       const color = chroma(randomColors);
       const sliders = div.querySelectorAll('.sliders input');
       const hue = sliders[0];
       const brightness = sliders[1];
       const saturation = sliders[2];

       colorizeSliders(color, hue, brightness, saturation);
    });
}
function checkTextContrast(color, text) {
    const luminance = chroma(color).luminance();
    if(luminance > 0.5) {
        text.style.color = "black";
    }else {
        text.style.color = "white";
    }
}
function colorizeSliders(color, hue, brightness, saturation) {
    //Scale saturation
    const noSat = color.set('hsl.s', 0);
    const fullSat = color.set('hsl.s', 1);
    const scaleSat = chroma.scale([noSat,color,fullSat]);
    //Scale Brightness
    const midBright = color.set('hsl.l', 0.5);
    const scaleBright = chroma.scale(["black", midBright, "white"]);

    //Update input colors
    saturation.style.backgroundImage = `linear-gradient(to right,${scaleSat(0)}, 
    ${scaleSat(1)})`;

    brightness.style.backgroundImage = `linear-gradient(to right,${scaleBright(0)},
    ${scaleBright(0.5)}, ${scaleBright(1)})`;

    // Scale hue nianse
    hue.style.backgroundImage = `linear-gradient(to right, 
    rgb(204,75,75),
    rgb(204,204,75),
    rgb(75,204,75),
    rgb(75,204,204),
    rgb(75,75,204),
    rgb(204,75,204),
    rgb(204,75,75))`;
}

function hslControls(e) {
    const index =
      e.target.getAttribute("data-bright") ||
      e.target.getAttribute("data-sat") ||
      e.target.getAttribute("data-hue");
  
    let sliders = e.target.parentElement.querySelectorAll('input[type="range"]');
    const hue = sliders[0];
    const brightness = sliders[1];
    const saturation = sliders[2];
  
    const bgColor = initialColors[index].guerySelector("h2").innerText;
  
    let color = chroma(bgColor)
      .set("hsl.s", saturation.value)
      .set("hsl.l", brightness.value)
      .set("hsl.h", hue.value);
  
    colorDivs[index].style.backgroundColor = color;
  
    //Colorize inputs/sliders
    colorizeSliders(color, hue, brightness, saturation);
}
function updateTextUI(index) {
    const activeDiv = colorDives[index];
    const color = chroma(activeDiv.style.backgroundColor);
    const textHex = activeDiv.querySelector('h2');
    const icons = activeDiv.querySelectorAll('.controls button');
    textHex.innerText = color.hex();
}


randomColors();


