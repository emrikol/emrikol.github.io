// From https://gist.github.com/justinmc/8876659
(function($){

	/* addClass shim
	 ****************************************************/
	var addClass = $.fn.addClass;
	$.fn.addClass = function(value) {
		var orig = addClass.apply(this, arguments);

		var elem,
			i = 0,
			len = this.length;

		for (; i < len; i++ ) {
			elem = this[ i ];
			if ( elem instanceof SVGElement ) {
				var classes = $(elem).attr('class');
				if ( classes ) {
						var index = classes.indexOf(value);
						if (index === -1) {
							classes = classes + " " + value;
							$(elem).attr('class', classes);
						}
				} else {
					$(elem).attr('class', value);
				}
			}
		}
		return orig;
	};

	/* removeClass shim
	 ****************************************************/
	var removeClass = $.fn.removeClass;
	$.fn.removeClass = function(value) {
		var orig = removeClass.apply(this, arguments);

		var elem,
			i = 0,
			len = this.length;

		for (; i < len; i++ ) {
			elem = this[ i ];
			if ( elem instanceof SVGElement ) {
				var classes = $(elem).attr('class');
				if ( classes ) {
					var index = classes.indexOf(value);
					if (index !== -1) {
						classes = classes.substring(0, index) + classes.substring((index + value.length), classes.length);
						$(elem).attr('class', classes);
					}
				}
			}
		}
		return orig;
	};

	/* hasClass shim
	 ****************************************************/
	var hasClass = $.fn.hasClass;
	$.fn.hasClass = function(value) {
		var orig = hasClass.apply(this, arguments);

		var elem,
			i = 0,
			len = this.length;
				
		for (; i < len; i++ ) {
			elem = this[ i ];
			if ( elem instanceof SVGElement ) {
				var classes = $(elem).attr('class');

				if ( classes ) {
					if ( classes.indexOf(value) === -1 ) {
						return false;
					} else {
						return true;
					}
				} else {
						return false;
				}
			}
		}
		return orig;
	};
})(jQuery);

jQuery( function( $ ) {
	var container = $( '#screen' );
	var item_size = 48;
	var screen_width = $(document).width();
	var screen_height = $(document).height();
	var columns = Math.ceil( screen_width / item_size ) + 1;
	var rows = Math.ceil( screen_height / item_size ) + 1;
	var icons = [ 'gridicons-add-outline', 'gridicons-add', 'gridicons-align-center', 'gridicons-align-image-center', 'gridicons-align-image-left', 'gridicons-align-image-none', 'gridicons-align-image-right', 'gridicons-align-justify', 'gridicons-align-left', 'gridicons-align-right', 'gridicons-arrow-down', 'gridicons-arrow-left', 'gridicons-arrow-right', 'gridicons-arrow-up', 'gridicons-aside', 'gridicons-attachment', 'gridicons-audio', 'gridicons-backspace', 'gridicons-bell', 'gridicons-block', 'gridicons-bold', 'gridicons-book', 'gridicons-bookmark-outline', 'gridicons-bookmark', 'gridicons-briefcase', 'gridicons-calendar', 'gridicons-camera', 'gridicons-cart', 'gridicons-checkmark-circle', 'gridicons-checkmark', 'gridicons-chevron-down', 'gridicons-chevron-left', 'gridicons-chevron-right', 'gridicons-chevron-up', 'gridicons-clear-formatting', 'gridicons-clipboard', 'gridicons-cloud-download', 'gridicons-cloud-outline', 'gridicons-cloud-upload', 'gridicons-cloud', 'gridicons-code', 'gridicons-cog', 'gridicons-comment', 'gridicons-computer', 'gridicons-create', 'gridicons-credit-card', 'gridicons-crop', 'gridicons-cross-small', 'gridicons-cross', 'gridicons-custom-post-type', 'gridicons-customize', 'gridicons-dropdown', 'gridicons-ellipsis', 'gridicons-external', 'gridicons-flag', 'gridicons-flip-horizontal', 'gridicons-flip-vertical', 'gridicons-folder-multiple', 'gridicons-folder', 'gridicons-globe', 'gridicons-grid', 'gridicons-heading', 'gridicons-heart-outline', 'gridicons-heart', 'gridicons-help-outline', 'gridicons-help', 'gridicons-history', 'gridicons-house', 'gridicons-image-multiple', 'gridicons-image', 'gridicons-indent-left', 'gridicons-indent-right', 'gridicons-info-outline', 'gridicons-info', 'gridicons-ink', 'gridicons-institution', 'gridicons-italic', 'gridicons-layout-blocks', 'gridicons-layout', 'gridicons-link-break', 'gridicons-link', 'gridicons-list-checkmark', 'gridicons-list-ordered', 'gridicons-list-unordered', 'gridicons-location', 'gridicons-lock', 'gridicons-mail', 'gridicons-mention', 'gridicons-menu', 'gridicons-menus', 'gridicons-microphone', 'gridicons-minus-small', 'gridicons-minus', 'gridicons-my-sites-horizon', 'gridicons-my-sites', 'gridicons-not-visible', 'gridicons-notice-outline', 'gridicons-notice', 'gridicons-pages', 'gridicons-pencil', 'gridicons-phone', 'gridicons-plugins', 'gridicons-plus-small', 'gridicons-plus', 'gridicons-popout', 'gridicons-posts', 'gridicons-print', 'gridicons-quote', 'gridicons-reader', 'gridicons-reblog', 'gridicons-redo', 'gridicons-refresh', 'gridicons-reply', 'gridicons-rotate', 'gridicons-scheduled', 'gridicons-search', 'gridicons-share-ios', 'gridicons-share', 'gridicons-sign-out', 'gridicons-spam', 'gridicons-speaker', 'gridicons-special-character', 'gridicons-star-outline', 'gridicons-star', 'gridicons-stats-alt', 'gridicons-stats', 'gridicons-strikethrough', 'gridicons-sync', 'gridicons-tablet', 'gridicons-tag', 'gridicons-text-color', 'gridicons-themes', 'gridicons-time', 'gridicons-trash', 'gridicons-trophy', 'gridicons-types', 'gridicons-underline', 'gridicons-undo', 'gridicons-user-circle', 'gridicons-user', 'gridicons-video-camera', 'gridicons-video', 'gridicons-visible' ];

	function set_size() {
		var left, top, width, height;

		width = columns * item_size;
		height = rows * item_size;

		top = -1 * Math.floor( Math.random() * item_size ) + 1;
		left = -1 * Math.floor( Math.random() * item_size ) + 1;

		container.css( {
			width: width + 'px',
			height: height + 'px',
			top: top + 'px',
			left: left + 'px',
		} );
	}

	function draw_boxes() {
		var box, logo, n, gridicon;

		logo = Math.floor( Math.random() * icons.length );

		for ( n = 1; n <= ( columns * rows ); n++ ) {
			//box = $('<div/>');
			gridicon = icons[ Math.floor( Math.random() * icons.length ) ];
			box = $('<svg/>');
			box.attr( 'width', item_size );
			box.attr( 'height', item_size );
			box.addClass( 'gridicon ' + gridicon );
			box.append( '<use/>' );
			box.find( 'use' ).attr( 'xlink:href', '#' + gridicon );
			var newicon = '<svg class="gridicon ' + gridicon + '" width="24px" height="24px"><use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="assets/gridicons.svg#' + gridicon + '"></use></svg>'
			box = $(newicon);
			container.append( box );
		}
	}

	function flash_icon() {
		var box_to_flash, faded_boxes;

		faded_boxes = $( '.gridicon:not(.fading)' );
		box_to_flash = Math.floor( Math.random() * faded_boxes.length );

		faded_boxes.eq( box_to_flash ).addClass( 'fading' );

		setTimeout( function() {
			faded_boxes.eq( box_to_flash ).removeClass( 'fading' );
		}, 8000 );
	}

	set_size();
	draw_boxes();
	setInterval( flash_icon, 100 );
});