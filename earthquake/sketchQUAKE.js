let timer = 0; 
let url = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_hour.csv";
let table;
let bg;

function preload() {
  // Load background image and earthquake data
  bg = loadImage('assets/Leibniz10.png'); 
  table = loadTable(url, 'csv', 'header');
}

function setup() {
  createCanvas(640, 382); // match background size
  textAlign(CENTER, CENTER);
  textSize(12);
}

function draw() {
  background(bg);

  // Timer display
  if (frameCount % 60 === 0) timer++;
  fill(255);
  text('Timer: ' + timer, width/2, height - 20);

  // Refresh data every 60 seconds
  if (timer > 60) {
    table = loadTable(url, 'csv', 'header');
    timer = 0;
  }

  // Draw earthquakes
  let rows = table.getRowCount();
  let x = 70;
  let y = 50;

  for (let row = 0; row < rows; row++) {
    let name = table.getString(row, 'place');
    let nameArr = name.split(" of ");
    let magnitude = float(table.getString(row, 'mag'));

    // Color code by magnitude
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

    // Move grid position
    x += width / 3;
    if (x > width - 70) {
      y += 80;
      x = 70;
    }
  }
}
