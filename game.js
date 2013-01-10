var Game = function()
{
  var self = this;

  this.stage = new Stage(320,640,document.getElementById('stage_container'));
  this.sceneHandler = new SceneHandler();
  this.model = new GameModel();

  var timestamps = {};
  timestamps[true] = Date.now();
  timestamps[false] = Date.now();
  var tick_tock = true;
  var delta = 0;

  self.update = function()
  {
    timestamps[tick_tock] = Date.now();
    delta = timestamps[tick_tock] - timestamps[!tick_tock];
    tick_tock = !tick_tock;

    self.sceneHandler.currentScene.update(delta);
    requestAnimFrame(self.update,self.stage.canvas);
  };

  self.start = function()
  {
    self.sceneHandler.showScene(self.sceneHandler.loadingScene);
    self.update();
  }
};
