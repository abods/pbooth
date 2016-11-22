var imageSearch = function(canvas,buttonLocation,container) {

    var searchBtn = document.createElement('button');
        searchBtn.className = 'btn rounded';
        searchBtn.id="search-btn";

        searchBtn.addEventListener('click',function() {
          document.querySelector('body').classList.toggle('image-search');
          if (document.querySelector('body').classList.contains('image-search')) {
            canvas.trigger('image-search');
          }
        });

    buttonLocation.appendChild(searchBtn);
    // container.insertBefore(searchBtn, container.childNodes[0]);
    var div = document.createElement('div'),
        searchInput = document.createElement('input'),
        action = document.createElement('button'),
        ul = document.createElement('ul');
        div.id="photos";
        // action.onclick = searchForImages;
        action.addEventListener('click',searchForImages)
        action.id='image-search-btn';

        container.appendChild(searchInput);
        container.appendChild(action);
        container.appendChild(div);


    canvas.on('image-search',function() {

    });


    function searchForImages() {
      // https://www.googleapis.com/customsearch/v1?key=<span class="apiparam">YOUR-KEY</span>&amp;cx=017576662512468239146:omuauf_lfve&amp;q=cars&amp;callback=hndlr
      var key = 'AIzaSyB4C3V3Cke0XMW7NbPD9UublPQ_N1mwUNM',
          cx = '018000754165837841528:slcknb4bbvm';
          // console.log(searchInput.value);
      var url = 'https://www.googleapis.com/customsearch/v1?key='+key+'&cx='+cx+'&q='+searchInput.value+'&searchType=image';
        // console.log(url);
        App.jsonp(url).then(function(data){
          console.log(data);
            if (data.items.length>0) {
                data.items.forEach(function(item) {
                    var img = document.createElement('img');

                        img.src = item.link;
                        img.width = 100;
                        img.addEventListener('click',function () {

                            fabric.loadSVGFromURL(img.src, function(objects, options) {
                                var obj = fabric.util.groupSVGElements(objects, options);
                                canvas.add(obj).renderAll();
                            });

                        });
                        // console.log(item);
                        div.appendChild(img);
                });

            }else{
              // no results
            }
        });
    }

    function toggleImageSearchView() {
      canvas.getActiveObject().lockMovementX = !canvas.getActiveObject().lockMovementX;
      canvas.getActiveObject().lockMovementY = !canvas.getActiveObject().lockMovementY;

      if (canvas.getActiveObject().lockMovementX){
        if (!searchBtn.classList.contains('off')) {
          searchBtn.classList.add('off');
        }
      }else{
        if (searchBtn.classList.contains('off')) {
          searchBtn.classList.remove('off');
        }
      }
    }

};
