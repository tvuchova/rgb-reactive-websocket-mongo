// moduled querySelector
function qs(selectEl){
    return document.querySelector(selectEl);
}

// select RGB inputs
let red = qs('#red'),
green = qs('#green'),
blue = qs('#blue');

// selet num inputs
let redNumVal = qs('#redNum'),
greenNumVal = qs('#greenNum'),
blueNumVal = qs('#blueNum');

// select Color Display
let colorDisplay = qs('#color-display');

// select labels
let redLbl = qs('label[for=red]'),
greenLbl = qs('label[for=green]'),
blueLbl = qs('label[for=blue]');

var ws = null;
var url = "ws://localhost:8080/event/rgb";

// init display Colors
displayColors();
// init Color Vals
colorNumbrVals();
// init ColorSliderVals
initSliderColors();
// init Change Range Val
changeRangeNumVal();
// init Colors controls
colorSliders();

// display colors
function displayColors() {
    //get value by server
    if (ws != null) {
        console.log("Result: " + `${red.value}, ${green.value}, ${blue.value}`);
        ws.send(`${red.value}, ${green.value}, ${blue.value}`);

        ws.onmessage = function (event) {
            console.log("Result: " + "rgb(" + event.data + ")");
            colorDisplay.style.backgroundColor = "rgb(" + event.data + ")";
        }
    }
}

// initial color val when DOM is loaded
function colorNumbrVals(){
    redNumVal.value = red.value;
    greenNumVal.value = green.value;
    blueNumVal.value = blue.value;
}

// initial colors when DOM is loaded
function initSliderColors(){

    // label bg colors
    redLbl.style.background = `rgb(${red.value},0,0)`;
    greenLbl.style.background = `rgb(0,${green.value},0)`;
    blueLbl.style.background = `rgb(0,0,${blue.value})`;

    // slider bg colors
    sliderFill(red);
    sliderFill(green);
    sliderFill(blue);
    colorDisplay.style.backgroundColor = `rgb(${red.value}, ${green.value}, ${blue.value})`;
}


// Slider Fill offset
function sliderFill(clr){
    let val = (clr.value - clr.min) / (clr.max - clr.min);
    let percent = val * 100;

    // clr input
    if(clr === red){
        clr.style.background = `linear-gradient(to right, rgb(${clr.value},0,0) ${percent}%, #cccccc 0%)`;
    } else if (clr === green) {
        clr.style.background = `linear-gradient(to right, rgb(0,${clr.value},0) ${percent}%, #cccccc 0%)`;
    } else if (clr === blue) {
        clr.style.background = `linear-gradient(to right, rgb(0,0,${clr.value}) ${percent}%, #cccccc 0%)`;
    }
}

// change range values by number input
function changeRangeNumVal(){

    // Validate number range
    redNumVal.addEventListener('change', ()=>{
        // make sure numbers are entered between 0 to 255
        if(redNumVal.value > 255){
            alert('cannot enter numbers greater than 255');
            redNumVal.value = red.value;
        } else if(redNumVal.value < 0) {
            alert('cannot enter numbers less than 0');
            redNumVal.value = red.value;
        } else if (redNumVal.value == '') {
            alert('cannot leave field empty');
            redNumVal.value = red.value;
            initSliderColors();
            displayColors();
        } else {
            red.value = redNumVal.value;
            initSliderColors();
            displayColors();
        }
    });

    // Validate number range
    greenNumVal.addEventListener('change', ()=>{
        // make sure numbers are entered between 0 to 255
        if(greenNumVal.value > 255){
            alert('cannot enter numbers greater than 255');
            greenNumVal.value = green.value;
        } else if(greenNumVal.value < 0) {
            alert('cannot enter numbers less than 0');
            greenNumVal.value = green.value;
        } else if(greenNumVal.value == '') {
            alert('cannot leave field empty');
            greenNumVal.value = green.value;
            initSliderColors();
            displayColors();
        } else {
            green.value = greenNumVal.value;
            initSliderColors();
            displayColors();
        }
    });

    // Validate number range
    blueNumVal.addEventListener('change', ()=>{
        // make sure numbers are entered between 0 to 255
        if (blueNumVal.value > 255) {
            alert('cannot enter numbers greater than 255');
            blueNumVal.value = blue.value;
        } else if (blueNumVal.value < 0) {
            alert('cannot enter numbers less than 0');
            blueNumVal.value = blue.value;
        } else if(blueNumVal.value == '') {
            alert('cannot leave field empty');
            blueNumVal.value = blue.value;
            initSliderColors();
            displayColors();
        } else {
            blue.value = blueNumVal.value;
            initSliderColors();
            displayColors();
        }
    });
}

// Color Sliders controls
function colorSliders(){
    ws = new WebSocket(url);
    ws.onopen = function (event) {
        console.log("Opened the Websocket Connection!");
    };

    red.addEventListener('input', () => {
        displayColors();
        initSliderColors();
        changeRangeNumVal();
        colorNumbrVals();
    });

    green.addEventListener('input', () => {
        displayColors();
        initSliderColors();
        changeRangeNumVal();
        colorNumbrVals();
    });

    blue.addEventListener('input', () => {
        displayColors();
        initSliderColors();
        changeRangeNumVal();
        colorNumbrVals();
    });
}