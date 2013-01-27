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

    var wait = function() { };
    var spawnADude = function() { var e = scene.enemyHandler.getEnemy("BASE"); e.randomizeStartPoint(); scene.enemyHandler.addEnemy(e); };
    var spawnABullet = function() { var e = scene.enemyHandler.getEnemy("BULLET"); e.randomizeStartPoint(); e.setTrajectory(); scene.enemyHandler.addEnemy(e); };
    var spawnAShooter = function() { var e = scene.enemyHandler.getEnemy("SHOOTER"); e.randomizeStartPoint(); scene.enemyHandler.addEnemy(e); };
    var spawnATank = function() { var e = scene.enemyHandler.getEnemy("TANK"); e.randomizeStartPoint(); scene.enemyHandler.addEnemy(e); };

    for(var i = 0; i < 16; i++)
      this.firstRound.enqueueEvent(spawnADude, 5);
    this.firstRound.enqueueEvent(wait, 600);

    for(var i = 0; i < 30; i++)
      this.secondRound.enqueueEvent(spawnADude, 8);
    this.secondRound.enqueueEvent(wait, 800);

    for(var i = 0; i < 6; i++)
      this.thirdRound.enqueueEvent(spawnADude, 12);
    this.thirdRound.enqueueEvent(spawnAShooter, 0);
    for(var i = 0; i < 6; i++)
      this.thirdRound.enqueueEvent(spawnADude, 12);
    this.thirdRound.enqueueEvent(wait, 800);

    for(var i = 0; i < 100; i++)
      this.fourthRound.enqueueEvent(spawnADude, 4);
    this.fourthRound.enqueueEvent(wait, 1000);

    for(var i = 0; i < 2; i++)
      this.fifthRound.enqueueEvent(spawnAShooter, 4);
    this.fifthRound.enqueueEvent(wait, 200);
    for(var i = 0; i < 2; i++)
      this.fifthRound.enqueueEvent(spawnAShooter, 4);
    this.fifthRound.enqueueEvent(wait, 200);
    for(var i = 0; i < 2; i++)
      this.fifthRound.enqueueEvent(spawnAShooter, 4);
    this.fifthRound.enqueueEvent(wait, 200);
    for(var i = 0; i < 2; i++)
      this.fifthRound.enqueueEvent(spawnAShooter, 4);
    this.fifthRound.enqueueEvent(wait, 200);
    for(var i = 0; i < 5; i++)
      this.fifthRound.enqueueEvent(spawnAShooter, 4);
    this.fifthRound.enqueueEvent(wait, 400);

    this.sixthRound.enqueueEvent(spawnATank, 0);
    this.sixthRound.enqueueEvent(wait, 500);

    for(var i = 0; i < 600; i++)
      this.seventhRound.enqueueEvent(spawnADude, 2);
    this.seventhRound.enqueueEvent(wait, 500);

    for(var i = 0; i < 10; i++)
    {
      for(var j = 0; j < 10; j++)
        this.eighthRound.enqueueEvent(spawnADude, 1);
      for(var j = 0; j < 10; j++)
        this.eighthRound.enqueueEvent(spawnAShooter, 1);
      for(var j = 0; j < 1; j++)
        this.eighthRound.enqueueEvent(spawnATank, 1);
      this.eighthRound.enqueueEvent(wait, 100);
    }

    for(var i = 0; i < 1000; i++)
      this.ninthRound.enqueueEvent(spawnABullet, 0);
    this.ninthRound.enqueueEvent(wait, 100);

    for(var i = 0; i < 30; i++)
      this.tenthRound.enqueueEvent(spawnAShooter, 20);
    this.tenthRound.enqueueEvent(wait, 500);

    this.eleventhRound.enqueueEvent(wait, 1000000000);

    this.rounds = [this.nullRound, this.firstRound, this.secondRound, this.thirdRound, this.fourthRound, this.fifthRound, this.sixthRound, this.seventhRound, this.eighthRound, this.ninthRound, this.tenthRound, this.eleventhRound];
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
