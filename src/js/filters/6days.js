'use strict';
var sixDays = fabric.sixDays = fabric.util.createClass(fabric.Canvas, {
  type: '6days',

  text: '',
  charWidth: 0,
  charHeight: 0,

  initialize: function (element, options) {
		console.log('Initialize (6days)',element, options);
    options = options || {};

    this.callSuper('initialize', element, options);

  },

  _render: function (ctx) {
		console.log('_render (6days)',this);
    // console.log(ctx);
  }
});
