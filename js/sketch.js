//////////////////////////
/* EDIT VALUES BELOW TO MATCH DEVICE SLIDERS*/
const CCSLIDER1 = 2;
const CCSLIDER2 = 3;
const CCSLIDER3 = 4;
const CCSLIDER4 = 5;
const CCSLIDER5 = 6;
const CCSLIDER6 = 8;
const CCSLIDER7 = 9;
const CCSLIDER8 = 12;

let myController;
//////////////////////////
// built in P5 function gets called at the beginning
function setup() {
    createCanvas(innerWidth, innerHeight);
    background(0);
    WebMidi
        .enable()
        .then(onEnabled)
        .catch(err => alert(err));
}
// gets called by MIDI library once MIDI enabled
function onEnabled() {
    // Display available MIDI input devices
    if (WebMidi.inputs.length < 1) {
        console.log("No device detected.");
    } else {
        WebMidi.inputs.forEach((device, index) => {
            console.log(`${index}: ${device.name}`);
        });
    }
    myController = WebMidi.inputs[0];
    myController.channels[1].addListener("noteon", noteOn);
    myController.channels[1].addListener("controlchange", allCC);

}
// gets called when a MIDI note its intercepted 
function noteOn(e) {
    // for APC Mini
    // console.log(e.note.name, e.note.accidental || null, e.note.octave);
    // calculate the postion of the note in the grid of notes
    let pos = returnXY(e.note.name, e.note.accidental || '', e.note.octave);
    // calculate the x y pixel equivalent 
    // add offset values to position in the middle of an notional 8 x8 grid cell
    // width / 16 = half of cell size
    let hSpace = width / 16;
    let vSpace = height / 16;
    let x = pos.x * width + hSpace;
    let y = pos.y * height + vSpace
    // TODO - use these values to draw something at the note position?
    // for example: circle(x, y, 20)
}
// gets called when a MIDI control change message is intercepted
function allCC(e) {
    console.log(e.controller.number, e.data);
    let ratio = e.data[2] / 127
    switch (e.controller.number) {
        case CCSLIDER1: 
            break; 
        case CCSLIDER2: 
            break;
        case CCSLIDER3: 
            break;
        case CCSLIDER4: 
            break;
        case CCSLIDER5: 
            break;
        case CCSLIDER6: 
            break;
        case CCSLIDER7: 
            break;
        case CCSLIDER8: 
            break;
        case CCSLIDER9:
            break;
    }
}
// function draw() {

//     const cellSize = 2.5;
//     // let noiseScale =  100;
    
//     function setup() {
//       createCanvas(600,  600, WEBGL);
//       noStroke();
//     }
    
    function draw() {
      background(0);
      //Edit these to change how fast sphere turns
    
      rotateX(frameCount *  0.05);
      rotateY(frameCount *  0.1);
    //Number of points on the sphere
      let numPoints =  40; 
      //Radius
      let radius =  150; 
    
      //Loop points on the sphere
      for (let i =  0; i < numPoints; i++) {
        for (let j =  0; j < numPoints; j++) {
          //Normalize current point's position to the unit sphere
          let phi = map(i,  0, numPoints,  0, TWO_PI);
          let theta = map(j,  0, numPoints,  0, PI);
    
          //Calculate the Cartesian coordinates from sphere coordinates
          let x = radius * sin(theta) * cos(phi);
          let y = radius * sin(theta) * sin(phi);
          let z = radius * cos(theta);
    
        //Apply noise
          // let c = map(noise(x * noiseScale, y * noiseScale, z * noiseScale),  0,  1,  0,  255);
          //fill(c);
          fill('#AAFF00');
    
          // Draw a sphere at the current position
          push();
          translate(x, y, z);
          sphere(cellSize);
          pop();
        }
      }
    }



