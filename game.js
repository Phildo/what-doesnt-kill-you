var Game = function()
{
  var self = this;

  self.debug = document.getElementById('debug');

  self.stage = new Stage(320,640,document.getElementById('stage_container'));
  self.clickboxHandler = new ClickBoxHandler(self.stage);
  self.sceneHandler = new SceneHandler(self.stage);
  self.model = new GameModel(self.stage);

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

  self.begin = function()
  {
    self.sceneHandler.begin();
    self.update();
  };
};
