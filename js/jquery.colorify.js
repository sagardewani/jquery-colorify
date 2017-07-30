<<<<<<< HEAD
/* ========================================================================
 * COLORIFY: jQuery.colorify.js v1.0.0
 * ========================================================================
 * Copyright 2017 Hetrotech Private Limited.
 * Licensed under MIT
 * ======================================================================== */


 
;(function($,window){
	'use strict';

var Colorify = function(options) {
	createControlElements();
	this.keys = $.extend({},$.fn.colorify.defaults,options);
	this.previous;
	var $that = this;
	this.$selected = {
		element: 'undefined',
		fontScale: 'px',
		tagName: 'undefined',
		fontWeight: 'normal',
		fontSize: 'inherit',
		font: {
			'37': function() {
				var spacing = parseInt($that.$selected.element.css('letter-spacing'));
				if (spacing > 0)
					$that.$selected.element.css('letter-spacing', spacing - 1 + $that.$selected.fontScale);
				else return alert("Min range 0 reached");
			},
			'39': function() {
				var spacing = parseInt($that.$selected.element.css('letter-spacing'));
				if (spacing < 100)
					$that.$selected.element.css('letter-spacing', spacing + 1 + $that.$selected.fontScale);
				else return alert("Max range 100 reached");
			},
			'38': function() {
				$that.$selected.fontSize = parseInt($that.$selected.element.css('font-size'));
				$that.$selected.element.css('font-size', $that.$selected.fontSize + 1 + $that.$selected.fontScale);
			},
			'40': function() {
				$that.$selected.fontSize = parseInt($that.$selected.element.css('font-size'));
				$that.$selected.element.css('font-size', $that.$selected.fontSize - 1 + $that.$selected.fontScale);
			}
		},
		bold: function() {
			$that.$selected.fontWeight = $that.$selected.element.css('font-weight');
			($that.$selected.fontWeight == 'bold') ? $that.$selected.element.css('font-weight', 'normal'): $that.$selected.element.css('font-weight', 'bold');
		}
	};
	$(window).on('click',$.proxy(this.onColorSelect,this)).off('keydown',$.fn.settings.onKeyDown).on('keydown',$.proxy($.fn.settings.onKeyDown,this)).on('keydown',$.proxy($.fn.settings.onColorKeyDown,this));
	$('.color>div').on('click',$.proxy(this.pickColor,this));
	$("#set-color").on('input',$.proxy(this.setColor,this));
}

Colorify.VERSION = "1.0.0";
Colorify.pluginName = "Colorify";
Colorify.AUTHOR = "Sagar Dewani";
Colorify.WEBSITE = "http://www.hetrotech.in/";

function reg_colorify(options) {
    new Colorify(options);
}
//defining jQuery namespace colorify
$.fn.colorify = function(options) {
    return reg_colorify(options);
};

window.$.colorify = $.fn.colorify;

var settings = {
	disableSelect: [$("body"), $("#wrapper"), $("html"), $("option")],
	defSetting :{
		colorify: 0,
		bgcolor:0,
		fgcolor:0,
		font:0
	},
	modalCreated:0,
	hexDigits : new Array("0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "a", "b", "c", "d", "e", "f"),
	onKeyDown: function(e){
		var $that = this;
		if ($that.$selected.element !== 'undefined')
		{
			if (e.shiftKey && e.ctrlKey && e.altKey){
				for (var key in $.fn.settings.defSetting) {
					if ($.fn.settings.defSetting.hasOwnProperty(key))
						$.fn.settings.defSetting[key] = 0;
				}
			}
			if (e.ctrlKey && e.which == $that.keys.modeKey) {
				var mode = "normal";
				for (var key in $.fn.settings.defSetting) {
					if ($.fn.settings.defSetting.hasOwnProperty(key))
						if ($.fn.settings.defSetting[key] == 1) 
						mode = key;
				}
				alert("Activated Mode: " + mode);
			}
			if (e.which == $that.keys.sourceKey) {
				$(".modal-body>pre").empty();
				if($.fn.settings.defSetting.transition){
					var sheet;
					var styleSheets = $("style#d-set-stylesheet")[0].sheet ? $("style#d-set-stylesheet")[0].sheet : $("style#d-set-stylesheet")[0].styleSheet;
					var styleSheetRules = styleSheets.rules ? styleSheets.rules : styleSheets.cssRules;
					var len = styleSheetRules.length ? styleSheetRules.length : styleSheetRules.length;
					var targetClass = $that.$selected.element.attr('class').split(' ');
					var i;
					var selectorText;
					for(i=0;i<len;i++)
					{
						selectorText = styleSheetRules[i].selectorText.replace('.','');
						if(targetClass.indexOf(selectorText) > -1)
							$(".modal-body>pre").append("<code class=d-set style='background-color:#7fdfde;'>"+styleSheetRules[i].cssText+"</code><br/>");
						else
						$(".modal-body>pre").append("<code class=d-set>"+styleSheetRules[i].cssText+"</code><br/>");
					}
				}
				else if($.fn.settings.defSetting.colorify){
						$(".modal-body>pre").append("<code class=d-set>"+$that.$selected.element.attr('style')+"</code><br/>");
				}
				$("#source-container").modal('show');
			}
			//old.apply(this,arguments);
		}
	},
	onColorKeyDown: function(e){
		var $that = this;
		if ($that.$selected.element !== 'undefined')
		{
			if (e.shiftKey && e.which == $that.keys.colorifyKey)
			{
				for (var key in $.fn.settings.defSetting) {
					if ($.fn.settings.defSetting.hasOwnProperty(key))
						if ($.fn.settings.defSetting.colorify) continue; //this line is just a mistake. However, it works as intended because logic behinde it is correct :p
							$.fn.settings.defSetting[key] = 0;
				}
				$.fn.settings.defSetting.colorify = ($.fn.settings.defSetting.colorify == 0) ? 1 : 0;
			}
			if($.fn.settings.defSetting.colorify)
			{
				//shift+b
				if (e.shiftKey && e.which == '66') {
					$.fn.settings.defSetting.fgcolor = 0;
					$.fn.settings.defSetting.font = 0;
					$.fn.settings.defSetting.bgcolor = ($.fn.settings.defSetting.bgcolor == 0) ? 1 : 0;
				}
				//shift+f
				if (e.shiftKey && e.which == '70') {
					$.fn.settings.defSetting.bgcolor = 0;
					$.fn.settings.defSetting.font = 0;
					$.fn.settings.defSetting.fgcolor = ($.fn.settings.defSetting.fgcolor == 0) ? 1 : 0;
				}
				//shift+t
				if (e.shiftKey && e.which == '84') {			
					$.fn.settings.defSetting.bgcolor = 0;
					$.fn.settings.defSetting.fgcolor = 0;
					$.fn.settings.defSetting.font = ($.fn.settings.defSetting.font == 0) ? 1 : 0;
				}
				//ctrl+b
				if (e.ctrlKey && e.which == '66'){
					if($.fn.settings.defSetting.font)
					{
						$that.$selected.bold();
					}
					else
					{
						alert("Please Turn ON the font mode, using shift+t\nTo apply text formatting effects.")
					}
				}
				if (e.which == '39' || e.which == '37' || e.which == '38' || e.which == '40')
				{
					if($.fn.settings.defSetting.font)
					{
						$that.$selected.font[e.which]();
					}
				}		
			}	
			//old.apply(this,arguments);
		}
	}
}

$.fn.colorify.defaults = {
	colorifyKey:'67',//shift+c
	sourceKey:'13',
	modeKey:'77'
};

$.fn.settings = $.extend(true,{}, $.fn.settings|| {},settings);

Colorify.prototype.onColorSelect = function(e){	
	var $that = this;
	var disable = $.fn.settings.disableSelect;
	var len = disable.length,i;
	for(i=0;i<len;i++)
	{
		if($(e.target).is(disable[i]))return;
	}		
	if($(e.target).is('[class*="d-set"]')) return;
	$that.$selected.element = $(e.target);
	$that.$selected.fontSize = $that.$selected.element != 'undefined' ? (($that.$selected.element.css('font-size') == 'inherit') ? 'inherit' : $that.$selected.element.css('font-size')) : 'initial';
	$that.$selected.fontWeight = $that.$selected.element != 'undefined' ? (($that.$selected.element.css('font-weight') == 'bold') ? 'bold' : 'normal') : 'normal';
	$that.$selected.tagName = $that.$selected.element != 'undefined' ? $that.$selected.element[0].tagName.toLowerCase() : 'undefined';

    //if item is selected and stored in object then
    //check if previous element is set then check if previous element has border-blue class
    //then remove border blue class from previous element.

    if ($that.$selected.element) {
        if ($that.previous && $that.previous.hasClass('border-blue')) {
            $that.previous.removeClass('border-blue');
        }
		$that.previous = $that.$selected.element;
        $that.previous.addClass('border-blue');
	}
}

Colorify.prototype.pickColor = function(e) {
	var $that = this;
    if ($.fn.settings.defSetting.bgcolor) {
        var value = rgb2hex($(e.target).css('background-color'));
        $("#set-color").val(value);
        $that.previous.css('background-color', value);
    } else if ($.fn.settings.defSetting.fgcolor) {
        var value = rgb2hex($(e.target).css('background-color'));
        $("#set-color").val(value);
        $that.previous.css('color', value);
    } else {
        alert("Please press shift + b\nTo Set background color\nPress shift + f\nTo Set Foreground Color");
    }
}
Colorify.prototype.setColor = function(e){
	var $that = this;
	var input = $("#set-color");
    if ($that.$selected.element !== 'undefined' && $.fn.settings.defSetting.bgcolor == 1) $that.previous.css('background-color', input.val());
    else if ($that.$selected.element !== 'undefined' && $.fn.settings.defSetting.fgcolor == 1) $that.previous.css('color', input.val());
    else alert("No element selected\n please select the element first\n or if you have selected the item\nThen select foreground or background mode\nPress shift+b : background mode\nPress shift+f : foreground mode");	
}

//Change the color from RGB to HEX format
//adopted from internet sources like stackoverflow.com
//thanks for this contributions of them.	
function rgb2hex(rgb) {
    rgb = rgb.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/);
    return "#" + hex(rgb[1]) + hex(rgb[2]) + hex(rgb[3]);
}
function hex(x) {
	var hexDigits = $.fn.settings.hexDigits;
    return isNaN(x) ? "00" : hexDigits[(x - x % 16) / 16] + hexDigits[x % 16];
}

function createControlElements()
{
	var html = '<div class="d-set color-container" id="color">\
			<div class="d-set color"><div class="d-set pointer color-1"></div></div>\
			<div class="d-set color"><div class="d-set pointer color-2"></div></div>\
			<div class="d-set color"><div class="d-set pointer color-3"></div></div>\
			<div class="d-set color"><div class="d-set pointer color-4"></div></div>\
			<div class="d-set color"><div class="d-set pointer color-5"></div></div>\
			<div class="d-set color"><div class="d-set pointer color-6"></div></div>\
			<div class="d-set color"><div class="d-set pointer color-7"></div></div>\
			<div class="d-set color"><div class="d-set pointer color-8"></div></div>\
			<div class="d-set color"><div class="d-set pointer color-9"></div></div>\
			<div class="d-set color"><div class="d-set pointer color-10"></div></div>\
			<div class="d-set color"><input title="enter custom color" type="text" placeholder="#fe211c"class="d-set set-color form-control" id="set-color"/></div>\
		</div>';
	$('body').prepend(html);
	if($.fn.settings.modalCreated == 0)
	createSourceModal();
}

function createSourceModal()
{
	var modal = '<div id="source-container" class="modal fade d-set" role="dialog">\
		  <div class="modal-dialog d-set">\
			<div class="modal-content d-set">\
			  <div class="modal-header d-set">\
				<button type="button" class="close d-set" data-dismiss="modal">&times;</button>\
				<h4 class="modal-title d-set">CSS Styles</h4>\
			  </div>\
			  <div class="modal-body d-set">\
				<pre class="d-set"></pre>\
			  </div>\
			  <div class="modal-footer d-set">\
				<button type="button" class="btn btn-default d-set" data-dismiss="modal">Close</button>\
			  </div>\
			</div>\
		</div>\
		</div>';
		$('body').append(modal);
	 $.fn.settings.modalCreated = 1;
}

=======
/* ========================================================================
 * COLORIFY: jQuery.colorify.js v1.0.0
 * ========================================================================
 * Copyright 2017 Hetrotech Private Limited.
 * Licensed under MIT
 * ======================================================================== */


 
;(function($,window){
	'use strict';

var Colorify = function(options) {
	createControlElements();
	this.keys = $.extend({},$.fn.colorify.defaults,options);
	this.previous;
	var $that = this;
	this.$selected = {
		element: 'undefined',
		fontScale: 'px',
		tagName: 'undefined',
		fontWeight: 'normal',
		fontSize: 'inherit',
		font: {
			'37': function() {
				var spacing = parseInt($that.$selected.element.css('letter-spacing'));
				if (spacing > 0)
					$that.$selected.element.css('letter-spacing', spacing - 1 + $that.$selected.fontScale);
				else return alert("Min range 0 reached");
			},
			'39': function() {
				var spacing = parseInt($that.$selected.element.css('letter-spacing'));
				if (spacing < 100)
					$that.$selected.element.css('letter-spacing', spacing + 1 + $that.$selected.fontScale);
				else return alert("Max range 100 reached");
			},
			'38': function() {
				$that.$selected.fontSize = parseInt($that.$selected.element.css('font-size'));
				$that.$selected.element.css('font-size', $that.$selected.fontSize + 1 + $that.$selected.fontScale);
			},
			'40': function() {
				$that.$selected.fontSize = parseInt($that.$selected.element.css('font-size'));
				$that.$selected.element.css('font-size', $that.$selected.fontSize - 1 + $that.$selected.fontScale);
			}
		},
		bold: function() {
			$that.$selected.fontWeight = $that.$selected.element.css('font-weight');
			($that.$selected.fontWeight == 'bold') ? $that.$selected.element.css('font-weight', 'normal'): $that.$selected.element.css('font-weight', 'bold');
		}
	};
	$(window).on('click',$.proxy(this.onColorSelect,this)).off('keydown',$.fn.settings.onKeyDown).on('keydown',$.proxy($.fn.settings.onKeyDown,this)).on('keydown',$.proxy($.fn.settings.onColorKeyDown,this));
	$('.color>div').on('click',$.proxy(this.pickColor,this));
	$("#set-color").on('input',$.proxy(this.setColor,this));
}

Colorify.VERSION = "1.0.0";
Colorify.pluginName = "Colorify";
Colorify.AUTHOR = "Sagar Dewani";
Colorify.WEBSITE = "http://www.hetrotech.in/";

function reg_colorify(options) {
    new Colorify(options);
}
//defining jQuery namespace colorify
$.fn.colorify = function(options) {
    return reg_colorify(options);
};

window.$.colorify = $.fn.colorify;

var settings = {
	disableSelect: [$("body"), $("#wrapper"), $("html"), $("option")],
	defSetting :{
		colorify: 0,
		bgcolor:0,
		fgcolor:0,
		font:0
	},
	modalCreated:0,
	hexDigits : new Array("0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "a", "b", "c", "d", "e", "f"),
	onKeyDown: function(e){
		var $that = this;
		if ($that.$selected.element !== 'undefined')
		{
			if (e.shiftKey && e.ctrlKey && e.altKey){
				for (var key in $.fn.settings.defSetting) {
					if ($.fn.settings.defSetting.hasOwnProperty(key))
						$.fn.settings.defSetting[key] = 0;
				}
			}
			if (e.ctrlKey && e.which == $that.keys.modeKey) {
				var mode = "normal";
				for (var key in $.fn.settings.defSetting) {
					if ($.fn.settings.defSetting.hasOwnProperty(key))
						if ($.fn.settings.defSetting[key] == 1) 
						mode = key;
				}
				alert("Activated Mode: " + mode);
			}
			if (e.which == $that.keys.sourceKey) {
				$(".modal-body>pre").empty();
				if($.fn.settings.defSetting.transition){
					var sheet;
					var styleSheets = $("style#d-set-stylesheet")[0].sheet ? $("style#d-set-stylesheet")[0].sheet : $("style#d-set-stylesheet")[0].styleSheet;
					var styleSheetRules = styleSheets.rules ? styleSheets.rules : styleSheets.cssRules;
					var len = styleSheetRules.length ? styleSheetRules.length : styleSheetRules.length;
					var targetClass = $that.$selected.element.attr('class').split(' ');
					var i;
					var selectorText;
					for(i=0;i<len;i++)
					{
						selectorText = styleSheetRules[i].selectorText.replace('.','');
						if(targetClass.indexOf(selectorText) > -1)
							$(".modal-body>pre").append("<code class=d-set style='background-color:#7fdfde;'>"+styleSheetRules[i].cssText+"</code><br/>");
						else
						$(".modal-body>pre").append("<code class=d-set>"+styleSheetRules[i].cssText+"</code><br/>");
					}
				}
				else if($.fn.settings.defSetting.colorify){
						$(".modal-body>pre").append("<code class=d-set>"+$that.$selected.element.attr('style')+"</code><br/>");
				}
				$("#source-container").modal('show');
			}
			//old.apply(this,arguments);
		}
	},
	onColorKeyDown: function(e){
		var $that = this;
		if ($that.$selected.element !== 'undefined')
		{
			if (e.shiftKey && e.which == $that.keys.colorifyKey)
			{
				for (var key in $.fn.settings.defSetting) {
					if ($.fn.settings.defSetting.hasOwnProperty(key))
						if ($.fn.settings.defSetting.colorify) continue; //this line is just a mistake. However, it works as intended because logic behinde it is correct :p
							$.fn.settings.defSetting[key] = 0;
				}
				$.fn.settings.defSetting.colorify = ($.fn.settings.defSetting.colorify == 0) ? 1 : 0;
			}
			if($.fn.settings.defSetting.colorify)
			{
				//shift+b
				if (e.shiftKey && e.which == '66') {
					$.fn.settings.defSetting.fgcolor = 0;
					$.fn.settings.defSetting.font = 0;
					$.fn.settings.defSetting.bgcolor = ($.fn.settings.defSetting.bgcolor == 0) ? 1 : 0;
				}
				//shift+f
				if (e.shiftKey && e.which == '70') {
					$.fn.settings.defSetting.bgcolor = 0;
					$.fn.settings.defSetting.font = 0;
					$.fn.settings.defSetting.fgcolor = ($.fn.settings.defSetting.fgcolor == 0) ? 1 : 0;
				}
				//shift+t
				if (e.shiftKey && e.which == '84') {			
					$.fn.settings.defSetting.bgcolor = 0;
					$.fn.settings.defSetting.fgcolor = 0;
					$.fn.settings.defSetting.font = ($.fn.settings.defSetting.font == 0) ? 1 : 0;
				}
				//ctrl+b
				if (e.ctrlKey && e.which == '66'){
					if($.fn.settings.defSetting.font)
					{
						$that.$selected.bold();
					}
					else
					{
						alert("Please Turn ON the font mode, using shift+t\nTo apply text formatting effects.")
					}
				}
				if (e.which == '39' || e.which == '37' || e.which == '38' || e.which == '40')
				{
					if($.fn.settings.defSetting.font)
					{
						$that.$selected.font[e.which]();
					}
				}		
			}	
			//old.apply(this,arguments);
		}
	}
}

$.fn.colorify.defaults = {
	colorifyKey:'67',//shift+c
	sourceKey:'13',
	modeKey:'77'
};

$.fn.settings = $.extend(true,{}, $.fn.settings|| {},settings);

Colorify.prototype.onColorSelect = function(e){	
	var $that = this;
	var disable = $.fn.settings.disableSelect;
	var len = disable.length,i;
	for(i=0;i<len;i++)
	{
		if($(e.target).is(disable[i]))return;
	}		
	if($(e.target).is('[class*="d-set"]')) return;
	$that.$selected.element = $(e.target);
	$that.$selected.fontSize = $that.$selected.element != 'undefined' ? (($that.$selected.element.css('font-size') == 'inherit') ? 'inherit' : $that.$selected.element.css('font-size')) : 'initial';
	$that.$selected.fontWeight = $that.$selected.element != 'undefined' ? (($that.$selected.element.css('font-weight') == 'bold') ? 'bold' : 'normal') : 'normal';
	$that.$selected.tagName = $that.$selected.element != 'undefined' ? $that.$selected.element[0].tagName.toLowerCase() : 'undefined';

    //if item is selected and stored in object then
    //check if previous element is set then check if previous element has border-blue class
    //then remove border blue class from previous element.

    if ($that.$selected.element) {
        if ($that.previous && $that.previous.hasClass('border-blue')) {
            $that.previous.removeClass('border-blue');
        }
		$that.previous = $that.$selected.element;
        $that.previous.addClass('border-blue');
	}
}

Colorify.prototype.pickColor = function(e) {
	var $that = this;
    if ($.fn.settings.defSetting.bgcolor) {
        var value = rgb2hex($(e.target).css('background-color'));
        $("#set-color").val(value);
        $that.previous.css('background-color', value);
    } else if ($.fn.settings.defSetting.fgcolor) {
        var value = rgb2hex($(e.target).css('background-color'));
        $("#set-color").val(value);
        $that.previous.css('color', value);
    } else {
        alert("Please press shift + b\nTo Set background color\nPress shift + f\nTo Set Foreground Color");
    }
}
Colorify.prototype.setColor = function(e){
	var $that = this;
	var input = $("#set-color");
    if ($that.$selected.element !== 'undefined' && $.fn.settings.defSetting.bgcolor == 1) $that.previous.css('background-color', input.val());
    else if ($that.$selected.element !== 'undefined' && $.fn.settings.defSetting.fgcolor == 1) $that.previous.css('color', input.val());
    else alert("No element selected\n please select the element first\n or if you have selected the item\nThen select foreground or background mode\nPress shift+b : background mode\nPress shift+f : foreground mode");	
}

//Change the color from RGB to HEX format
//adopted from internet sources like stackoverflow.com
//thanks for this contributions of them.	
function rgb2hex(rgb) {
    rgb = rgb.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/);
    return "#" + hex(rgb[1]) + hex(rgb[2]) + hex(rgb[3]);
}
function hex(x) {
	var hexDigits = $.fn.settings.hexDigits;
    return isNaN(x) ? "00" : hexDigits[(x - x % 16) / 16] + hexDigits[x % 16];
}

function createControlElements()
{
	var html = '<div class="d-set color-container" id="color">\
			<div class="d-set color"><div class="d-set pointer color-1"></div></div>\
			<div class="d-set color"><div class="d-set pointer color-2"></div></div>\
			<div class="d-set color"><div class="d-set pointer color-3"></div></div>\
			<div class="d-set color"><div class="d-set pointer color-4"></div></div>\
			<div class="d-set color"><div class="d-set pointer color-5"></div></div>\
			<div class="d-set color"><div class="d-set pointer color-6"></div></div>\
			<div class="d-set color"><div class="d-set pointer color-7"></div></div>\
			<div class="d-set color"><div class="d-set pointer color-8"></div></div>\
			<div class="d-set color"><div class="d-set pointer color-9"></div></div>\
			<div class="d-set color"><div class="d-set pointer color-10"></div></div>\
			<div class="d-set color"><input title="enter custom color" type="text" placeholder="#fe211c"class="d-set set-color form-control" id="set-color"/></div>\
		</div>';
	$('body').prepend(html);
	if($.fn.settings.modalCreated == 0)
	createSourceModal();
}

function createSourceModal()
{
	var modal = '<div id="source-container" class="modal fade d-set" role="dialog">\
		  <div class="modal-dialog d-set">\
			<div class="modal-content d-set">\
			  <div class="modal-header d-set">\
				<button type="button" class="close d-set" data-dismiss="modal">&times;</button>\
				<h4 class="modal-title d-set">CSS Styles</h4>\
			  </div>\
			  <div class="modal-body d-set">\
				<pre class="d-set"></pre>\
			  </div>\
			  <div class="modal-footer d-set">\
				<button type="button" class="btn btn-default d-set" data-dismiss="modal">Close</button>\
			  </div>\
			</div>\
		</div>\
		</div>';
		$('body').append(modal);
	 $.fn.settings.modalCreated = 1;
}

>>>>>>> d8ae68a3467e1604b8c261b3f8025a53b30734af
})(jQuery,window);