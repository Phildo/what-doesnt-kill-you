var PlayScene = function(stage)
{
  var self = this;

  var renderList = new RegistrationList("RENDER");
  var arenaRenderList = new RegistrationList("ARENA");
  var updateList = new RegistrationList("PHYSICS");

  var arenaCanvas = document.createElement('canvas');
  arenaCanvas.setAttribute('width',1000);
  arenaCanvas.setAttribute('height',1000);
  arenaContext = arenaCanvas.getContext('2d');
  arenaContext.font = '24px vg_font';
  arenaContext.textAlign = 'center';

  var player = {"x":0, "y":0, "width":20, "height":20, "up":false, "down":false, "left":false, "right":false};
  player.draw = function()
  {
    arenaContext.fillRect(player.x-(player.width/2),player.y-(player.height/2),player.width,player.height);
  }
  player.updatePos = function()
  {
    if(player.up)
      player.y-=3;
    if(player.down)
      player.y+=3;
    if(player.left)
      player.x-=3;
    if(player.right)
      player.x+=3;
  }
  player.handleInputDown = function(e)
  {
    switch(e.keyCode)
    {
      case 87: //w
        player.up = true;
        break;
      case 65: //a
        player.left = true;
        break;
      case 83: //s
        player.down = true;
        break;
      case 68: //d
        player.right = true;
        break;
      case 16: //shift
        break;
      case 32: //space
        break;
    }
  }
  player.handleInputUp = function(e)
  {
    switch(e.keyCode)
    {
      case 87: //w
        player.up = false;
        break;
      case 65: //a
        player.left = false;
        break;
      case 83: //s
        player.down = false;
        break;
      case 68: //d
        player.right = false;
        break;
      case 16: //shift
        break;
      case 32: //space
        break;
    }
  }

  var bg = {};
  bg.draw = function()
  {
    arenaContext.beginPath();
    for(var i = 0; i < 25; i++)
    {
      arenaContext.moveTo(0, i*40);
      arenaContext.lineTo(1000, i*40);
    }
    for(var i = 0; i < 25; i++)
    {
      arenaContext.moveTo(i*40, 0);
      arenaContext.lineTo(i*40, 1000);
    }
    arenaContext.closePath();
    arenaContext.stroke();
  }

  var arena = {};
  arena.draw = function()
  {
    stage.context.drawImage(arenaCanvas, (player.x/1000)*360, (player.y/1000)*680, stage.canvas.width, stage.canvas.height, 0, 0, stage.canvas.width, stage.canvas.height);
  }

  var draw = function(member, args)
  {
    member.draw();
  }
  var update = function(member, args)
  {
    member.updatePos();
  }

  self.willEnter = function()
  {
    stage.context.clearRect(0,0,stage.canvas.width,stage.canvas.height);
    arenaRenderList.register(player);
    arenaRenderList.register(bg);
    renderList.register(arena);
    updateList.register(player);
    document.addEventListener('keydown', player.handleInputDown, false);
    document.addEventListener('keyup', player.handleInputUp, false);
  }
  self.willExit = function()
  {
    arenaRenderList.unregister(player);
    arenaRenderList.unregister(bg);
    renderList.unregister(arena);
    updateList.unregister(player);
    document.removeEventListener('keydown', player.handleInputDown, false);
    document.removeEventListener('keyup', player.handleInputUp, false);
  }
  self.update = function(delta)
  {
    arenaContext.clearRect(0,0,arenaCanvas.width,arenaCanvas.height);
    stage.context.clearRect(0,0,stage.canvas.width,stage.canvas.height);
    updateList.performOnMembers(update,null);
    arenaRenderList.performOnMembers(draw,null);
    renderList.performOnMembers(draw,null);
  }
}
PlayScene.prototype = Scene.prototype;
