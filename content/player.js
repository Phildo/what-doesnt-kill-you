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
  this.open=false;
  this.justHurt = false;
  this.justHealed = false;

  this.hurt = function(amount)
  {
    if(this.open) amount *= 2;
    game.model.changeHealth(amount*-1);
    this.experience(amount);
    this.justHurt = true;
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

  this.draw = function(canvas, context)
  {
    if(this.open)
    {
      context.fillStyle = '#AA0000';
      context.beginPath();
      context.arc(game.model.posx, game.model.posy, (this.width/2)-4, 0, 2 * Math.PI, false);
      context.fill();
      context.lineWidth = 2;
      context.strokeStyle = '#440000';
      context.stroke();
      if(this.justHurt)
        context.fillStyle = '#FF0000';
      else if(this.justHealed)
        context.fillStyle = '#00FF00';
      else
        context.fillStyle = '#000000';
      context.fillRect(game.model.posx-(this.width/2)-2, game.model.posy-(this.height/2)-2, this.width/2, this.height/2);
      context.fillRect(game.model.posx+2,                game.model.posy-(this.height/2)-2, this.width/2, this.height/2);
      context.fillRect(game.model.posx-(this.width/2)-2, game.model.posy+2,                 this.width/2, this.height/2);
      context.fillRect(game.model.posx+2,                game.model.posy+2,                 this.width/2, this.height/2);
      this.justHurt = false;
    }
    else
    {
      if(this.justHurt)
        context.fillStyle = '#FF0000';
      else if(this.justHealed)
        context.fillStyle = '#00FF00';
      else
        context.fillStyle = '#000000';
      context.fillRect(game.model.posx-(this.width/2),game.model.posy-(this.height/2),this.width,this.height);
      this.justHurt = false;
    }
  };

  this.update = function(delta)
  {
    if(this.up)
      game.model.posy-=(game.model.speed*1.2)*10;
    if(this.down)
      game.model.posy+=(game.model.speed*1.2)*10;
    if(this.left)
      game.model.posx-=(game.model.speed*1.2)*10;
    if(this.right)
      game.model.posx+=(game.model.speed*1.2)*10;
    if(game.model.posx > 1000) game.model.posx = 1000;
    if(game.model.posx < 0) game.model.posx = 0;
    if(game.model.posy > 1000) game.model.posy = 1000;
    if(game.model.posy < 0) game.model.posy = 0;
  
    if(this.healing) this.heal(this.healthrate*0.1);
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
        self.open = true;
        break;
      case 191: // / (slash)
        self.healing = true;
        break;
      case 32: //space
        break;
      case 13: //enter
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
        self.open = false;
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
