var bommen = [];

var appel = {
  x: 100,
  y: 50,
  sprite: null,
  toon() {
    image(Appel, 400, 300, raster.celGrootte, raster.celGrootte);
  }
}

//var aantalLevens = 1;//
var aantalLevens = 1;
var isGameOver = false; // New variable to track game over state

// Add key press event listener to restart the game on "Enter" key press
function keyPressed() {
  if (keyCode === ENTER) {
    resetGame();
  }
}

function resetGame() {
  bommen = [];
  aantalLevens = 1;
  eve.x = 0;
  eve.y = 300;
  eve.gehaald = false;
  alice.x = 700;
  alice.y = 200;
  bob.x = 600;
  bob.y = 400;
  for (let i = 0; i < 4; i++) {
    let newBom = new Bom();
    newBom.sprite = loadImage("images/sprites/bom.png");
    newBom.x = floor(random(9, 18)) * 50;
    newBom.y = floor(random(1, 12)) * 50;
    bommen.push(newBom);
  }
  loop();
}


class Bom {
  constructor() {
    this.x = floor(random(9,18))*50;
    this.y = floor(random(1,12))*50;
  }
  toon() {
    image(this.sprite, this.x, this.y, raster.celGrootte, 
    raster.celGrootte);
  }
}


class Raster {
  constructor(r, k) {
    this.aantalRijen = r;
    this.aantalKolommen = k;
    this.celGrootte = null;
  }

  berekenCelGrootte() {
    this.celGrootte = canvas.width / this.aantalKolommen;
  }


  teken() {
    push();
    noFill();
    stroke('grey');
    for (var rij = 0; rij < this.aantalRijen; rij++) {
      for (var kolom = 0; kolom < this.aantalKolommen; kolom++) {
        if (rij == 1 || kolom == 2) {
          fill('orange');
        } else {
          noFill();
        }
        rect(kolom * this.celGrootte, rij * this.celGrootte, 
        this.celGrootte, this.celGrootte);
      }
    }
  }

}

class Jos {
  constructor() {
    this.x = 0;
    this.y = 300;
    this.animatie = [];
    this.frameNummer = 3;
    this.stapGrootte = null;
    this.gehaald = false;
  }

  eet(appel){
    return this.x == 400 && this.y == 300;
  }
  
  toon() {
    image(appel, this.x, this.y, raster.celGrootte, 
    raster.celGrootte);
  }


  beweeg() {
    if (keyIsDown(65)) {
      this.x -= this.stapGrootte;
      this.frameNummer = 2;
    }
    if (keyIsDown(68)) {
      this.x += this.stapGrootte;
      this.frameNummer = 1;
    }
    if (keyIsDown(87)) {
      this.y -= this.stapGrootte;
      this.frameNummer = 4;
    }
    
    if (eve.wordtGeraakt(bom1)) {
      if (aantalLevens > 0) {
        aantalLevens--;
      }
    }
    
    if (eve.wordtGeraakt(bom1)) {
      aantalLevens -= 1;
    }
    
    if (keyIsDown(83)) {
      this.y += this.stapGrootte;
      this.frameNummer = 5;
    }

    this.x = constrain(this.x, 0, canvas.width);
    this.y = constrain(this.y, 0, canvas.height - 
    raster.celGrootte);

    if (this.x == canvas.width) {
      this.gehaald = true;
    }
  }

  wordtGeraakt(vijand) {
    if (this.x == vijand.x && this.y == vijand.y) {
      return true;
    }

    else {
      return false;
    }
  }

  toon() {
    image(this.animatie[this.frameNummer], this.x, this.y, 
    raster.celGrootte, raster.celGrootte);
  }
}


class Vijand {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.sprite = null;
    this.stapGrootte = null;
    this.x += floor(random(-1, 2)) * this.stapGrootte;
    this.y += floor(random(-1, 2)) * this.stapGrootte;

  }
  beweeg() {
    this.x += floor(random(-1, 2)) * this.stapGrootte;
    this.y += floor(random(-1, 2)) * this.stapGrootte;
    this.x = constrain(this.x, 0, canvas.width - 
    raster.celGrootte);
    this.y = constrain(this.y, 0, canvas.height - 
    raster.celGrootte);
  }

    toon() {
    image(this.sprite, this.x, this.y, raster.celGrootte, raster.celGrootte);
  }
}


function preload() {
  brug = loadImage("images/backgrounds/dame_op_brug_1800.jpg");
  Appel = loadImage("images/sprites/appel_1.png");
}


function setup() {
  canvas = createCanvas(900, 600);
  canvas.parent();
  frameRate(10);
  textFont("Verdana");
  textSize(90);

  bom1 = new Bom();
  bom1.sprite = loadImage("images/sprites/bom.png");

  let newBom = new Bom();
  newBom.sprite = loadImage("images/sprites/bom.png");
  newBom.x = floor(random(9, 18)) * 50;
  newBom.y = floor(random(1, 12)) * 50;
  bommen.push(newBom);


  bommen = [];
  raster = new Raster(12, 18);

  raster.berekenCelGrootte();

  eve = new Jos();
  eve.stapGrootte = 1 * raster.celGrootte;
  for (var b = 0; b < 6; b++) {
    frameEve = loadImage("images/sprites/Eve100px/Eve_" + b + ".png");
    eve.animatie.push(frameEve);
  }

  alice = new Vijand(700, 200);
  alice.stapGrootte = 1 * eve.stapGrootte;
  alice.sprite = 
  loadImage("images/sprites/Alice100px/Alice.png");

  bob = new Vijand(600, 400);
  bob.stapGrootte = 1 * eve.stapGrootte;
  bob.sprite = loadImage("images/sprites/Bob100px/Bob.png");

  for (let i = 0; i < 4; i++) {
    let newBom = new Bom();
    newBom.sprite = loadImage("images/sprites/bom.png");
    newBom.x = floor(random(9, 18)) * 50;
    newBom.y = floor(random(1, 12)) * 50;
    bommen.push(newBom);
  }
  
}


function draw() {
  background(brug);
  raster.teken();
  eve.beweeg();
  alice.beweeg();
  bob.beweeg();
  eve.toon();
  alice.toon();
  bob.toon();
  if (eve.wordtGeraakt(bom1)) {
    aantalLevens--;
  }
  
  bom1.toon();
  appel.toon();

  // Controleren of de speler de appel eet
  if (eve.eet(appel)) {
    aantalLevens += 1;
  }
  
  fill('white');
  textSize(24);
  text('Aantal levens: ' + aantalLevens, 10, 30);

 if ((eve.wordtGeraakt(alice) || eve.wordtGeraakt(bob)) || (aantalLevens <= 0)){
    aantalLevens--;
    background('red');
    fill('white');
    text("Helaas! Je hebt verloren!", 300, 300)
    noLoop();
   textSize(20);
   text("Klik op Enter om opnieuw te spelen", 290, 350);
  }

  if (eve.gehaald) {
    background('green');
    fill('white');
    text("Gefeliciteerd! Je hebt gewonnen!", 290, 300);
    noLoop();
     textSize(20);
     text("Klik op Enter om opnieuw te spelen", 290, 350);
  }
  
  

}