$('#mobile-button').click( function() { 
$("#calendar-fixed-filter").css('-webkit-transform', 'translate3d(0px, 0px, 0px)');
});

function resizeElementHeight(element) {
  var element=document.getElementById('calendar-filters');
  var height = 0;
  var body = window.document.body;
  if (window.innerHeight) {
      height = window.innerHeight;
  } else if (body.parentElement.clientHeight) {
      height = body.parentElement.clientHeight;
  } else if (body && body.clientHeight) {
      height = body.clientHeight;
  }
   element.style.height = ((height - element.offsetTop - 150) + 'px');
}
onload=resizeElementHeight;
onload=createMonth(startDate);
window.onresize=resizeElementHeight;


function UpdateTableHeaders(){
	$('.day').each(function(){

		var el 				= $(this),
			offset 			= el.offset(),
			scrollTop		= $(window).scrollTop()+120,
			floatingHeader	= $('.floatingHeader', this)

		if ((scrollTop > offset.top) && (scrollTop < offset.top + el.height())) {
			floatingHeader.css({
				'visibility': 'visible'
			});
		}
			else {
           floatingHeader.css({
            "visibility": "hidden"
           });      
        };
	});
}

$(function(){

	var clonedHeaderRow;

	$('.day').each(function(){
		clonedHeaderRow = $('.date-display-single', this);
		clonedHeaderRow
			.before(clonedHeaderRow.clone())
			.addClass('floatingHeader');

	});

$(window)
	.scroll(UpdateTableHeaders)
	.trigger('scroll');
});