'use strict';

var Heightify = {};

/**
 * Make elements equal height
 *
 * @param  {array} elements
 * @param  {boolean} waitForImages
 * @return {void}
 */
Heightify.make = function (elements, waitForImages) {
    if (typeof jQuery === 'undefined') {
        throw 'The jQuery library must be available for Heightify to work.';
    }

    if (typeof jQuery.fn.actual === 'undefined') {
        throw 'The jQuery Actual library must be available for Heightify to work.';
    }

    if (! elements instanceof jQuery && typeof elements !== 'object') {
        throw 'A jQuery object or an array of elements must be provided.';
    }

    if (! elements instanceof jQuery) {
        elements = jQuery(elements);
    }

    var maxHeight = 0,
        completeCalled = 0,
        cachedElements = [],
        images = waitForImages ? elements.find('img').filter(function () { return ! this.complete; }) : [],
        complete = function () {
            if (! waitForImages || ! images.length || images.length === ++completeCalled) {
                elements.each(function (idx, el) {
                    var $el = jQuery(el),
                        height = $el.actual('outerHeight');

                    if (height > maxHeight) {
                        maxHeight = height;

                        cachedElements.forEach(function ($cachedEl) {
                            $cachedEl.css('min-height', maxHeight);
                        });
                    }

                    $el.css('min-height', maxHeight);

                    cachedElements.push($el);
                });
            }
        };

    if (waitForImages && images.length > 0) {
        images.on('load', complete);
    }
    else {
        complete();
    }
};

/**
 * Expose the class either via AMD, CommonJS or the global object
 */
if (typeof define === 'function' && define.amd) {
    define(function () {
        return Heightify;
    });
}
else if (typeof module === 'object' && module.exports){
    module.exports = Heightify;
}
else {
    window.Heightify = Heightify;
}
