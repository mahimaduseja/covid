
var doctor,doctorImg;
var bg,bgImg;
var virus,virusImg;
var border,borderImg;
var virusGroup;
var gameState="intro";


function preload(){
  //loading images
  bgImg=loadImage("bg.png");
doctorImg=loadImage("doctor.png");
  virusImg=loadImage("virus.png");
  borderImg=loadImage("border.png");
}

function setup() {
  //creating canvas
  createCanvas(1000,1000);

  //setting background
bg = createSprite(displayWidth/2,displayHeight/2,width,height)
bg.addImage(bgImg)
bg.scale=0.7;
bg.velocityX=-2;

//creating doctor
 doctor=createSprite(100,650);
 doctor.addImage("doctor",doctorImg);
 doctor.scale=0.5;
 
  
 //setting doctor's colllider radius
 doctor.setCollider("rectangle",0,0,100,500)
 //if u want to display collider radius then uncomment line 34..
//doctor.debug=true;

border=createSprite(0,238)
border.addImage(borderImg)
border.scale=3;

//border.debug=true
border.setCollider("rectangle",0,0,10,1000)
//creating group if virus
 virusGroup = new Group();

 //giving score intial value
score=0;
}

function draw() {
  background(255); 



  //creating introduction line
  if(gameState==="intro"){
    fill("black")
    textSize(20);
text("You have to kill the virus before it kills you..PRESS SPACE TO START",200,200);

  }
  if(keyDown("space")){
gameState="play";
  }
  
  if(gameState==="play"){


  //resetting the background
  if (bg.x < 300){
    bg.x =width/2;
  }

  //creating score 
  fill("green")
  textSize(20);
text("SCORE: "+score,850,100)

//creating doctor movement with mouse
  doctor.y=World.mouseY;

  //destroying virus
  for(var i=0;i<virusGroup.length;i++){  
  if(virusGroup[i].isTouching(doctor)){

    //increasing score when virus touching doctor
score=score+20;
virusGroup[i].destroy()
  }
  }


  drawSprites();
createVirus();
  }  
  if(virusGroup.isTouching(border)){
    gameState="end"
    
    }
  if(gameState==="end"){
    textSize(40);
    fill("red");
    text("GAME OVER",500,500)
           virusGroup.destroyEach() 
  bg.visible=false
  doctor.visible=false
  }
}

//function of virusGroup
function createVirus(){
if(frameCount%100===0){
virus=createSprite(1000,700,50,50)
virus.velocityX=-9;
virus.y=Math.round(random(100,700))
virus.addImage(virusImg)
virus.scale=0.5;
virusGroup.add(virus)
}
}
