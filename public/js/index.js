//Create the renderer
var socket = io.connect('http://localhost:3000');

var Graphics = PIXI.Graphics;
var renderer = PIXI.autoDetectRenderer(800, 600);
document.body.appendChild(renderer.view);
var stage = new PIXI.Container();
var setup,play;
var player1 = new Graphics(),player2 = new Graphics();

setup(player1);

function setup(actualPlayer){
  player1.beginFill(0xFFFFFFF);
  player1.drawRect(0, 0, 12, 120);
  player1.endFill();
  player1.x = 20 - player1.width/2;
  player1.y = renderer.view.height/2-player1.height/2;
  player1.vx = 0;
  player1.vy = 0;
  player2.beginFill(0xFFFFFFF);
  player2.drawRect(0, 0, 12, 120);
  player2.endFill();
  player2.x = renderer.view.width - player2.width/2 -20;
  player2.y = renderer.view.height/2-player2.height/2;
  player2.vx = 0;
  player2.vy = 0;

  state = play;
  stage.addChild(player1);
  stage.addChild(player2);

  var   up = keyboard(38),
      down = keyboard(40);
  up.press = function(){
    socket.emit('move-y', -10);
    setVelocity(actualPlayer,-10);

  }
  up.release = function(){
    socket.emit('move-y', 0);
      setVelocity(actualPlayer,0);
  }
  down.press = function(){
    socket.emit('move-y', 10);
    setVelocity(actualPlayer,10);

  }
  down.release = function(){
    socket.emit('move-y', 0);
    setVelocity(actualPlayer,0);
  }

  gameLoop();
}

function setVelocity(actualPlayer,v){
  actualPlayer.vy = v;
}

function gameLoop() {
  requestAnimationFrame(gameLoop);
  state();
  renderer.render(stage);
}

function play(){
  player1.x += player1.vx;
  player1.y += player1.vy
  player2.x += player2.vx
  player2.y += player2.vy
}
