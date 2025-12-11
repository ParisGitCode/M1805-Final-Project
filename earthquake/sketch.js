// I organized this by placing a timer and settin the time to zero. Initiating this is how I can get stale and accurate timing for the live Earthwauke data while chanign the directions of the shapes.

let timer = 0; 
let url = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_hour.csv";
let table;
let bg;

//  Here I am setting a table and background to place this data on the page.

function preload() {
  // here I'm adding background an image for the background. This image is a photo of the soil and grass that I had taken personally, as well as some wood patterns.
  bg = loadImage('assets/grass.jpg'); 
  table = loadTable(url, 'csv', 'header');
}

function setup() {
  createCanvas(640, 382); // Here I'm mmatching the image with the background size showing in the function.
  textAlign(CENTER, CENTER);
  textSize(12);
}

function draw() {
  background(bg);

  // Here I'm making the timer change as the project progresses.
  if (frameCount % 60 === 0) timer++;
  fill(255);
  text('Timer: ' + timer, width/2, height - 20);

  // here im refereshing this every 60 seconds
  if (timer > 60) {
    table = loadTable(url, 'csv', 'header');
    timer = 0;
  }


  let rows = table.getRowCount();
  let x = 70;
  let y = 50;   // Drawing the eaethqaukes here with the x and y cooridnates.

  for (let row = 0; row < rows; row++) {
    let name = table.getString(row, 'place');
    let nameArr = name.split(" of ");
    let magnitude = float(table.getString(row, 'mag'));

    // different shades
    if (magnitude < 2) {
      fill(0, 200, 0, 180); // green for small
    } else if (magnitude < 4) {
      fill(255, 165, 0, 180); // orange for medium
    } else {
      fill(255, 0, 0, 180); // red for strong
    }

    noStroke();
    ellipse(x, y, magnitude * 12, magnitude * 12);

    fill(255);
    text(nameArr.length > 1 ? nameArr[1] : name, x, y + 25);
    text(magnitude, x, y + 40);

    x += width / 3;
    if (x > width - 70) {
      y += 80;
      x = 70;
    }
  }
}
