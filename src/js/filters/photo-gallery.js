var photoGallery = function(canvas, container) {
    // var photos = ['/src/img/ok.jpg','/src/img/good.jpg','/src/img/bad.jpg'];
    var photos = ['http://babyblowoutblocker.com/wp-content/uploads/2013/03/SS.StandingSmiling.png'];

    App._photos = photos;

    canvas.on('photo.select', function () {
        history.lock = true;
    });

		var selectPhoto = function(url) {
			fabric.Image.fromURL(url, function (img) {
					var oImg = img.set({left: 0, top: 0, angle: 00}).scale(0.2);

					canvas.add(oImg).renderAll();
					canvas.setActiveObject(oImg);
			});
		};


		// UI photo gallery
		var photoList = document.createElement('ui');

		photos.forEach(function(photo) {
				var photoItm = document.createElement('li'),
						photoImg = document.createElement('img'),
						photoBtn = document.createElement('button');

				photoImg.src=photo;
				photoImg.onload = function() {

						photoImg.onclick = function(e){
							selectPhoto(photo);
							e.preventDefault(e);
							return false;
						};

				};

				photoBtn.appendChild(photoImg);
				photoItm.appendChild(photoBtn);
				photoList.appendChild(photoItm);
		});

		container.appendChild(photoList);



		// UI photo button
		var imgBtn = document.createElement('input');
				imgBtn.type = 'file';
				imgBtn.accept = 'image/*;capture=camera'
				imgBtn.innerHTML = "O";
				imgBtn.disabled = false;
				imgBtn.id = 'photo-btn';
				imgBtn.className = 'btn rounded';

				// imgBtn.addEventListener('change', add, false);
				imgBtn.addEventListener("change", function (e) {
          console.log(e);
					  var file = e.target.files[0];
					  var reader = new FileReader();
					  reader.onload = function (f) {
						    var data = f.target.result;
						    fabric.Image.fromURL(data, function (img) {
							      var oImg = img.set({left: 0, top: 0, angle: 00}).scale(0.3);
                    canvas.centerObject(oImg);
							      canvas.add(oImg).renderAll();
							      canvas.setActiveObject(oImg);
							      // var dataURL = canvas.toDataURL({format: 'png', quality: 1});
						    });
					  };
					  reader.readAsDataURL(file);
				});

				container.appendChild(imgBtn);

};
