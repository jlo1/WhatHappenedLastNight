var Timeline = function(nodesArr, eventObj) {
	//eventObj is OPTIONAL argument ONLY NEEDED FOR WITHIN AN EVENT
		//(ie: ItemsNodes)
	//	important when clicking the node and what you're displaying
	//	(ie: comments for Item, and event description for Event)
	
	this.nodesArr = nodesArr;
	this.eventObj = eventObj;
	//if this.eventObj === undefined, then in EventsTimeline mode
	//else you're in ItemsTimeline mode. eventsObj = Current event


	this.setupTimeline();
	this.zoomStr = ["Days", "Weeks", "Months", "Year"];
	this.zoomScaleArr =	[00000003333333,	//3.3 = 1/30 * 100
						 00000025000000,	//25  = 1month/4weeks * 100
						 00000833333333,	//8.3 = 1/12 * 100
						 00010000000000]	//1   = 1 year increment
	this.currZoomInd = 2;		//index into zoomScaleArr -> changed in setupTimeline

/*
	this.labelDays = ["Sunday", "Monday", "Tuesday", "Wednesday",
				"Thursday", "Friday", "Saturday"];
	this.labelMonths = ["January", "February", "March", "April", "May",
					"June", "July", "August", "September", "October",
					"November", "December"];
*/
}


Timeline.prototype.setupTimeline = function () {
	//Properties created:
	//	this.timelineStart, timelineEnd, timelineMin, timelineMax

	//get the first event and last event start time, to know min/max
	setStartEndTimelineEvents.bind(this)();
	var tlDiff = this.timelineEnd - this.timelineStart;
	if (tlDiff < 4*this.zoomScaleArr[0]) {		//less than 4 days, will show 4 days
		this.currZoomInd = 0;
	}
	else if (tlDiff < 4*this.zoomScaleArr[1]) {	//less than 4 weeks, will show 4 weeks
		this.currZoomInd = 1;
	}
	else if (tlDiff < 4*this.zoomScaleArr[2]) {	//less than 4 months, will show 4 months
		this.currZoomInd = 2;
	}
	else {										//show 4 years
		this.currZoomInd = 3;
	}

	this.timelineMin = this.timelineStart - 2*this.zoomScaleArr[this.currZoomInd];
	this.timelineMax = this.timelineEnd + 2*this.zoomScaleArr[this.currZoomInd];
}



function setStartEndTimelineEvents() {
	if (this.nodesArr.length < 1) {
		if(this.eventObj === undefined) {	//EventsTimeline
			this.timelineStart = getScaledTime(getCurrentTime());
		}
		else {	//ItemsTimeline -> already within an event, no items added
			this.timelineStart = this.eventObj.scaledTime;
		}
		this.timelineEnd = this.timelineStart;
	}

	this.timelineStart = this.nodesArr[0].scaledTime;
	this.timelineEnd = this.nodesArr[this.nodesArr.length -1].scaledTime;
}


function getCurrentTime() {
	//returns yyyyMMdd000000
	//NOT scaled. For purpose of EVENTS timeline, if no events exist
	var currentTime = new Date();
	var year = currentTime.getFullYear();
	var month = currentTime.getMonth() + 1;
	var day = currentTime.getDate();

	return year + "" + month + "" + day + "000000";
}

//Used by Event.js and Item.js and Timeline.js
function getScaledTime(givenTime) {
	//Change givenTime (yyyyMMddHHmmss) to scaled time
	//ie: scale 12 months to 100

	//givenYear = scaledYear
	var scaledTime = givenTime.substring(0, 4) * 10000000000;

	var givenMonth = givenTime.substring(4, 6);
	var givenDay = givenTime.substring(6, 8);
	var givenHour = givenTime.substring(8, 10);
	var givenMinute = givenTime.substring(10, 12);
	var givenSecond = givenTime.substring(12);

	scaledTime += Math.round( (givenMonth-1)/12 ) * 100000000;
	scaledTime += Math.round( (givenDay-1)/30 ) * 1000000;
	scaledTime += Math.round( (givenHour)/24 ) * 10000;
	scaledTime += Math.round( (givenMinute)/60 ) * 100;
	scaledTime += Math.round( (givenSecond)/60 );

	return scaledTime;
}