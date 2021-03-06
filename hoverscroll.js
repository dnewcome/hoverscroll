;(function(w) {
    'use strict';

    function normalize(e) {
        e = e || window.event;

        var target = e.currentTarget,
        // var target = e.target || e.srcElement,
            rect = target.getBoundingClientRect(),
            offsetX = e.clientX - rect.left,
            offsetY = e.clientY - rect.top;

        return [offsetX, offsetY];
    };

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


        // mod, event, timeout
        var throttle = 'timeout'; 
        var canRun = true;

        if(throttle === 'event') {
            outer.addEventListener("transitionend", function() {
                canRun = true;
            }, false);
        }

        outer.addEventListener('mousemove', function(e) {
            if(!canRun) {
                return;
            }
            if(throttle === 'event' || throttle === 'timeout') {
                canRun = false;
            }

            
            if(throttle === 'timeout') {
                setTimeout(function() {canRun = true;}, 16.6);
            }
            var translate;

            // do a little throttling here
            if(throttle === 'mod') {
                count += 1;
                if(count % 2 !== 0) {
                    return;
                }
            }
           
            var xy = normalize(e); 
            //console.log(xy);
            //translate = map(e.layerX, e.layerY);
            translate = map(xy[0], xy[1]);
            inner.style.transform = 'translate3d(' + -translate.x + 'px, ' + -translate.y + 'px, 0px)';
            inner.style.webkitTransform = 'translate3d(' + -translate.x + 'px, ' + -translate.y + 'px, 0px)';
        }, false);
    }

    w.Hoverscroll = Hoverscroll;

}(window));

