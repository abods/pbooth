var showPaintUi = function(canvas,paintWrap){
  // canvas.on('painting', showPaintOptions);
  // canvas.on('before:selection:cleared', hidePaintOptions);

  var paintWrap = document.querySelector('#paint-wrap'),
  brushesWrap = document.querySelector('#brushes-wrap'),
  optionsWrap = document.querySelector('#options-wrap'),
  paintBtn = document.createElement('button');

  canvas.on('object:selected',showPaintOptions);
  canvas.on('painting',function() {
    lineWidth.style.display = 'block';
    brushColor.style.display = 'block';
  });

  paintBtn.id='paint-btn';
  paintBtn.className = 'paint rounded btn';
  paintBtn.addEventListener('click',function() {
      if (!this.classList.contains('active')) {
        this.classList.add('active');
      }
      canvas.isDrawingMode = false;
      document.body.classList.remove('painting');
      hidePaintOptions();
      console.log('Paint toggled:', canvas.isDrawingMode);
  });

  // paintBtn.innerHTML = "Paint";

  // Adding paint btn
  paintWrap.appendChild(paintBtn);

  function showPaintOptions(e){
    // console.log(e.target.get('type'));
    if(e.target.get('type') == 'path'){
        lineWidth.style.display = 'block';
        brushColor.style.display = 'block';
    }
  }
  function hidePaintOptions(){
    lineWidth.style.display = 'none';
    brushColor.style.display = 'none';
  }



//
  console.log('Adding brushes UI');
  var brushesCollection = document.createElement('div'),
      brushesTrigger = document.createElement('button');
      brushesCollection.className='items'
      brushesTrigger.className = 'btn rounded';
      brushesTrigger.addEventListener('click',function() {
        brushesWrap.classList.toggle('list');
      });
      brushesTrigger.id = 'brushes-trigger';
      brushesWrap.appendChild(brushesTrigger);


  App._brushes.forEach(function(p,n) {
    var btn = document.createElement('button');
    btn.className = 'btn brush '+p;
    // btn.innerHTML = n;
    btn.addEventListener('click',function(e) {

      console.log(p);
      var brush = new fabric[p](canvas);
          brush.width = canvas.freeDrawingBrush.width;
          brush.color = canvas.freeDrawingBrush.color;
      canvas.freeDrawingBrush = brush;
      canvas.isDrawingMode = true;
      var body = document.querySelector('body');
          body.classList.remove('writing');
      if (!body.classList.contains('painting')) {
        body.classList.add('painting');
        // showPaintOptions();
      }

      brushesWrap.querySelectorAll('.btn').forEach(function(btn) {
        var btnClss = btn.classList;
        if ( btnClss.contains(p) ) {
          btnClss.add('active');
        }else{
          btnClss.remove('active');
        }
      });
      brushesWrap.classList.toggle('list');
      canvas.trigger('painting');
    });

    console.log('Brush added: ', p);
    brushesCollection.appendChild(btn);
  });
  brushesWrap.appendChild(brushesCollection);

  console.log('Adding paint options UI');
  var lineWidth = document.createElement('input'),
  brushColor = document.createElement('input'),
  colors = ["#FF6138", "#FFBE53", "#2980B9", "#ff5383","#54d74a","#ececec"];

  console.log('Setting default brush width');
  lineWidth.type = 'range';
  lineWidth.value = canvas.freeDrawingBrush.width = fabric.util.getRandomInt(10,100);
  lineWidth.id = 'stroke-width';
  lineWidth.min = 1;
  lineWidth.max = 100;
  lineWidth.addEventListener('change',function(e) {
    lineWidth.label=lineWidth.value;
    canvas.freeDrawingBrush.width = parseInt(lineWidth.value, 10);

    canvas.getActiveObject().set({strokeWidth:lineWidth.value});
    canvas.renderAll();

    console.log('Line width changed: ',lineWidth.value);
  });

  console.log('Setting default brush color');
  brushColor.type = 'color';
  brushColor.id = 'brush-color';
  brushColor.value = canvas.freeDrawingBrush.color = brushesTrigger.style.backgroundColor = colors[fabric.util.getRandomInt(0,colors.length-1)];

  brushColor.addEventListener('change',function(e) {
    brushesTrigger.style.backgroundColor = canvas.freeDrawingBrush.color = brushColor.value;
    canvas.getActiveObject().set({stroke:brushColor.value});
    canvas.renderAll();

    console.log('Color change: ',brushColor.value);
  });

  // lineWidth.style.display = 'none';
  // brushColor.style.display = 'none';

  optionsWrap.appendChild(lineWidth);
  optionsWrap.appendChild(brushColor);
}
