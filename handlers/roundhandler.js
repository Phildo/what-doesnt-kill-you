var RoundHandler = function(scene)
{
  this.scene = scene;
  this.nullRound = new Round(this, 0);
  this.firstRound = new Round(this, 1);

  //POPULATING FIRST ROUND WITH BS
  var spawnADude = function() { var e = scene.enemyHandler.getEnemy("NEUTRAL"); e.stage = game.sceneHandler.playScene.arena.c; scene.enemyHandler.addEnemy(e); };
  for(var i = 0; i < 100; i++)
    this.firstRound.enqueueEvent(spawnADude, 10);

  this.rounds = [this.nullRound, this.firstRound];
  this.currentRound = this.nullRound;

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
  this.nullEvent = new Event(this, 0);
  this.events = [this.nullEvent]; 
  this.currentEvent = this.nullEvent; 
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
};
Round.prototype.start = function(n)
{
  this.started = true;
  game.model.changeRoundTo(this.roundIndex);
  game.model.setWarning("START!");
  this.dequeueEvent();
};
Round.prototype.update = function(delta) 
{
  this.currentEvent.update(delta);
};
Round.prototype.dequeueEvent = function()
{
  if(this.currentEvent.eventIndex+1 < this.events.length)
  {
    this.currentEvent = this.events[this.currentEvent.eventIndex+1];
    this.remainingDelta = this.currentEvent.duration;
    this.currentEvent.execute();
  }
  else
  {
    this.finished = true;
    this.handler.readyNextRound();
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
  this.execute = func;
}
Event.prototype.update = function(delta)
{
  this.duration -= delta;
  if(this.duration <= 0)
    this.handler.dequeueEvent();
};
