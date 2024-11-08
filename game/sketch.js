function setup() {    
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
