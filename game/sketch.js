function setup() {    
    createCanvas(1500, 1500);

}

function draw() {

    background(220);

    // Colors

    let silver = color(200, 200, 220); 
    let darkSilver = color(150, 150, 170);
    let gold = color(200, 150, 0);
    let red = color(180, 50, 50); 
    let black = color(0); 
    let brown = color(100, 50, 20); 
    let white = color(255);
    let darkred = color(150);

    //BOY
    let anchorV = 253;
    let anchorZ = 250;
    
    //Anchor Point 
    fill(red);
    ellipse(anchorV, anchorZ, 20, 20); 

    //Body
    fill(black); 
    rect(anchorV - 28, anchorZ - 10, 55, 80, 20); 
    
    //Head
    fill(white);
    ellipse(anchorV, anchorZ - 50, 80, 80); 
    
    // Eyes
    fill(black); 
    ellipse(anchorV - 15, anchorZ - 55, 10, 10); 
    ellipse(anchorV + 15, anchorZ - 55, 10, 10); 
    
    // Mouth
    fill(black);
    stroke(0); 
    strokeWeight(2); 
    noFill(); 
    arc(anchorV, anchorZ - 30, 30, 20, 0, PI); 
    
    // Arms
    fill(white); 
    ellipse(anchorV - 33, anchorZ + 20, 20, 20); 
    ellipse(anchorV + 32, anchorZ + 20, 20, 20); 

    // Shoes
    fill(red); 
    rect(anchorV - 23, anchorZ + 75, 20, 10); 
    rect(anchorV + 2, anchorZ + 75, 20, 10); 
    
    // Dumbbell
    fill(darkred); 
    rect(anchorV - 53, anchorZ - 10, 100, 20, 5); 
    fill(50); 
    ellipse(anchorV - 73, anchorZ, 40, 80); 
    fill(50); 
    ellipse(anchorV + 67, anchorZ, 40, 80); 
    

    //KNIGHT
    let anchorX = 150;
     let anchorY = 150;

    // Anchor Point 
    fill(red);
    ellipse(anchorX, anchorY, 20, 20); // Anchor point for reference

    // Helmet
    fill(silver);
    rect(anchorX - 35, anchorY - 115, 70, 70); 
    fill(darkSilver);
    rect(anchorX - 35, anchorY - 95, 70, 10); 
    fill(black);
    rect(anchorX - 20, anchorY - 100, 40, 8); 
    rect(anchorX - 35, anchorY - 65, 70, 3); 
    rect(anchorX - 25, anchorY - 55, 50, 3);

    // Helmet plume
    fill(red);
    beginShape();
    vertex(anchorX - 5, anchorY - 135);
    vertex(anchorX + 5, anchorY - 140);
    vertex(anchorX + 10, anchorY - 130);
    vertex(anchorX + 5, anchorY - 120);
    vertex(anchorX - 5, anchorY - 125);
    endShape(CLOSE);

    // Chest Armor
    fill(silver);
    rect(anchorX - 35, anchorY - 40, 70, 90, 5); 
    fill(darkSilver);
    rect(anchorX - 35, anchorY - 30, 70, 5); 
    fill(gold);
    rect(anchorX - 35, anchorY - 40, 5, 90); 
    rect(anchorX + 30, anchorY - 40, 5, 90); 

    // Arms
    fill(silver);
    ellipse(anchorX - 50, anchorY - 45, 30, 30); 
    ellipse(anchorX + 50, anchorY - 45, 30, 30); 
    fill(silver);
    rect(anchorX - 60, anchorY - 30, 20, 50); 
    rect(anchorX + 40, anchorY - 30, 20, 50); 
    fill(black);
    ellipse(anchorX - 50, anchorY + 30, 20, 20); 
    ellipse(anchorX + 50, anchorY + 30, 20, 20); 

    // Belt
    fill(brown);
    rect(anchorX - 35, anchorY + 50, 70, 12); 
    fill(gold);
    rect(anchorX - 8, anchorY + 50, 15, 12); 

    // Boots
    fill(silver);
    rect(anchorX - 30, anchorY + 70, 27, 10); 
    rect(anchorX + 5, anchorY + 70, 27, 10); 


}










    

        



