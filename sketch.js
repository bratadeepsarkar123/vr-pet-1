//Create variables here
var foodS,happyDog,dog1,dog,database,stock;var vimg=0;var y1=1;var v2=[];
function preload(){
	//load images here
  happyDog = loadImage("happydog.png");
   dog1=loadImage("Dog.png");
}
function setup() {
  database=firebase.database();
	createCanvas(windowWidth-50,windowHeight-50);
  dog=createSprite(width/2,height/2+100*height/678,10,10);
  dog.addImage(dog1);
  dog.scale=0.3*height/678;
  stock = database.ref('food');
  stock.on("value",read);
}
function draw() {
  background("lightGreen");
  drawSprites();
  textSize(30*width/1066);
  fill(0);
  text("FOOD REMAINING :- ",100*width/1066,height/3);
  text(foodS,400*width/1066,height/3);
  textSize(30*width/1066);
  fill(color(0,0,random(0,255)));
  text("NOTE :- Click the MOUSE or press "+'"SPACE BAR"'+" to feed your pet ",width/90,height/10);
  text("You can only feed once per site load",width/7,height/10+40*height/678);
  text("Click R to refill (only when food is 0)",width/7,height/10+80*height/678);
  var f1=((frameCount)/Math.round(frameRate()));
  var s1=60;
  if(f1%1===0 && vimg===1 && y1===0 && foodS>0){
     var v1=s1-f1;
     var v2=[];
     v2.push(v1); 
    if(v1<0){
      vimg=0;
      dog.addImage(dog1);
      y1=1;
      v2.pop();
      frameCount=0;
    }
  }
  fill("red");
  if(vimg===1 && foodS>0 ){
      textSize(100*width/1066);
      text("Cooldown time :- ",width/100,height/2);
      textSize(50*width/1066);
      text(" sec",width*3/4+(150*width/1066),height/2);
      textSize(100*width/1066);
      text(v2,width*3/4,height/2);
  }
  if(keyDown("space") && foodS!=0 && foodS!=undefined && vimg===0 && y1===1){
    dog.addImage(happyDog);
    vimg=1;
    y1=0;
  }
  if(keyWentDown("space") && vimg===0 && foodS!=undefined && y1===1 ){
    if(foodS>=0 && vimg===0 && foodS!=undefined && y1===1){
      foodS-- ;
      write(foodS);
    }else{
      foodS=0;
      vimg=1;
      y1=0;
    } 
  }
  if(foodS<=0 && keyDown("r")){
    foodS=20;
    write(foodS);
    y=0;
  } 
}
function read(data){foodS=data.val();}
function write(x){database.ref('food').set(x);}
function mouseReleased(){
  if( foodS!=undefined ){
  if(foodS>0 && vimg===0 && y1===1){
    dog.addImage(happyDog);
    foodS-- ;
    write(foodS);
  }
  vimg=1;
  y1=0;
  }
} 




