var printArtwork = function(canvas,optionsWrap) {

    var lockBtn = document.createElement('button');
        lockBtn.className = 'btn rounded';
        lockBtn.id="print-btn";

        lockBtn.addEventListener('click',function() {
          toggleLock()
        });

    optionsWrap.appendChild(lockBtn);


    function toggleLock() {
      var data = canvas.toDataURL({multiplier: 2,
      // width: App.paperSizes[App.defaultPaperSize].size[0],
      // height: App.paperSizes[App.defaultPaperSize].size[1]
    });
    var img = document.createElement('img');
        img.src = data;
    var width = App.paperSizes[App.defaultPaperSize].width/2,
        height = App.paperSizes[App.defaultPaperSize].height/2;

        window.open(data, "_blank", "width="+width+",height="+height);

      // var win = window.open(img, '_blank');
      // win.focus();
    }

};
