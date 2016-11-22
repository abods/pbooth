'use strict';
// var App = App | {};

App._brushes.vLinePatternBrush = function() {
  console.log('Applying: vLinePatternBrush');
  var patternCanvas = fabric.document.createElement('canvas');
  patternCanvas.width = patternCanvas.height = 10;
  var ctx = patternCanvas.getContext('2d');

  ctx.strokeStyle = this.color;
  ctx.lineWidth = this.width||5;
  ctx.beginPath();
  ctx.moveTo(0, 5);
  ctx.lineTo(10, 5);
  ctx.closePath();
  ctx.stroke();

  return patternCanvas;
}
