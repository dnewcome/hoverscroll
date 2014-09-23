;(function(w) {

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
            count += 2;
            if(count % 1 !== 0) {
                return;
            }
            
            translate = map(e.layerX, e.layerY);
            inner.style.transform = 'translate(' + -translate.x + 'px, ' + -translate.y + 'px)';
        }, false);
    }

    w.Hoverscroll = Hoverscroll;

}(window));
