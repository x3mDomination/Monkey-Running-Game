//Global Variables
var bananaImage,obstacleImage,obstacleGroup,obstacle,foodGroup,food,monkeyRunning,monkeyStopped,monkey,backgroundImage,back,score,ground,stoneImage,gameState,PLAY,END,obstacleHits;


function preload(){
  bananaImage = loadImage("Banana.png");
  obstacleImage = loadImage("stone.png");
  monkeyRunning = loadAnimation("Monkey_01.png","Monkey_02.png","Monkey_03.png","Monkey_04.png","Monkey_05.png","Monkey_06.png","Monkey_07.png","Monkey_08.png","Monkey_09.png","Monkey_10.png");
  monkeyStopped = loadImage("Monkey_01.png");
  backgroundImage = loadImage("jungle.jpg");
}


function setup() {
  createCanvas(600,300);
  
  PLAY = 1;
  END = 0;
  gameState = PLAY;
  
  back = createSprite(300,150,10,10);
  back.addImage("jungle",backgroundImage);
  back.x=back.width/2;
  back.velocityX=-5;
  
  monkey = createSprite(200,200,10,10);
  monkey.addAnimation("running",monkeyRunning);
  monkey.addImage("stop",monkeyStopped);
  monkey.scale=0.1;
  
  foodGroup = createGroup();
  obstacleGroup = createGroup();
  
  score = 0;
  
  ground = createSprite(300,300,600,10);
  ground.visible=false;
  
  obstacleHits = 0;
}


function draw(){
 background(255);
  
  if(gameState===PLAY) {
    if(back.x<100) {
      back.x=back.width/2;
    }

    monkey.velocityY = monkey.velocityY+0.5;
    monkey.collide(ground);

    console.log(monkey.y);

    if(keyDown("space")&&monkey.y>264) {
      monkey.velocityY=-12;
    }

    if(monkey.isTouching(foodGroup)) {
      score = score + 2;
      foodGroup.destroyEach();
    }
    if(monkey.isTouching(obstacleGroup)) {
      monkey.scale = 0.1;
      score = 0;
      obstacleGroup.destroyEach();
      obstacleHits++;
    }

    switch(score) {
      case 10: monkey.scale=0.12;
        break;
      case 20: monkey.scale=0.14;
        break;
      case 30: monkey.scale=0.16;
        break;
      case 40: monkey.scale=0.18;
        break;
      case 50: monkey.scale=2;
        break;
      default: break;
    }

    spawnFood();
    spawnObstacles();
    
    if(obstacleHits===2) {
      gameState=END;
    }
    
    drawSprites();
  }
  
  if(gameState===END) {
    foodGroup.setVelocityXEach(0);
    foodGroup.setLifetimeEach(-1);
    
    obstacleGroup.setVelocityXEach(0);
    obstacleGroup.setLifetimeEach(-1);
    
    back.velocityX=0;
    monkey.velocityY=0;
    monkey.changeAnimation("stop",monkeyStopped);
    
    drawSprites();
    
    stroke("white");
    textSize(48);
    fill("white");
    text("Game Over!",160,150);
    
  }
  
  stroke("white");
  textSize(20);
  fill("white");
  text("Score: "+score,500,50);
}

function spawnFood() {
  if(frameCount%80===0) {
    food = createSprite(600,150,10,10);
    food.addImage("banana",bananaImage);
    food.scale=0.04;
    food.y = random(50,200);
    food.velocityX=-5;
    food.lifetime=120;
    foodGroup.add(food);
  }
}

function spawnObstacles() {
  if(frameCount%150===0) {
    obstacle = createSprite(600,280,10,10);
    obstacle.addImage("stone",obstacleImage);
    obstacle.scale=0.15;
    obstacle.velocityX=-8;
    obstacle.lifetime=600/8;
    obstacleGroup.add(obstacle);
  }
}