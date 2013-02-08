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
	document.getElementById('yearDiv').innerHTML = yearNumber;
	var i = 0;
	while (i<7){
		var date = startDate.addDays(1); 
		var dayNumber = date.toString('dd');
		var dayName = date.toString('dddd');
		var monthNumber = date.toString('MM');
		var monthName = date.toString('MMM');
		function isOdd(num) { return num % 2;};
		var monthClass = 'evenMonth'
		if (isOdd(monthNumber*1)) {
			monthClass = 'oddMonth';
		};
		var day = document.createElement('td');
		var dayClass = dayName+' picker-day '+monthClass;
				if (Date.today().compareTo(date)==0) {
					dayClass = dayClass+' today';
				};
				if (Date.today().compareTo(date)==1) {
					dayClass = dayClass+' past-day';
				}
		day.setAttribute('class',dayClass);
		day.setAttribute('id',yearNumber+'-'+monthNumber+'-'+dayNumber);
		var dayDiv = document.createElement('div');
		dayDiv.setAttribute('class','dayDiv');
		var monDiv = document.createElement('div');
		monDiv.setAttribute('class','monDiv');
		document.getElementById(weekID).appendChild(day);
		document.getElementById(yearNumber+'-'+monthNumber+'-'+dayNumber).appendChild(monDiv);
		document.getElementById(yearNumber+'-'+monthNumber+'-'+dayNumber).appendChild(dayDiv);
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

function pageDatepicker(){
	var pixels = $("#calendarTable").height();
	var pixelTop = $("#datepicker").scrollTop();
	 if (pixels-pixelTop*1<220) {
		// document.getElementById('pixelCount').innerHTML = pixels+', '+pixelTop;
		// alert(pixels);
		createMonth(startDate)
	};
}

function createYear(){
	var monthBox = document.getElementById('monthList'); //get the container
	 var startMonth = Date.today().add(-3).months();//get the current month minus four to start.
	var k = 0;
	while (k<12){
		var month = document.createElement('li'); //create a new list item
		month.setAttribute('class','key'); //set the class to "key"
		month.innerHTML = startMonth.toString('MMM');
		month.setAttribute('id',startMonth.toString('MMM')+"-"+startMonth.toString('yyyy')); //set the id to the year and the month
		if (startMonth.toString('MMM')==Date.today().toString('MMM')){
		month.setAttribute('class','key today');
		} //check if it's this month and apply active class
		monthBox.appendChild(month);
		startMonth.addMonths(1); //add a month to current month
		k++;
	}

}

	// $(window).scroll(function(){
	// 	alert("scrolling!");
	// });