'use strict';
var freeDrawing = fabric.freeDrawing = fabric.util.createClass(fabric.Image, {
  type: 'freeDrawing',

  text: '',
  charWidth: 0,
  charHeight: 0,

  initialize: function (element, options) {
		console.log('Initialize (freeDrawing)',element, options);
    options = options || {};
		element.isDrawingMode = false;

    this.callSuper('initialize', element, options);

    this.toggle = function() {
      element.isDrawingMode = !element.isDrawingMode;
      console.log('Paint toggled:', element.isDrawingMode);
    };


    this.changeBrush = function(b) {
      var brush = new fabric[b](canvas);
          brush.width = element.freeDrawingBrush.width;
          brush.color = element.freeDrawingBrush.color;

      element.freeDrawingBrush =  brush;
      console.log('Brush changed:', b);
    }

    // Add defaultBrush to brushes list
    // var defaultBrush = new fabric.PatternBrush(canvas);
    // App._brushes.defaultBrush = defaultBrush.getPatternSrc;

  },

  _render: function (ctx) {
		console.log('_render (freeDrawing)',this);
    // console.log(ctx);
  }
});
