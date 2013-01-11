var SceneHandler = function(stage)
{
  var self = this;

  self.nullScene = new Scene(stage);
  self.loadingScene = new LoadingScene(stage);
  self.introScene = new IntroScene(stage);
  self.optionsScene = new OptionsScene(stage);
  self.playScene = new PlayScene(stage);
  self.scenes = [self.nullScene, self.loadingScene, self.introScene, self.optionsScene, self.playScene];
  self.currentScene = self.nullScene;

  self.showScene = function(scene)
  {
    self.currentScene.willExit();
    scene.willEnter();
    self.currentScene = scene;
  };

  self.begin = function()
  {
    self.showScene(self.loadingScene);
  };
};

var Scene = function(stage) {};
Scene.prototype.willEnter = function() {};
Scene.prototype.willExit = function() {};
Scene.prototype.update = function(delta) {};
