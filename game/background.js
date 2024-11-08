/* function setup() {    
    createCanvas(1437, 780);

}

function draw() {

// varshini is smart
   background(255, 180, 0);




   background(255, 180, 0); // Set background color

   // Set border color to blue and thickness
   stroke(0, 166, 237); // Blue color for border
   strokeWeight(15);    // Thickness of the border
   noFill();            // No fill inside the border

   // Draw a rectangle that matches the canvas size
   rect(7.5, 7.5, width - 15, height - 15); // Adjusted to fit within canvas

  
   rect(width/2, 5, 20, 100);
   fill(0, 166, 237);
}

    */

function setup() {    
    createCanvas(1437, 780);
}

function draw() {

     //COLOURS
   let tree = color(42, 157, 143);
   let floor = color(233, 196, 106);

   background(floor); 
   stroke(tree);
   strokeWeight(15);    
   noFill();            

   rect(7.5, 7.5, width - 15, height - 15); 
   noStroke(); 
   fill(tree); 

   rect(width / 2, 5, 20, 180); //1st row middle
   rect(100, 80, 160, 120, 20); //1st row 1st
   rect(370, 80, 200, 120, 20); //1st row 2nd
   rect(830, 80, 200, 120, 20); //1st row 3rd
   rect(1140, 80, 160, 120, 20); //1st row forth

   
   rect(300, height/2-100, 100, 30, 10); //2nd row 1st
   rect(590, height/2-100, 270, 30, 10); //2nd row midd
   rect(715, height/2-100, 30, 100, 10); //2nd row midd
   rect(1050, height/2-100, 100, 30, 10); //2nd row last

   rect(140, 390, 200, 30, 20);//1st full rect
   rect(320, 390, 30, 140, 20);
   rect(140, 500, 200, 30, 20);

   rect(1120, 390, 200, 30, 20); //2nd full rect
   rect(1120, 390, 30, 140, 20);
   rect(1120, 500, 200, 30, 20);

   rect(470, 390, 30, 205, 20); //Centre 1
   rect(490, 450, 100, 30, 20);

   rect(940, 390, 30, 205, 20); //Centre 2
   rect(860, 565, 100, 30, 20);

   
   
   rect(640, 640, 180, 30, 20); //last row
   ellipse(200, 660, 100, 100); //last row
   ellipse(1200, 660, 100, 100); //last row



}












   

    



