var play = 1;
var end = 0
var gameState = 1;
var monkey, monkey_running, monkeyjump;
var obstacle, obstacleimage;
var banana1, banana2, banana3, banana4;
var brownimage, silverimage, goldimage, crystalimage;
var banana1Group, banana2Group, banana3Group, banana4Group;
var obstaclesGroup,cloudsGroup,clouds2Group,clouds,clouds1,reGroup;
var cloud1, cloud2, cloud3, cloud4, cloud5, cloud6;
var grassland, grassimage, grassland2, invertimage;
var invisibleground;
var runscore = 0;
var bananascore = 0;
var scoreboard, score1, score2;
var gameover, gameend;
var correct = 1;
var wrong = 0;
var changetext = 1
var restart, resetimage;
var trophy1, trophy2, trophy3, silver, gold, diamond ;
var play, playimage;
function preload() {

  monkey_running = loadAnimation("sprite_0.png", "sprite_1.png", "sprite_2.png", "sprite_3.png", "sprite_4.png", "sprite_5.png", "sprite_6.png", "sprite_7.png")
  obstaceimage = loadImage("obstacle.png");
  grassimage = loadImage("grassland3.png")
  cloud1 = loadImage("cloud1.png")
  cloud2 = loadImage("cloud2.png")
  cloud3 = loadImage("cloud3.png")
  cloud4 = loadImage("cloud4.png")
  cloud5 = loadImage("cloud5.png")
  cloud6 = loadImage("cloud6.png")
  obstacleimage = loadImage("obstacle.png")
  monkeyjump = loadAnimation("sprite_4.png")
  brownimage = loadImage("brown banana.png")
  silverimage = loadImage("silvar banana.png")
  goldimage = loadImage("golden banana.png")
  crystalimage = loadImage("crystal banana.png")
  scoreboard = loadImage("scorerect.png")
  gameover = loadImage("gameover.png")
  resetimage = loadImage("restart.png")
  silver = loadImage("silvertrophy.png")
  gold = loadImage("goldtrophy.png")
  crystal = loadImage("diamondtrophy.png")
  invertimage = loadImage("grassland4.png")
}
function setup() {
  createCanvas(630, 400);

  grassland = createSprite(250, 192, 600, 0);
  grassland.addImage("grass2", grassimage);
  grassland.scale = 0.4;

  grassland2 = createSprite(315, 200, 600, 0);
  grassland2.addImage("grass3", invertimage);
  grassland2.scale = 0.81;
  grassland2.visible = false;

  monkey = createSprite(90, 330, 20, 20);
  monkey.addAnimation("monkeyruns", monkey_running);
  monkey.addAnimation("jump", monkeyjump);
  monkey.scale = 0.135;
  monkey.setCollider("rectangle", 0, 0, 325, 325);

  score1 = createSprite(120, 30, 20, 20);
  score1.addImage("scores", scoreboard);
  score1.scale = 0.3;

  score2 = createSprite(300, 30, 20, 20);
  score2.addImage("scores", scoreboard);
  score2.scale = 0.3

  gameend = createSprite(300, 70, 5, 5);
  gameend.addImage("gamefinished", gameover)
  gameend.scale = 0.8
  
  restart = createSprite(290, 130, 20, 20);
  restart.addImage("replay", resetimage);
  restart.scale = 0.8;

  invisibleground = createSprite(325, 360, 625, 12)
  invisibleground.visible = false;

  trophy1 = createSprite(275, 310, 20, 20)
  trophy1.addImage("cup", silver)
  trophy1.scale = 0.2
  
  trophy2 = createSprite(280, 310, 20, 20)
  trophy2.addImage("cup2", gold)
  trophy2.scale = 0.055
  
  trophy3 = createSprite(280, 310, 20, 20)
  trophy3.addImage("cup3", crystal )
  trophy3.scale = 0.15

  obstaclesGroup = new Group();
  cloudsGroup = new Group();
  clouds2Group = new Group();
  banana1Group = new Group();
  banana2Group = new Group();
  banana3Group = new Group();
  banana4Group = new Group();
}

function draw() {
  background(210)
    
  if (gameState == play) {
    gameend.visible = false;
    trophy1.visible = false;
    trophy2.visible = false;
    trophy3.visible = false;
    restart.visible = false;
    restart.x = 700;
    restart.y = 700;

    if (frameCount % 100 == 0) {
      var rand1 = Math.round(random(25, 90));
      var rand2 = Math.round(random(1, 3));
      clouds = createSprite(670, rand1, 20, 20);
      switch (rand2) {
        case 1: clouds.addImage("clouds1", cloud1)
          break;
        case 2: clouds.addImage("clouds2", cloud3)
          break;
        case 3: clouds.addImage("clouds3", cloud3)
          break; 
        default: break;
      }
      clouds.velocityX = -(8 + runscore/100);
      clouds.scale = 0.6;
      clouds.lifetime = 150;
      clouds.depth = score1.depth
      score1.depth = score1.depth + 1;
      score2.depth = score1.depth;
      score2.depth = score2.depth + 1
      cloudsGroup.add(clouds);
    }
    if (frameCount % 100 == 0) {
      spawnobstacles();
    }
    if (keyDown("space") && monkey.y >= 280 ) {
      monkey.changeAnimation("jump", monkeyjump)
      monkey.velocityY = -14;
      }
    if (monkey.x > 88 && monkey.y > 323) {
      monkey.changeAnimation("monkeyruns", monkey_running)
    }
    if (frameCount % 100 == 0) {
      spawnbanana1();
    }
    if (runscore > 425 && bananascore > 40 && frameCount % 100 == 0) {
      banana1Group.destroyEach();
      spawnbanana2();
    }
    if (runscore > 1200 && bananascore > 160 && frameCount % 100 == 0) {
      banana2Group.destroyEach();
      spawnbanana3();
    }
    if (runscore > 1860 && bananascore > 300 && frameCount % 100 == 0) {
      banana3Group.destroyEach();
      spawnbanana4();
    }
    monkey.velocityY = monkey.velocityY + 0.9;
    monkey.collide(invisibleground);
   
    if (monkey.isTouching(banana1Group)) {
      banana1Group.destroyEach();
      bananascore = bananascore + 5
    }
    if (monkey.isTouching(banana2Group)) {
      banana2Group.destroyEach();
      bananascore = bananascore + 10
    }
    if (monkey.isTouching(banana3Group)) {
      banana3Group.destroyEach();
      bananascore = bananascore + 15
    }
    if (monkey.isTouching(banana4Group)) {
      banana4Group.destroyEach();
      bananascore = bananascore + 20
    } 
    if (changetext == 0) {
      typetext();
    }
    if (runscore > 2000 && bananascore >320 ) {
      grassland.visible = false;
      grassland2.visible = true;
      clouds.visible = false;
      
      if(runscore>2000 && runscore<2050) {
        textSize(20)
        fill("yellow")
        stroke("red")
        strokeWeight(3)
        text("season2", 170,140)
      }
      if (frameCount % 100 == 0) {
        var rand3 = Math.round(random(25, 90));
        var rand4 = Math.round(random(1, 3));
        clouds1 = createSprite(640, rand3, 20, 20);
        switch (rand4) {
          case 1: clouds1.addImage("clouds4", cloud4)
            break;
          case 2: clouds1.addImage("clouds5", cloud5)
            break;
          case 3: clouds1.addImage("clouds6", cloud6)
            break;
          default: break;
        }
        clouds1.velocityX = -(8 + runscore/100);
        clouds1.scale = 0.6;
        clouds1.lifetime = 150;
        clouds1.depth = grassland2.depth
        grassland2.depth = grassland2.depth + 1;
        clouds1.depth = score1.depth
        score1.depth = score1.depth + 1;
        score2.depth = score1.depth;
        score2.depth = score2.depth + 1
        clouds2Group.add(clouds1);
      }
    }
  }
  if (monkey.isTouching(obstaclesGroup)) {
    monkey.velocityY = -14;
     obstaclesGroup.destroyEach();
    cloudsGroup.destroyEach();
    banana1Group.destroyEach();
    banana2Group.destroyEach();
    banana3Group.destroyEach();
    banana4Group.destroyEach();
    changetext = 0;
    gameState = end;
  }
  drawSprites()
  if(changetext == 1){
     typetext();
  }
  if (gameState == end) {
    monkey.visible = false;
    gameend.visible = true;
    score1.visible = false;
    score2.visible = false;
    restart.visible = true;
    restart.x = 290;
    restart.y = 130;
    monkey.velocityX = 0;
    showtext(); 
  }
  if (mousePressedOver(restart)) {
    replay();
  }
  if (gameState == end && runscore < 1200 && bananascore < 150 &&        runscore > 550 && bananascore > 50 )  {
    trophy1.visible = true;
    retype();   
  } if(gameState == end && runscore > 1200 && bananascore > 150 &&       runscore < 1850 && bananascore < 280){
    trophy1.visible = false;
    trophy2.visible = true;
    gol();
  }
  if(gameState == end && runscore > 1850 && bananascore > 320 &&       runscore < 2800 && bananascore > 525){
    trophy2.visible = false;
    trophy3.visible = true;
    crys();
  }
}
function spawnobstacles() {
  obstacle = createSprite(630, 322.5, 20, 20);
  obstacle.addImage("obstacles", obstacleimage)
  obstacle.scale = 0.25;
  obstacle.setCollider("rectangle", 0, 0, 400, 400);
  obstacle.velocityX = -(8 + runscore/100);
  obstacle.lifetime = 150;
  obstaclesGroup.add(obstacle)
}
function spawnbanana1() {
  banana1 = createSprite(620, 210, 20, 20)
  banana1.addImage("bronze", brownimage)
  banana1.scale = 0.07;
  banana1.velocityX = -(8 + runscore/100);
  banana1.lifetime = 150;
  banana1Group.add(banana1)
}
function spawnbanana2() {
  banana2 = createSprite(620, 210, 20, 20)
  banana2.addImage("sivar", silverimage)
  banana2.scale = 0.135;
  banana2.velocityX = -(8 + runscore/100);
  banana2.lifetime = 150;
  banana2Group.add(banana2)
}
function spawnbanana3() {
  banana3 = createSprite(620, 210, 20, 20)
  banana3.addImage("gold", goldimage)
  banana3.scale = 0.3;
  banana3.velocityX = -(8 + runscore/100);
  banana3.lifetime = 150;
  banana3Group.add(banana3)
}
function spawnbanana4() {
  banana4 = createSprite(620, 210, 20, 20)
  banana4.addImage("crystal", crystalimage)
  banana4.scale = 0.09;
  banana4.velocityX = -(8 + runscore/100);
  banana4.lifetime = 150;
  banana4Group.add(banana4)
}
function typetext() {
  textSize(20)
  fill("yellow")
  stroke("black")
  strokeWeight(3)
  text("fruit score: " + bananascore, 233, 35)
  text("runscore: " + runscore, 53, 35)
  runscore = runscore + Math.round(getFrameRate(120)/60)
}
function showtext() {
  textSize(23)
  fill("pink")
  stroke("black")
  strokeWeight(3)
  text("fruit score: " + bananascore, 315, 190)
  text("runscore: " + runscore, 125, 190)
  runscore = runscore
}
function replay() {
  gameState = play; 
  obstaclesGroup.destroyEach();
  cloudsGroup.destroyEach();
  gameend.visible = false;
  score1.visible = true;
  score2.visible = true;
  monkey.visible = true;
  runscore = 0;
  bananascore = 0;
  changetext = 1;
  monkey.collide(invisibleground);
  monkey.x = 90;
  monkey.y = 350
  }
function retype() {
  textSize(22);
  fill("orange")
  stroke("black")
  strokeWeight(3)
  text("you have earned silver trophy", 145, 225)
}
function gol() {
  fill("orange")
  stroke("black")
  strokeWeight(3)
  text("you have earned golden trophy", 145, 225)
}
function crys() {
  fill("orange")
  stroke("black")
  strokeWeight(3)
  text("you have earned diamond trophy", 145, 225)
}
