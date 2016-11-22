var writetext = function(canvas, container){
  var btn = document.createElement('button'),
      iTextBtn = document.createElement('button'),
      textObj;
      btn.id = 't-btn';
      // btn.innerHTML = 'T';
      btn.className = 'btn rounded';
      btn.addEventListener('click',function(e) {
        canvas.trigger('writing');
        canvas.isDrawingMode = false;
        return false;
      });
      iTextBtn.id= 'iText';
      iTextBtn.className = 'btn rounded';
      iTextBtn.addEventListener('click',function(e) {
        canvas.trigger('writing','IText');
        canvas.isDrawingMode = false;
        return false;
      });
      container.appendChild(btn);
      container.appendChild(iTextBtn);

      canvas.on('writing',function(type) {
        var body = document.querySelector('body');
            body.classList.remove('painting');

        if (!body.classList.contains('writing')) {
          body.classList.add('writing')
        }

        if (type == 'IText') {
         textObj = new fabric.IText('',{
            fontFamily: 'Comic Sans',
            fontSize: 40,
            // cornerStyle:'rect',
            // backgroundColor:'#000',
            // cornerColor:'#000',
            fill: canvas.freeDrawingBrush.color || '#fff',
            padding:10,
            // selectionColor:'pink',
            // textDecoration: 'underline',
            textAlign: canvas.textAlign,
            left:canvas.width/2,
            top:canvas.height/3
          });
          canvas.add(textObj).setActiveObject(textObj);
          textObj.enterEditing();
        }else{
          textObj = new fabric.Text('Text',{
             fontFamily: 'Comic Sans',
             fontSize: 100,
             // cornerStyle:'rect',
             // backgroundColor:'#000',
             // cornerColor:'#000',
             fill: canvas.freeDrawingBrush.color || '#fff',
             padding:10,
             // selectionColor:'pink',
             // textDecoration: 'underline',
             textAlign: canvas.textAlign,
             left:canvas.width/2,
             top:canvas.height/3
           });
           canvas.add(textObj).setActiveObject(textObj);
        }


      });
}
