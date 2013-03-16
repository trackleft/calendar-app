$('#mobile-button').click( function() { 
$("#calendar-fixed-filter").css('-webkit-transform', 'translate3d(0px, 0px, 0px)');
});
// Can also be used with $(document).ready()
//Making the page responsive.
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
   element.style.height = ((height - element.offsetTop - 42) + 'px');
}
onload=console.log(startDate);
onload=createMonth(startDate);
onload=initialPastMonth();
onload=createYear();
onload=makeEventMonth(Date.today());
onload=resizeElementHeight;
window.onresize=resizeElementHeight;

//The function that makes the dated headers float.
function UpdateTableHeaders(){
	$('.day').each(function(){

		var el 				= $(this),
			offset 			= el.offset(),
			scrollTop		= $(window).scrollTop()+72,
			floatingHeader	= $('.floatingHeader', this)

		if ((scrollTop > offset.top) && (scrollTop < offset.top + el.height() - 42)) {
			floatingHeader.css({
				'visibility': 'visible'
			});
		}
		if (offset.top + el.height() - 43 > scrollTop && scrollTop > offset.top + el.height() - 42) {
		 	floatingHeader.css({
		 		'visibility': 'visible',
		 		'position'  : 'absolute',
		 		'top'       : 'auto',
		 		'bottom'    : '0px',
		 		'left' 		: '-12px'
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
	$('#datepicker').scroll(function(){
		pageDatepicker();
});


  // $(function() {
  //   $( "#datepicker" ).datepicker({numberOfMonths:[3,1],showOtherMonths: true,
  //     selectOtherMonths: true});
  // });

  //$( ".selector" ).datepicker({ numberOfMonths: [ 2, 3 ] });
