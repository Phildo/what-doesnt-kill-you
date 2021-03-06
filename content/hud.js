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

  //Draw Roundbar outline
  c.context.fillRect(c.canvas.width-30, 25, 5, c.canvas.height-130);
  c.context.fillRect(c.canvas.width-15, 25, 5, c.canvas.height-130);
  c.context.fillRect(c.canvas.width-30, 25, 20, 10);
  c.context.fillRect(c.canvas.width-30, c.canvas.height-105, 20, 10);

  this.reset = function()
  {
    this.particleHandler.reset();
  };

  this.update = function(delta)
  {
    this.particleHandler.update(delta);
    game.model.scoreShake -= delta;
    game.model.expShake -= delta;
  };

  var scoreshakex = 0;
  var scoreshakey = 0;
  var expshakex = 0;
  var expshakey = 0;
  var miniexpshakex = 0;
  var miniexpshakey = 0;
  var everyOtherShake = false;
  var randomColors = ["#FF0000","#00FF00","#0000FF","#FFFFFF"]
  this.draw = function()
  {
    this.c.context.clearRect(0,0,640,320);
    c.blitTo(this.c); //Start by redrawing template

    //Stat Numbers
    this.c.context.fillStyle = "#000000";
    this.c.context.textAlign = 'left';
    this.c.context.font = "20px vg_font";
    this.c.context.fillText(game.model.attack, 30, 30);
    this.c.context.fillText(game.model.defense, 30, 60);
    this.c.context.fillText(game.model.speed, 30, 90);
    this.c.context.fillText(game.model.healthRate, 30, 120);
    this.c.context.fillText(game.model.bombs, 30, 150);
  
    //Lvl text
    this.c.context.font = "12px vg_font";
    this.c.context.fillText("lvl."+game.model.level,10,this.c.canvas.height-65);
  
    //Round text
    this.c.context.textAlign = "right";
    this.c.context.fillText("Round "+game.model.currentRound, this.c.canvas.width-15, 20);
  
    if(everyOtherShake)
    {
      if(game.model.scoreShake > 0)
      {
        scoreshakex = (Math.random()*game.model.scoreShake)-(game.model.scoreShake/2);
        scoreshakey = (Math.random()*game.model.scoreShake)-(game.model.scoreShake/2);
        this.c.context.fillStyle = randomColors[Math.floor(Math.random()*4)];
      }
      else
      {
        scoreshakex = 0;
        scoreshakey = 0;
        this.c.context.fillStyle = "#000000";
      }
    }
    //Score text
    this.c.context.textAlign = "center";
    this.c.context.fillText("Score:"+game.model.score, this.c.canvas.width/2+scoreshakex, 20+scoreshakey);

    //Health bar fill
    this.c.context.fillStyle = "#00FF00";
    this.c.context.fillRect(20, this.c.canvas.height-30, (game.model.health/game.model.maxHealth)*(this.c.canvas.width-40), 10)
  
    //Round bar fill
    this.c.context.fillStyle = "#FF0000";
    this.c.context.fillRect(
      this.c.canvas.width-25, 
      35+((1-(game.model.remainingRoundDelta/game.model.roundDelta))*(this.c.canvas.height-140)), 
      10, 
      ((game.model.remainingRoundDelta/game.model.roundDelta)*(this.c.canvas.height-140))
    );

  
    if(everyOtherShake)
    {
      if(game.model.expShake > 0)
      {
        expshakex = (Math.random()*game.model.expShake)-(game.model.expShake/2);
        expshakey = (Math.random()*game.model.expShake)-(game.model.expShake/2);
      }
      else
      {
        expshakex = 0;
        expshakey = 0;
      }
    }
    //Multiplier text
    this.c.context.fillStyle = "#3377FF";
    this.c.context.textAlign = 'right';
    this.c.context.font = (12+game.model.expMultiplier)+"px vg_font";
    this.c.context.fillText("x"+game.model.expMultiplier,this.c.canvas.width-10+expshakex,this.c.canvas.height-65+expshakey);

    if(game.model.expMultiplier > 1)
    {
      miniexpshakex = (Math.random()*2)-1;
      miniexpshakey = (Math.random()*2)-1;
    }
    else
    {
      miniexpshakex = 0;
      miniexpshakey = 0;
    }
    //Exp threshhold indicator text
    this.c.context.textAlign = 'center';
    this.c.context.font = "8px vg_font";
    if(game.model.health < game.model.maxHealth/2) 
    {
      this.c.context.fillStyle = "#3377FF";
      this.c.context.fillText("x2", 10+((c.canvas.width-20)/2)+miniexpshakex, c.canvas.height-31+miniexpshakey);
    }
    else 
    {
      this.c.context.fillStyle = "#DDDDDD";
      this.c.context.fillText("x2", 10+((c.canvas.width-20)/2), c.canvas.height-31);
    }
    if(game.model.health < game.model.maxHealth/4) 
    {
      this.c.context.fillStyle = "#3377FF";
      this.c.context.fillText("x3", 10+((c.canvas.width-20)/4)+miniexpshakex, c.canvas.height-31+miniexpshakey);
    }
    else 
    {
      this.c.context.fillStyle = "#DDDDDD";
      this.c.context.fillText("x3", 10+((c.canvas.width-20)/4), c.canvas.height-31);
    }
    if(game.model.health < game.model.maxHealth/8) 
    {
      this.c.context.fillStyle = "#3377FF";
      this.c.context.fillText("x4", 10+((c.canvas.width-20)/8)+miniexpshakex, c.canvas.height-31+miniexpshakey);
    }
    else 
    {
      this.c.context.fillStyle = "#DDDDDD";
      this.c.context.fillText("x4", 10+((c.canvas.width-20)/8), c.canvas.height-31);
    }
    if(game.model.health < game.model.maxHealth/16) 
    {
      this.c.context.fillStyle = "#3377FF";
      this.c.context.fillText("x5", 10+((c.canvas.width-20)/16)+miniexpshakex, c.canvas.height-31+miniexpshakey);
    }
    else 
    {
      this.c.context.fillStyle = "#DDDDDD";
      this.c.context.fillText("x5", 10+((c.canvas.width-20)/16), c.canvas.height-31);
    }
    if(game.model.health < game.model.maxHealth/32) 
    {
      this.c.context.fillStyle = "#3377FF";
      this.c.context.fillText("x6", 10+((c.canvas.width-20)/32)+miniexpshakex, c.canvas.height-31+miniexpshakey);
    }
    else 
    {
      this.c.context.fillStyle = "#DDDDDD";
      this.c.context.fillText("x6", 10+((c.canvas.width-20)/32), c.canvas.height-31);
    }

    //Exp bar fill
    this.c.context.fillStyle = "#3377FF";
    this.c.context.fillRect(20+(miniexpshakex*game.model.expMultiplier/2), this.c.canvas.height-55+(miniexpshakey*game.model.expMultiplier/2), (game.model.exp/game.model.expToNextLevel)*(this.c.canvas.width-40), 5)

    //Particles
    this.particleHandler.draw();

    everyOtherShake = !everyOtherShake;
  };

  this.blitTo = function(canv) { this.c.blitTo(canv); }; //1 to 1 blit


  //Model Listenin'
  this.healthChanged = function(delta)
  {
    if(delta > 0)
    {
      var p = this.particleHandler.getParticle("HEALTH_GAIN", 20+((game.model.health/game.model.maxHealth)*(this.c.canvas.width-40)), this.c.canvas.height-30);
      p.text = "+";//"+"+Math.round(delta);
      this.particleHandler.addParticle(p)
    }
    else if(delta < 0)
    {
      var p = this.particleHandler.getParticle("HEALTH_LOSE", 20+((game.model.health/game.model.maxHealth)*(this.c.canvas.width-40)), this.c.canvas.height-30);
      p.text = Math.round(delta);
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
    var p = this.particleHandler.getParticle("LEVEL_UP", 58, this.c.canvas.height-65);
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
      case 4:
        p.startY = 150;
        p.text += " bomb";
        break;
    }
    this.particleHandler.addParticle(p);
  };

  this.warningChanged = function(warning)
  {
    var p = this.particleHandler.getParticle("WARNING", this.c.canvas.width/2, 50);
    p.text = warning;
    this.particleHandler.addParticle(p);
  };

  //Register Listeners
  game.model.healthChangeListeners.register(this);
  game.model.expChangeListeners.register(this);
  game.model.levelChangeListeners.register(this);
  game.model.statChangeListeners.register(this);
  game.model.warningChangeListeners.register(this);
};
