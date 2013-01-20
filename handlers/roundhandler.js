var RoundHandler = function(scene)
{
  var self = this;

  self.nullRound = new Round(0);
  self.firstRound = new Round(1);
  for(var i = 0; i < 100; i++)
  {
    self.firstRound.events[i+1] = new Event(i+1);
    self.firstRound.events[i+1].execute = function(){  var e = game.enemyHandler.getEnemy("NEUTRAL"); e.stage = game.sceneHandler.playScene.arena; game.enemyHandler.addEnemy(e);};
    self.firstRound.events[i+1].duration = 10;
  }
  self.rounds = [self.nullRound, self.firstRound];
  self.currentRound = self.nullRound;

  self.startNextRound = function()
  {
    self.currentRound = self.rounds[self.currentRound.roundIndex+1];
    self.currentRound.startRound();
  };

  self.update = function(delta)
  {
    if(self.currentRound.started)
      self.currentRound.update(delta);
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
  var self = this;

  var start = function()
  {
    var p = game.particleHandler.getParticle("TEXT");
    p.stage = game.stage;
    p.text = "ROUND "+self.roundIndex+" IN...";
    p.rgb = "255,0,0";
    p.size = 24;
    p.startX = game.stage.canvas.width/2+30;
    p.startY = game.stage.canvas.height/2;
    p.deltaX = 0;
    p.deltaY = 0;
    p.duration = 10;
    p.progress = 0;
    game.particleHandler.addParticle(p);
  }

  var countDown = function(n)
  {
    var p = game.particleHandler.getParticle("TEXT");
    p.stage = game.stage;
    p.text = n+"";
    p.rgb = "255,0,0";
    p.size = 24+((3-n)*3);
    p.startX = game.stage.canvas.width/2;
    p.startY = game.stage.canvas.height/2;
    p.deltaX = 0;
    p.deltaY = 0;
    p.duration = 5;
    p.progress = 0;
    game.particleHandler.addParticle(p);
  };

  var go = function(n)
  {
    var p = game.particleHandler.getParticle("TEXT");
    p.stage = game.stage;
    p.text = "START!";
    p.rgb = "255,0,0";
    p.size = 48;
    p.startX = game.stage.canvas.width/2;
    p.startY = game.stage.canvas.height/2;
    p.deltaX = 0;
    p.deltaY = 0;
    p.duration = 5;
    p.progress = 0;
    game.particleHandler.addParticle(p);
    
    game.model.currentRound = self.roundIndex;
    self.started = true;
    self.dequeueEvent();
  }

  setTimeout(function(){ start(); }, 1000);
  setTimeout(function(){ countDown(3); }, 3000);
  setTimeout(function(){ countDown(2); }, 4000);
  setTimeout(function(){ countDown(1); }, 5000);
  setTimeout(function(){ go(); }, 6000);
};
Round.prototype.update = function(delta) 
{
  this.remainingDelta -= delta;
  game.debug.innerHTML = this.remainingDelta;
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
