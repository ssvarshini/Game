var boy1Left;
var boy1Right;
var boy1Up;
var boy1Down;
var proteinShakes = []; // Array to hold protein shakes
var healthbar = 0;
var lifeStages = []; // Array to hold life stages
var orcs = []; // Array to hold Orc instances
var lives = 3; // Number of lives
var gameOver = false; // Flag to check if the game is over

function setup() {    
    createCanvas(1437, 780);
    boy1Left = false;
    boy1Right = false;
    boy1Up = false;
    boy1Down = false;
    
    // Colors
    const colors = {
        tree: color(42, 157, 143),
        floor: color(233, 196, 106),
        silver: color(200, 200, 220),
        darkSilver: color(150, 150, 170),
        gold: color(200, 150, 0),
        red: color(180, 50, 50),
        black: color(0),
        brown: color(100, 50, 20),
        white: color(255),
        darkRed: color(150)
    };

    // Create Scene, Boy, and Knight instances
    scene = new Scene(colors);
    boy = new Boy(253, 250, colors);
    knight = new Knight(150, 150, colors);
    
    // Initialize Orcs with fixed positions
    orcs.push(new Orc(300,700)); // Orc 1
    orcs.push(new Orc(400, 250)); // Orc 2
    orcs.push(new Orc(500, 300)); // Orc 3
    orcs.push(new Orc(600, 400)); // Orc 4
    orcs.push(new Orc(1000, 400)); // Orc 5

    // Initialize protein shakes in the array with different positions
    proteinShakes.push(new ProteinShake(200, 300)); // Position 1
    proteinShakes.push(new ProteinShake(600, 200)); // Position 2
    proteinShakes.push(new ProteinShake(1350, 500)); // Position 3
    proteinShakes.push(new ProteinShake(250, 600)); // Position 4
    proteinShakes.push(new ProteinShake(1350, 19));// Position 5
    proteinShakes.push(new ProteinShake(1300, 300)); // Position 6
    proteinShakes.push(new ProteinShake(1200, 250)); // Position 7
    proteinShakes.push(new ProteinShake(900, 350)); // Position 8
    // Initialize life stages
    for (let i = 0; i < 3; i++) {
        lifeStages.push(new LifeStage(50 + i * 40, 50)); // Adjust position as needed
    }
}

function draw() {
    if (gameOver) {
        displayGameOver();
        return;
    }
    
    // Draw Scene, Boy, and Knight
    scene.draw();
    boy.draw();
    knight.draw();

    // Draw all protein shakes
    for (let shake of proteinShakes) {
        shake.draw();
    }

    // Move Boy character based on arrow key flags
    if (boy1Left) {
        boy.move(-9, 0); // Move left
    }
    if (boy1Right) {
        boy.move(9, 0); // Move right
    }
    if (boy1Up) {
        boy.move(0, -9); // Move up
    }
    if (boy1Down) {
        boy.move(0, 9); // Move down
    }   

    // Check for protein shake collection
    boy.checkCollection(proteinShakes);
    
    // Draw life stages
    for (let i = 0; i < lifeStages.length; i++) {
        lifeStages[i].draw(lives > i, lives === i); // Fill heart if lives are above the threshold, break if it just lost
    }
    
    // Draw all Orcs and check for collision with the boy
    for (let orc of orcs) {
        orc.drawOrc();
        if (boy.checkCollision(orc)) {
            loseLife();
        }
    }

    // Draw the health bar
    drawHealthBar();

    // Check if the health bar is full and display level up message
    if (healthbar === 100) {
        fill(0, 255, 0); // Green color for success
        textSize(48);
        textAlign(CENTER, CENTER);
        text("Yay, proceed to level 2!", width / 2, height / 2);
    }
}

// Method to draw the health bar
function drawHealthBar() {
    fill(255, 0, 0); // Red color for the health bar
    rect(20, 20, 200, 20); // Background of the health bar
    fill(0, 255, 0); // Green color for the health
    rect(20, 20, healthbar * 2, 20); // Health bar (width increases based on health)
}

// Method to display game over
function displayGameOver() {
    background(0);
    fill(255, 0, 0);
    textSize(64);
    textAlign(CENTER, CENTER);
    text("Game Over", width / 2, height / 2);
}

// Method to handle losing a life
function loseLife() {
    lives--;
    if (lives <= 0) {
        gameOver = true;
    }
    boy.resetPosition(); // Reset boy's position after losing a life
}

// LifeStage Class
class LifeStage {
    constructor(x, y) {
        this.x = x; // X position for the heart
        this.y = y; // Y position for the heart
        this.size = 30; // Size of the heart
    }

    draw(isFilled, isBreaking) {
        if (isBreaking) {
            fill(200, 0, 0); // Darker red for broken heart
            beginShape();
            vertex(this.x, this.y);
            bezierVertex(this.x - this.size / 2, this.y - this.size / 2, this.x - this.size, this.y + this.size / 2, this.x, this.y + this.size);
            bezierVertex(this.x + this.size, this.y + this.size / 2, this.x + this.size / 2, this.y - this.size / 2, this.x, this.y);
            endShape(CLOSE);
            // Draw a break line
            stroke(0);
            strokeWeight(2);
            line(this.x - this.size / 4, this.y - this.size / 4, this.x + this.size / 4, this.y + this.size / 4);
            line(this.x + this.size / 4, this.y - this.size / 4, this.x - this.size / 4, this.y + this.size / 4);
            noStroke();
        } else {
            fill(isFilled ? color(255, 0, 0) : color(200, 0, 0)); // Red for filled, dark red for empty
            beginShape();
            vertex(this.x, this.y);
            bezierVertex(this.x - this.size / 2, this.y - this.size / 2, this.x - this.size, this.y + this.size / 2, this.x, this.y + this.size);
            bezierVertex(this.x + this.size, this.y + this.size / 2, this.x + this.size / 2, this.y - this.size / 2, this.x, this.y);
            endShape(CLOSE);
        }
    }
}

// Scene Constructor Function
class Scene {
    constructor(colors) {
        this.colors = colors;
    }

    draw() {
        // Background
        background(this.colors.floor);

        // Frame Border
        stroke(this.colors.tree);
        strokeWeight(15);
        noFill();
        rect(7.5, 7.5, width - 15, height - 15);

        noStroke();
        fill(this.colors.tree);

        // First row
        rect(width / 2, 5, 20, 180); // 1st row middle
        rect(100, 80, 160, 120, 20); // 1st row 1st
        rect(370, 80, 200, 120, 20); // 1st row 2nd
        rect(830, 80, 200, 120, 20); // 1st row 3rd
        rect(1140, 80, 160, 120, 20); // 1st row 4th

        // Second row
        rect(300, height / 2 - 100, 100, 30, 10); // 2nd row 1st
        rect(590, height / 2 - 100, 270, 30, 10); // 2nd row middle
        rect(715, height / 2 - 100, 30, 100, 10); // 2nd row middle
        rect(1050, height / 2 - 100, 100, 30, 10); // 2nd row last

        // Full rectangles in row 3
        rect(140, 390, 200, 30, 20); // 1st full rect
        rect(320, 390, 30, 140, 20);
        rect(140, 500, 200, 30, 20);

        rect(1120, 390, 200, 30, 20); // 2nd full rect
        rect(1120, 390, 30, 140, 20);
        rect(1120, 500, 200, 30, 20);

        // Center structures
        rect(470, 390, 30, 205, 20); // Centre 1
        rect(490, 450, 100, 30, 20);

        rect(940, 390, 30, 205, 20); // Centre 2
        rect(860, 565, 100, 30, 20);

        // Last row
        rect(640, 640, 180, 30, 20);
        ellipse(400, 660, 100, 100);
        ellipse(1200, 660, 100, 100);
    }
}

class Boy {
    constructor(x, y, colors) {
        this.anchorX = x / 0.5; 
        this.anchorY = y / 0.5;
        this.startX = this.anchorX; // Store initial position
        this.startY = this.anchorY;
        this.colors = colors;
    }

    draw() {
        push(); 
        scale(0.5); 

        // Anchor Point
        fill(this.colors.red);
        ellipse(this.anchorX, this.anchorY, 20, 20);

        // Body
        fill(this.colors.black);
        rect(this.anchorX - 28, this.anchorY + 1, 55, 80, 20);

        // Head
        fill(this.colors.white);
        ellipse(this.anchorX, this.anchorY - 40, 80, 80);

        // Eyes
        fill(this.colors.black);
        ellipse(this.anchorX - 15, this.anchorY - 55, 10, 10);
        ellipse(this.anchorX + 15, this.anchorY - 55, 10, 10);

        // Smile
        noFill();
        stroke(this.colors.black);
        strokeWeight(2);
        arc(this.anchorX, this.anchorY - 30, 30, 20, 0, PI);

        // Hands
        fill(this.colors .white);
        ellipse(this.anchorX - 33, this.anchorY + 30, 20, 20);
        ellipse(this.anchorX + 32, this.anchorY + 30, 20, 20);

        // Feet
        fill(this.colors.red);
        rect(this.anchorX - 23, this.anchorY + 75, 20, 10);
        rect(this.anchorX + 2, this.anchorY + 75, 20, 10);

        // Dumbbell
        fill(this.colors.darkRed);
        rect(this.anchorX - 53, this.anchorY + 10, 100, 20, 5);
        fill(50);
        ellipse(this.anchorX - 73, this.anchorY + 12, 40, 60);
        ellipse(this.anchorX + 67, this.anchorY + 12, 40, 60);

        pop(); // Restore the transformation matrix
    }

    move(xChange, yChange) {
        this.anchorX += xChange * 2; 
        this.anchorY += yChange * 2;
    }
    
    checkCollection(proteinShakes) {
        let scaledX = this.anchorX * 0.5;
        let scaledY = this.anchorY * 0.5;

        for (let i = proteinShakes.length - 1; i >= 0; i--) {
            let shake = proteinShakes[i];
            let distance = dist(scaledX, scaledY, shake.shakeX, shake.shakeY);
            
            if (distance < 50) {
                proteinShakes.splice(i, 1); 
                healthbar += 20; 
                if (healthbar > 100) healthbar = 100; 
            }
        }
    }

    checkCollision(orc) {
        let scaledX = this.anchorX * 0.5;
        let scaledY = this.anchorY * 0.5;
        let distance = dist(scaledX, scaledY, orc.orcX, orc.orcY);
        return distance < 50;
    }

    resetPosition() {
        this.anchorX = this.startX;
        this.anchorY = this.startY;
    }
}

// Knight Constructor Function
class Knight {
    constructor(x, y, colors) {
        this.anchorX = x;
        this.anchorY = y;
        this.colors = colors;
    }

    draw() {
        fill(this.colors.red);
        ellipse(this.anchorX, this.anchorY, 20, 20);

        fill(this.colors.silver);
        rect(this.anchorX - 35, this.anchorY - 115, 70, 70);
        fill(this.colors.darkSilver);
        rect(this.anchorX - 35, this.anchorY - 95, 70, 10);
        fill(this.colors.black);
        rect(this.anchorX - 20, this.anchorY - 100, 40, 8);
        rect(this.anchorX - 35, this.anchorY - 65, 70, 3);
        rect(this.anchorX - 25, this.anchorY - 55, 50, 3);

        fill(this.colors.red);
        beginShape();
        vertex(this.anchorX - 5, this.anchorY - 135);
        vertex(this.anchorX + 5, this.anchorY - 140);
        vertex(this.anchorX + 10, this.anchorY - 130);
        vertex(this.anchorX + 5, this.anchorY - 120);
        vertex(this.anchorX - 5, this.anchorY - 125);
        endShape(CLOSE);

        fill(this.colors.silver);
        rect(this.anchorX - 35, this.anchorY - 40, 70, 90, 5);
        fill(this.colors.darkSilver);
        rect(this.anchorX - 35, this.anchorY - 30, 70, 5);
        fill(this.colors.gold);
        rect(this.anchorX - 35, this.anchorY - 40, 5, 90);
        rect(this.anchorX + 30, this.anchorY - 40, 5, 90);

        fill(this.colors.silver);
        ellipse(this.anchorX - 50, this.anchorY - 45, 30, 30);
        ellipse(this.anchorX + 50, this.anchorY - 45, 30, 30);
        rect(this.anchorX - 60, this.anchorY - 30, 20, 50);
        rect(this.anchorX + 40, this.anchorY - 30, 20, 50);
        fill(this.colors.black);
        ellipse(this.anchorX - 50, this.anchorY + 30, 20, 20);
        ellipse(this.anchorX + 50, this.anchorY + 30, 20, 20);

        fill(this.colors.brown);
        rect(this.anchorX - 35, this.anchorY + 50, 70, 12);
        fill(this.colors.gold);
        rect(this.anchorX - 8, this.anchorY + 50, 15, 12);

        fill(this.colors.silver);
        rect(this.anchorX - 30, this.anchorY + 70, 27, 10);
        rect(this.anchorX + 5, this.anchorY + 70, 27, 10);
    }
}

function keyPressed() {
    // Arrow keys for the Boy
    if (keyCode === LEFT_ARROW) {
        boy1Left = true;
    }
    if (keyCode === RIGHT_ARROW) {
        boy1Right = true;
    }
    if (keyCode === UP_ARROW) {
        boy1Up = true;
    }
    if (keyCode === DOWN_ARROW) {
        boy1Down = true;
    }
}

function keyReleased() {
    if (keyCode === LEFT_ARROW) {
        boy1Left = false;
    }
    if (keyCode === RIGHT_ARROW) {
        boy1Right = false;
    }
    if (keyCode === UP_ARROW) {
        boy1Up = false;
    }
    if (keyCode === DOWN_ARROW) {
        boy1Down = false;
    }
}

// ProteinShake Class
class ProteinShake {
    constructor(x, y) {
        this.shakeX = x;
        this.shakeY = y;
    }

    draw() {
        fill(0, 255, 255); // Blue bottle
        rect(this.shakeX, this.shakeY, 25, 50, 5);

        fill(255); // Label
        rect(this.shakeX + 3, this.shakeY + 5, 19, 15);
        fill(0, 100, 255);
        textSize(8);
        textAlign(CENTER, CENTER);
        text("protein", this.shakeX + 13, this.shakeY + 30);

        fill(105, 45, 20); // Bottle cap
        rect(this.shakeX, this.shakeY - 5, 25, 5, 2);

        fill(255); // Straw
        rect(this.shakeX + 15, this.shakeY - 15, 3, 15);
    }
}

// Orc Class
class Orc {
    constructor(x, y) {
        this.orcX = x;
        this.orcY = y;
        this.proteinShake = new ProteinShake(this.orcX + 60, this.orcY - 40);
    }

    drawOrc() {
        this.drawOrcBody();
        this.drawOrcHead();
        this.drawOrcScar();
        this.drawOrcEyes();
        this.drawOrcMouth();
        this.drawOrcLoinclothAndArmor();
        this.drawOrcArmsAndClub();
        this.drawOrcLegsAndFeet();
    }

    drawOrcBody() {
        fill(34, 139, 34); // Green color for the orc skin
        rect(this.orcX - 15, this.orcY - 15, 30, 40, 5); // Smaller body
    }

    drawOrcHead() {
        fill(34, 139, 34);
        ellipse(this.orcX, this.orcY - 27, 30, 25); // Smaller head
    }

    drawOrcScar() {
        strokeWeight(2); // Adjusted stroke for smaller size
        stroke(200, 15, 80, 200); // Darker red color for a more pronounced scar
        line(this.orcX + 2, this.orcY - 37, this.orcX + 12, this.orcY - 27); // Adjusted position
    }

    drawOrcEyes() {
        fill(0);
        beginShape();
        vertex(this.orcX - 7, this.orcY - 35);
        vertex(this.orcX - 2, this.orcY - 33);
        vertex(this.orcX - 7, this.orcY - 32);
        endShape(CLOSE);

        beginShape();
        vertex(this.orcX + 2, this.orcY - 35);
        vertex(this.orcX + 7, this.orcY - 33);
        vertex(this.orcX + 2, this.orcY - 32);
        endShape(CLOSE);

        fill(255, 0, 0); // Red pupils
        ellipse(this.orcX - 5, this.orcY - 34, 2, 1); // Smaller pupils
        ellipse(this.orcX + 5, this.orcY - 34, 2, 1);
    }

    drawOrcMouth() {
        fill(255); // Fangs
        triangle(this.orcX - 4, this.orcY - 26, this.orcX -  2, this.orcY - 21, this.orcX - 6, this.orcY - 21);
        triangle(this.orcX + 4, this.orcY - 26, this.orcX + 6, this.orcY - 21, this.orcX + 2, this.orcY - 21);

        stroke(0);
        strokeWeight(1);
        fill(0);
        arc(this.orcX, this.orcY - 23, 15, 7, 0, PI, OPEN); // Smaller mouth
    }

    drawOrcLoinclothAndArmor() {
        fill(169, 169, 169); // Gray shoulder armor
        arc(this.orcX - 16, this.orcY - 10, 18, 12, PI, 0, CHORD); // Adjusted size
        arc(this.orcX + 16, this.orcY - 10, 18, 12, PI, 0, CHORD);
    }

    drawOrcArmsAndClub() {
        fill(34, 139, 34); // Green arms
        rect(this.orcX - 25, this.orcY - 10, 10, 25); // Smaller left hand
        rect(this.orcX + 15, this.orcY - 10, 10, 25); // Smaller right hand

        fill(139, 69, 19); // Brown color for club
        rect(this.orcX - 22, this.orcY - 5, 5, 30, 2); // Smaller club handle
        ellipse(this.orcX - 21, this.orcY + 30, 15, 20); // Smaller club head
    }

    drawOrcLegsAndFeet() {
        fill(34, 139, 34); // Green legs
        rect(this.orcX - 15, this.orcY + 25, 9, 18, 2.5); // Smaller left leg
        rect(this.orcX + 6, this.orcY + 25, 9, 18, 2.5); // Smaller right leg

        // Feet
        arc(this.orcX - 10, this.orcY + 45, 12, 6, PI, 0, CHORD); // Smaller feet
        arc(this.orcX + 10, this.orcY + 45, 12, 6, PI, 0, CHORD);
    }
}
