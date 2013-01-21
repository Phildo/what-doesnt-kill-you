var RoundHandler = function(scene)
{
  this.nullRound = new Round(0);
  this.firstRound = new Round(1);

  //POPULATING FIRST ROUND WITH BS
  for(var i = 0; i < 100; i++)
  {
    this.firstRound.events[i+1] = new Event(i+1);
    this.firstRound.events[i+1].execute = function(){  var e = game.enemyHandler.getEnemy("NEUTRAL"); e.stage = game.sceneHandler.playScene.arena; game.enemyHandler.addEnemy(e);};
    this.firstRound.events[i+1].duration = 10;
  }

  this.rounds = [this.nullRound, this.firstRound];
  this.currentRound = this.nullRound;

  this.startNextRound = function()
  {
    this.currentRound = this.rounds[this.currentRound.roundIndex+1];
    this.currentRound.startRound();
  };

  this.update = function(delta)
  {
    if(this.currentRound.started)
      this.currentRound.update(delta);
  };
};

var Round = function(roundIndex) 
{ 
  this.roundIndex = roundIndex; 
  this.started = false;
  this.nullEvent = new Event(0);
  this.events = [this.nullEvent]; 
  this.currentEvent = this.nullEvent; 

  this.remainingDelta = 0;

};
Round.prototype.startRound = function() 
{
  var this = this;

  var start = function()
  {
    var p = game.particleHandler.getParticle("WARNING");
    p.text = "ROUND "+this.roundIndex+" IN...";
    game.particleHandler.addParticle(p);
  }

  var countDown = function(n)
  {
    var p = game.particleHandler.getParticle("TEXT");
    p.text = n+"";
    game.particleHandler.addParticle(p);
  };

  var go = function(n)
  {
    var p = game.particleHandler.getParticle("TEXT");
    p.stage = game.stage;
    p.text = "START!";
    game.particleHandler.addParticle(p);
    
    game.model.currentRound = this.roundIndex;
    this.started = true;
    this.dequeueEvent();
  }

  //Sketchy, but functional
  setTimeout(function(){ start(); }, 1000);
  setTimeout(function(){ countDown(3); }, 3000);
  setTimeout(function(){ countDown(2); }, 4000);
  setTimeout(function(){ countDown(1); }, 5000);
  setTimeout(function(){ go(); }, 6000);
};
Round.prototype.update = function(delta) 
{
  this.remainingDelta -= delta;
  if(this.remainingDelta <= 0)
    this.dequeueEvent();
};
Round.prototype.dequeueEvent = function()
{
  if(this.currentEvent.eventIndex < this.events.length-1)
  {
    this.currentEvent = this.events[this.currentEvent.eventIndex+1];
    this.remainingDelta = this.currentEvent.duration;
    this.currentEvent.execute();
  }
};

var Event = function(eventIndex)
{
  this.eventIndex = eventIndex;
  this.duration = 0;
  this.execute = function(){};
}
