# Hoverscroll

# About

Hoverscroll is a simple HTML5 behavioral component that allows scrolling the contents of an element by hovering
with the mouse.

Inspired by the D3 website:
[](http://d3js.org/)

# Usage

Include the hoverscroll javascript and css files:

        <script src="hoverscroll.js"></script>
        <link rel="stylesheet" href="hoverscroll.css">


Given a pair of nested elements where the child's dimensions are larger than its parent:

        <div id="panorama_outer" class="hoverscroll_outer">
            <div id="panorama_inner" class="hoverscroll_inner">
                <img src="background.jpg">
            </div>
        </div>


Instantiating Hoverscroll can be done with a single line of code as follows:

    new Hoverscroll('panorama_outer');


Hoverscroll should automatically detect the size of the elements and scale the translation of the content accordingly. 
Only mouse movements directly over the parent element will be detected.

# Limitations

This only works correctly in Chrome. Firefox is on the way but there are some differences in the way layerX and layerY event
data works, and I want to normalize the behavior so it's consistent across browsers.

# Bugs

There are some hacks around limiting the translation offset involving Math.min so that we don't show ugly whitespace when scroll
limits are hit. This could be done better with more thought so that we can handle the edges with more aplomb.
