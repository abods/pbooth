// var filter = new fabric.Image.filters.RemoveColor({
//     threshold: 70,
//     color: [29,30,34],
//     removeGreen:true
//   });
//   oImg.filters.push(filter);
//
// console.log(oImg);

var photoOptions = function(canvas,container) {
    var optionsWrap = document.querySelector('#options-wrap'),
        actionBtn = document.createElement('button'),
        deleteBtn = document.createElement('button'),
        slider = document.createElement('input'),
        color = document.createElement('input'),
        colors = ["#FF6138", "#FFBE53", "#2980B9", "#282741","#54d74a","#ffffff"];

    canvas.on('object:selected', onObjectSelected);
    canvas.on('before:selection:cleared', onObjectCleard);
    canvas.on('removeColor', removeSelectedColor);

    function onObjectCleard(e) {
        hidePhotoOptions(e);
        deleteBtn.style.display = 'none';
    }
    function showDeleteObjectOption() {
      optionsWrap.style.display = deleteBtn.style.display = 'block';
    }
    function onObjectSelected(e) {
          showDeleteObjectOption();

      if(e.target.get('type') == 'image'){
        showPhotoOptions(e.target);
      }
    }

    createUi = function() {
      // actionBtn.removeEventListener('click');
      actionBtn.parentElement.removeChild(actionBtn);

        slider.type = 'range';
        slider.value = 30;
        slider.min = 0;
        slider.max = 100;
        // slider.style.display = 'none';
        slider.addEventListener('change',function(e) {

          canvas.trigger('removeColor', {
            threshold: slider.value,
            color: color.value,
            removeGreen: true
          });

        });

        color.type = 'color';
        color.id = 'remove-color-range';
        // color.style.display = 'none';
        color.addEventListener('change',function(e) {

          canvas.trigger('removeColor', {
            threshold: slider.value,
            color: color.value,
            removeGreen: true
          });

        });
        slider.style.display = 'none';
        color.style.display = 'none';
        // optionsWrap.innerHTML = "";
        optionsWrap.appendChild(slider);
        optionsWrap.appendChild(color);
    };

    function removeSelectedColor(options) {
      // TODO COVERT THE COLOR
      options.color = [85,210,85]; // for now

        var img = canvas.getActiveObject(),
            filter = new fabric.Image.filters.RemoveColor(options);

        // check the iamge doesnt have prevouse filter attached
        if (img.filters.length>0) {
            for (var i = 0; i < img.filters.length; i++) {
                if(img.filters[i].type === 'RemoveColor'){
                  img.filters[i] = filter;
                }
            }
        }else{
            img.filters.push(filter);
        }
        // console.log(img.filters);
        img.applyFilters(canvas.renderAll.bind(canvas));
    }

    function showPhotoOptions(){
      console.log('Showing Photo Options');
          actionBtn.style.display = 'block';
          slider.style.display = "block";
          color.style.display = "block";
    }

    function hidePhotoOptions(){
      actionBtn.style.display = 'none';
      slider.style.display = "none";
      color.style.display = "none";
    }

    actionBtn.id = 'remove-color-btn';
    actionBtn.className = "btn";
    actionBtn.addEventListener('click',function() {
      createUi();

    });

    // deleteBtn.innerHTML = 'Delete';
    deleteBtn.id = 'delete-btn';
    deleteBtn.className = "btn";
    deleteBtn.addEventListener('click',function() {
      var activeObject = canvas.getActiveObject(),
          activeGroup = canvas.getActiveGroup();

      if (activeObject) {
          canvas.remove(activeObject);
      }
      else if (activeGroup) {
          var objectsInGroup = activeGroup.getObjects();
          canvas.discardActiveGroup();
          objectsInGroup.forEach(function(object) {
              canvas.remove(object);
          });
      }
      console.log('Selected items deleted');

    });

    actionBtn.style.display = 'none';
    deleteBtn.style.display = 'none';
    optionsWrap.appendChild(actionBtn);
    optionsWrap.appendChild(deleteBtn);
};
