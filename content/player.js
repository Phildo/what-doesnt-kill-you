var Player = function()
{
  var self = this;

  this.width=20; 
  this.height=20; 
  this.up=false; 
  this.down=false; 
  this.left=false; 
  this.right=false;
  this.healing=false;
  this.justHurt = false;
  this.justHealed = false;

  this.hurt = function(amount)
  {
    if(game.model.open) amount *= 2;
    game.model.changeHealth(amount*-1);
    this.experience(amount);
    this.justHurt = true;
    game.model.shake = 10;
  };

  this.heal = function(amount)
  {
    game.model.changeHealth(amount);
    this.justHealed = true;
  };

  this.experience = function(amount)
  {
    game.model.changeExp(amount*game.model.expMultiplier);
  };

  this.draw = function(canv)
  {
    if(game.model.open)
    {
      canv.context.fillStyle = '#AA0000';
      canv.context.beginPath();
      canv.context.arc(game.model.posx, game.model.posy, (this.width/2)-4, 0, 2 * Math.PI, false);
      canv.context.fill();
      canv.context.lineWidth = 2;
      canv.context.strokeStyle = '#440000';
      canv.context.stroke();
      if(this.justHurt)
        canv.context.fillStyle = '#FF0000';
      else if(this.justHealed)
        canv.context.fillStyle = '#00FF00';
      else
        canv.context.fillStyle = '#000000';
      canv.context.fillRect(game.model.posx-(this.width/2)-2, game.model.posy-(this.height/2)-2, this.width/2, this.height/2);
      canv.context.fillRect(game.model.posx+2,                game.model.posy-(this.height/2)-2, this.width/2, this.height/2);
      canv.context.fillRect(game.model.posx-(this.width/2)-2, game.model.posy+2,                 this.width/2, this.height/2);
      canv.context.fillRect(game.model.posx+2,                game.model.posy+2,                 this.width/2, this.height/2);
    }
    else
    {
      if(this.justHurt)
        canv.context.fillStyle = '#FF0000';
      else if(this.justHealed)
        canv.context.fillStyle = '#00FF00';
      else
        canv.context.fillStyle = '#000000';
      canv.context.fillRect(game.model.posx-(this.width/2),game.model.posy-(this.height/2),this.width,this.height);
    }
    this.justHurt = false;
    this.justHealed = false;
  };

  this.update = function(delta)
  {
    if(this.up)
      game.model.posy-=(game.model.speed*0.8)+0.6;
    if(this.down)
      game.model.posy+=(game.model.speed*0.8)+0.6;
    if(this.left)
      game.model.posx-=(game.model.speed*0.8)+0.6;
    if(this.right)
      game.model.posx+=(game.model.speed*0.8)+0.6;
    if(game.model.posx > 1200) game.model.posx = 1200;
    if(game.model.posx < 200) game.model.posx = 200;
    if(game.model.posy > 1200) game.model.posy = 1200;
    if(game.model.posy < 200) game.model.posy = 200;
  
    if(this.healing) this.heal((2+game.model.healthRate)*0.035);
  };

  this.handleInputDown = function(e)
  {
    switch(e.keyCode)
    {
      case 87: //w
        self.up = true;
        break;
      case 65: //a
        self.left = true;
        break;
      case 83: //s
        self.down = true;
        break;
      case 68: //d
        self.right = true;
        break;
      case 16: //shift
        game.model.open = true;
        game.model.calculateExpMultiplier();
        break;
      case 191: // / (slash)
        self.healing = true;
        break;
      case 32: //space
        if(game.model.bombs > 0)
        {
          game.model.bombs--;
          game.model.shake = 60;
          game.sceneHandler.playScene.bombHandler.addBomb(game.sceneHandler.playScene.bombHandler.getBomb());
        }
        break;
      case 13: //enter
        //self.hurt(10);
        break;
      case 80: //p- used for debugging
        break;
    }
  };
  this.handleInputUp = function(e)
  {
    switch(e.keyCode)
    {
      case 87: //w
        self.up = false;
        break;
      case 65: //a
        self.left = false;
        break;
      case 83: //s
        self.down = false;
        break;
      case 68: //d
        self.right = false;
        break;
      case 16: //shift
        game.model.open = false;
        game.model.calculateExpMultiplier();
        break;
      case 191: // / (slash)
        self.healing = false;
        break;
      case 32: //space
        break;
      case 13: //enter
        break;
      case 80: //p- used for debugging
        break;
    }
  };
};
