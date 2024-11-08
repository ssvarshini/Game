/* function setup() {    
    createCanvas(1500, 1500);
}

function draw() {
    background(220);

    // Colors
    const colors = {
        silver: color(200, 200, 220),
        darkSilver: color(150, 150, 170),
        gold: color(200, 150, 0),
        red: color(180, 50, 50),
        black: color(0),
        brown: color(100, 50, 20),
        white: color(255),
        darkRed: color(150)
    };

    // Create Boy and Knight instances
    const boy = new Boy(253, 250, colors);
    const knight = new Knight(150, 150, colors);

    // Draw Boy and Knight
    boy.draw();
    knight.draw();
}

// Boy Constructor Function
class Boy {
    constructor(x, y, colors) {
        this.anchorX = x;
        this.anchorY = y;
        this.colors = colors;
    }

    draw() {
        // Anchor Point
        fill(this.colors.red);
        ellipse(this.anchorX, this.anchorY, 20, 20);

        // Body
        fill(this.colors.black);
        rect(this.anchorX - 28, this.anchorY - 10, 55, 80, 20);

        // Head
        fill(this.colors.white);
        ellipse(this.anchorX, this.anchorY - 50, 80, 80);

        // Eyes
        fill(this.colors.black);
        ellipse(this.anchorX - 15, this.anchorY - 55, 10, 10);
        ellipse(this.anchorX + 15, this.anchorY - 55, 10, 10);

        // Mouth
        noFill();
        stroke(this.colors.black);
        strokeWeight(2);
        arc(this.anchorX, this.anchorY - 30, 30, 20, 0, PI);

        // Arms
        fill(this.colors.white);
        ellipse(this.anchorX - 33, this.anchorY + 20, 20, 20);
        ellipse(this.anchorX + 32, this.anchorY + 20, 20, 20);

        // Shoes
        fill(this.colors.red);
        rect(this.anchorX - 23, this.anchorY + 75, 20, 10);
        rect(this.anchorX + 2, this.anchorY + 75, 20, 10);

        // Dumbbell
        fill(this.colors.darkRed);
        rect(this.anchorX - 53, this.anchorY - 10, 100, 20, 5);
        fill(50);
        ellipse(this.anchorX - 73, this.anchorY, 40, 80);
        ellipse(this.anchorX + 67, this.anchorY, 40, 80);
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
        // Anchor Point
        fill(this.colors.red);
        ellipse(this.anchorX, this.anchorY, 20, 20);

        // Helmet
        fill(this.colors.silver);
        rect(this.anchorX - 35, this.anchorY - 115, 70, 70);
        fill(this.colors.darkSilver);
        rect(this.anchorX - 35, this.anchorY - 95, 70, 10);
        fill(this.colors.black);
        rect(this.anchorX - 20, this.anchorY - 100, 40, 8);
        rect(this.anchorX - 35, this.anchorY - 65, 70, 3);
        rect(this.anchorX - 25, this.anchorY - 55, 50, 3);

        // Helmet Plume
        fill(this.colors.red);
        beginShape();
        vertex(this.anchorX - 5, this.anchorY - 135);
        vertex(this.anchorX + 5, this.anchorY - 140);
        vertex(this.anchorX + 10, this.anchorY - 130);
        vertex(this.anchorX + 5, this.anchorY - 120);
        vertex(this.anchorX - 5, this.anchorY - 125);
        endShape(CLOSE);

        // Chest Armor
        fill(this.colors.silver);
        rect(this.anchorX - 35, this.anchorY - 40, 70, 90, 5);
        fill(this.colors.darkSilver);
        rect(this.anchorX - 35, this.anchorY - 30, 70, 5);
        fill(this.colors.gold);
        rect(this.anchorX - 35, this.anchorY - 40, 5, 90);
        rect(this.anchorX + 30, this.anchorY - 40, 5, 90);

        // Arms
        fill(this.colors.silver);
        ellipse(this.anchorX - 50, this.anchorY - 45, 30, 30);
        ellipse(this.anchorX + 50, this.anchorY - 45, 30, 30);
        rect(this.anchorX - 60, this.anchorY - 30, 20, 50);
        rect(this.anchorX + 40, this.anchorY - 30, 20, 50);
        fill(this.colors.black);
        ellipse(this.anchorX - 50, this.anchorY + 30, 20, 20);
        ellipse(this.anchorX + 50, this.anchorY + 30, 20, 20);

        // Belt
        fill(this.colors.brown);
        rect(this.anchorX - 35, this.anchorY + 50, 70, 12);
        fill(this.colors.gold);
        rect(this.anchorX - 8, this.anchorY + 50, 15, 12);

        // Boots
        fill(this.colors.silver);
        rect(this.anchorX - 30, this.anchorY + 70, 27, 10);
        rect(this.anchorX + 5, this.anchorY + 70, 27, 10);
    }
}
 */



 function setup() {    
    createCanvas(1437, 780);
    
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
    orc = new Orc(width / 2, height / 2);
}

function draw() {
    // Draw Scene, Boy, and Knight
    scene.draw();
    boy.draw();
    knight.draw();
    orc.drawOrc(); 
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
        ellipse(200, 660, 100, 100);
        ellipse(1200, 660, 100, 100);
    }
}

// Boy Constructor Function
class Boy {
    constructor(x, y, colors) {
        this.anchorX = x;
        this.anchorY = y;
        this.colors = colors;
    }

    draw() {
        fill(this.colors.red);
        ellipse(this.anchorX, this.anchorY, 20, 20);

        fill(this.colors.black);
        rect(this.anchorX - 28, this.anchorY - 10, 55, 80, 20);

        fill(this.colors.white);
        ellipse(this.anchorX, this.anchorY - 50, 80, 80);

        fill(this.colors.black);
        ellipse(this.anchorX - 15, this.anchorY - 55, 10, 10);
        ellipse(this.anchorX + 15, this.anchorY - 55, 10, 10);

        noFill();
        stroke(this.colors.black);
        strokeWeight(2);
        arc(this.anchorX, this.anchorY - 30, 30, 20, 0, PI);

        fill(this.colors.white);
        ellipse(this.anchorX - 33, this.anchorY + 20, 20, 20);
        ellipse(this.anchorX + 32, this.anchorY + 20, 20, 20);

        fill(this.colors.red);
        rect(this.anchorX - 23, this.anchorY + 75, 20, 10);
        rect(this.anchorX + 2, this.anchorY + 75, 20, 10);

        fill(this.colors.darkRed);
        rect(this.anchorX - 53, this.anchorY - 10, 100, 20, 5);
        fill(50);
        ellipse(this.anchorX - 73, this.anchorY, 40, 80);
        ellipse(this.anchorX + 67, this.anchorY, 40, 80);
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




class Orc {
    constructor(x, y) {
        // Properties for the Orc's position
        this.orcX = x;
        this.orcY = y;
        this.shakeX = this.orcX + 60; // Positioned relative to the orc
        this.shakeY = this.orcY - 40;
    }

    drawOrc() {
        // Draw each part of the orc
        this.drawOrcBody();
        this.drawOrcHead();
        this.drawOrcScar();
        this.drawOrcEyes();
        this.drawOrcMouth();
        this.drawOrcLoinclothAndArmor();
        this.drawOrcArmsAndClub();
        this.drawOrcLegsAndFeet();
        this.drawProteinShake();
    }

    drawOrcBody() {
        fill(34, 139, 34); // Green color for the orc skin
        rect(this.orcX - 30, this.orcY - 30, 60, 80, 10); // Main body rectangle
    }

    drawOrcHead() {
        stroke(0);
        fill(34, 139, 34);
        ellipse(this.orcX, this.orcY - 60, 60, 50); // Head above the body
    }

    drawOrcScar() {
        strokeWeight(3);
        stroke(200, 15, 80, 200); // Darker red color for a more pronounced scar
        line(this.orcX + 5, this.orcY - 75, this.orcX + 25, this.orcY - 55); // Scar line
    }

    drawOrcEyes() {
        fill(0);
        beginShape();
        vertex(this.orcX - 15, this.orcY - 70);
        vertex(this.orcX - 5, this.orcY - 67);
        vertex(this.orcX - 15, this.orcY - 65);
        endShape(CLOSE);

        beginShape();
        vertex(this.orcX + 5, this.orcY - 70);
        vertex(this.orcX + 15, this.orcY - 67);
        vertex(this.orcX + 5, this.orcY - 65);
        endShape(CLOSE);

        fill(255, 0, 0); // Red pupils
        ellipse(this.orcX - 10, this.orcY - 68, 4, 2);
        ellipse(this.orcX + 10, this.orcY - 68, 4, 2);
    }

    drawOrcMouth() {
        fill(255); // Fangs
        triangle(this.orcX - 8, this.orcY - 52, this.orcX - 3, this.orcY - 42, this.orcX - 13, this.orcY - 42);
        triangle(this.orcX + 8, this.orcY - 52, this.orcX + 13, this.orcY - 42, this.orcX + 3, this.orcY - 42);

        stroke(0);
        strokeWeight(1);
        fill(0);
        arc(this.orcX, this.orcY - 47, 30, 15, 0, PI, OPEN); // Mouth
    }

    drawOrcLoinclothAndArmor() {
        fill(169, 169, 169); // Gray shoulder armor
        arc(this.orcX - 32, this.orcY - 20, 35, 25, PI, 0, CHORD);
        arc(this.orcX + 32, this.orcY - 20, 35, 25, PI, 0, CHORD);
    }

    drawOrcArmsAndClub() {
        fill(34, 139, 34); // Green arms
        rect(this.orcX - 50, this.orcY - 20, 20, 50); // Left hand
        rect(this.orcX + 30, this.orcY - 20, 20, 50); // Right hand

        fill(139, 69, 19); // Brown color for club
        rect(this.orcX - 45, this.orcY - 10, 10, 60, 5); // Club handle
        ellipse(this.orcX - 43, this.orcY + 60, 30, 40); // Club head
    }

    drawOrcLegsAndFeet() {
        fill(34, 139, 34); // Green legs
        rect(this.orcX - 30, this.orcY + 50, 18, 35, 5);
        rect(this.orcX + 12, this.orcY + 50, 18, 35, 5);

        // Feet
        arc(this.orcX - 20, this.orcY + 90, 25, 12, PI, 0, CHORD);
        arc(this.orcX + 20, this.orcY + 90, 25, 12, PI, 0, CHORD);
    }

    drawProteinShake() {
        fill(0, 255, 255); // Blue bottle
        rect(this.shakeX, this.shakeY, 25, 50, 5);
        fill(255);
        rect(this.shakeX + 3, this.shakeY + 5, 19, 15);
        fill(0, 100, 255);
        textSize(8);
        textAlign(CENTER, CENTER);
        text("protien", this.shakeX + 13, this.shakeY + 30);

        fill(105, 45, 20); // Bottle cap
        rect(this.shakeX, this.shakeY - 5, 25, 5, 2);
        fill(255);
        rect(this.shakeX + 15, this.shakeY - 15, 3, 15); // Straw
    }

    // Method to move the orc based on key presses
    move(xChange, yChange) {
        this.orcX += xChange;
        this.orcY += yChange;
        this.shakeX += xChange;
        this.shakeY += yChange;
    }
}

 