'use strict';

// Polyfills: 
if (window.NodeList && !NodeList.prototype.forEach) {
    NodeList.prototype.forEach = function (callback, thisArg) {
        thisArg = thisArg || window;
        for (var i = 0; i < this.length; i++) {
            callback.call(thisArg, this[i], i, this);
        }
    };
}


// https://developer.mozilla.org/en-US/docs/Web/API/NodeList/forEach
const _executeQsa = ( qs, cb ) => {

	// were we passed a selector string or a node list?
	var nodeList = ( typeof qs === 'string' ) ? document.querySelectorAll(qs) : qs;

	if ( nodeList instanceof NodeList ) {
		nodeList.forEach( function(el, i, list) {
			cb( el, i, list );
		});	
	} else if (nodeList) {
		cb( nodeList, 0, nodeList );
	}

	return nodeList;
};

const qsa = function( qs, cb ) {	

	// If we were passed an array, then go through
	// each item and execute the callback, and add it to
	// an array to return.
	if ( Array.isArray( qs ) ) {
		let chunks = [];
		qs.forEach( ( item ) => {
			chunks.push( _executeQsa( item, cb ) ); 
		});

		return chunks;

	} else {
		// If we were passed a node list or a string...
		return _executeQsa( qs, cb );	
	}
	
};


// On Load event to use with background images, for example.
const onSrcLoad = function( src, cb ) {
	var i = document.createElement('img');
	i.src = src;
	i.addEventListener('load', cb );
};


const initResizeEvents = function() {

	let resizeEnd;

    let throttle = function(type, name, obj) {

    	// Deprecated, but at lease xbrowser compatable.
    	// use new CustomerEvent if browsers remove it.
    	var event = document.createEvent('Event');
		event.initEvent('resize.throttle', true, true); // can bubble, and is cancellable

        var endEvent = document.createEvent('Event');
        endEvent.initEvent('resize.end', true, true); // can bubble, and is cancellable

        obj = obj || window;
        var running = false;
        var func = function() {
            if (running) { return; }
            running = true;
             requestAnimationFrame(function() {
                obj.dispatchEvent(event);

                // Maybe dispatch an end event?
                clearTimeout( resizeEnd );
                resizeEnd = setTimeout(function() {
                     obj.dispatchEvent(endEvent);
                }, 500);

                running = false;
            });
        };

        obj.addEventListener(type, func);
    };

    /* init - you can init any event */
    throttle("resize", "resize.throttle");
};


const serialize = function (form) {
	var field,
		l,
		s = [];

	if (typeof form == 'object' && form.nodeName == "FORM") {
		var len = form.elements.length;

		for (var i = 0; i < len; i++) {
			field = form.elements[i];
			if (field.name && !field.disabled ) {
				if (field.type == 'select-multiple') {
					l = form.elements[i].options.length;

					for (var j = 0; j < l; j++) {
						if (field.options[j].selected) {
							s[s.length] = encodeURIComponent(field.name) + "=" + encodeURIComponent(field.options[j].value);
						}
					}
				}
				else if ((field.type != 'checkbox' && field.type != 'radio') || field.checked) {
					s[s.length] = encodeURIComponent(field.name) + "=" + encodeURIComponent(field.value);
				}
			}
		}
	}
	return s.join('&').replace(/%20/g, '+');
};


const docReady = function(fn) {
	if (document.attachEvent ? document.readyState === "complete" : document.readyState !== "loading"){
		fn();
	} else {
		document.addEventListener('DOMContentLoaded', fn);
	}
};

const onClick = function( selector, callback ) {

	docReady( () => {
		if (!selector) { return; }

		if (typeof callback != 'function') {
			console.warn("callback was not a function");
			return false;
		}

		var _bind = function( el, cb ) {
			var fn = cb.bind( el );
			el.addEventListener('click', ( e ) => {
				fn( e );
			});
		};

		if ( selector instanceof HTMLElement ) {
			_bind( selector, callback );
		} else {
			qsa( selector, ( el ) => {
				_bind( el, callback );
			});
		}
	});
};


module.exports = {
	serialize,
	docReady,
	initResizeEvents,
	onSrcLoad,
	onClick,
	qsa
};