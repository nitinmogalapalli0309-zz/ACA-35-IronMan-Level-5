var bg, bgImage;
var ironMan, ironmanImage;
var stoneGroup, stoneImage;
var diamondGroup, diamondImage, diamondCount = 0;
var spikeGroup, spikeImage;
var edges;
var gameState = "PLAY";

function preload(){
  // Preloading all the images.
  bgImage = loadImage("images/bg.jpg");
  ironmanImage = loadImage("images/iron.png");
  stoneImage = loadImage("images/stone.png");
  diamondImage = loadImage("images/diamond.png");
  spikeImage = loadImage("images/spikes.png");
}

function setup(){
  createCanvas(1000, 600);
  // Creating backgroud sprite and it's properties.
  bg = createSprite(580,300);
  bg.addImage(bgImage);
  bg.scale = 2;

  // Creating IronMan sprite and it's properties.
  ironMan = createSprite(200,500,20,50);
  ironMan.addImage("running", ironmanImage);
  ironMan.scale = 0.3;
  ironMan.debug = true;

  // Creating edge sprite.
  edges = createEdgeSprites();

  // Initiating new groups.
  stoneGroup = new Group();
  diamondGroup = new Group();
  spikeGroup = new Group();
}

function draw(){
  // Declaring "play" state of game.
  if(gameState === "PLAY"){
    // Defining the control of player.
    if(keyDown("up")){
      ironMan.velocityY = -10;
    }
    if(keyDown("left")){
      ironMan.x -= +5;
    }
    if(keyDown("right")){
      ironMan.x += 5;
    }

    // Adding gravity to player.
    ironMan.velocityY += 0.5;

    // Generating stones randomly and it's properties.
    generateStones();
    for(var i = 0; i < stoneGroup.length; i++){
      var temp = stoneGroup.get(i);
      if(temp.isTouching(ironMan)){
        ironMan.collide(temp);
      }
    }

    // Generating diamonds randomly and it's properties.
    generateDiamonds();
    for(var i = 0; i < diamondGroup.length; i++){
      var temp = diamondGroup.get(i);
      if(temp.isTouching(ironMan)){
        diamondCount += Math.round(2*(temp.scale));
        temp.destroy();
        temp = null;
      }
    }

    // Generating spikes randomly and it's properties.
    generateSpikes();
    for(var i= 0; i < spikeGroup.length; i++){
      var temp = spikeGroup.get(i);
      if(temp.isTouching(ironMan)){
        diamondCount += -5;
        temp.destroy();
        temp = null;
      }
    }

    // Bouncing off the edges effect for player.
    if(ironMan.isTouching(edges[0])){
      ironMan.bounceOff(edges[0]);
    }
    if(ironMan.isTouching(edges[1])){
      ironMan.bounceOff(edges[1]);
    }
    if(ironMan.isTouching(edges[2])){
      ironMan.bounceOff(edges[2]);
    }
    if(ironMan.isTouching(edges[3])){
      gameState = "END";
    }

    // Background Scroll Effect.
    bg.velocityY = -5;
    if(bg.y < 300){
      bg.y = 600;
    }
  }

  drawSprites();
  // Score Updater.
  textSize(20);
  fill("blue");
  text("Diamonds Collected: "+diamondCount,700,30);

  // Declaring "end" state of the game.
  if (gameState === "END"){
    bg.velocityY = 0;
    ironMan.velocityY = 0;
    stoneGroup.setVelocityYEach(0);
    stoneGroup.setLifetimeEach(-1);
    diamondGroup.setVelocityYEach(0);
    diamondGroup.setLifetimeEach(-1);
    spikeGroup.setVelocityYEach(0);
    spikeGroup.setLifetimeEach(-1);
    textSize(50);
    fill("red");
    text("The End",370,300);
  }
}

// Custom function to generate stones.
function generateStones(){
  if(frameCount % 60 === 0){
    var stone = createSprite(1200,10,40,10);
    stone.addImage(stoneImage);
    stone.x = random(50,950);
    stone.velocityY = 5;
    stone.lifetime = 150;
    stoneGroup.add(stone);
  }
}

// Custom function to generate diamonds.
function generateDiamonds(){
  if(frameCount % 40 === 0){
    var diamond = createSprite(1200,10,40,10);
    diamond.addImage(diamondImage);
    diamond.scale = random(0.5,1);
    diamond.x = random(30,970);
    diamond.velocityY = 2.5;
    diamond.lifetime = 300;
    diamondGroup.add(diamond);
  }
}

// Custom function to generate spikes.
function generateSpikes(){
  if(frameCount % 50 === 0){
    var spike = createSprite(1200,10,20,20);
    spike.addImage(spikeImage);
    spike.x = random(30,970);
    spike.velocityY = 2.5;
    spike.lifetime = 300;
    spikeGroup.add(spike);
  }
}