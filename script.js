var bommen = [];

var appel = {
  x: 100,
  y: 50,
  sprite: null,
  toon() {
    image(Appel, 400, 300, raster.celGrootte, raster.celGrootte);
  }
}

var aantalLevens = 1;


class Bom {
  constructor() {
    this.x = random(0,900);
    this.y = random(0,6);
    //floor(random(1,raster.aantalKolommen))*raster.celGrootte;
    //this.y = floor(random(0,raster.aantalRijen))*raster.celGrootte;
  }
  toon() {
    image(this.sprite, this.x, this.y, raster.celGrootte, raster.celGrootte);
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
        rect(kolom * this.celGrootte, rij * this.celGrootte, this.celGrootte, this.celGrootte);
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

  /* bbr: deze klasse begint middenin de klasse Jos*/
  /* class bom {
   constructor() {
     this.x = floor(random(1,raster.aantalKolommen))*raster.celGrootte;
     this.y = floor(random(0,raster.aantalRijen))*raster.celGrootte;
   }*/
  toon() {
    image(appel, this.x, this.y, raster.celGrootte, raster.celGrootte);
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
    if (keyIsDown(83)) {
      this.y += this.stapGrootte;
      this.frameNummer = 5;
    }

    this.x = constrain(this.x, 0, canvas.width);
    this.y = constrain(this.y, 0, canvas.height - raster.celGrootte);

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
    image(this.animatie[this.frameNummer], this.x, this.y, raster.celGrootte, raster.celGrootte);
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
    this.x = constrain(this.x, 0, canvas.width - raster.celGrootte);
    this.y = constrain(this.y, 0, canvas.height - raster.celGrootte);
  }
  /*bbr: waar is Beweeg() gebleven? Gebruik zo nodig History om rollback te doen*/
  toon() {
    image(this.sprite, this.x, this.y, raster.celGrootte, raster.celGrootte);
  }
}


/*
class Bom {
  constructor() {
    this.x = floor(random(1, raster.aantalKolommen)) * raster.celGrootte;
    this.y = floor(random(0, raster.aantalRijen)) * raster.celGrootte;
    this.sprite = null;
    this.stapGrootte = null;
    this.x += floor(random(-1, 2)) * this.stapGrootte;
    this.y += floor(random(-1, 2)) * this.stapGrootte;
  }

  beweeg() {
    this.x += floor(random(-1, 2)) * this.stapGrootte;
    this.y += floor(random(-1, 2)) * this.stapGrootte;
    this.x = constrain(this.x, 0, canvas.width - raster.celGrootte);
    this.y = constrain(this.y, 0, canvas.height - raster.celGrootte);
  }
}
// Create 4 more bombs with different speeds
let bom2 = new Bom();
bom2.stapGrootte = 2 * eve.stapGrootte;
bom2.sprite = loadImage("images/sprites/bom.png");
let bom3 = new Bom();
bom3.stapGrootte = 3 * eve.stapGrootte;
bom3.sprite = loadImage("images/sprites/bom.png");
let bom4 = new Bom();
bom4.stapGrootte = 4 * eve.stapGrootte;
bom4.sprite = loadImage("images/sprites/bom.png");
let bom5 = new Bom();
bom5.stapGrootte = 5 * eve.stapGrootte;
bom5.sprite = loadImage("images/sprites/bom.png");
*/


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
  alice.sprite = loadImage("images/sprites/Alice100px/Alice.png");

  bob = new Vijand(600, 400);
  bob.stapGrootte = 1 * eve.stapGrootte;
  bob.sprite = loadImage("images/sprites/Bob100px/Bob.png");


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
    bom1.x = -100;
    bom1.y = -100;
  }
  
  bom1.toon();
  appel.toon();


  

  if (eve.eet(appel)) {
    aantalLevens += 1;
  }
  



  fill('white');
  textSize(24);
  text('Aantal levens: ' + aantalLevens, 10, 30);





 if ((eve.wordtGeraakt(alice) || eve.wordtGeraakt(bob)) || (aantalLevens == 0)) {
    aantalLevens--;
    background('red');
    fill('white');
    text("Je hebt verloren!", 350, 300)
    noLoop();
  }


  if (eve.gehaald) {
    background('green');
    fill('white');
    text("Je hebt gewonnen!", 350, 300);
    noLoop();
  }
}