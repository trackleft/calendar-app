	var startDate;

$(document).ready(function() {
   $('.month-nav').localScroll({
   	duration:800,
   	target:'#datepicker',
   	lazy:true,
   	hash:false
   	});
   $('#month-nav-fallback').localScroll({
   	duration:800,
   	target:'#datepicker',
   	lazy:true,
   	hash:false
   	});
   $('.picker-day').localScroll({
   	duration:800,
   	// target:'',
   	lazy:true,
   	hash:false,
   	offset:-100
   })
   $('#monthList a').click(function(){
   	var month = Date.parse(this.firstChild.id);
   	 while (month.compareTo(startDate)==1){
   	 	createMonth(startDate);
   	 }
   	var earliestDayID = document.getElementById('calendarTable').firstChild.firstChild.id; //get the date of the first child day of the first child week of the calendarTable
	var earliestDay = Date.parse(earliestDayID);
	 while (month.compareTo(earliestDay)==-1){
	 createPastWeek();
	 earliestDayID = document.getElementById('calendarTable').firstChild.firstChild.id;
	 earliestDay = Date.parse(earliestDayID);
	}
    });
   $('#nextlink').click(function(){
   	var month = Date.parse(this.name);
   	console.log(month);
   	while (month.compareTo(startDate)==1){
   	 	createMonth(startDate);
   	 }
   	 this.setAttribute('href','#'+month.add(1).months().toString('yyyy-MM-dd'));
   	 this.setAttribute('name',month.toString('yyyy-MMM'));
   	 document.getElementById('previouslink').setAttribute('href','#'+month.toString('yyyy-MM-dd'));
   	 document.getElementById('previouslink').setAttribute('name',month.toString('yyyy-MMM'));

   })
   $('#previouslink').click(function(){
   	var month = Date.parse(this.name);
   	console.log(month);
   	var earliestDayID = document.getElementById('calendarTable').firstChild.firstChild.id; //get the date of the first child day of the first child week of the calendarTable
	var earliestDay = Date.parse(earliestDayID);
	 	while (month.compareTo(earliestDay)==-1){
	 		createPastWeek();
	 		earliestDayID = document.getElementById('calendarTable').firstChild.firstChild.id;
	 		earliestDay = Date.parse(earliestDayID);
		}
   	 this.setAttribute('href','#'+month.add(-1).months().toString('yyyy-MM-dd'));
   	 this.setAttribute('name',month.toString('yyyy-MMM'));
   	 document.getElementById('nextlink').setAttribute('href','#'+month.toString('yyyy-MM-dd'));
   	 document.getElementById('nextlink').setAttribute('name',month.toString('yyyy-MMM'));
   })
   $('#todaylink').click(function(){
   	var month = Date.today();
   	document.getElementById('previouslink').setAttribute('href','#'+month.toString('yyyy-MM-dd'));
   	 document.getElementById('previouslink').setAttribute('name',month.toString('yyyy-MMM'));
   	 document.getElementById('nextlink').setAttribute('href','#'+month.toString('yyyy-MM-dd'));
   	 document.getElementById('nextlink').setAttribute('name',month.toString('yyyy-MMM'));
   })
});
	var lastPixelTop = "";
// if (Date.today().is().sunday()){startDate = Date.today().last().sunday().addDays(-1)} 
// else {startDate = Date.today().last().week().last().sunday().addDays(-1)}
startDate = Date.today().add(-2).months().sunday().addDays(-1);

function createWeek(startDate){
	var weekNumber = startDate.getISOWeek();
	var yearNumber = startDate.toString('yyyy');
	var week = document.createElement('tr');
	var weekID = yearNumber+'week'+weekNumber;
	week.setAttribute('id', weekID);
	document.getElementById('calendarTable').appendChild(week);
	// document.getElementById('yearDiv').innerHTML = yearNumber;
	var i = 0;
	while (i<7){

		var date = startDate.addDays(1); 
		var dayNumber = date.toString('dd');
		var dayName = date.toString('dddd');
		var monthNumber = date.toString('MM');
		var monthName = date.toString('MMM');
		yearNumber = date.toString('yyyy');
		function isOdd(num) { return num % 2;};
		var monthClass = 'evenMonth'
		if (isOdd(monthNumber*1)) {
			monthClass = 'oddMonth';
		};
		var fullDate = yearNumber+'-'+monthNumber+'-'+dayNumber;
		
		var eventDayAnchor = document.createElement('a');
		eventDayAnchor.setAttribute('href','#date-'+fullDate);
		var day = document.createElement('td');
		var dayClass = dayName+' picker-day '+monthClass;
				if (Date.today().compareTo(date)==0) {
					dayClass = dayClass+' today';
					var previousMonth = Date.today().add(-1).months().toString('yyyy-MMM');
					var previousMonthNumber = Date.today().add(-1).months().toString('MM');
					console.log(previousMonth);
					console.log(fullDate);
					var nextMonth = Date.today().toString('yyyy-MMM');
					var nextMonthNumber = Date.today().toString('MM');
					document.getElementById('todaylink').setAttribute('href','#'+fullDate);
					document.getElementById('previouslink').setAttribute('name',nextMonth);
					document.getElementById('previouslink').setAttribute('href','#'+yearNumber+'-'+monthNumber+'-01');
					document.getElementById('nextlink').setAttribute('name',nextMonth);
					document.getElementById('nextlink').setAttribute('href','#'+yearNumber+'-'+monthNumber+'-01');
				};
				if (Date.today().compareTo(date)==1) {
					dayClass = dayClass+' past-day';
				}
		day.setAttribute('class',dayClass);
		day.setAttribute('id',fullDate);
		var linkAnchor = document.createElement('a');
		linkAnchor.setAttribute('name',fullDate);
		var dayDiv = document.createElement('div');
		dayDiv.setAttribute('class','dayDiv');
		var monDiv = document.createElement('div');
		monDiv.setAttribute('class','monDiv');
		day.appendChild(eventDayAnchor);
		document.getElementById(weekID).appendChild(day);
		var dateBox = document.getElementById(fullDate)
		eventDayAnchor.appendChild(linkAnchor);
		eventDayAnchor.appendChild(monDiv);
		eventDayAnchor.appendChild(dayDiv);
		monDiv.innerHTML = monthName;
		dayDiv.innerHTML = dayNumber;
		i++;
	}
}

function createMonth(startDate){
	var j = 0;
	while (j<20){
		createWeek(startDate);
		j++;
	}
}

function createPastWeek(){
	var earliestWeek = document.getElementById('calendarTable').firstChild;
	var earliestDayID = document.getElementById('calendarTable').firstChild.firstChild.id; //get the date of the first child day of the first child week of the calendarTable
	var earliestDay = Date.parse(earliestDayID);
	var pastStartDate = earliestDay.last().sunday().addDays(-1)
	// document.getElementById('yearDiv').innerHTML = pastStartDate;

	var weekNumber = pastStartDate.getISOWeek();
	var yearNumber = pastStartDate.toString('yyyy');
	var week = document.createElement('tr');
	var weekID = yearNumber+'week'+weekNumber;
	week.setAttribute('id', weekID);
	// $('#datepicker').prepend(week);
	// document.getElementById('calendarTable').insertRowBefore(0, week);

	earliestWeek.parentNode.insertBefore(week, earliestWeek);
	// document.getElementById('calendarTable').appendChild(week);

	var i = 0;
	while (i<7){
		var date = pastStartDate.addDays(1); 
		var dayNumber = date.toString('dd');
		var dayName = date.toString('dddd');
		var monthNumber = date.toString('MM');
		var monthName = date.toString('MMM');
		yearNumber = date.toString('yyyy');
		function isOdd(num) { return num % 2;};
		var monthClass = 'evenMonth'
		if (isOdd(monthNumber*1)) {
			monthClass = 'oddMonth';
		};
		var fullDate = yearNumber+'-'+monthNumber+'-'+dayNumber;
		var day = document.createElement('td');
		var dayClass = dayName+' picker-day '+monthClass;
				if (Date.today().compareTo(date)==0) {
					dayClass = dayClass+' today';
					document.getElementById('todaylink').setAttribute('href','#'+fullDate);
				};
				if (Date.today().compareTo(date)==1) {
					dayClass = dayClass+' past-day';
				}
		day.setAttribute('class',dayClass);
		day.setAttribute('id',fullDate);
		var linkAnchor = document.createElement('a');
		linkAnchor.setAttribute('name',fullDate);
		var dayDiv = document.createElement('div');
		dayDiv.setAttribute('class','dayDiv');
		var monDiv = document.createElement('div');
		monDiv.setAttribute('class','monDiv');
		document.getElementById(weekID).appendChild(day);
		var dateBox = document.getElementById(fullDate)
		dateBox.appendChild(linkAnchor);
		dateBox.appendChild(monDiv);
		dateBox.appendChild(dayDiv);
		monDiv.innerHTML = monthName;
		dayDiv.innerHTML = dayNumber;
		i++;
	}
}

function initialPastMonth(){
	var i=0;
	while(i<4){
		createPastWeek();
		i++;
	}
	var xstartDate
if (Date.today().is().sunday()){xstartDate = Date.today().last().sunday()} 
else {xstartDate = Date.today().last().week().last().sunday()}
	// window.location.hash = xstartDate.toString('yyyy')+'-'+xstartDate.toString('MM')+'-'+xstartDate.toString('dd');
	window.location.hash = Date.today().toString('yyyy')+'-'+Date.today().toString('MM')+'-'+Date.today().toString('dd');
}
function pageDatepicker(){
	var pixels = $("#calendarTable").height();
	var pixelTop = $("#datepicker").scrollTop();
	document.getElementById('yearDiv').innerHTML= 'pixels = '+pixels+' pixelTop = '+pixelTop
	 if (pixels-pixelTop*1<221) {
		createMonth(startDate)
	};
	if (pixelTop*1<4 && pixelTop<lastPixelTop){
		createPastWeek();
	}
	lastPixelTop = pixelTop;
}


function createYear(){
	var monthBox = document.getElementById('monthList'); //get the container
	 var startMonth = Date.today().add(-3).months();//get the current month minus three.
	var k = 0;
	while (k<12){
		var month = document.createElement('li'); //create a new list item
		month.setAttribute('class','key month '+ startMonth.toString('MMMM')); //set the class to "key"
		month.innerHTML = startMonth.toString('MMM');
		month.setAttribute('id',startMonth.toString('MMM')+"-"+startMonth.toString('yyyy')); //set the id to the year and the month
		if (startMonth.toString('MMM')==Date.today().toString('MMM')){
		month.setAttribute('class','key today');
		} //check if it's this month and apply active class
		var monthLink = document.createElement('a');
		monthLink.setAttribute('href','#'+startMonth.toString('yyyy-MM')+'-01')
		monthLink.appendChild(month);
		monthBox.appendChild(monthLink);
		startMonth.addMonths(1); //add a month to current month
		k++;
	}

}

// function getEvents(){
	// $.get('json/2013-02/month.json', function(data) {
  // alert(data);
  // var day = Date.parse(data.events[0].event['iso-date']);
  // var eventDate = day.toString('yyyy-MM-dd');
  // alert(eventDate);

  		var d=0;
 	function makeEventDay(date1,data){
 		// alert(date1);
 		var eventDate = date1.toString('yyyy-MM-dd');
 		var dayEventContainer = document.createElement('div');
 		dayEventContainer.setAttribute('class',Date.parse(date1).toString('ddd')+' day');
 		document.getElementById(Date.parse(eventDate).toString('yyyy-MM')+'-events').appendChild(dayEventContainer);
 		var dayEventSpan = document.createElement('span');
 		dayEventSpan.setAttribute('class','date-display-single');
 		var dayEventAnchor = document.createElement('a');
 		dayEventAnchor.setAttribute('name','date-'+eventDate);
 		dayEventContainer.appendChild(dayEventAnchor);
 		dayEventSpan.innerHTML = Date.parse(date1).toString('dddd MMMM dd');
 		dayEventContainer.appendChild(dayEventSpan);

  		var clonedEventSpan = document.createElement('span');
  		clonedEventSpan.setAttribute('class','date-display-single floatingHeader');
  		clonedEventSpan.innerHTML = Date.parse(date1).toString('dddd MMMM dd');
  		dayEventContainer.appendChild(clonedEventSpan);
	// $('.day').each(function(){
	// 	clonedHeaderRow = $('.date-display-single', this);
	// 	clonedHeaderRow
	// 		.before(clonedHeaderRow.clone())
	// 		.addClass('floatingHeader');

	// });
  		var isOdd = true;
  		
 		 while(Date.parse(data.events[d].event['iso-date']).toString('yyyy-MM-dd') == eventDate){

  		var inlineEventContainer = document.createElement('div');
  		inlineEventContainer.setAttribute('class','inline-event-container even');
  		if(isOdd){
  			inlineEventContainer.setAttribute('class','inline-event-container odd');
  		}
  		var topThird = document.createElement('div');
  		topThird.setAttribute('class','top-third');
  		var whenInlineBlock = document.createElement('div');
  		whenInlineBlock.setAttribute('class','when inline-block');
 		 whenInlineBlock.innerHTML = data.events[d].event.time;
  		var whatInlineBlock = document.createElement('div');
  		whatInlineBlock.setAttribute('class','what inline-block');
  		whatInlineBlock.innerHTML = data.events[d].event['event-name'];
  		topThird.appendChild(whenInlineBlock);
  		topThird.appendChild(whatInlineBlock);
  		inlineEventContainer.appendChild(topThird);
  		dayEventContainer.appendChild(inlineEventContainer);
  		if(data.events[d].event.feature=='1'){
  			jQuery(inlineEventContainer).addClass('large-feature');
  			var eventDetails = document.createElement('div');
  			eventDetails.setAttribute('class','event-details');
  			var eventFeatureImage = document.createElement('div');
  			eventFeatureImage.setAttribute('class','event-feature-image');
  			var eventImage = document.createElement('img');
  			eventImage.setAttribute('class','image-100')
  			eventImage.setAttribute('src',data.events[d].event.image);
  			eventFeatureImage.appendChild(eventImage);
  			eventDetails.appendChild(eventFeatureImage);
  			inlineEventContainer.appendChild(eventDetails);
  			//add a large image
  		}
  		else if(data.events[d].event.feature=='2'){
  			jQuery(inlineEventContainer).addClass('small-feature');
  			 var eventDetails = document.createElement('div');
  			eventDetails.setAttribute('class','event-details');
  			var eventFeatureImage = document.createElement('div');
  			eventFeatureImage.setAttribute('class','event-feature-image');
  			var eventImage = document.createElement('img');
  			eventImage.setAttribute('class','image-50');
  			eventImage.setAttribute('src',data.events[d].event.image);
  			eventFeatureImage.appendChild(eventImage);
  			eventDetails.appendChild(eventFeatureImage);
  			var emptyDiv = document.createElement('div');
  			emptyDiv.setAttribute('class','clear-fix');
  			var featureDiv = document.createElement('div');
  			featureDiv.setAttribute('class','feature');
  			var descriptionP = document.createElement('p');
  			descriptionP.innerHTML = data.events[d].event.description;
  			featureDiv.appendChild(descriptionP);
  			eventDetails.appendChild(featureDiv);

  			eventDetails.appendChild(emptyDiv);
  			inlineEventContainer.appendChild(eventDetails);
  			//add a small image
  		}

  		d++;
  		if(data.events[d]==undefined){return 'x'};
  		if(isOdd == true){isOdd = false;}
  		else{isOdd = true;}
  		};
  		  		if(date1==Date.today().toString('yyyy-MM-dd')){
  		  			console.log(date1+'is today')
  			var ongoingEventsContainer = document.createElement('div');
  			ongoingEventsContainer.setAttribute('id','ongoing-events-container');
  			ongoingEventsContainer.setAttribute('class','ongoing-events');
  			makeOngoingEvents();
  			dayEventContainer.appendChild(ongoingEventsContainer);	
  			$('#ongoing-events-container').load(function(){
  			  $('#ongoing-events-container').flexslider({
    				animation: "slide",
    				animationLoop: false,
    				itemWidth: 210,
    				itemMargin: 5,
    				minItems: 2,
    				maxItems: 4
  				});		});
                         UpdateTableHeaders();
  		}
  		return(d);
	};

	var m=0;
	var n;
	function makeEventMonth(date){
		var monthDate = Date.parse(date).toString('yyyy-MM');
		$.getJSON('http://uanews.org/json/'+monthDate+'/month.json&callback=?', function(data){
			console.log(data);
			var monthContainer = document.createElement('div');
			monthContainer.setAttribute('id',monthDate+'-events');
			var mainContainer = document.getElementById('events-container');
			// mainContainer.innerHTML = '';
			mainContainer.appendChild(monthContainer);
			
			var n = Date.parse(data.events[m].event['iso-date']).toString('yyyy-MM');
			while(n == monthDate){
				m = makeEventDay(Date.parse(data.events[m].event['iso-date']).toString('yyyy-MM-dd'),data);
				// alert(data.events[m].event['event-name']);
				// m++;
				if(m=='x'){
					m=0;
					d=0;
					date.add(1).months();
					// makeEventMonth(date);
					return;
				}
					else{
				n = Date.parse(data.events[m].event['iso-date']).toString('yyyy-MM');
					}
			}
		});
		$('.flexslider').flexslider({
    		animation: "slide",
    		animationLoop: false,
    		itemWidth: 210,
    		itemMargin: 5
  		});
 	}  //close makeEventMonth
function makeOngoingEvents(){
	$.get('../json/ongoing.json', function(data){
		var ongoingEventsDiv = document.getElementById('ongoing-events-container');
		var ongoingFlexSlider = document.createElement('div');
                ongoingFlexSlider.setAttribute('class','flexslider');
                ongoingEventsDiv.appendChild(ongoingFlexSlider);
		var slides = document.createElement('ul');
		slides.setAttribute('class','slides');
		ongoingFlexSlider.appendChild(slides);
		var p = 0;
		while(p<9){
			var listItemElement = document.createElement('li');
			var ongoingDate = document.createElement('p');
			ongoingDate.setAttribute('class','ongoing-date');
			ongoingDate.innerHTML = data.events[p].event['ongoing-date'];
			var eventName = document.createElement('p');
			eventName.setAttribute('class','ui-sans ongoing-what');
			eventName.innerHTML = data.events[p].event['event-name'];
			var permalink = document.createElement('a');
			permalink.setAttribute('href',data.events[p].event.permalink);
			permalink.setAttribute('class','permalink');
			permalink.innerHTML = "Permalink";
			var eventImage = document.createElement('img');
		//	eventImage.style.width='100px';
		//	eventImage.style.height='10px';
			eventImage.setAttribute('src',data.events[p].event.image);
			listItemElement.appendChild(eventImage);
                        listItemElement.appendChild(eventName);
                        listItemElement.appendChild(ongoingDate);
                        listItemElement.appendChild(permalink);
			slides.appendChild(listItemElement);
			p++
		}
	})
}
// });
// }

// makeEventDay(day)
// while loop 
// first create the day container with a day id.
// then while day of the event == the day of the day container, cycle through the JSON
// ++

// MakeEventMonth
// while loop
// first create the month container with a month id.
// then while month of the day == month of the month container, makeEventDay(day)




	// $(window).scroll(function(){
	// 	alert("scrolling!");
	// });
