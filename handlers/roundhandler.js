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

    //POPULATING FIRST ROUND WITH BS
    var wait = function() { };
    var spawnADude = function() { var e = scene.enemyHandler.getEnemy("BASE"); scene.enemyHandler.addEnemy(e); };
    for(var i = 0; i < 16; i++)
      this.firstRound.enqueueEvent(spawnADude, 10);
    this.firstRound.enqueueEvent(wait, 800);
    for(var i = 0; i < 20; i++)
      this.secondRound.enqueueEvent(spawnADude, 10);
    this.secondRound.enqueueEvent(wait, 800);
    for(var i = 0; i < 50; i++)
      this.thirdRound.enqueueEvent(spawnADude, 0);
    this.thirdRound.enqueueEvent(wait, 600);
    for(var i = 0; i < 1000; i++)
      this.fourthRound.enqueueEvent(spawnADude, 10);
    this.fourthRound.enqueueEvent(wait, 10000);
    this.fifthRound.enqueueEvent(wait, 100000);

    this.rounds = [this.nullRound, this.firstRound, this.secondRound, this.thirdRound, this.fourthRound, this.fifthRound];
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
  setTimeout(function(){ game.model.setWarning("ROUND "+self.roundIndex+" IN..."); }, 1000);
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
