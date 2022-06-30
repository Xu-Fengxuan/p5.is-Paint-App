/*
Press "h" for help.
The fifth color button is a colorpicker, click on it and choose a color if you want other colors! 
Use mouse wheel to change stroke size. 
Use "Enter" key to clear canvas. 
Press "Erase" button or "e" key a second time to change back to painting mode or just click on a colour.
*/

p5.disableFriendlyErrors = true;
let c,
  w,
  colorPicker,
  buttonMargin_height,
  buttonMargin_length,
  interactingWithElement,
  pColorPickerColor,
  colorPickerColor,
  p_C,
  helpShowed,
  help_Text,
  stopDrawingComplexShape;

function preload() {
  //preload help button to ensure it displays at once without asynchronous loading in draw function.
  loadImage('help_symbol.svg')
}

function setup() {
  rectMode(CORNERS);
  c= "white";
  p_C="white";
  w = 1;
  buttonMargin_height = 15;
  buttonMargin_length = 2;
  interactingWithElement = false;
  helpShowed=false;
  help_Text=`The fifth color button is a colorpicker, click on it and 
choose a color if you want other colors! 

Use mouse wheel to change stroke size. 

Use "Enter" key to clear canvas. 

Press "Erase" button or "e" key a second time to change 
back to painting mode or just click on a colour.`
  stopDrawingComplexShape = false;
  createCanvas(windowWidth, windowHeight);
  background(255);

  //   red_button = createButton('red');
  //   red_button.position(0, 0);
  //   red_button.size(50,50);
  //   red_button.style('color', '#FFFFFF');
  //   red_button.style('background-color', 'red');
  //   red_button.mousePressed(redButton);

  //   blue_button = createButton('blue');
  //   blue_button.position(50, 0);
  //   blue_button.size(50,50);
  //   blue_button.style('color', '#FFFFFF');
  //   blue_button.style('background-color', 'blue');
  //   blue_button.mousePressed(blueButton);

  //create the four color buttons
  createColorButton(0, 0, "red", "red", redButton);
  createColorButton(1, 0, "blue", "blue", blueButton);
  createColorButton(2, 0, "green", "green", greenButton);
  createColorButton(3, 0, "black", "black", blackButton);
  
//   //create 'create complex shape' button
//   createCustomButton(9, 0, 65, 50, "complex shape", complexShape);
  
  //create the erase and clear screen buttons
  createNormalButton(9, 0, "erase", eraseButton);
  createNormalButton(10.5, 0, "clear", clearDrawingCanvas);

  //create colorpicker that has a random default color
  colorPicker = createColorPicker(color(random(0,255),random(0,255),random(0,255)));
  colorPicker.size(50, 50);
  colorPicker.position(200 + buttonMargin_length, 0 + buttonMargin_height);
  colorPicker.mouseOver(paintbrushOverride_start);
  colorPicker.mouseOut(paintbrushOverride_end);
  colorPicker.changed(colorPickerChangeColor)

  //create a slider for controlling stroke size
  slider = createSlider(1, 100, 1, 1);
  slider.position(300 + buttonMargin_length, 15 + buttonMargin_height);
  slider.style("width", "100px");
  slider.mouseOver(paintbrushOverride_start);
  slider.mouseOut(paintbrushOverride_end);

//   colorPickerColor = ["0", " 0", " 0"];
//     var targetProxy = new Proxy(colorPickerColor, {
//       set: function (target,key,value) {
//         target[key] = value;
//         c = value.color().toString("rgb").slice(4, -1).split(",");
//         console.log(true);
//         return true;
//       },
//     });

  //create help button
  help_button = createImg('help_symbol.svg','help');
  help_button.position(width-50, 10);
  help_button.mousePressed(help);
  
  //create help text
  helpText = createDiv(help_Text);
  helpText.style('font-size', '16px');	
  helpText.style('color', 'black');
  helpText.style('font-family', 'Roboto');
  helpText.style('background-color', '#FFEB3B');
  helpText.style('padding', '1em');
  helpText.style('width', '375px');
  helpText.style('white-space', 'pre');
  helpText.position(width-460, 10);
  helpText.hide();
}

function draw() {
  // console.log(c);
  w = slider.value();
  stroke(c);
  strokeWeight(w);


  //   colorPickerColor.value = colorPicker
  //     .color()
  //     .toString("rgb")
  //     .slice(4, -1)
  //     .split(",");
  // 
  // //check for change in colorpicker colour
  // colorPickerColor = colorPicker
  //   .color()
  //   .toString("rgb")
  //   .slice(4, -1)
  //   .split(",");
  // if (colorPickerColor !== pColorPickerColor) {
  //   c = colorPicker.color().toString("rgb").slice(4, -1).split(",");
  //   console.log(c);
  //   pcolorPickerColor = colorPicker
  //     .color()
  //     .toString("rgb")
  //     .slice(3, -1)
  //     .split(",");
  // }

  //mouse icon controller
  if (mouseY > 50 + buttonMargin_height + 2) {
    cursor(CROSS);
  } else {
    cursor(ARROW);
  }

  //pen logic
  if (mouseIsPressed && interactingWithElement === false) {
    line(pmouseX, pmouseY, mouseX, mouseY);
  }

  push();
  stroke("black");
  strokeWeight(1);
  fill("grey");
  rect(-1, -1, windowWidth + 1, 50 + buttonMargin_height + 2);

  fill("white");
  noStroke();
  textSize(15);
  textFont("Roboto");
  text("Colour", 5, 14);
  text("Stroke Size", 300, 14);
  // text('Shapes', 450, 14)
  pop();
}

function colorPickerChangeColor() {
  c = colorPicker.color().toString("rgb").slice(4, -1).split(",");
  return false;
}

function mouseWheel(event) {
  //Strange, the mouseWheel() coordinates seem to be inverted when I use my mouse. Don't know if it's just my mouse or not.
  if (event.delta > 0) {
    w += 1;
  } else {
    w -= 1;
  }
  if (w < 0) {
    w = 0;
  }
  slider.value(w);
  return false;
}

function paintbrushOverride_start() {
  interactingWithElement = true;
}

function paintbrushOverride_end() {
  interactingWithElement = false;
}

//clears all drawings
function clearDrawingCanvas() {
  background('white');
}

//blue button logic
function blueButton() {
  c = "blue";
  return false;
}

//red button logic
function redButton() {
  c = "red";
  return false;
}

//green button logic
function greenButton() {
  c = "green";
  return false;
}

//black button logic
function blackButton() {
  c = "black";
  return false;
}

//enables erasing
function eraseButton() {
  if (c==="white"){
    c=p_C;
    p_C = "white";
    return false;
  }
  p_C=c;
  c="white";
  return false;
}

// runs into memory issue directly after function is called, even before the first line of code in the function is executed. I tested this with console.log(), which seems to have a tendency to lag a little though.
// //creates a complex shape
// function complexShape() {
//   push();
//   beginShape();
//   fill(c);
//   stroke(c);
//   while (stopDrawingComplexShape == false) {
//     if (mouseIsPressed == true) {
//       console.log('1')
//       vertex(mouseX, mouseY);
//     }
//   }
//   endShape();
//   console.log('2')
//   pop();
// }



function keyPressed(){
 if (keyCode == ENTER) {
   background('white');
 }if (key == "e"){
   eraseButton();
 }if (key == "h"){
   help();
  }//if (keyCode == 32){
 //   stopDrawingComplexShape = true;
 // }
}

function help(){
  if (helpShowed==false){
    helpText.show();
    helpShowed=true;
    return false;
  }
  helpText.hide();
  helpShowed=false;
  return false;
}
  
//create custom button
function createCustomButton(x, y, width, height, name, output_function) {
  new_complex_button = createButton(name);
  new_complex_button.position(
    x * 50 + buttonMargin_length,
    y * 50 + buttonMargin_height
  );
  new_complex_button.size(width, height);
  new_complex_button.mousePressed(output_function);
  new_complex_button.mouseOver(paintbrushOverride_start);
  new_complex_button.mouseOut(paintbrushOverride_end);
}

//create normal button
function createNormalButton(x, y, name, output_function) {
  new_normal_button = createButton(name);
  new_normal_button.position(
    x * 50 + buttonMargin_length,
    y * 50 + buttonMargin_height
  );
  new_normal_button.size(50, 50);
  new_normal_button.mousePressed(output_function);
  new_normal_button.mouseOver(paintbrushOverride_start);
  new_normal_button.mouseOut(paintbrushOverride_end);
}

//create color button
function createColorButton(x, y, color, HEX, output_function) {
  new_color_button = createButton(color);
  new_color_button.position(
    x * 50 + buttonMargin_length,
    y * 50 + buttonMargin_height
  );
  new_color_button.size(50, 50);
  new_color_button.style("color", "#FFFFFF");
  new_color_button.style("background-color", HEX);
  new_color_button.mousePressed(output_function);
  new_color_button.mouseOver(paintbrushOverride_start);
  new_color_button.mouseOut(paintbrushOverride_end);
}