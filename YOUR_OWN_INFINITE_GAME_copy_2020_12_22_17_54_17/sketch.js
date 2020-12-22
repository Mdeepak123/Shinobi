

var START = 1;
var PLAY = 2; 
var END = 3;
var SLIDE = 4;

var gameState = START;

var deadAnimation,jumpAnimation, Ninja, knife,knifeImage, groundImage, ground, NinjaImage, runningAnimation, slidingAnimation,invisibleGround, EnemyknifeGroup,jumpAnimation;
var score;

function preload(){
  
   runningAnimation= loadAnimation("Run__000.png","Run__001.png","Run__002.png","Run__003.png","Run__005.png","Run__006.png","Run__007.png","Run__008.png","Run__009.png");
  
  slidingAnimation = loadAnimation("Slide__001.png","Slide__001.png","Slide__001.png");
  
  NinjaImage = loadAnimation("Idle__000.png");
  
  groundImage = loadImage("maxresdefault.jpg");
  knifeImage = loadImage("Kunai.png");
  deadAnimation = loadAnimation("Dead__005.png");
  
  
}



function setup() {
  createCanvas(600, 400);
  
  invisibleGround = createSprite(300,345,600,10);
  invisibleGround.visible = false;
  
  ground = createSprite(300,100,0,0);
  ground.addImage(groundImage);
 
  Ninja = createSprite(50,295,10,50);
  Ninja.addAnimation("Idle",NinjaImage);
  Ninja.addAnimation("run",runningAnimation);
  Ninja.addAnimation('Slide',slidingAnimation);
  Ninja.addAnimation('dead',deadAnimation);

  Ninja.scale = 0.2;
  Ninja.debug = false;
  
  EnemyknifeGroup = new Group();
  
  score = 0;
  
}

function draw() {
  background("white");
  
  console.log(gameState);
  
  Ninja.collide(invisibleGround)
  
  drawSprites();
  
    stroke("white");
    textSize(20);
    fill("white");
  text("Survival Time: " + score, 400,100);
  
  if(gameState === START){
    
    //display info text
    stroke("white");
    textSize(20);
    fill("white");
    
    text("Dodge the Enemy Attacks by using S to slide and W to jump" ,50,20)
    
    text("Help him deliver a secret message to his village",50,40)
    text("Press space to start",50,60)
    
    if(keyDown("space")){
      
      gameState = PLAY;
      
    }
    
  }
  
  if(gameState === PLAY){
    
      score = score+Math.round(getFrameRate()/60);
    
    ground.velocityX = -(5 + 3* score/100);
    
    //making ninja run
    Ninja.changeAnimation("run",runningAnimation);
    
    if (ground.x < 0){
      ground.x = ground.width/2;
    }
    
    if(frameCount%50 === 0){
      
      spawnknife();
      
    }
    
    
    //making the ninja jump
    if(keyDown("w") && Ninja.y>=293){
      
      Ninja.velocityY = -12;
      
    }
    //adding gravity
    Ninja.velocityY = Ninja.velocityY + 0.6;
    
    if(keyDown("S")){
      
      gameState = SLIDE;
      
    }
    
    if(EnemyknifeGroup.collide(Ninja)){
      
      gameState = END;
      
    }
    
  }
  
  //slide state
  if(gameState === SLIDE){
    
    Ninja.changeAnimation('Slide',slidingAnimation);
    gameState = PLAY;
  
}
  
  if(gameState === END){
    
    Ninja.changeAnimation("dead",deadAnimation);
    ground.velocityX = 0;
    EnemyknifeGroup.destroyEach();
    Ninja.velocityY = 0;
    
    
    
    stroke("white");
    textSize(20);
    fill("white");
    text("Game Over :( Press R to try again", 150, 50);
    
    if(keyDown("r")){
      
      reset();
      
    }
    
  }
  
  
}

//enemy knife
function spawnknife(){
  
    knife=createSprite(600, Math.round(random(200,300)));
    knife.addImage(knifeImage);
    knife.velocityX = -(6+3* score/100);
    knife.scale = 0.4;
    knife.lifetime = 200;
    EnemyknifeGroup.add(knife);
  
}

function reset(){
  
  gameState = START;
  
  Ninja.changeAnimation("Idle",NinjaImage)
  
  Ninja.y = 295;
  
  score = 0;
  
}

