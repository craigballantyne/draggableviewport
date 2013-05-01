(function($){

	$.fn.draggableviewport = function(options) {

		//set up default options
		var defaults = {
			draggableContent: '.content', 	// the container within the viewport that will be repositioned
			allowVertical: true,   			// allow vertical dragging
			allowHorizontal: true,  		// allow horizontal dragging
			animationLength: 200			// set how long the pane take to slide to its max position
		};
		var settings = $.extend({}, defaults, options);

		return this.each(function() {

			var $viewport = $(this),
			    $content = $viewport.find(settings.draggableContent);
			//store some default variables
			var mouseIsDown = false, 
				currX, currY,
			    maxTop = 0, maxLeft = 0,
			    maxRight = $viewport.width() > $content.width ? $content.width() : $viewport.width(),
			    maxBottom = $viewport.height() > $content.height ? $content.height() : $viewport.height();

			//ensure that the viewport/content css is set up ok
			$viewport.css({
				overflow: 'hidden',
				cursor: 'move'
			});
			$content.css({
				position: 'absolute'
			})
			//adjust cursor styles if allowVertical/Horizontal are false
			if(!settings.allowVertical) {
				$viewport.css({cursor: 'w-resize'});
			}
			else if(!settings.allowHorizontal) {
				$viewport.css({cursor: 'n-resize'});
			}


			//if the user presses the mouse on the viewport store the current position and set the mouseIsDown flag
			$viewport.on('mousedown', function(e){
				mouseIsDown = true;
				currX = e.pageX;
				currY = e.pageY;
			});

			//when the user releases the mouse reset the flag, if the content is outwith its boundaries slide it back
			$(document).on('mouseup', function(e) {
				mouseIsDown = false;
				currX = 0;
				currY = 0;

				//check the current positions of the content
				var pos = $content.position(),
					width = $content.width(),
					height = $content.height(),
					top = pos.top,
					left = pos.left,
					right = pos.left + width,
					bottom = pos.top + height;

				//check the current content positions against their max values.  Animate them back if required.
				if(top > maxTop)
				{
					if(left > maxLeft) {
						$content.animate({top: maxTop, left: maxLeft}, settings.animationLength);
					}
					else if(right < maxRight) {
						$content.animate({top: maxTop, left: maxRight-width}, settings.animationLength);
					}
					else {
						$content.animate({top: maxTop}, settings.animationLength);
					}
				}
				else if(bottom < maxBottom)
				{
					if(left > maxLeft) {
						$content.animate({top: maxBottom-height, left: maxLeft}, settings.animationLength);
					}
					else if(right < maxRight) {
						$content.animate({top: maxBottom-height, left: maxRight-width}, settings.animationLength);
					}
					else {
						$content.animate({top: maxBottom-height}, settings.animationLength);
					}
				}
				else if(left > maxLeft)
				{
					$content.animate({left: maxLeft}, settings.animationLength);
				}
				else if(right < maxRight)
				{
					$content.animate({left: maxRight-width}, settings.animationLength);
				}

			});

			//when the mouse moves adjust the position of the content
			$(document).on('mousemove', function(e){
				//ensure the mouse is down
				if(mouseIsDown){
					//check the difference is the current and stored coords
					diffX = e.pageX - currX;
					diffY = e.pageY - currY;

					var pos = $content.position(),
						top = pos.top,
						left = pos.left;

					//if vertical dragging is allowed add the diff to top
					if(settings.allowVertical) {
						top += diffY;
					}
					//if horizontal dragging is allowed add the diff to left
					if(settings.allowHorizontal) {
						left += diffX;
					}

					$content.css({
						left: left,
						top: top
					});

					//update the stored coords to match the current ones
					currX = e.pageX;
					currY = e.pageY;
				}
			});

		});

		//return the object
		return this;
	}

})(jQuery);