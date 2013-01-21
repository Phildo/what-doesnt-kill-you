var Hud = function()
{
  this.c = new Canv(640,320); //<- the resulting canvas to blit to the main screen
  var c = new Canv(640,320); //<- unchanging template for the HUD (outlines of bars, etc...)

  this.particleHandler = new ParticleHandler(this.c);

  //Construct the Template Canvas (unchanging)
  //Draw icons
  c.context.drawImage(game.model.attackImg, 10, 10);
  c.context.drawImage(game.model.defenseImg, 10, 40);
  c.context.drawImage(game.model.speedImg, 10, 70);
  c.context.drawImage(game.model.healthrateImg, 10, 100);
  c.context.drawImage(game.model.bombImg, 10, 130);
  
  c.context.fillStyle = "#000000";

  //Draw Healthbar outline
  c.context.fillRect(10,              c.canvas.height-40, c.canvas.width-20, 10);
  c.context.fillRect(10,              c.canvas.height-20, c.canvas.width-20, 10);
  c.context.fillRect(10,              c.canvas.height-40, 10,              30);
  c.context.fillRect(c.canvas.width-20, c.canvas.height-40, 10,              30);

  //Draw Expbar outline
  c.context.fillRect(10,              c.canvas.height-60, c.canvas.width-20, 5);
  c.context.fillRect(10,              c.canvas.height-50, c.canvas.width-20, 5);
  c.context.fillRect(10,              c.canvas.height-60, 10,              15);
  c.context.fillRect(c.canvas.width-20, c.canvas.height-60, 10,              15);


  this.update = function(delta)
  {
    this.particleHandler.update(delta);
  };

  this.draw = function()
  {
    c.blitTo(this.c); //Start by redrawing template

    //Stat Numbers
    this.c.context.fillStyle = "#000000";
    this.c.context.textAlign = 'left';
    this.c.context.font = "20px vg_font";
    this.c.context.fillText(game.model.attack, 30, 30);
    this.c.context.fillText(game.model.defense, 30, 60);
    this.c.context.fillText(game.model.speed, 30, 90);
    this.c.context.fillText(game.model.healthrate, 30, 120);
    this.c.context.fillText(game.model.bombs, 30, 150);
  
    //Lvl text
    this.c.context.font = "12px vg_font";
    this.c.context.fillText("lvl."+game.model.level,10,this.c.canvas.height-65);
  
    //Round text
    this.c.context.textAlign = "center";
    this.c.context.fillText("Round "+game.model.currentRound, this.c.canvas.width/2, 20);
  
    //Health bar fill
    this.c.context.fillStyle = "#00FF00";
    this.c.context.fillRect(20, this.c.canvas.height-30, (game.model.health/game.model.maxHealth)*(this.c.canvas.width-40), 10)
  
    //Exp bar fill
    this.c.context.fillStyle = "#3377FF";
    this.c.context.fillRect(20, this.c.canvas.height-55, (game.model.exp/game.model.expToNextLevel)*(this.c.canvas.width-40), 5)

    //Multiplier text
    this.c.context.textAlign = 'right';
    this.c.context.font = (12+game.model.expmultiplier)+"px vg_font";
    this.c.context.fillText("x"+game.model.expmultiplier,this.c.canvas.width-10,this.c.canvas.height-65);

    //Particles
    this.particleHandler.draw();
  };

  this.blitTo = function(canv) { this.c.blitTo(canv); }; //1 to 1 blit


  //Model Listenin'
  this.healthChanged = function(delta)
  {
    if(delta > 0)
    {
      var p = this.particleHandler.getParticle("HEALTH_GAIN", 20+((game.model.health/game.model.maxHealth)*(this.c.canvas.width-40)), this.c.canvas.height-30);
      p.text = "+"+Math.round(delta);
      this.particleHandler.addParticle(p)
    }
    else if(delta < 0)
    {
      var p = this.particleHandler.getParticle("HEALTH_LOSE", 20+((game.model.health/game.model.maxHealth)*(this.c.canvas.width-40)), this.c.canvas.height-30);
      p.text = "-"+Math.round(delta);
      this.particleHandler.addParticle(p)
    }
  };

  this.expChanged = function(delta) //can only go up
  {
      var p = this.particleHandler.getParticle("EXP_GAIN", 20+((game.model.exp/game.model.expToNextLevel)*(this.c.canvas.width-40)), this.c.canvas.height-50);
      p.text = "+"+Math.round(delta);
      this.particleHandler.addParticle(p)
  };

  this.levelChanged = function(amount)
  {
    var p = this.particleHandler.getParticle("LEVEL_UP", 56, this.c.canvas.height-65);
    p.text = "+"+amount;
    this.particleHandler.addParticle(p);
  };

  this.statChanged = function(stObj)
  {
    var p = this.particleHandler.getParticle("STAT_UP", 50, 50);
    p.text = "+"+stObj.amount;
    switch(stObj.stat)
    {
      case 0:
        p.startY = 30;
        p.text += " attack";
        break;
      case 1:
        p.startY = 60;
        p.text += " defense";
        break;
      case 2:
        p.startY = 90;
        p.text += " speed";
        break;
      case 3:
        p.startY = 120;
        p.text += " health rate";
        break;
      case 3:
        p.startY = 150;
        p.text += " bomb";
        break;
    }
    this.particleHandler.addParticle(p);
  };

  //Register Listeners
  game.model.healthChangeListeners.register(this);
  game.model.expChangeListeners.register(this);
  game.model.levelChangeListeners.register(this);
  game.model.statChangeListeners.register(this);
};
