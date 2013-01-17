var DataHandler = function()
{
  this.player = new Player();
  this.currentRound = 0;

  //Probably should be an 'assethandler' class, 
  //but there are like 3 images... so...
  this.bombImg = new Image();
  this.healthrateImg = new Image();
  this.defenseImg = new Image();
  this.attackImg = new Image();
  this.speedImg = new Image();
};
