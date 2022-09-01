var towerImg, tower;
var doorImg, door, doorsGroup;
var climberImg, climber, climbersGroup;
var ghost, ghostImg;
var invisibleBlockGroup, invisibleBlock;
var gameState = "play"

function preload(){
  towerImg = loadImage("tower.png");
  doorImg = loadImage("door.png");
  climberImg = loadImage("climber.png");
  ghostImg = loadImage("ghost-standing.png");
  spookySound = loadSound("spooky.wav");
}

function setup() {
  createCanvas(600, 600);
  //spookySound.loop();


  doorsGroup = new Group();
  climbersGroup = new Group();
  invisibleBlockGroup = new Group();

  tower = createSprite(300,300);
  tower.addImage("tower",towerImg);
  tower.velocityY = 1;

  ghost = createSprite(300,300);
  ghost.addImage("fantasma",ghostImg);  
  ghost.scale = 0.3
  

}

function draw() {
  background("black");
  


  if(gameState=="play"){
    if(tower.y > 400){
      tower.y = 300
    }
    if(keyDown("space")){
      ghost.velocityY = -10
    }
    ghost.velocityY = ghost.velocityY + 0.8
    if(keyDown(LEFT_ARROW)){
      ghost.x = ghost.x -5
    } 
    if(keyDown(RIGHT_ARROW)){
      ghost.x = ghost.x + 5
    }
    if(climbersGroup.isTouching(ghost)){
      ghost.velocityY = 0;
    }
    if(invisibleBlockGroup.isTouching(ghost)|| ghost.y > 600){
      ghost.destroy;
      gameState = "END";
      
    }
    
    criarPorta();
    drawSprites();
  }

  if(gameState=="END"){
    stroke("yellow");
    fill("yellow");
    textSize(30);
    text("FIM DE JOGO!",230,250);

  }
 
  
}



function criarPorta(){
  if(frameCount%240==0){
    door = createSprite (200,-50);
    climber = createSprite (200,10);
    invisibleBlock = createSprite (200,15, climber.width, 2);

    door.addImage("porta", doorImg);
    climber.addImage("climber", climberImg);

    door.x = round(random(120,400));
    climber.x = door.x;
    invisibleBlock.x = door.x;

    door.velocityY = 1;
    climber.velocityY = 1;
    invisibleBlock.velocityY = 1;
    
    door.lifetime = 800;
    climber.lifetime = 800;
    invisibleBlock.lifetime = 800;
    
    doorsGroup.add(door);
    climbersGroup.add(climber);
    invisibleBlockGroup.add(invisibleBlock);

    invisibleBlock.debug = true;
    ghost.debug = true;
    climber.debug = true;
    ghost.depth = door.depth + 1;
    invisibleBlock.depth = climber.depth + 1;
    
  }
}