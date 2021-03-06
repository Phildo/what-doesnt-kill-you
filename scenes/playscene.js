var PlayScene = function(stage)
{
  this.arena = null;
  this.hud = null;
  this.player = null;
  this.roundHandler = null;
  this.enemyHandler = null;
  this.bombHandler = null;

  this.loseScreen = new LoseScreen(stage);

  this.init = function()
  {
    this.arena = new Arena();
    this.hud = new Hud();

    this.player = new Player();

    this.roundHandler = new RoundHandler(this);
    this.enemyHandler = new EnemyHandler(this);
    this.bombHandler = new BombHandler(this);
    
    this.arena.renderList.register(this.player, 1);
    this.arena.renderList.register(this.enemyHandler, 2);
    this.arena.renderList.register(this.bombHandler, 2);
  };

  this.willEnter = function()
  {
    if(!this.arena) this.init();

    game.model.reset();
    this.arena.reset();
    this.hud.reset();
    this.roundHandler.reset();
    this.enemyHandler.reset();
    this.bombHandler.reset();

    stage.blits.register(this.arena, 0);
    stage.blits.register(this.hud, 1);
    document.addEventListener('keydown', this.player.handleInputDown, false);
    document.addEventListener('keyup', this.player.handleInputUp, false);
    this.roundHandler.readyNextRound();
  }
  this.willExit = function()
  {
    stage.blits.unregister(this.arena, 0);
    stage.blits.unregister(this.hud, 1);
    document.removeEventListener('keydown', this.player.handleInputDown, false);
    document.removeEventListener('keyup', this.player.handleInputUp, false);
  }
  this.update = function(delta)
  {
    this.arena.update(delta);
    this.hud.update(delta);
    if(!game.model.gameOver)
    {
      this.player.update(delta);
      this.roundHandler.update(delta);
      this.enemyHandler.update(delta);
      this.bombHandler.update(delta);
      game.model.decrementRoundDelta(delta);
    }
    else
      this.loseScreen.resetButton.appear();
  }
}
PlayScene.prototype = Scene.prototype;

var LoseScreen = function(stage)
{
  var self = this;
  self.tips1 = [
    "The lower your health,",
    "Your only weapon is your body.",
    "Hold shift to open yourself up-",
    "When you gain a level,",
    "You can't die in round 1.",
    "Bombs kinda suck. Sorry."
  ];
  self.tips2 = [
    "the bigger your XP multiplier!",
    "(And bombs... I guess).",
    "2x self-damage and 2x XP!",
    "you get +1 random attribute.",
    "Hold shift, reap benefits.",
    "(Still fun though!)."
  ];
  this.resetButton = new ClickBox(this, (stage.c.canvas.width/2)-150, 100, 300, 50);
  this.resetButton.appeared = false;
  this.resetButton.appear = function()
  {
    if(self.resetButton.appeared) return;
    self.resetButton.appeared = true;
    stage.blits.register(self.resetButton, 4);
    game.clickBoxHandler.clickBoxes.register(self.resetButton);
    self.tip = Math.floor(Math.random()*self.tips1.length);
  }
  this.resetButton.release = function()
  {
    self.resetButton.appeared = false;
    stage.blits.unregister(self.resetButton, 4);
    game.clickBoxHandler.clickBoxes.unregister(self.resetButton);
    game.sceneHandler.showScene(game.sceneHandler.playScene); //should force a reset?
  };
  this.resetButton.draw = function()
  {
    //duhr.
  };
  this.resetButton.blitTo = function(canv)
  {
    canv.context.fillStyle = "rgba(255,255,255,0.75)";
    canv.context.fillRect(0,0,canv.canvas.width,canv.canvas.height);
    canv.context.textAlign = 'center';
    canv.context.fillStyle = "#000000";
    canv.context.font = '24px vg_font';
    canv.context.fillRect(this.stageX,this.stageY,this.width,this.height);
    canv.context.clearRect(this.stageX+10,this.stageY+10,this.width-20,this.height-20);
    canv.context.fillText("you died",this.stageX+(this.width/2),this.stageY-10);
    canv.context.fillText("restart",this.stageX+(this.width/2),this.stageY+(this.height/2)+10);
    canv.context.font = '12px vg_font';
    canv.context.fillText("Tip:",this.stageX+(this.width/2),this.stageY+this.height+25);
    canv.context.fillText(self.tips1[self.tip],this.stageX+(this.width/2),this.stageY+this.height+40);
    canv.context.fillText(self.tips2[self.tip],this.stageX+(this.width/2),this.stageY+this.height+55);
  };
};
