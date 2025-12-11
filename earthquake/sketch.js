// I organized this by placing a timer and settin the time to zero. Initiating this is how I can get stale and accurate timing for the live Earthwauke data while chanign the directions of the shapes.

let timer = 0; 
let url = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_hour.csv";
let table;
let bg;
let cornerImg;
let lightImg;
let light2Img;
let soil;
let concrete;

//  Here I am setting a table and background to place this data on the page. I also didn't know how to put the images in a folde so I've just kind of elft it sitting out.

function preload() {
  // here I'm adding background an image for the background. This image is a photo of the soil and grass that I had taken personally, as well as some wood patterns.
  bg = loadImage('earthquake/grass.jpg'); // I can hardly get these images to work for some reason. I have no clue why. I also wanted to add sound that I gathered to it, just of the wind but I'm unsure if it would work.
  table = loadTable(url, 'csv', 'header');
  
  cornerImg = loadImage('earthquake/grass2.jpg'); //I'm unsure if this will work but the goal is to place this on the top left part of the screen. It's an image of the soil and grass.
 // The artistic viewpoint was to get a shaky image to kind of play the effect of an earthquake.
  lightImg = loadImage('earthquake/lights.jpg');
  light2Img = loadImage('earthquake/light2.jpg');
  soil = loadImage('earthquake/soil.jpg');
  concrete = loadImage('earthquake/concrete.jpg');
}
function setup() {
  createCanvas(640, 382); // Here I'm mmatching the image with the background size showing in the function.
  textAlign(CENTER, CENTER);
  textSize(12);
}

function draw() {
  background(bg);
  image(cornerImg, 0, 0, 60, 60); // Here I'm trying to place the image in the top left.
  image(lightImg, 640 - 100, 0, 50, 50);
  image(light2Img,  0, 382 - 100, 30, 40); // I needed to manually subtract everything by getting the canvas width and height.
  image(soil, 640 - 100, 382 - 100, 46, 46); // I'm resizing the images so they're not too big, and I'm also placing them in corners. I want thhem to look a littlle messy for artistic purposes. I want everything to look rather abstract and chaotic.
  
  // Here I'm making the timer change as the project progresses.
  if (frameCount % 60 === 0) timer++;
  fill(255);
  text('Timer: ' + timer, width/2, height - 20);

  // here im refereshing this every 60 seconds. I used the reference from Notion to help me out here, and then changed what I wanted to be changed. I orignally watched a tutorial on it which helped me understand it.
  if (timer > 60) {
    table = loadTable(url, 'csv', 'header'); // Here I'm loading the table with the link.
    timer = 0;
  }

  let rows = table.getRowCount();
  let x = 70;
  let y = 50;   // Here I drew the eaethqaukes here with the x and y cooridnates, so positioned and sized it

  for (let row = 0; row < rows; row++) {
    let name = table.getString(row, 'place');
    let nameArr = name.split(" of "); // This is pretty much breaking apart the names so it can look presentable. This is a really important line.
    let magnitude = float(table.getString(row, 'mag')); // Here's the variable data which I heavily referenced from Notion and stackoverflow. I wouldn't have been able to get this to work on my own. Can't remember examctly what thread but it was suggested from here or so https://stackoverflow.com/questions/37763435/split-single-line-string-into-multiline-string-in-javascript-p5-js

    // I coordinated it with different shades for different sizes.
    if (magnitude < 2) {
      fill(0, 200, 0, 180); //  I set green for small
    } else if (magnitude < 4) {
      fill(255, 165, 0, 180); // here I made it orange for mild
    } else {
      fill(255, 0, 0, 180); // red for strong
    }

    noStroke();
    ellipse(x, y, magnitude * 12, magnitude * 12); // Here's where the cirles are being drawn under ellipse, which I read the p5.js directory to understand it a little more.

    fill(255);
    text(nameArr.length > 1 ? nameArr[1] : name, x, y + 25); // That question mark (?) is actually a tenary operator which I found out was a much quicker way to do an if statement. I briefly watched this at 2x speed to understand it a bit in conext, though the video was focused on JavaScript rather than p5.js https://www.youtube.com/watch?v=atS_A9HHAVo
    text(magnitude, x, y + 40); // The rest is simply posisitioning

    x += width / 3;
    if (x > width - 70) {
      y += 80;
      x = 70; // Here is an unfinished if statement, it works but I'm not actualyl sure how or if it's causing any errors. I have no syntax errors as it seems but this very well could be a gical error and I'd have no clue, but it works which is the good thing.
    }
  }
}
