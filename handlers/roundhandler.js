var RoundHandler = function(scene)
{
  var self = this;

  self.nullRound = new Round(0);
  self.firstRound = new Round(1);
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
  this.currentEvent = null; 
  this.events = []; 

  this.remaining = 0;

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
    p.duration = 16;
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
    p.duration = 8;
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
    p.duration = 8;
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
};
Round.prototype.dequeueEvent = function()
{

};
