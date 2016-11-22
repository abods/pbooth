var lockMovment = function(canvas,optionsWrap) {

    var lockBtn = document.createElement('button');
        lockBtn.className = 'btn rounded';
        lockBtn.id="lock-btn";

        lockBtn.addEventListener('click',function() {
          toggleLock()
        });

    optionsWrap.appendChild(lockBtn);

    canvas.on('object:selected',function() {
        lockBtn.style.display = 'block';
        // console.log(canvas.getActiveObject(), canvas.getActiveGroup());
        // Show hide the luck button
        if (canvas.getActiveObject()) {
          if (!canvas.getActiveObject().lockMovementX){
            if (lockBtn.classList.contains('off')) {
              lockBtn.classList.remove('off');
            }
          }else{
            if (!lockBtn.classList.contains('off')) {
              lockBtn.classList.add('off');
            }
          }
        }

    });
    canvas.on('before:selection:cleared', function() {
      lockBtn.style.display = 'none';
    });

    function toggleLock() {
      canvas.getActiveObject().lockMovementX = !canvas.getActiveObject().lockMovementX;
      canvas.getActiveObject().lockMovementY = !canvas.getActiveObject().lockMovementY;

      if (canvas.getActiveObject().lockMovementX){
        if (!lockBtn.classList.contains('off')) {
          lockBtn.classList.add('off');
        }
      }else{
        if (lockBtn.classList.contains('off')) {
          lockBtn.classList.remove('off');
        }
      }
    }

};
