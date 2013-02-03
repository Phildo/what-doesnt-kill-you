var RoundHandler = function(scene)
{
  this.scene = scene;

  var roundTypes = ["NULL","DUDES","DUDES_AND_SHOOTER","DUDES_AND_SHOOTERS","DUDES_AND_SUPERDUDES","SPEEDERFUCK","SMORGASBOARD","SHOOTERS_AND_SUPERS","TANK_N_FRIENDS","SUPERSPEEDERFUCK","SUPERS","TANKFUCK","RANDOM"];
  this.rounds = [];
  var tmpRound;

  //Event functions (or create custom if you'd like)
  var wait = function() { };
  var spawnADude = function() { var e = scene.enemyHandler.getEnemy("BASE"); e.randomizeStartPoint(); scene.enemyHandler.addEnemy(e); };
  var spawnA2Dude = function() { var e = scene.enemyHandler.getEnemy("BASE_2"); e.randomizeStartPoint(); scene.enemyHandler.addEnemy(e); };
  var spawnASpeeder = function() { var e = scene.enemyHandler.getEnemy("SPEEDER"); e.randomizeStartPoint(); scene.enemyHandler.addEnemy(e); };
  var spawnA2Speeder = function() { var e = scene.enemyHandler.getEnemy("SPEEDER_2"); e.randomizeStartPoint(); scene.enemyHandler.addEnemy(e); };
  var spawnABullet = function() { var e = scene.enemyHandler.getEnemy("BULLET"); e.randomizeStartPoint(); e.setTrajectory(); scene.enemyHandler.addEnemy(e); };
  var spawnAShooter = function() { var e = scene.enemyHandler.getEnemy("SHOOTER"); e.randomizeStartPoint(); scene.enemyHandler.addEnemy(e); };
  var spawnA2Shooter = function() { var e = scene.enemyHandler.getEnemy("SHOOTER_2"); e.randomizeStartPoint(); scene.enemyHandler.addEnemy(e); };
  var spawnATank = function() { var e = scene.enemyHandler.getEnemy("TANK"); e.randomizeStartPoint(); scene.enemyHandler.addEnemy(e); };
  var spawnA2Tank = function() { var e = scene.enemyHandler.getEnemy("TANK_2"); e.randomizeStartPoint(); scene.enemyHandler.addEnemy(e); };

  this.enqueueRound = function(type, difficulty)
  {
    switch(type)
    {
      case "NULL":
        tmpRound = new Round(this, this.rounds.length);
        this.rounds[this.rounds.length] = tmpRound;
        break;
      case "DUDES":
        tmpRound = new Round(this, this.rounds.length);
        for(var i = 0; i < Math.round(16+(difficulty*10)); i++)
          tmpRound.enqueueEvent(spawnADude, Math.ceil(5/(difficulty+1)));
        tmpRound.enqueueEvent(wait, Math.round(600+400-(400/(difficulty+1))))
        this.rounds[this.rounds.length] = tmpRound;
        break;
      case "DUDES_AND_SHOOTER":
        tmpRound = new Round(this, this.rounds.length);
        for(var i = 0; i < Math.round(5+(difficulty*2)); i++)
          tmpRound.enqueueEvent(spawnADude, Math.ceil(12/(difficulty+1)));
        tmpRound.enqueueEvent(spawnAShooter, 0);
        for(var i = 0; i < Math.round(15+(difficulty*5)); i++)
          tmpRound.enqueueEvent(spawnADude, Math.ceil(12/(difficulty+1)));
        tmpRound.enqueueEvent(wait, 500+400-(400/(difficulty+1)));
        this.rounds[this.rounds.length] = tmpRound;
        break;
      case "DUDES_AND_SHOOTERS":
        tmpRound = new Round(this, this.rounds.length);
        for(var i = 0; i < Math.round(6+(difficulty*3)); i++)
          tmpRound.enqueueEvent(spawnADude, Math.ceil(12/(difficulty+1)));
        tmpRound.enqueueEvent(spawnAShooter, 0);
        for(var i = 0; i < Math.round(6+(difficulty*3)); i++)
          tmpRound.enqueueEvent(spawnADude, Math.ceil(12/(difficulty+1)));
        tmpRound.enqueueEvent(spawnAShooter, 0);
        for(var i = 0; i < Math.round(6+(difficulty*3)); i++)
          tmpRound.enqueueEvent(spawnADude, Math.ceil(12/(difficulty+1)));
        tmpRound.enqueueEvent(spawnAShooter, 0);
        tmpRound.enqueueEvent(wait, 500+400-(difficulty+1));
        this.rounds[this.rounds.length] = tmpRound;
        break;
      case "DUDES_AND_SUPERDUDES":
        tmpRound = new Round(this, this.rounds.length);
        for(var i = 0; i < Math.round(7+(difficulty*4)); i++)
        {
          for(var j = 0; j < Math.round(2+(difficulty*2)); j++)
            tmpRound.enqueueEvent(spawnADude, Math.ceil(8/(difficulty+1)));
          tmpRound.enqueueEvent(spawnA2Dude, Math.ceil(8/(difficulty+1)));
        }
        tmpRound.enqueueEvent(wait, 550);
        this.rounds[this.rounds.length] = tmpRound;
        break;
      case "SPEEDERFUCK":
        tmpRound = new Round(this, this.rounds.length);
        for(var i = 0; i < Math.round(30+(difficulty*10)); i++)
          tmpRound.enqueueEvent(spawnASpeeder, Math.ceil(3/(difficulty+1)));
        tmpRound.enqueueEvent(wait, 300);
        this.rounds[this.rounds.length] = tmpRound;
        break;
      case "SMORGASBOARD":
        tmpRound = new Round(this, this.rounds.length);
        for(var i = 0; i < Math.round(5+(difficulty*3)); i++)
          tmpRound.enqueueEvent(spawnADude, 0);
        tmpRound.enqueueEvent(wait, Math.ceil(15/(difficulty+1)));
        for(var i = 0; i < Math.round(5+(difficulty*3)); i++)
          tmpRound.enqueueEvent(spawnA2Dude, 0);
        tmpRound.enqueueEvent(wait, Math.ceil(15/(difficulty+1)));
        for(var i = 0; i < Math.round(5+(difficulty*3)); i++)
          tmpRound.enqueueEvent(spawnASpeeder, 0);
        tmpRound.enqueueEvent(wait, Math.ceil(15/(difficulty+1)));
        for(var i = 0; i < Math.round(5+(difficulty*3)); i++)
          tmpRound.enqueueEvent(spawnAShooter, 0);
        tmpRound.enqueueEvent(wait, Math.ceil(15/(difficulty+1)));
        for(var i = 0; i < Math.round(5+(difficulty*3)); i++)
          tmpRound.enqueueEvent(spawnADude, 0);
        tmpRound.enqueueEvent(wait, 700);
        this.rounds[this.rounds.length] = tmpRound;
        break;
      case "SHOOTERS_AND_SUPERS":
        tmpRound = new Round(this, this.rounds.length);
        for(var i = 0; i < Math.round(2+difficulty); i++)
        {
          for(var j = 0; j < Math.round(5+(difficulty*3)); j++)
            tmpRound.enqueueEvent(spawnAShooter, Math.ceil(5/(difficulty+1)));
          tmpRound.enqueueEvent(spawnA2Shooter, Math.ceil(5/(difficulty+1)));
          tmpRound.enqueueEvent(wait, 20);
        }
        tmpRound.enqueueEvent(wait, 800);
        this.rounds[this.rounds.length] = tmpRound;
        break;
      case "TANK_N_FRIENDS":
        tmpRound = new Round(this, this.rounds.length);
        tmpRound.enqueueEvent(spawnATank, 2);
        for(var i = 0; i < Math.round(5+(difficulty*2)); i++)
          tmpRound.enqueueEvent(spawnADude, 2);
        for(var i = 0; i < Math.round(5+(difficulty*2)); i++)
          tmpRound.enqueueEvent(spawnA2Dude, 2);
        for(var i = 0; i < Math.round(5+(difficulty*2)); i++)
          tmpRound.enqueueEvent(spawnASpeeder, 2);
        for(var i = 0; i < Math.round(5+(difficulty*2)); i++)
          tmpRound.enqueueEvent(spawnA2Speeder, 2);
        for(var i = 0; i < Math.round(5+(difficulty*2)); i++)
          tmpRound.enqueueEvent(spawnADude, 2);
        for(var i = 0; i < Math.round(5+(difficulty*2)); i++)
          tmpRound.enqueueEvent(spawnA2Dude, 2);
        for(var i = 0; i < Math.round(5+(difficulty*2)); i++)
          tmpRound.enqueueEvent(spawnASpeeder, 2);
        for(var i = 0; i < Math.round(5+(difficulty*2)); i++)
          tmpRound.enqueueEvent(spawnA2Speeder, 2);
        tmpRound.enqueueEvent(wait, 500);
        this.rounds[this.rounds.length] = tmpRound;
        break;
      case "SUPERSPEEDERFUCK":
        tmpRound = new Round(this, this.rounds.length);
        for(var i = 0; i < Math.round(10+(difficulty*5)); i++)
          tmpRound.enqueueEvent(spawnASpeeder, 2);
        tmpRound.enqueueEvent(wait, 100);
        for(var i = 0; i < Math.round(20+(difficulty*5)); i++)
        {
          tmpRound.enqueueEvent(spawnA2Speeder, 2);
          tmpRound.enqueueEvent(spawnASpeeder, 2);
        }
        tmpRound.enqueueEvent(wait, 200);
        this.rounds[this.rounds.length] = tmpRound;
        break;
      case "SUPERS":
        tmpRound = new Round(this, this.rounds.length);
        for(var i = 0; i < Math.round(10+(difficulty*3)); i++)
        {
          tmpRound.enqueueEvent(spawnA2Dude, Math.ceil(10/(difficulty+1)));
          tmpRound.enqueueEvent(spawnA2Shooter, Math.ceil(10/(difficulty+1)));
        }
        tmpRound.enqueueEvent(wait, 400);
        this.rounds[this.rounds.length] = tmpRound;
        break;
      case "TANKFUCK":
        tmpRound = new Round(this, this.rounds.length);
        for(var i = 0; i < Math.round(5+(difficulty*2)); i++)
          tmpRound.enqueueEvent(spawnATank, 20);
        for(var i = 0; i < Math.round(1+difficulty); i++)
          tmpRound.enqueueEvent(spawnA2Tank, 20);
        tmpRound.enqueueEvent(wait, 500);
        this.rounds[this.rounds.length] = tmpRound;
        break;
      case "RANDOM":
        tmpRound = new Round(this, this.rounds.length);
        var lim;
        var limb;
        if(difficulty < 2)
        {
          limb = Math.round(5+(difficulty*3));
          for(var i = 0; i < limb; i++)
          {
            lim = Math.round(Math.random()*difficulty*20);
            for(var j = 0; j < lim; j++)
              tmpRound.enqueueEvent(spawnADude, 0);
            lim = Math.round(Math.random()*difficulty*30);
            for(var j = 0; j < lim; j++)
              tmpRound.enqueueEvent(spawnASpeeder, 0);
            lim = Math.round(Math.random()*difficulty*10);
            for(var j = 0; j < lim; j++)
              tmpRound.enqueueEvent(spawnAShooter, 0);
            lim = Math.round(Math.random()*difficulty*3);
            for(var j = 0; j < lim; j++)
              tmpRound.enqueueEvent(spawnATank, 0);
            tmpRound.enqueueEvent(wait, 200);
          }
        }
        else
        {
          limb = Math.round(5+(difficulty*3));
          for(var i = 0; i < limb; i++)
          {
            for(var j = 0; j < Math.round(Math.random()*difficulty*20); j++)
              tmpRound.enqueueEvent(spawnA2Dude, 0);
            for(var j = 0; j < Math.round(Math.random()*difficulty*20); j++)
              tmpRound.enqueueEvent(spawnA2Speeder, 0);
            for(var j = 0; j < Math.round(Math.random()*difficulty*10); j++)
              tmpRound.enqueueEvent(spawnA2Shooter, 0);
            for(var j = 0; j < Math.round(Math.random()*difficulty); j++)
              tmpRound.enqueueEvent(spawnA2Tank, 0);
            tmpRound.enqueueEvent(wait, 200);
          }
        }
        tmpRound.enqueueEvent(wait,500);
        this.rounds[this.rounds.length] = tmpRound;
        break;
    }
  };

  this.generateRounds = function()
  {
    this.rounds = [];
    this.enqueueRound("NULL", 0);
    this.enqueueRound("DUDES", 0);
    this.enqueueRound("DUDES_AND_SHOOTER", 0);
    this.enqueueRound("DUDES_AND_SHOOTERS", 0);
    this.enqueueRound("DUDES_AND_SUPERDUDES", 0);
    this.enqueueRound("SPEEDERFUCK", 0);
    this.currentRound = this.rounds[0];
  };

  this.reset = function()
  {
    this.generateRounds();
  };

  this.readyNextRound = function()
  {
    if(this.currentRound.roundIndex+1 < this.rounds.length)
      this.rounds[this.currentRound.roundIndex+1].getReady();
    else
    {
      var biasedRoundType = Math.floor((Math.random()*roundTypes.length)*(this.currentRound.roundIndex/10));
      while(biasedRoundType > roundTypes.length)
        biasedRoundType -= Math.round(Math.random*4);
      this.enqueueRound(roundTypes[biasedRoundType], this.currentRound.roundIndex/8);
      this.rounds[this.currentRound.roundIndex+1].getReady();
    }
  };

  this.startNextRound = function()
  {
    if(this.currentRound.roundIndex+1 < this.rounds.length)
    {
      this.currentRound = this.rounds[this.currentRound.roundIndex+1];
      this.currentRound.start();
      game.model.setRemainingRoundDelta(this.currentRound.totalRemainingDelta);
    }
  };

  this.update = function(delta)
  {
    if(this.currentRound.started)
      this.currentRound.update(delta);
  };
};

var Round = function(handler, roundIndex) 
{ 
  this.handler = handler;
  this.roundIndex = roundIndex; 
  this.started = false;
  this.finished = false;
  this.nullEvent = new Event(this, 0, function(){ }, 0);
  this.events = [this.nullEvent]; 
  this.currentEvent = this.nullEvent; 
  this.totalRemainingDelta = 1;
};
Round.prototype.calculateTotalRemainingDelta = function()
{
  this.totalRemainingDelta = 0;
  for(var i = 0; i < this.events.length; i++)
  {
    this.totalRemainingDelta += this.events[i].remainingDelta;
  }
};
Round.prototype.getReady = function() 
{
  var self = this;
  //Sketchy, but functional
  setTimeout(function(){ game.model.setWarning("ROUND "+self.roundIndex+" IN"); }, 1000);
  setTimeout(function(){ game.model.setWarning(3); }, 3000);
  setTimeout(function(){ game.model.setWarning(2); }, 4000);
  setTimeout(function(){ game.model.setWarning(1); }, 5000);
  setTimeout(function(){ self.handler.startNextRound(); }, 6000);

  this.calculateTotalRemainingDelta(); //because here seems as good a place as any...
};
Round.prototype.start = function(n)
{
  this.started = true;
  game.model.changeRoundTo(this.roundIndex);
  game.model.setWarning("START!");
  this.dequeueEvent(0);
};
Round.prototype.update = function(delta) 
{
  this.currentEvent.update(delta);
};
Round.prototype.dequeueEvent = function(remainingDelta)
{
  if(this.currentEvent.eventIndex+1 < this.events.length)
  {
    this.currentEvent = this.events[this.currentEvent.eventIndex+1];
    this.currentEvent.execute();
    this.currentEvent.update(remainingDelta);
  }
  else
  {
    if(!this.finished)
    {
      this.handler.readyNextRound();
      this.finished = true;
    }
  }
};
Round.prototype.enqueueEvent = function(func, duration)
{
  this.events[this.events.length] = new Event(this, this.events.length, func, duration)
};

var Event = function(handler, eventIndex, func, duration)
{
  this.handler = handler;
  this.eventIndex = eventIndex;
  this.duration = duration;
  this.remainingDelta = duration;
  this.execute = func;
}
Event.prototype.update = function(delta)
{
  if(this.remainingDelta - delta <= 0)
  {
    this.handler.dequeueEvent(delta - this.remainingDelta);
    this.remainingDelta = 0;
  }
  else
    this.remainingDelta -= delta;
};
