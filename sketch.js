let characters = []; // Array to store characters read from CSV
let streams = []; // Array to hold all the character streams
let fontSize = 20; // Font size
let cols; // Number of columns
let linaFontSize = 60; // Initial font size for "Lina"
let scaleFactor = 1; // Dynamic scaling factor
let scaleDirection = 1; // Scaling direction
let scaleSpeed = 0.02; // Scaling speed

// Load CSV file
function preload() {
  characters = loadStrings('characters.csv'); // Load characters from the CSV file
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  cols = floor(width / fontSize); // Calculate the number of columns based on screen width
  textSize(fontSize);
  textFont('monospace'); // Use a monospace font for a Matrix-like effect

  // Initialize a character stream for each column
  for (let i = 0; i < cols; i++) {
    let stream = new Stream(i * fontSize); // One stream per column
    streams.push(stream);
  }
}

function draw() {
  background(0, 150); // Semi-transparent black background
  for (let stream of streams) {
    stream.render(); // Render all character streams
  }

  // Draw the fixed "Lina"
  drawLina();
}

// Draw the fixed "Lina"
function drawLina() {
  // Dynamically scale the font size
  scaleFactor += scaleSpeed * scaleDirection;
  if (scaleFactor >= 1.2 || scaleFactor <= 0.8) {
    scaleDirection *= -1; // Reverse the scaling direction
  }

  // Set the dynamic font size for "Lina" and use a pink color
  textSize(linaFontSize * scaleFactor); // Adjust font size based on scaling factor
  fill(255, 105, 180); // Pink color
  noStroke();

  let lina = "Lina".split('');
  let startX = floor(cols / 2) - floor(lina.length / 2); // Calculate the starting position for centering "Lina"
  let centerY = height / 2;

  for (let i = 0; i < lina.length; i++) {
    text(lina[i], (startX + i) * fontSize, centerY);
  }

  textSize(fontSize); // Reset the font size to the default
}

// Character stream class
class Stream {
  constructor(x) {
    this.x = x; // Column position
    this.y = random(-500, 0); // Random starting height
    this.speed = random(2, 10); // Different speeds for each character stream
    this.chars = this.generateChars(); // Initialize the character stream
  }

  // Generate random characters for the stream
  generateChars() {
    let length = floor(random(5, 15)); // Random length for each character stream
    let chars = [];
    for (let i = 0; i < length; i++) {
      let char = random(characters).trim(); // Randomly pick a character from the CSV data
      chars.push(char);
    }
    return chars;
  }

  render() {
    fill(0, 255, 0); // Green characters
    for (let i = 0; i < this.chars.length; i++) {
      let charY = this.y + i * fontSize; // Y position for each character
      if (charY > height) charY = charY % height; // Loop back to the top when the character goes off screen
      text(this.chars[i], this.x, charY);
    }
    this.update(); // Update the character stream position
  }

  update() {
    this.y += this.speed; // Move the character stream downwards
    if (this.y > height) {
      this.y = random(-500, 0); // Reset the position when it goes off screen
      this.chars = this.generateChars(); // Regenerate the character stream
    }
  }
}