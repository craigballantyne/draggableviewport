##jQuery Draggable Viewport

A simple jQuery plugin to allow you to drag the visible area of an element around within a limited, fixed size viewport.

###Usage

HTML

    <div id="viewport">
        <div class="content"></div>
    </div>


JS

    $('#viewport').draggableviewport({
        draggableContent: '.content',   // the container within the viewport that will be repositioned
        allowVertical: true,            // allow vertical dragging
        allowHorizontal: true,          // allow horizontal dragging
        animationLength: 200            // set how long the pane take to slide to its max position
    });