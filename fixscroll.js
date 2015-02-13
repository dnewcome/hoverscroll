/**
 * This does a reverse scroll, fixing the image and making the contents appear to scroll above it
 */
;(function(w) {
    'use strict';

    function Hoverscroll(id) {
        var outer = document.querySelector('#' + id),
            inner = document.querySelector('#' + id + ' .hoverscroll_inner'),
            config = {
                clip_width: outer.offsetWidth,
                clip_height: outer.offsetHeight,
                content_width: inner.offsetWidth,
                content_height: inner.offsetHeight 
            },
            count = 0;

        function map(x, y) {
            var max_x_translate = config.content_width - config.clip_width,
                max_y_translate = config.content_height - config.clip_height;

            return {
                x: Math.min((x*(config.content_width - config.clip_width))/config.clip_width, max_x_translate),
                y: Math.min((y*(config.content_height - config.clip_height))/config.clip_height, max_y_translate)
            };
        }

        outer.addEventListener('mousemove', function(e) {
            var translate;

            // do a little throttling here
            count += 1;
            if(count % 2 !== 0) {
                return;
            }
            
            translate = map(e.layerX, e.layerY);
            inner.style.transform = 'translate3d(' + -translate.x + 'px, ' + -translate.y + 'px, 0px)';
            inner.style.webkitTransform = 'translate3d(' + -translate.x + 'px, ' + -translate.y + 'px, 0px)';
        }, false);
    }

    w.Hoverscroll = Hoverscroll;

}(window));

