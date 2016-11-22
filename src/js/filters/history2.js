'use strict';
var history2 = function(App, canvas, container) {
    App._history = {state: [], lock: false, mods: 0, storage:[]};

    canvas.on('history.lock', function () {
        App._history.lock = true;
    });
    canvas.on('history.unlock', function () {
        App._history.lock = false;
    });
    canvas.on('history.clear', function () {
        App._history.state = [];
        App._history.mods = 0;
    });
    canvas.on('history.save', function (preset) {
        save(preset);
    });
    canvas.on('history.load',function(n) {
      loadState(App._presets[n].state);
        App._history.mods -= 1;
    });

    canvas.on('canvas.paperSizeChangeed',function() {

    });


    // to bootstrab with black empty canvas to go back to in history
    var json = canvas.toJSON(['width','height']);
    App._history.state.push(json);


    canvas.on('history:modified', function () {
			console.log("history:modified");
        updateModifications();
    });
    canvas.on('objects:loaded', function () {
			console.log("objects:loaded");
        App._history.lock = false;
        updateModifications();
    });
    canvas.on('object:added', function () {
			console.log("object:added",history);
        updateModifications();
    });
    canvas.on('object:removed', function () {
			console.log("object:removed");
        updateModifications();
    });
    canvas.on('object:modified', function () {
			console.log("object:modified");
        updateModifications();
    });





    function updateModifications() {
        if (!App._history.lock) {
            var json = canvas.toJSON();
            if (App._history.mods > 0) {
                App._history.state = App._history.state
                .slice(0, App._history.state.length - App._history.mods);
                App._history.mods = 0;
            }
            App._history.state.push(json);
            console.log('updated history modifications ...',App._history.state);
            updateBtnsStyle();
        }
    }

    function undo() {
        if (App._history.mods < App._history.state.length - 1) {
						// console.log('UNDO:',App._history.mods,App._history.state.length,App._history.state[App._history.state.length - App._history.mods - 2]);
            loadState(App._history.state[App._history.state.length - App._history.mods - 2]);
            App._history.mods += 1;
            updateBtnsStyle();
        }
    }

    function redo() {
        if (App._history.mods > 0) {
						console.log('redo');
            loadState(App._history.state[App._history.state.length - App._history.mods]);
            App._history.mods -= 1;
            updateBtnsStyle();
        }
    }

    function loadState(state) {
      console.log('loadState: ',state);
        App._history.lock = true;
        canvas.clear().renderAll();
        canvas.loadFromJSON(state, function () {
            // canvas.setWidth
            canvas.renderAll();
            canvas.trigger('history:update');
            App._history.lock = false;
        });

    }


    function updateBtnsStyle(){

			var undoBtn = document.querySelector('#undo-btn');

        if ((App._history.mods < App._history.state.length - 1)) {
					undoBtn.disabled = false;
        } else {
					undoBtn.disabled = true;
        }
        if (App._history.state.length > 1 && App._history.mods > 0) {
					// Comented since its disable
					// redoBtn.disabled = true;
        } else {
					// Comented since its disable
					// redoBtn.disabled = false;
        }
    }
        // TODO Remove it from the event !
				// Create history buttons
				var buttons = ['undo','clear','save']; //,'redo'
						buttons.forEach(function(btn) {
							var name = btn;
							var btn = document.createElement('button');
              // console.log('SHIT');
										if (name=='undo'){
				                // btn.innerHTML = "<-";
												btn.disabled = true;
				                btn.addEventListener('click', function (e) {
									        undo();
									        e.preventDefault(e);
									        return false;
									    });
				            }
										if (name=='redo'){
				                // btn.innerHTML = "->";
				                btn.addEventListener('click', function (e) {
													redo();
													e.preventDefault(e);
													return false;
										    });
				            }
										if (name=='clear'){
				                // btn.innerHTML = "*";
                        // btn.onclick = window.location.reload;
												btn.disabled = false;
				                btn.addEventListener('click', function() {
				                		window.location.reload();
				                });
				            }
                    if (name=='save'){
				                // btn.innerHTML = "Save";
                        // btn.onclick = window.location.reload;
												btn.disabled = false;
				                btn.addEventListener('click', function() {
				                		App.savePreset();
				                });
				            }

									btn.id = name+="-btn";
				          btn.className="btn rounded";

									container.appendChild(btn);
						});

}
