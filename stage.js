var Stage = function(height, width, container)
{
  var self = this;

  //Construct the canvas
  self.canvas = document.createElement('canvas');
  self.canvas.setAttribute('width',width);
  self.canvas.setAttribute('height',height);
  self.canvas.style.border = '1px solid black';
  self.canvas.innerHTML = 'Your browser can\'t handle stuff this cool...';
  self.context = self.canvas.getContext('2d');
  self.context.font = '24px vg_font';
  self.context.textAlign = 'center';
  container.appendChild(self.canvas);
  var shadow = new Image();
  shadow.src = 'assets/images/shadow.png';
  container.appendChild(shadow);

}
