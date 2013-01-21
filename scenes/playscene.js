var PlayScene = function(stage)
{
  this.roundHandler = new RoundHandler(this);

  this.arena = null;
  this.hud = null;

  this.willEnter = function()
  {
    if(!this.arena) this.arena = new Arena();
    if(!this.hud) this.hud = new Hud();
    stage.blits.register(this.arena, 0);
    stage.blits.register(this.hud, 1);
    document.addEventListener('keydown', this.arena.player.handleInputDown, false);
    document.addEventListener('keyup', this.arena.player.handleInputUp, false);
    this.roundHandler.startNextRound();
  }
  this.willExit = function()
  {
    stage.blits.unregister(this.arena, 0);
    stage.blits.unregister(this.hud, 1);
    document.removeEventListener('keydown', this.arena.player.handleInputDown, false);
    document.removeEventListener('keyup', this.arena.player.handleInputUp, false);
  }
  this.update = function(delta)
  {
    this.arena.update(delta);
    this.hud.update(delta);
    this.roundHandler.update(delta);
  }
}
PlayScene.prototype = Scene.prototype;
