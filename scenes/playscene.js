var PlayScene = function(stage)
{
  var self = this;

  var renderList = new PrioritizedRegistrationList("RENDER", 3);
  var draw = function(member, args)
  {
    member.draw(args.canvas, args.context);
  }

  var updateList = new RegistrationList("PHYSICS");
  var update = function(member, delta)
  {
    member.update(delta);
  }

  var roundHandler = new RoundHandler(this);

  var arena = new Arena();
  var arenaFloor = new ArenaFloor();
  var hudBar = new HudBar();

  self.willEnter = function()
  {
    stage.context.clearRect(0,0,stage.canvas.width,stage.canvas.height);
    stage.context.font = '12px vg_font';
    stage.context.textAlign = 'center';
    arena.renderList.register(game.model.player, 1);
    arena.renderList.register(game.enemyHandler, 1);
    arena.renderList.register(arenaFloor, 0);
    renderList.register(arena, 0);
    renderList.register(hudBar, 1);
    renderList.register(game.particleHandler, 2);
    updateList.register(game.model.player);
    updateList.register(game.enemyHandler);
    updateList.register(game.particleHandler);
    document.addEventListener('keydown', game.model.player.globalHandleInputDown, false);
    document.addEventListener('keyup', game.model.player.globalHandleInputUp, false);
    roundHandler.startNextRound();
  }
  self.willExit = function()
  {
    arena.renderList.unregister(game.model.player, 1);
    arena.renderList.unregister(game.enemyHandler, 1);
    arena.renderList.unregister(arenaFloor, 0);
    renderList.unregister(arena, 0);
    renderList.unregister(hudBar, 1);
    renderList.unregister(game.particleHandler, 2);
    updateList.unregister(game.model.player);
    updateList.unregister(game.enemyHandler);
    updateList.unregister(game.particleHandler);
    document.removeEventListener('keydown', game.model.player.globalHandleInputDown, false);
    document.removeEventListener('keyup', game.model.player.globalHandleInputUp, false);
  }
  self.update = function(delta)
  {
    stage.context.clearRect(0,0,stage.canvas.width,stage.canvas.height);
    updateList.performOnMembers(update,delta);
    renderList.performOnMembers(draw,stage);
  }
}
PlayScene.prototype = Scene.prototype;
