var PlayScene = function(canv)
{
  var self = this;

  var renderList = new PrioritizedRegistrationList("RENDER", 3);
  var updateList = new RegistrationList("PHYSICS");

  var roundHandler = new RoundHandler(this);

  this.arena = null;
  this.hud = null;

  self.willEnter = function()
  {
    if(!this.arena) this.arena = new Arena();
    if(!this.hud) this.hud = new Hud();
    canv.context.clearRect(0,0,canv.canvas.width,canv.canvas.height);
    arena.content.renderList.register(this.player, 1);
    arena.content.renderList.register(this.enemyHandler, 1);
    renderList.register(arena, 0);
    renderList.register(this.hud, 1);
    renderList.register(game.particleHandler, 2);
    updateList.register(game.model.player);
    updateList.register(game.enemyHandler);
    updateList.register(game.particleHandler);
    updateList.register(roundHandler);
    document.addEventListener('keydown', player.handleInputDown, false);
    document.addEventListener('keyup', player.handleInputUp, false);
    roundHandler.startNextRound();
  }
  self.willExit = function()
  {
    arena.content.renderList.unregister(this.player, 1);
    arena.content.renderList.unregister(this.enemyHandler, 1);
    renderList.unregister(arena, 0);
    renderList.unregister(this.hud, 1);
    renderList.unregister(game.particleHandler, 2);
    updateList.unregister(game.model.player);
    updateList.unregister(game.enemyHandler);
    updateList.unregister(game.particleHandler);
    updateList.unregister(roundHandler);
    document.removeEventListener('keydown', player.handleInputDown, false);
    document.removeEventListener('keyup', player.handleInputUp, false);
  }
  self.update = function(delta)
  {
    canv.context.clearRect(0,0,canv.canvas.width,canv.canvas.height);
    updateList.performOnMembers("update",delta);
    renderList.performOnMembers("draw",canv);
  }
}
PlayScene.prototype = Scene.prototype;
