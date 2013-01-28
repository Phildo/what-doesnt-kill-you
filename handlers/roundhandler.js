var RoundHandler = function(scene)
{
  this.scene = scene;

  this.generateRounds = function()
  {
    this.nullRound = new Round(this, 0);
    this.firstRound = new Round(this, 1);
    this.secondRound = new Round(this, 2);
    this.thirdRound = new Round(this, 3);
    this.fourthRound = new Round(this, 4);
    this.fifthRound = new Round(this, 5);
    this.sixthRound = new Round(this, 6);
    this.seventhRound = new Round(this, 7);
    this.eighthRound = new Round(this, 8);
    this.ninthRound = new Round(this, 9);
    this.tenthRound = new Round(this, 10);
    this.eleventhRound = new Round(this, 11);
    this.twelfthRound = new Round(this, 12);
    this.thirteenthRound = new Round(this, 13);
    this.fourteenthRound = new Round(this, 14);
    this.fifteenthRound = new Round(this, 15);
    this.sixteenthRound = new Round(this, 16);
    this.seventeenthRound = new Round(this, 17);
    this.eighteenthRound = new Round(this, 18);
    this.nineteenthRound = new Round(this, 19);

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

    for(var i = 0; i < 16; i++)
      this.firstRound.enqueueEvent(spawnADude, 5);
    this.firstRound.enqueueEvent(spawnA2Speeder, 2);
    this.firstRound.enqueueEvent(wait, 600);

    for(var i = 0; i < 25; i++)
      this.secondRound.enqueueEvent(spawnADude, 8);
    this.secondRound.enqueueEvent(wait, 800);

    for(var i = 0; i < 5; i++)
      this.thirdRound.enqueueEvent(spawnADude, 12);
    this.thirdRound.enqueueEvent(spawnAShooter, 0);
    for(var i = 0; i < 15; i++)
      this.thirdRound.enqueueEvent(spawnADude, 12);
    this.thirdRound.enqueueEvent(wait, 600);

    for(var i = 0; i < 6; i++)
      this.fourthRound.enqueueEvent(spawnADude, 12);
    this.fourthRound.enqueueEvent(spawnAShooter, 0);
    for(var i = 0; i < 6; i++)
      this.fourthRound.enqueueEvent(spawnADude, 12);
    this.fourthRound.enqueueEvent(spawnAShooter, 0);
    for(var i = 0; i < 6; i++)
      this.fourthRound.enqueueEvent(spawnADude, 12);
    this.fourthRound.enqueueEvent(spawnAShooter, 0);
    this.fourthRound.enqueueEvent(wait, 650);

    for(var i = 0; i < 2; i++)
      this.fifthRound.enqueueEvent(spawnADude, 8);
    this.fifthRound.enqueueEvent(spawnA2Dude, 8);
    for(var i = 0; i < 2; i++)
      this.fifthRound.enqueueEvent(spawnADude, 8);
    this.fifthRound.enqueueEvent(spawnA2Dude, 8);
    for(var i = 0; i < 2; i++)
      this.fifthRound.enqueueEvent(spawnADude, 8);
    this.fifthRound.enqueueEvent(spawnA2Dude, 8);
    for(var i = 0; i < 2; i++)
      this.fifthRound.enqueueEvent(spawnADude, 8);
    this.fifthRound.enqueueEvent(spawnA2Dude, 8);
    for(var i = 0; i < 2; i++)
      this.fifthRound.enqueueEvent(spawnADude, 8);
    this.fifthRound.enqueueEvent(spawnA2Dude, 8);
    for(var i = 0; i < 2; i++)
      this.fifthRound.enqueueEvent(spawnADude, 8);
    this.fifthRound.enqueueEvent(spawnA2Dude, 8);
    for(var i = 0; i < 2; i++)
      this.fifthRound.enqueueEvent(spawnADude, 8);
    this.fifthRound.enqueueEvent(spawnA2Dude, 8);
    this.fifthRound.enqueueEvent(wait, 550);

    for(var i = 0; i < 30; i++)
      this.sixthRound.enqueueEvent(spawnASpeeder, 3);
    this.sixthRound.enqueueEvent(wait, 300);

    for(var i = 0; i < 5; i++)
      this.seventhRound.enqueueEvent(spawnADude, 0);
    this.seventhRound.enqueueEvent(wait, 15);
    for(var i = 0; i < 5; i++)
      this.seventhRound.enqueueEvent(spawnA2Dude, 0);
    this.seventhRound.enqueueEvent(wait, 15);
    for(var i = 0; i < 5; i++)
      this.seventhRound.enqueueEvent(spawnASpeeder, 0);
    this.seventhRound.enqueueEvent(wait, 15);
    for(var i = 0; i < 5; i++)
      this.seventhRound.enqueueEvent(spawnAShooter, 0);
    this.seventhRound.enqueueEvent(wait, 15);
    for(var i = 0; i < 5; i++)
      this.seventhRound.enqueueEvent(spawnADude, 0);
    this.seventhRound.enqueueEvent(wait, 700);

    for(var i = 0; i < 5; i++)
      this.eighthRound.enqueueEvent(spawnAShooter, 5);
      this.eighthRound.enqueueEvent(spawnA2Shooter, 5);
    this.eighthRound.enqueueEvent(wait, 20);
    for(var i = 0; i < 5; i++)
      this.eighthRound.enqueueEvent(spawnAShooter, 5);
      this.eighthRound.enqueueEvent(spawnA2Shooter, 5);
    this.eighthRound.enqueueEvent(wait, 800);

    for(var i = 0; i < 5; i++)
      this.ninthRound.enqueueEvent(spawnADude, 2);
    for(var i = 0; i < 5; i++)
      this.ninthRound.enqueueEvent(spawnA2Dude, 2);
    for(var i = 0; i < 5; i++)
      this.ninthRound.enqueueEvent(spawnASpeeder, 2);
    for(var i = 0; i < 5; i++)
      this.ninthRound.enqueueEvent(spawnA2Speeder, 2);
    this.ninthRound.enqueueEvent(spawnATank, 2);
    for(var i = 0; i < 5; i++)
      this.ninthRound.enqueueEvent(spawnADude, 2);
    for(var i = 0; i < 5; i++)
      this.ninthRound.enqueueEvent(spawnA2Dude, 2);
    for(var i = 0; i < 5; i++)
      this.ninthRound.enqueueEvent(spawnASpeeder, 2);
    for(var i = 0; i < 5; i++)
      this.ninthRound.enqueueEvent(spawnA2Speeder, 2);
    this.ninthRound.enqueueEvent(wait, 500);

    for(var i = 0; i < 50; i++)
      this.tenthRound.enqueueEvent(spawnASpeeder, 2);
    this.tenthRound.enqueueEvent(wait, 100);
    for(var i = 0; i < 20; i++)
      this.tenthRound.enqueueEvent(spawnA2Speeder, 2);
    this.tenthRound.enqueueEvent(wait, 200);

    for(var i = 0; i < 10; i++)
    {
      this.eleventhRound.enqueueEvent(spawnA2Dude, 10);
      this.eleventhRound.enqueueEvent(spawnA2Shooter, 10);
    }
    this.eleventhRound.enqueueEvent(wait, 400);

    for(var i = 0; i < 5; i++)
      this.twelfthRound.enqueueEvent(spawnATank, 40);
    this.twelfthRound.enqueueEvent(spawnA2Tank, 20);
    this.twelfthRound.enqueueEvent(wait, 500);
  
    this.rounds = [this.nullRound, this.firstRound, this.secondRound, this.thirdRound, this.fourthRound, this.fifthRound, this.sixthRound, this.seventhRound, this.eighthRound, this.ninthRound, this.tenthRound, this.eleventhRound, this.twelfthRound];
    this.currentRound = this.nullRound;
  };

  this.reset = function()
  {
    this.generateRounds();
    this.currentRound = this.nullRound;
  };

  this.readyNextRound = function()
  {
    if(this.currentRound.roundIndex+1 < this.rounds.length)
      this.rounds[this.currentRound.roundIndex+1].getReady();
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
    this.totalRemainingDelta += this.events[i].remainingDelta;
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
