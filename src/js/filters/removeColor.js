(function (global){

	'use strict';

	var fabric=global.fabric||(global.fabric={}),
			extend=fabric.util.object.extend;

	/**
	 * Remove Color filter class
	 * @class fabric.Image.filters.RemoveColor
	 * @memberOf fabric.Image.filters
	 * @extends fabric.Image.filters.BaseFilter
	 * @example
	 * var filter = new fabric.Image.filters.RemoveColor({
	 *   color: [235,158,84]
	 * });
	 * object.filters.push(filter);
	 * object.applyFilters(canvas.renderAll.bind(canvas));
	 */
	fabric.Image.filters.RemoveColor=fabric.util.createClass(fabric.Image.filters.BaseFilter, /** @lends fabric.Image.filters.RemoveColor.prototype */ {
		/**
		 * Filter type
		 * @param {String} type
		 * @default
		 */
		type: 'RemoveColor',
		/**
		 * Constructor
		 * @memberOf fabric.Image.filters.RemoveColor.prototype
		 * @param {Object} [options] Options object
		 * @param {Number} [options.color=[255,255,255]] Color to Remove
		 */
		initialize: function (options){
			console.log(options);
			options=options||{};
			this.color=options.color||[0, 255, 0];
			this.threshold = options.threshold || 30;
			this.removeGreen = options.removeGreen || false;
		},
		/**
		 * Applies filter to canvas element
		 * @param {Object} canvasEl Canvas element to apply filter to
		 */
		applyTo: function (canvasEl){
			var context=canvasEl.getContext('2d'),
					imageData=context.getImageData(0, 0, canvasEl.width, canvasEl.height),
					data=imageData.data,
					color=this.color,
					removeGreen=this.removeGreen,
					threshold = this.threshold,
					r, g, b,r2, g2, b2;
					// console.log(removeGreen);
					 r = color[0],
				      g = color[1],
				      b = color[2];

				  for (var i = 0; i < data.length; i += 4) {
				     r2 = data[i],
				        g2 = data[i+1],
				        b2 = data[i+2];
				        // if (r >= (r2 - threshold) && r <= (r2 + threshold) ) {
				        //   data[i+3] = 0;
				        // }
				        // if GREENISHH green=true
				        if (removeGreen && g >= (g2 - threshold) && g <= (g2 + threshold)) {
									// console.log(removeGreen);
					          // Alfa
					          data[i+3] = 0;
				        }

								if (!removeGreen && r >= (r2 - threshold) && r <= (r2 + threshold) &&  g >= (g2 - threshold) && g <= (g2 + threshold) &&  b >= (b2 - threshold) && b <= (b2 + threshold)) {
				          // Red
				          data[i]   = 0,
				          // Green
				          data[i+1] = 0,
				          // Blue
				          data[i+2] = 0,
				          // Alfa
				          data[i+3] = 0;

				        }
				        // if (b >= (b2 - threshold) && b <= (b2 + threshold) ) {
				        //   data[i+3] = 0;
				        // }
				  }
			context.putImageData(imageData, 0, 0);
		},
		/**
		 * Returns object representation of an instance
		 * @return {Object} Object representation of an instance
		 */
		toObject: function (){
			return extend(this.callSuper('toObject'), {
				color: this.color
			});
		}
	});

	/**
	 * Returns filter instance from an object representation
	 * @static
	 * @param {Object} object Object to create an instance from
	 * @return {fabric.Image.filters.RemoveColor} Instance of fabric.Image.filters.RemoveColor
	 */
	fabric.Image.filters.RemoveColor.fromObject=function (object){
		return new fabric.Image.filters.RemoveColor(object);
	};

})(typeof exports!=='undefined'?exports:this);
