'use strict';

var UI = function(canvas,App) {
  console.log('Print with frames');
  // Store default settings
  this.defaults = {
    backgroundColor : 'green',
    content : App._presets[0]
    // store the content to avoid adding the content twice
  };

  // Setup size
  //
  // Load default settings color/size/etc
  // this.changeSize(App.paperSizes[0]);
  // this.loadContent(this.defaults.content);
  // this.makeArtwork();
  // LOAD content
  // this.setDefaults();
  // CONVERT to artwork
  // effects
  // overlay
  // accessories
};

UI.prototype.setDefaults = function() {
  canvas.setBackgroundColor(this.defaults.backgroundColor);
  canvas.renderAll();
};

UI.prototype.changeSize = function(size) {
  if (canvas.getWidth() !== size.width || canvas.getHeight() !== size.height) {
      canvas.setWidth(size.width);
      canvas.setHeight(size.height);
      // Center preset group
      canvas._objects.forEach(function(obj) {
        obj.center();
      });
      this.loadContent(this.defaults.content);
  }
  return this;
};

UI.prototype.applyFrame = function (width) {
  App._history.lock = true;
  console.log('Applying frame');
  canvas.getObjects().forEach(function(obj) {
    console.log(obj,obj.id == 'frame');
    if (obj.id == 'frame') {
        canvas.remove(obj).renderAll();;
    }
  });
  // console.log(canvas.getTop());
  this._frame = new fabric.Rect({
    id:'frame',
      top: 0,
      left: 0,
      width: canvas.getWidth()-10,
      height: canvas.getHeight()-10,
      fill: '',
      stroke: 'yellow',
      strokeWidth: width || 10
  });
  this._frame.selectable = false;
  canvas.add(this._frame);
  canvas.setActiveObject(this._frame);
  canvas.renderAll();
  App._history.lock = false;
};

UI.prototype.loadContent = function(content) {
  App._history.lock = true;

  // Remove prevouse artwork if it was created
  canvas.getObjects().forEach(function(obj) {
    if(obj.id =='artwork'){ canvas.remove(obj); }
  });

  this.defaults.content = content;
  canvas.trigger(this.defaults.content.trigger);

  this.makeArtwork();
  App._history.lock = false;

  return this;
};

UI.prototype.makeArtwork = function() {
  App._history.lock = true;
  this.setDefaults();
  console.log('Converting canvas to artwork');
  // Remove old artwork image
  canvas.getObjects().forEach(function(obj) {
    // console.log(obj.id =='artwork');
    if(obj.id =='artwork'){
      canvas.remove(obj).renderAll();
    }
  });

  this._artwork = new fabric.Image.fromURL(canvas.toDataURL('png'),function(img) {
    img.lockMovementX = img.lockMovementY
    = img.lockRotation = img.lockUniScaling
    = img.lockScalingX = img.lockScalingY = true;
    // img.selectable = false;

    canvas.add(img).renderAll();
    // canvas.setActiveObject(img);
  },{id:'artwork'});
  App._history.lock = false;
  this.applyFrame();
  return this;
}
