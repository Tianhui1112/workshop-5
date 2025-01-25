# workshop_5:

You can view the generated effect by visiting the following link:

[View Workshop 5 Effect](  https://tianhui1112.github.io/workshop-5/)


## My Idea


I have always been a big fan of The Matrix. Through this course, I decided to pay tribute to one of my favorite works using code. I created an effect that utilizes a CSV file to store various characters, including lowercase and uppercase letters, punctuation marks, and more. By reading the CSV file, I designed a character stream effect reminiscent of The Matrix. At the center of the canvas, I included my name, "Lina," displayed in my favorite color—pink. To make it more dynamic, I simulated a heartbeat effect by creating rhythmic changes in the font size. This project not only reflects my admiration but also incorporates my own creativity and personal touch.





## Project workflow


1.1: Global Variables

```javascript
let characters = []; // Used to store the character set loaded from the CSV file
let streams = []; // Stores each column of character streams
let fontSize = 20; // Base font size for each character
let cols; // Number of columns (calculated based on screen width)
let linaFontSize = 60; // Base font size for "Lina"
let scaleFactor = 1; // Scaling factor, dynamically changes to simulate a "heartbeat"
let scaleDirection = 1; // Scaling direction (positive for enlarging, negative for shrinking)
let scaleSpeed = 0.02; // Scaling speed, controls how fast the font size changes
```




1.2: Load CSV file

```javascript
function preload() {
  characters = loadStrings('characters.csv'); // Read characters from the CSV file, where each line corresponds to one character
}


```


1.2.1: `loadStrings` is a built-in function in js used to load text files. Here, the content of the CSV file is stored in the `characters` array.

1.2.2: The loaded character set will be randomly selected and displayed in the character streams.



1.3: Canvas Clearing
```javascript
class Stream {
  constructor(x) {
    this.x = x; // Column position
    this.y = random(-500, 0); // Random starting height
    this.speed = random(2, 10); // Random falling speed
    this.chars = this.generateChars(); // Randomly generate the character stream
  }

  generateChars() {
    let length = floor(random(5, 15)); // Random length for each column's character stream
    let chars = [];
    for (let i = 0; i < length; i++) {
      let char = random(characters).trim(); // Randomly select a character from the CSV data
      chars.push(char);
    }
    return chars;
  }

  render() {
    fill(0, 255, 0); // Green characters
    for (let i = 0; i < this.chars.length; i++) {
      let charY = this.y + i * fontSize; // Y-coordinate of each character
      if (charY > height) charY = charY % height; // Reset to the top if it goes off-screen
      text(this.chars[i], this.x, charY);
    }
    this.update(); // Update the position of the character stream
  }

  update() {
    this.y += this.speed; // Move downward
    if (this.y > height) {
      this.y = random(-500, 0); // Reset to a random position at the top
      this.chars = this.generateChars(); // Regenerate the character stream
    }
  }
}

```

1.3.1: generateChars is used to generate the character stream. We first define an empty array chars, then randomly select 5 to 15 characters from the CSV character set each time and add them to the array. This generates a new stream of characters.

1.3.2: render is used to render the character stream. We set the color of all characters to green to simulate the effect in The Matrix. The starting Y-coordinate of the character stream is set using a global variable, and we track the Y-coordinate of each character in the stream with the formula let charY = this.y + i * fontSize. If a character's Y-coordinate exceeds the height of the canvas, we call generateChars again to generate a new character stream.

1.4: Drawing Lina
```javascript

function drawLina() {
  // Dynamically scale the font size
  scaleFactor += scaleSpeed * scaleDirection; // Adjust the scaling factor based on scaling speed and direction
  if (scaleFactor >= 1.2 || scaleFactor <= 0.8) {
    scaleDirection *= -1; // Flip the direction when scaling exceeds the range
  }

  // Set dynamic font size and color
  textSize(linaFontSize * scaleFactor); // Dynamically adjust font size based on the scaling factor
  fill(255, 105, 180); // Pink color (RGB: 255, 105, 180)
  noStroke(); // No stroke

  // Center the "Lina" text
  let lina = "Lina".split(''); // Split the string into an array of characters
  let startX = floor(cols / 2) - floor(lina.length / 2); // Starting column index to ensure the text is centered
  let centerY = height / 2; // Vertically center the text on the screen

  for (let i = 0; i < lina.length; i++) {
    text(lina[i], (startX + i) * fontSize, centerY); // Draw each character one by one
  }

  textSize(fontSize); // Restore the default font size
}

```

1.4.1 We dynamically scale the font size using scaleFactor += scaleSpeed * scaleDirection. If it doesn't exceed the set conditions, the text gradually enlarges. Once it exceeds the limits, we apply scaleDirection *= -1 to reverse the direction, causing the font size to gradually shrink. This creates the "Lina's heartbeat" effect.
