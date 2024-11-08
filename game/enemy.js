let orcX;
let orcY;
let shakeX;
let shakeY;

function setup() {
    createCanvas(400, 400);
    background(220);
    // Initial anchor points
    orcX = width / 2;
    orcY = height / 2;
    shakeX = orcX + 60; // Positioned relative to the orc
    shakeY = orcY - 40;
}

function draw() {
    background(220); // Clear the background on each frame to avoid trails

    // Orc Body
    drawOrcBody();

    // Orc Head
    drawOrcHead();

    // Orc Scar
    drawOrcScar();

    // Orc Eyes and Pupils
    drawOrcEyes();

    // Orc Fangs and Mouth
    drawOrcMouth();

    // Orc Loincloth and Armor
    drawOrcLoinclothAndArmor();

    // Orc Arms and Club
    drawOrcArmsAndClub();

    // Orc Legs and Feet
    drawOrcLegsAndFeet();

    // Protein Shake
    drawProteinShake();
}

function drawOrcBody() {
    fill(34, 139, 34); // Green color for the orc skin
    rect(orcX - 30, orcY - 30, 60, 80, 10); // Main body rectangle with rounded corners
}

function drawOrcHead() {
    stroke(0);
    fill(34, 139, 34);
    ellipse(orcX, orcY - 60, 60, 50); // Head above the body
}

function drawOrcScar() {
    strokeWeight(3);
    stroke(200, 15, 80, 200); // Darker red color for a more pronounced scar
    line(orcX + 5, orcY - 75, orcX + 25, orcY - 55); // Longer diagonal scar line on face
}

function drawOrcEyes() {
    fill(0);
    beginShape();
    vertex(orcX - 15, orcY - 70);
    vertex(orcX - 5, orcY - 67);
    vertex(orcX - 15, orcY - 65);
    endShape(CLOSE);

    beginShape();
    vertex(orcX + 5, orcY - 70);
    vertex(orcX + 15, orcY - 67);
    vertex(orcX + 5, orcY - 65);
    endShape(CLOSE);

    fill(255, 0, 0); // Red pupils
    ellipse(orcX - 10, orcY - 68, 4, 2);
    ellipse(orcX + 10, orcY - 68, 4, 2);
}

function drawOrcMouth() {
    fill(255); // Fangs
    triangle(orcX - 8, orcY - 52, orcX - 3, orcY - 42, orcX - 13, orcY - 42);
    triangle(orcX + 8, orcY - 52, orcX + 13, orcY - 42, orcX + 3, orcY - 42);

    stroke(0);
    strokeWeight(1);
    fill(0);
    arc(orcX, orcY - 47, 30, 15, 0, PI, OPEN); // Mouth
}

function drawOrcLoinclothAndArmor() {
    fill(138, 83, 17); // Brown loincloth
    triangle(orcX - 20, orcY + 40, orcX + 20, orcY + 40, orcX, orcY + 70);

    fill(169, 169, 169); // Gray shoulder armor
    arc(orcX - 32, orcY - 20, 35, 25, PI, 0, CHORD);
    arc(orcX + 32, orcY - 20, 35, 25, PI, 0, CHORD);
}

function drawOrcArmsAndClub() {
    fill(34, 139, 34); // Green arms
    rect(orcX - 50, orcY - 20, 20, 50); // Left hand
    rect(orcX + 30, orcY - 20, 20, 50); // Right hand

    fill(139, 69, 19); // Brown color for club
    rect(orcX - 45, orcY - 10, 10, 60, 5); // Club handle
    ellipse(orcX - 43, orcY + 60, 30, 40); // Club head
}

function drawOrcLegsAndFeet() {
    fill(34, 139, 34); // Green legs
    rect(orcX - 30, orcY + 50, 18, 35, 5);
    rect(orcX + 12, orcY + 50, 18, 35, 5);

    // Feet
    arc(orcX - 20, orcY + 90, 25, 12, PI, 0, CHORD);
    arc(orcX + 20, orcY + 90, 25, 12, PI, 0, CHORD);
}

function drawProteinShake() {
    fill(0, 255, 255); // Blue bottle
    rect(shakeX, shakeY, 25, 50, 5);
    fill(255);
    rect(shakeX + 3, shakeY + 5, 19, 15);
    fill(0, 100, 255);
    textSize(8);
    textAlign(CENTER, CENTER);
    text("protien", shakeX + 13, shakeY + 30);
    
    fill(105, 45, 20); // Bottle cap
    rect(shakeX, shakeY - 5, 25, 5, 2);
    fill(255);
    rect(shakeX + 15, shakeY - 15, 3, 15); // Straw
}

function keyPressed() {
    const moveAmount = 5; // Adjust this value to control movement speed

    // Move only the orc in response to arrow keys
    if (keyCode === RIGHT_ARROW) {
        orcX += moveAmount;
    } else if (keyCode === LEFT_ARROW) {
        orcX -= moveAmount;
    } else if (keyCode === UP_ARROW) {
        orcY -= moveAmount;
    } else if (keyCode === DOWN_ARROW) {
        orcY += moveAmount;
    }
}