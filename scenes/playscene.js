var PlayScene = function(stage)
{
  this.arena = null;
  this.hud = null;
  this.player = null;
  this.roundHandler = null;
  this.enemyHandler = null;

  this.init = function()
  {
    this.arena = new Arena();
    this.hud = new Hud();

    this.player = new Player();

    this.roundHandler = new RoundHandler(this);
    this.enemyHandler = new EnemyHandler(this);
    
    this.arena.renderList.register(this.player, 1);
    this.arena.renderList.register(this.enemyHandler, 2);
  };

  this.willEnter = function()
  {
    if(!this.arena) this.init();
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
    this.player.update(delta);
    this.arena.update(delta);
    this.hud.update(delta);
    this.roundHandler.update(delta);
    this.enemyHandler.update(delta);
  }
}
PlayScene.prototype = Scene.prototype;
