'use strict';

var frames = [
	{
		name:'MATTEBY',
		codeName:'MATTEBY',
		sizes:[{
			name:'8R', width:2400, height:3000,
			price:'20.0'

		},{
			name:'12R', width:3600, height:4500,
			price:'70.0'
		}]
	},
	{
		displayName:'Golden',
		codeName:'GOLDEN',
		sizes:[{
			name:'4R', width:1200, height:1800,
			price:'10.0'
		},{
			name:'8R', width:2400, height:3000,
			price:'20.0'
		}]
	},
	{
		name:'White',
		codeName:'WHITE',
		sizes:[{
			name:'4R', width:1200, height:1800,
			price:'10.0'
		},{
			name:'12R', width:3600, height:4500,
			price:'70.0'
		},{
			name:'8R', width:2400, height:3000,
			price:'20.0'
		}]
	}
];

var papers = [
	{
		name:'Bank paper',
		codeName:'bank-paper',
		sizes:[{
			name:'4R', width:1200, height:1800,
			price:'2.0'
		},{
			name:'12R', width:3600, height:4500,
			price:'15.0'
		},{
			name:'8R', width:2400, height:3000,
			price:'10.0'
		}]
	},{
		name:'Canvas',
		codeName:'canvas-paper',
		sizes:[{
			name:'4R', width:1200, height:1800,
			price:'5.0'
		},{
			name:'12R', width:3600, height:4500,
			price:'20.0'
		},{
			name:'8R', width:2400, height:3000,
			price:'15.0'
		}]
	},
]

// var S12R = [3600,5400];
var App = function(canvas) {
	console.log('App started');

	if (!canvas) {
		throw('Canvas is required');
	}
	this.languages = {
		ar:{
			name: 'عربي',
			textAlign:'right',
			fontFamily:''
		},
		en:{
			name: 'English',
			textAlign:'left',
			fontFamily:''
		}
	}
	// Default settings
	this.multiplier = 5;
	this.defaultLang = 'ar';
	this.changeLang(this.defaultLang);

	this.canvasScale = 1; //global
	this.SCALE_FACTOR = 1.01;//global 18/05/2015

	this.defaultBackgroundColor = '#fff';
	this.defaultZoom = 1;
	this.defaultPaperSize = 0;
	// to remeber content choise
	this.defaultContent = 0;
	this.paperSizes = [{name:'4R', width:1200/this.multiplier, height:1800/this.multiplier},
	{name:'8R', width:2400/this.multiplier, height:3000/this.multiplier},
	{name:'12R', width:3600/this.multiplier, height:4500/this.multiplier}];

	// Initalization Code
	// set thabckground color
	canvas.setBackgroundColor(this.defaultBackgroundColor);
	canvas.setZoom(this.defaultZoom);
	// canvas.setWidth(this.paperSizes[this.defaultPaperSize][0]);
	// canvas.setHeight(this.paperSizes[this.defaultPaperSize][1]);



	this.changePaperSize = function(size) {
		canvas.setWidth(size[0]);
		canvas.setHeight(size[1]);
		canvas.trigger('canvas.paperSizeChangeed');
	}
	// this._history = new History(JSON.stringify(canvas),5);

	this.canvas = canvas;
	this.canvas.isDrawingMode = false;

	this.jsonp = function(uri){
    return new Promise(function(resolve, reject){
        var id = '_' + Math.round(10000 * Math.random())
        var callbackName = 'jsonp_callback_' + id
        window[callbackName] = function(data){
            delete window[callbackName]
            var ele = document.getElementById(id)
            ele.parentNode.removeChild(ele)
            resolve(data)
        }

        var src = uri + '&callback=' + callbackName;
        var script = document.createElement('script');
        script.src = src;
        script.id = id;
        script.addEventListener('error', reject);
        document.getElementsByTagName('head')[0].appendChild(script);
    })
};
	// canvas.setWidth( this.paperSizes[this.defaultPaperSize].width/2 || window.innerWidth);
	// canvas.setHeight( this.paperSizes[this.defaultPaperSize].height/2 || window.innerHeight);
	canvas.setWidth( window.innerWidth);
	canvas.setHeight( window.innerHeight);


	this.OnObjectAdd = function(e){
		return App._history.add(JSON.stringify(canvas),App._history._current);
	};

	this._photos = ['/src/img/ok.jpg','/src/img/good.jpg','/src/img/bad.jpg'];
	this._styles = [{
		name:'6Days',
		icon: ''
	}];


	this._brushes = {};
	this._options = {};
	this._actions = [];
	this._presets = [];
	this._filters = ['grayscale', 'invert', 'remove-white', 'sepia', 'sepia2','brightness', 'contrast', 'saturate', 'noise', 'gradient-transparency', 'pixelate','blur', 'sharpen', 'emboss', 'tint', 'multiply', 'blend'];
	this._frames = frames;
	this._papers = papers;


	this._currentView = 0;

	return this;

};

// Language switcher
App.prototype.changeLang = function(lang){
	if (document.documentElement.lang !== lang) {
		this.defaultLang = lang;
		document.documentElement.lang = lang;
	}
}

App.prototype.zoomIn = function(){
		this.canvasScale = this.canvasScale * this.SCALE_FACTOR;

    canvas.setHeight(canvas.getHeight() * this.SCALE_FACTOR);
    canvas.setWidth(canvas.getWidth() * this.SCALE_FACTOR);

    var objects = canvas.getObjects();
    for (var i in objects) {
        var scaleX = objects[i].scaleX;
        var scaleY = objects[i].scaleY;
        var left = objects[i].left;
        var top = objects[i].top;

        var tempScaleX = scaleX * this.SCALE_FACTOR;
        var tempScaleY = scaleY * this.SCALE_FACTOR;
        var tempLeft = left * this.SCALE_FACTOR;
        var tempTop = top * this.SCALE_FACTOR;

        objects[i].scaleX = tempScaleX;
        objects[i].scaleY = tempScaleY;
        objects[i].left = tempLeft;
        objects[i].top = tempTop;

        objects[i].setCoords();
    }
    canvas.renderAll();
};

App.prototype.zoomOut = function(){
	this.canvasScale = this.canvasScale / this.SCALE_FACTOR;

		canvas.setHeight(canvas.getHeight() * (1 / this.SCALE_FACTOR));
		canvas.setWidth(canvas.getWidth() * (1 / this.SCALE_FACTOR));

		var objects = canvas.getObjects();
		for (var i in objects) {
				var scaleX = objects[i].scaleX;
				var scaleY = objects[i].scaleY;
				var left = objects[i].left;
				var top = objects[i].top;

				var tempScaleX = scaleX * (1 / this.SCALE_FACTOR);
				var tempScaleY = scaleY * (1 / this.SCALE_FACTOR);
				var tempLeft = left * (1 / this.SCALE_FACTOR);
				var tempTop = top * (1 / this.SCALE_FACTOR);

				objects[i].scaleX = tempScaleX;
				objects[i].scaleY = tempScaleY;
				objects[i].left = tempLeft;
				objects[i].top = tempTop;

				objects[i].setCoords();
		}

		canvas.renderAll();
};

App.prototype.makeImg = function(canvas,callback) {
	var data = canvas.toDataURL({multiplier: this.multiplier,
		// width: App.paperSizes[App.defaultPaperSize].size[0],
		// height: App.paperSizes[App.defaultPaperSize].size[1]
	});

	var img = document.createElement('img');
	    img.src = data;
			img.onload = callback(img);
	return img;
};


App.prototype.savePreset = function(PRESET,triggerCallback) {
	var presetUserDetail;
	if (PRESET) {
		presetUserDetail = PRESET;
	}else{
		presetUserDetail = prompt("Please enter preset details:", "Body Parts, en, science");
	}
	if (presetUserDetail != null) {
			var userInput = presetUserDetail.split(',');
					var preset = {
						name  :   userInput[0].replace(/(^\s+|\s+$)/g, "") || '',
						lang  :   userInput[1] || '',
						cat   :   userInput[2] || '',
						trigger: triggerCallback,
						// paperSize: [canvas.getWidth(), canvas.getHeight()],
						state :   canvas.toJSON(['width','height'])
					};

					preset.lang = preset.lang.replace(/(^\s+|\s+$)/g, "").toLowerCase();
					preset.cat = preset.cat.replace(/(^\s+|\s+$)/g, "").toLowerCase();

					this._presets.push(preset);
					canvas.trigger('history:stored',preset);
					console.log('Presets+History updated :',this._presets);
	}
};

App.prototype.applyFilterValue = function(index, prop, value) {
  var obj = canvas.getActiveObject();
  if (obj.filters[index]) {
    obj.filters[index][prop] = value;
    obj.applyFilters(canvas.renderAll.bind(canvas));
  }
}

// Build nav
App.prototype.buildNavUi = function(ul) {
	var that = this,
			navs = ['products','content','size','frames','style'];
	console.log('Build Nav UI');
	navs.forEach(function(nav,n) {

    var btn = document.createElement('button'),
        li = document.createElement('li');
        btn.innerHTML = nav;

    btn.onclick = function() {
    	canvas.trigger('navigateTo:',n);
    }

    li.appendChild(btn);
    ul.appendChild(li);
  });
};
// Build frames
App.prototype.buildFramesUi = function(ul) {
	var that = this;
	console.log('Build Frames UI',this._frames);
	this._frames.forEach(function(frame,n) {
    var btn = document.createElement('button'),
        li = document.createElement('li');
        btn.innerHTML = frame.name;

    btn.onclick = function() {
    	canvas.trigger('navigateTo:',n);
    }

    li.appendChild(btn);
    ul.appendChild(li);
  });
};


App.prototype.buildFiltersUi = function(ul) {
	var that = this;
	console.log('Build filters UI');
	this._filters.forEach(function(filt,n) {

    var btn = document.createElement('button'),
        li = document.createElement('li');
        btn.innerHTML = filt;

    btn.onclick = function() {
    	canvas.trigger('apply:filter',n);
    };

    li.appendChild(btn);
    ul.appendChild(li);
  });


	canvas.on('object:selected', function(e) {
		// console.log(e.target.type === 'image');
		if(e.target.type === 'image'){
			ul.style.display = 'block';
		}
	});
	canvas.on('selection:cleared', function(e) {
		ul.style.display = 'none';
	});

	canvas.on('apply:filter', function(index) {
		console.log(fabric.util.getRandomInt(0,10));
		that.applyFilterValue(index, 'threshold', parseInt(0, 10));
	});


};
// this.OpenFreeDrawing = function(){};
// this.openStyles = function() {};
// this.print = function (currentView) {
// 	// print currentView
// };
//
// this.showUi = function(dom) {
// 	console.log('showing UI', dom);
//
// };
