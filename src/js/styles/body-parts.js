'use strict';
var bodyPartsV1 = function(canvas, container) {
  console.log('bodyPartsV1 installed');
  // Register Preset
  App.savePreset('Body parts, en, fun','bodyPartsV1');
  // console.log(App.languages[App.defaultLang].textAlign);
    var bodyParts = ['Head','Neck','Leg','Hear','Face','Foot','Hand'],
        textAlign = App.languages[App.defaultLang].textAlign,
        title = ['Body Parts', 'اعضاء الجسم'];

    canvas.on('bodyPartsV1', function () {
      console.log('bodyPartsV1 triggered');
        bodyPartsV1();
    });


    var bodyPartsV1 = function() {
      canvas.clear().renderAll();
      var items = [];
      // Loop thru the parts
      for (var i = 0; i < bodyParts.length; i++) {
        var part = new fabric.IText(bodyParts[i],{
          id:'preset',
          fontFamily: 'Comic Sans',
          fontSize: 40,
          cornerStyle:'rect',
          cornerColor:'#000',
          padding:'10',
          textDecoration: 'underline',
          textAlign: textAlign,
          left:canvas.getWidth()/2 + i*20,
          top:canvas.getHeight()/3 + i*20
        });
        items.push(part);
      }
      var group = new fabric.Group(items, { left: 10, top: 10 });
      canvas.add(group);
      canvas.renderAll();
      console.log('Preset group added: ', group);
    };


  };
