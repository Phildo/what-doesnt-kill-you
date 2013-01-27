var Arena = function()
{
  this.c = new Canv(1400,1400);

  this.renderList = new PrioritizedRegistrationList("ARENA", 4);

  this.floor = new ArenaFloor();
  this.renderList.register(this.floor, 0);

  this.particleHandler = new ParticleHandler(this.c);
  this.renderList.register(this.particleHandler, 3);

  this.reset = function()
  {
    this.particleHandler.reset();
  };

  this.update = function(delta)
  {
    this.particleHandler.update(delta);
    game.model.shake -= delta;
    if(game.model.shake < 0) game.model.shake = 0;
  };

  this.draw = function()
  {
    //this.c.context.clearRect(0,0,this.c.canvas.width,this.c.canvas.height);
    this.renderList.performMemberFunction("draw", this.c);
  };

  var shakex;
  var shakey;
  var everyOtherShake = false;
  this.blitTo = function(canv)
  {
    //drawImage(source, sourcex, sourcey, sourcew, sourceh, destx, desty, destw, desth);
    //A window into the source canvas the size of the destination canvas centered around player
    if(everyOtherShake)
    {
      if(game.model.shake > 0)
      {
        shakex = (Math.random()*game.model.shake)-(game.model.shake/2);
        shakey = (Math.random()*game.model.shake)-(game.model.shake/2);
      }
      else
      {
        shakex = 0;
        shakey = 0;
      }
    }

    everyOtherShake = !everyOtherShake;

    canv.context.drawImage(this.c.canvas, 
      ((game.model.posx+shakex)/this.c.canvas.width)*(this.c.canvas.width-canv.canvas.width), 
      ((game.model.posy+shakey)/this.c.canvas.height)*(this.c.canvas.height-canv.canvas.height), 
      canv.canvas.width, 
      canv.canvas.height, 
      0, 
      0, 
      canv.canvas.width, 
      canv.canvas.height);
  };
}

var ArenaFloor = function()
{
  this.c = new Canv(1400,1400);

  //Draw initial bg on canvas (NOTE- THIS CANVAS SHOUlD NEVER GET CLEARED!(/CLEANED))
  this.c.context.fillStyle = "#FFFFFF";
  this.c.context.fillRect(0,0,1400,1400);
  this.c.context.lineWidth = 4;
  this.c.context.strokeStyle = "#BBBBBB";
  this.c.context.beginPath();
  for(var i = 0; i < 11; i++)
  {
    this.c.context.moveTo(200, i*100+200);
    this.c.context.lineTo(1200, i*100+200);
  }
  for(var i = 0; i < 11; i++)
  {
    this.c.context.moveTo(i*100+200, 200);
    this.c.context.lineTo(i*100+200, 1200);
  }
  this.c.context.closePath();
  this.c.context.stroke();

  this.draw = function(canv)
  {
    this.c.blitTo(canv);//full 1-1 blit
  };
};
