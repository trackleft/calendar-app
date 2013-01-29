var startDate
if (Date.today().is().sunday()){startDate = Date.today().last().sunday().addDays(-1)} 
else {startDate = Date.today().last().week().last().sunday().addDays(-1)}

function createWeek(startDate){
	var weekNumber = startDate.getISOWeek();
	var yearNumber = startDate.getYear();
	var week = document.createElement('tr');
	var weekID = yearNumber+'week'+weekNumber;
	week.setAttribute('id', weekID);
	document.getElementById('calendarTable').appendChild(week);

	var i = 0;
	while (i<7){
		var date = startDate.addDays(1); 
		var dayNumber = date.toString('dd');
		var monthNumber = date.toString('MM');
		function isOdd(num) { return num % 2;};
		var monthClass = 'evenMonth'
		if (isOdd(monthNumber*1)) {
			monthClass = 'oddMonth';
		};
		var day = document.createElement('td');
		var dayClass = 'picker-day '+monthClass;
				if (Date.today().toString('dd') == dayNumber) {
					dayClass = dayClass+' today';
		};
		day.setAttribute('class',dayClass);
		day.setAttribute('id',monthNumber+'-'+dayNumber);
		var dayDiv = document.createElement('div');
		document.getElementById(weekID).appendChild(day);
		document.getElementById(monthNumber+'-'+dayNumber).appendChild(dayDiv);
		dayDiv.innerHTML = dayNumber;
		i++;
	}
}

function createMonth(startDate){
	var j = 0;
	while (j<5){
		createWeek(startDate);
		j++;
	}
}

