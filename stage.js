var Stage = function(height, width, container)
{
  //Init html element
  this.canvas = document.createElement('canvas');
  this.canvas.setAttribute('width',width);
  this.canvas.setAttribute('height',height);
  this.canvas.style.border = '1px solid black';
  this.canvas.innerHTML = 'Your browser can\'t handle stuff this cool...';

  this.context = this.canvas.getContext('2d');
  
  container.appendChild(this.canvas);

  //for funzies
  var shadow = new Image();
  shadow.src = 'assets/images/shadow.png';
  container.appendChild(shadow);
}
