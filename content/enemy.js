var Player = function()
{
  var self = this;

  this.x=500;
  this.y=500; 
  this.width=20; 
  this.height=20; 
  this.up=false; 
  this.down=false; 
  this.left=false; 
  this.right=false;
  this.healing=false;
  this.open=false;

  this.level = 0;
  this.multiplier = 1;
  this.exp = 0;
  this.expToNextLevel = 100;
  this.spendablePoints = 0;
  this.health = 100;
  this.healRate = 0.1;
  this.maxHealth = 100;
  this.speed = 10;

  //Used to handle the changing of 'this' for window listeners
  this.globalHandleInputDown = function(e) { self.handleInputDown(e); };
  this.globalHandleInputUp = function(e) { self.handleInputUp(e); };

  this.calculateMultiplier = function()
  {
    this.multiplier = 1;
    if(this.health <= this.maxHealth/2) this.multiplier++;
    if(this.health <= this.maxHealth/4) this.multiplier++;
    if(this.health <= this.maxHealth/8) this.multiplier++;
    if(this.health <= this.maxHealth/16) this.multiplier++;
    if(this.health <= this.maxHealth/32) this.multiplier++;

    if(this.open) this.multiplier*=2;
  }

  this.hurt = function(amount)
  {
      if(this.health-amount < 0)
        amount = this.health;
      this.health-=amount;
      this.calculateMultiplier();
      this.experience(amount*this.multiplier);
      var p = game.particleHandler.getParticle("TEXT");
      p.stage = game.stage;
      p.text = "-"+Math.round(amount);
      p.rgb = "255,0,0";
      p.size = 12;
      p.startX = 20+((this.health/this.maxHealth)*(game.stage.canvas.width-40));
      p.startY = game.stage.canvas.height-30;
      p.deltaX = 0;
      p.deltaY = -20;
      p.duration = 10;
      p.progress = 0;
      game.particleHandler.addParticle(p);
  }

  this.heal = function(amount)
  {
    if(this.health+amount > this.maxHealth)
      amount = this.maxHealth-this.health;
    var oldHealth = Math.round(this.health);
    this.health+=amount;
    var newHealth = Math.round(this.health);
    if(newHealth - oldHealth > 0)
    {
      var p = game.particleHandler.getParticle("TEXT");
      p.stage = game.stage;
      p.text = "+"+(newHealth-oldHealth);
      p.rgb = "0,255,0";
      p.size = 12;
      p.startX = 20+((this.health/this.maxHealth)*(game.stage.canvas.width-40));
      p.startY = game.stage.canvas.height-30;
      p.deltaX = 0;
      p.deltaY = -20;
      p.duration = 10;
      p.progress = 0;
      game.particleHandler.addParticle(p);
    }
  };

  this.experience = function(amount)
  {
    if(this.exp+amount > this.expToNextLevel)
    {
      var newAmount = amount-(this.expToNextLevel-this.exp);
      this.experience(this.expToNextLevel-this.exp);
      amount = newAmount;
    }
    this.exp+=amount;
    var p = game.particleHandler.getParticle("TEXT");
    p.stage = game.stage;
    p.text = "+"+Math.round(amount);
    p.rgb = "25,50,255";
    p.size = 12;
    p.startX = 20+((this.exp/this.expToNextLevel)*(game.stage.canvas.width-40));
    p.startY = game.stage.canvas.height-50;
    p.deltaX = 0;
    p.deltaY = -20;
    p.duration = 10;
    p.progress = 0;
    game.particleHandler.addParticle(p);
    if(this.exp >= this.expToNextLevel)
    {
      this.level++;
      this.spendablePoints++;
      this.exp = 0;
      this.expToNextLevel*=1.5;
      p = game.particleHandler.getParticle("TEXT");
      p.stage = game.stage;
      p.text = "+1";
      p.rgb = "10,10,10";
      p.size = 15;
      p.startX = 56;
      p.startY = game.stage.canvas.height-65;
      p.deltaX = 0;
      p.deltaY = -20;
      p.duration = 20;
      p.progress = 0;
      game.particleHandler.addParticle(p);
    }
  };
};
Player.prototype.draw = function(canvas, context)
{
  if(this.open)
  {
    context.fillStyle = '#AA0000';
    context.beginPath();
    context.arc(this.x, this.y, (this.width/2)-4, 0, 2 * Math.PI, false);
    context.fill();
    context.lineWidth = 2;
    context.strokeStyle = '#440000';
    context.stroke();
    context.fillStyle = '#000000';
    context.fillRect(this.x-(this.width/2)-2, this.y-(this.height/2)-2, this.width/2, this.height/2);
    context.fillRect(this.x+2,                this.y-(this.height/2)-2, this.width/2, this.height/2);
    context.fillRect(this.x-(this.width/2)-2, this.y+2,                 this.width/2, this.height/2);
    context.fillRect(this.x+2,                this.y+2,                 this.width/2, this.height/2);
  }
  else
    context.fillRect(this.x-(this.width/2),this.y-(this.height/2),this.width,this.height);
};
Player.prototype.update = function(delta)
{
  if(this.up)
    this.y-=this.speed;
  if(this.down)
    this.y+=this.speed;
  if(this.left)
    this.x-=this.speed;
  if(this.right)
    this.x+=this.speed;
  if(this.x > 1000) this.x = 1000;
  if(this.x < 0) this.x = 0;
  if(this.y > 1000) this.y = 1000;
  if(this.y < 0) this.y = 0;

  if(this.healing) this.heal(this.healRate);
  
  this.calculateMultiplier();
};
Player.prototype.handleInputDown = function(e)
{
  switch(e.keyCode)
  {
    case 87: //w
      this.up = true;
      break;
    case 65: //a
      this.left = true;
      break;
    case 83: //s
      this.down = true;
      break;
    case 68: //d
      this.right = true;
      break;
    case 16: //shift
      this.open = true;
      break;
    case 191: // / (slash)
      this.healing = true;
      break;
    case 32: //space
      this.healing = true;
      break;
    case 13: //enter
      this.hurt(this.health/2);
      break;
    case 80: //p- used for debugging
      alert(this.exp);
      break;
  }
};
Player.prototype.handleInputUp = function(e)
{
  switch(e.keyCode)
  {
    case 87: //w
      this.up = false;
      break;
    case 65: //a
      this.left = false;
      break;
    case 83: //s
      this.down = false;
      break;
    case 68: //d
      this.right = false;
      break;
    case 16: //shift
      this.open = false;
      break;
    case 191: // / (slash)
      this.healing = false;
      break;
    case 32: //space
      this.healing = false;
      break;
  }
};
