$(document).ready(function() {
   $.localScroll({
   	duration:800,
   	target:'#datepicker',
   	lazy:true,
   	hash:false
   	});
});
	var lastPixelTop = "";
	var startDate
if (Date.today().is().sunday()){startDate = Date.today().last().sunday().addDays(-1)} 
else {startDate = Date.today().last().week().last().sunday().addDays(-1)}

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

function createMonth(startDate){
	var j = 0;
	while (j<8){
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
	 if (pixels-pixelTop*1<220) {
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
		month.setAttribute('class','key'); //set the class to "key"
		month.innerHTML = startMonth.toString('MMM');
		month.setAttribute('id',startMonth.toString('MMM')+"-"+startMonth.toString('yyyy')); //set the id to the year and the month
		if (startMonth.toString('MMM')==Date.today().toString('MMM')){
		month.setAttribute('class','key today');
		} //check if it's this month and apply active class
		var monthLink = document.createElement('a');
		monthLink.setAttribute('href','#'+startMonth.toString('yyyy')+'-'+startMonth.toString('MM')+'-01')
		monthLink.appendChild(month);
		monthBox.appendChild(monthLink);
		startMonth.addMonths(1); //add a month to current month
		k++;
	}

}

	// $(window).scroll(function(){
	// 	alert("scrolling!");
	// });