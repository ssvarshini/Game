var boy1Left;
var boy1Right;
var boy1Up;
var boy1Down;
var proteinShakes = [];
var healthbar = 0;
var lifeStages = []; 
var orcs = []; 
var lives = 3;
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
    //boy = new Boy(253, 250, colors);
    knight = new Knight(150, 150, colors);
    
    // Initialize Orcs with fixed positions
    orcs.push(new Orc(1075, 150));
    orcs.push(new Orc(600, 400)); // Orc 4
    orcs.push(new Orc(1050, 500)); // Orc 5 
    orcs.push(new Orc(90, 700));
    orcs.push(new Orc(190, 450));
    

    // Initialize protein shakes in the array with different positions
    proteinShakes.push(new ProteinShake(50, 350)); // Position 1
    proteinShakes.push(new ProteinShake(630, 130)); // Position 2
    proteinShakes.push(new ProteinShake(1350, 700)); // Position 3
    proteinShakes.push(new ProteinShake(200, 560)); // Position 4
    proteinShakes.push(new ProteinShake(1350, 50));// Position 5
    proteinShakes.push(new ProteinShake(1180, 445)); // Position 6
    proteinShakes.push(new ProteinShake(940, 250)); // Position 7
    proteinShakes.push(new ProteinShake(850, 450));
    proteinShakes.push(new ProteinShake(705, 615));
    proteinShakes.push(new ProteinShake(550, 550)); // Position 8 // 
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
    //boy.draw();
    knight.draw();

    // Draw all protein shakes
    for (let shake of proteinShakes) {
        shake.draw();
    }

   
    // Move Boy character based on arrow key flags
    if (boy1Left) {
        knight.move(-9, 0); // Move left
    }
    if (boy1Right) {
        knight.move(9, 0); // Move right
    }
    if (boy1Up) {
        knight.move(0, -9); // Move up
    }
    if (boy1Down) {
       knight.move(0, 9); // Move down
    }   

    
    // Check for protein shake collection
    knight.checkCollection(proteinShakes);
    
    // Draw life stages
    for (let i = 0; i < lifeStages.length; i++) {
        lifeStages[i].draw(lives > i, lives === i); // Fill heart if lives are above the threshold, break if it just lost
    }
    


         // Draw all Orcs and check for collision with the boy
    for (let orc of orcs) {
        orc.drawOrc();
        if (knight.checkCollision(orc)) {
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
    knight.resetPosition(); // Reset boy's position after losing a life
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
        rect(width / 2, 5, 30, 180, 20); // 1st row middle
        rect(100, 80, 160, 120, 20); // 1st row 1st
        rect(370, 80, 200, 120, 20); // 1st row 2nd
        rect(830, 80, 200, 120, 20); // 1st row 3rd
        rect(1140, 80, 160, 120, 20); // 1st row 4th

        // Second row
        rect(5, height / 2 - 100, 400, 30, 10); // 2nd row 1st
        rect(590, height / 2 - 100, 270, 30, 10); // 2nd row middle
        rect(715, height / 2 - 100, 30, 100, 10); // 2nd row middle
        rect(1050, height / 2 - 100, 400, 30, 10); // 2nd row last

        // Full rectangles in row 3
        rect(140, 390, 200, 30, 20); // 1st full rect
        rect(320, 390, 30, 140, 20);
        rect(140, 500, 200, 30, 20);
        rect(140, 500, 30, 150, 20);

        rect(1120, 390, 200, 30, 20); // 2nd full rect
        rect(1120, 390, 30, 140, 20);
        rect(1120, 500, 200, 30, 20);
        rect(1295, 500, 30, 150, 20);


        // Center structures
        rect(470, 390, 30, 205, 20); // Centre 1
        rect(490, 450, 320, 30, 20);

        rect(940, 390, 30, 205, 20); // Centre 2
        rect(650, 565, 320, 30, 20);

        // Last row
        rect(645, 670, 180, 30, 20);
        rect(645, 575, 30, 120, 20);


        ellipse(360, 660, 100, 100);
        ellipse(1160, 660, 100, 100);
    }
} 


 
 // Knight Constructor Function
class Knight {
    constructor(x, y, colors) {
        this.anchorX = x;
        this.anchorY = y;
        this.startX = x;
        this.startY = y;
        this.colors = colors;
    }

    draw() {
        push();
        scale(0.5);

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

        pop();
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
                healthbar += 10; 
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

/* // Orc Class
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
  */



// Orc Class
class Orc {
    /* constructor(x, y, range) { // Added 'range' parameter
        this.orcX = x;
        this.orcY = y;
        this.range = range; // Stores movement range
        this.currentX = x; // Tracks current x-position for movement
        this.inc = 1; // Movement increment (1 pixel per update, can be adjusted)
        this.proteinShake = new ProteinShake(this.orcX + 60, this.orcY - 40); */

        constructor(x, y) {
            this.orcX = x;
            this.orcY = y;
            this.range = 50; // Reduced range to make smaller movements
            this.currentX = x;
            this.inc = 1;
        }

        update() {
            this.currentX += this.inc; // Move the orc left or right
            
            // Change direction when the orc reaches the set range
            if (this.currentX >= this.orcX + this.range) {
                this.inc = -1; // Reverse direction when reaching the right limit
            } 
            else if (this.currentX <= this.orcX - this.range) {
                this.inc = 1; // Reverse direction when reaching the left limit
            }
        }

        draw() {
            this.update(); // Update movement
            this.drawOrcBody();
            this.drawOrcHead();
            this.drawOrcScar();
            this.drawOrcEyes();
            this.drawOrcMouth();
            this.drawOrcLoinclothAndArmor();
            this.drawOrcArmsAndClub();
            this.drawOrcLegsAndFeet();
        }
    
    

    /* update() {
        this.currentX += this.inc; // Update x-position by increment

        // Check if the orc has reached the boundaries and reverse direction if needed
        if (this.currentX >= this.orcX + this.range) {
            this.inc = -1; // Reverse direction to left
        } else if (this.currentX < this.orcX) {
            this.inc = 1; // Reverse direction to right
        }
    } */

        /* update() {
            this.currentX += this.inc; // Update the orc's x position by increment (moving left or right)
        
            // Ensure the orc doesn't move off the screen to the right
            if (this.currentX >= width - 10) { // Change direction when it's 10 pixels away from the right edge
                this.currentX = width - 10; // Stop at the right edge
                this.inc = -1; // Change direction to move left
            } 
        
            // Ensure the orc doesn't move off the screen to the left
            if (this.currentX <= 10) { // Change direction when it's 10 pixels away from the left edge
                this.currentX = 10; // Stop at the left edge
                this.inc = 1; // Change direction to move right
            }
        } */
        
        

    drawOrc() {
        this.update(); // Call update to move the orc before drawing
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
        rect(this.currentX - 15, this.orcY - 15, 30, 40, 5); // Use currentX for moving position
    }

    drawOrcHead() {
        fill(34, 139, 34);
        ellipse(this.currentX, this.orcY - 27, 30, 25); // Use currentX for moving position
    }

    // Continue with other draw methods, replacing this.orcX with this.currentX where needed

    drawOrcScar() {
        strokeWeight(2); // Adjusted stroke for smaller size
        stroke(200, 15, 80, 200); // Darker red color for a more pronounced scar
        line(this.currentX + 2, this.orcY - 37, this.currentX + 12, this.orcY - 27); // Adjusted position
    }

    drawOrcEyes() {
        fill(0);
        beginShape();
        vertex(this.currentX - 7, this.orcY - 35);
        vertex(this.currentX - 2, this.orcY - 33);
        vertex(this.currentX- 7, this.orcY - 32);
        endShape(CLOSE);

        beginShape();
        vertex(this.currentX+ 2, this.orcY - 35);
        vertex(this.currentX + 7, this.orcY - 33);
        vertex(this.currentX + 2, this.orcY - 32);
        endShape(CLOSE);

        fill(255, 0, 0); // Red pupils
        ellipse(this.currentX - 5, this.orcY - 34, 2, 1); // Smaller pupils
        ellipse(this.currentX + 5, this.orcY - 34, 2, 1);
    }

     drawOrcMouth() {
        fill(255); // Fangs
        triangle(this.currentX - 4, this.orcY - 26, this.orcX -  2, this.orcY - 21, this.orcX - 6, this.orcY - 21);
        triangle(this.currentX + 4, this.orcY - 26, this.orcX + 6, this.orcY - 21, this.orcX + 2, this.orcY - 21);

        stroke(0);
        strokeWeight(1);
        fill(0);
        arc(this.currentX, this.orcY - 23, 15, 7, 0, PI, OPEN); // Smaller mouth
    } 

    drawOrcLoinclothAndArmor() {
        fill(169, 169, 169); // Gray shoulder armor
        arc(this.currentX - 16, this.orcY - 10, 18, 12, PI, 0, CHORD); // Adjusted size
        arc(this.currentX + 16, this.orcY - 10, 18, 12, PI, 0, CHORD);
    }

    drawOrcArmsAndClub() {
        fill(34, 139, 34); // Green arms
        rect(this.currentX - 25, this.orcY - 10, 10, 25); // Smaller left hand
        rect(this.currentX + 15, this.orcY - 10, 10, 25); // Smaller right hand

        fill(139, 69, 19); // Brown color for club
        rect(this.currentX - 22, this.orcY - 5, 5, 30, 2); // Smaller club handle
        ellipse(this.currentX - 21, this.orcY + 30, 15, 20); // Smaller club head
    }

    drawOrcLegsAndFeet() {
        fill(34, 139, 34); // Green legs
        rect(this.currentX - 15, this.orcY + 25, 9, 18, 2.5); // Smaller left leg
        rect(this.currentX + 6, this.orcY + 25, 9, 18, 2.5); // Smaller right leg

        // Feet
        arc(this.currentX - 10, this.orcY + 45, 12, 6, PI, 0, CHORD); // Smaller feet
        arc(this.currentX + 10, this.orcY + 45, 12, 6, PI, 0, CHORD);
    }
}
