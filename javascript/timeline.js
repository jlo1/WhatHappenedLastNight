var Timeline = function(nodesArr, eventObj) {
	//eventObj is OPTIONAL argument ONLY NEEDED FOR WITHIN AN EVENT
		//(ie: ItemsNodes)
	//	important when clicking the node and what you're displaying
	//	(ie: comments for Item, and event description for Event)
	
	this.nodesArr = nodesArr;
	this.eventObj = eventObj;
	//if this.eventObj === undefined, then in EventsTimeline mode
	//else you're in ItemsTimeline mode. eventObj = Current event


	this.zoomStrIDs = [	"#dayLabels",
						"#weekLabels",
						"#monthLabels",
						"#yearLabels"];
	this.zoomScaleArr =	[3333333,	//3.3 = 1/30 * 100
						 25000000,	//25  = 1month/4weeks * 100
						 833333333,	//8.3 = 1/12 * 100
						 10000000000000]	//1   = 1 year increment
	this.currZoomInd = 2;		//index into zoomScaleArr -> changed in setupTimeline
	this.maxZoomInd = 3;

	this.timelineStart;
	this.timelineEnd;
	this.timelineMin;
	this.timelineMax;

	this.startDate, this.endDate, this.minDate, this.maxDate;

	this.currMin;
	this.currMax;
	this.approxNumTilesArr;

	this.MonthDayNum = [31,28,31,30,31,30,31,31,30,31,30,31];
	this.labelDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
	this.labelMonths = ["Jan", "Feb", "Mar", "Apr", "May",
						"Jun", "Jul", "Aug", "Sep", "Oct",
						"Nov", "Dec"];

	this.setupTimeline();

	$("#zoomIn").on('click', this.zoomIn.bind(this));
	$("#zoomOut").on('click', this.zoomOut.bind(this));

}


Timeline.prototype.setupTimeline = function () {
	//get the first event and last event start time, to know min/max
	setStartEndTimeline.bind(this)();

	this.approxNumTilesArr = [];
	var tlDiff = this.maxDate.getTime() - this.minDate.getTime();
	var oneDay = 1000 * 60 * 60 * 24;

	for (var i=0; i < this.zoomScaleArr.length; i++) {
		if (i > this.maxZoomInd) {
			this.approxNumTilesArr.push(0);
			continue;
		}

		switch(i) {
			case 0:
				approxNumTiles = Math.round(tlDiff/oneDay) + 2;
				break;
			case 1:
				approxNumTiles = Math.round(tlDiff/(oneDay*7)) + 2;
				break;
			case 2:
				approxNumTiles = Math.round(tlDiff/(oneDay*30)) + 2;
				break;
			case 3:
				approxNumTiles = Math.round(tlDiff/(oneDay*365)) + 2;
		}

		this.approxNumTilesArr.push(approxNumTiles);
	}

	//Create html elts

	$(this.zoomStrIDs[this.currZoomInd]).removeClass("hidden");
    this.initializeDraggableTimelineToMiddle(this.approxNumTilesArr[this.currZoomInd]);
}

Timeline.prototype.createHtmlEltsLabels = function(approxNumTilesArr, zoomInd) {
	var i = 0;
	//Year
	//num = year number
	var yearNum = this.minDate.getFullYear();
	if (yearNum % 4 === 0) {
		this.MonthDayNum[1] = 29;
	}
	var num, numTiles, lblObj;
	var mrkObj = $(".tlMarkers");

	lblObj = $(this.zoomStrIDs[zoomInd]);

	var factor;
	switch(zoomInd) {
		case 0:
			factor = 1000*60*60*24;
			break;
		case 1:
			factor = 7*1000*60*60*24;
			break;
		case 2:
			factor = 30*1000*60*60*24;
			break;
		case 3:
			factor = 365*1000*60*60*24;
			break;
	}

	mrkObj.html("");
	for(var j = 0; j < this.nodesArr.length; j++) {
		var nodeTime = getFormatDate(this.nodesArr[j].s_time).getTime();
		var diff = nodeTime - this.minDate.getTime();
		var leftPos = Math.round(diff/factor * 200);

		var marker = $("<div/>").addClass("marker").css("left", leftPos + "px");
		marker.attr("id", "marker"+j);
/*
		if(this.eventObj === undefined) {
			var markerHoverInfo = $("<div/>").addClass("markerHover hidden");
			markerHoverInfo.text(this.nodesArr[j].title);
			marker.append(markerHoverInfo);

			marker.hover(
				function() {
					markerHoverInfo.removeClass("hidden");},
				function() {
					markerHoverInfo.addClass("hidden");}
			);
		}
*/


		marker.on("click", this.handleNodeClick.bind(this));
		mrkObj.append(marker);

	}


	if(zoomInd === 3) {
		num = yearNum;
		numTiles = approxNumTilesArr[3];

		for(i=0; i < numTiles-1; i++) {
			if(zoomInd !== 3) break;
			lblObj.append($("<p/>").text("" + num));
			num = num*1 + 1;
		}
	}

	//Month
	//num = index into labelMonths array
	var monthInd = this.minDate.getMonth();

	if(zoomInd === 2) {
		num = monthInd;
		numTiles = approxNumTilesArr[2];
		for(i=0; i < numTiles-1; i++) {
			if(zoomInd !== 2) break;
			lblObj.append($("<p/>").text(this.labelMonths[num]));
			num += 1;
			if (num >= 12) num = num % 12;
		}
	}

	//Week
	//dateNum = day number (1 - 31)
	var dateNum = this.minDate.getDate();

	if(zoomInd === 1) {
		num = dateNum;
		numTiles = approxNumTilesArr[1];
		if (lblObj.children().length !== 0) return;
		
		for(i=0; i < numTiles-1; i++) {
			if(zoomInd !== 1) break;
			var txt = this.labelMonths[monthInd] + "." + num;
			lblObj.append($("<p/>").text(txt));
			num += 7;
			if (num-1 >= this.MonthDayNum[monthInd]) {
				num = ((num-1) % this.MonthDayNum[monthInd]) + 1;
				monthInd = (monthInd + 1);
				if (monthInd >= 12) {
					monthInd = monthInd%12;
					yearNum += 1;
					if (yearNum % 4 === 0) this.MonthDayNum[1] = 29;
					else this.MonthDayNum[1] = 28;
				}
			}
		}
	}
	//Day
	//num = day number (1 - 31)
	var dayInd = this.minDate.getDay();

	if(zoomInd === 0) {
		num = dateNum;
		numTiles = approxNumTilesArr[0];
		
		for(i=0; i < numTiles-1; i++) {
			if(zoomInd !== 0) break;
			var txt = this.labelDays[dayInd] + "." + num;
			lblObj.append($("<p/>").text(txt));
			num += 1;
			dayInd = (dayInd + 1)%7;

			if (num-1 >= this.MonthDayNum[monthInd]) {
				num = ((num-1) % this.MonthDayNum[monthInd]) + 1;
				monthInd = (monthInd + 1);
				if (monthInd >= 12) {
					monthInd = monthInd%12;
					yearNum += 1;
					if (yearNum % 4 === 0) {
						this.MonthDayNum[1] = 29;
					}
					else {
						this.MonthDayNum[1] = 28;
					} 
				}
			}
		}
	}
}

Timeline.prototype.zoomIn = function() {
	if(this.currZoomInd <= 0) return;
	var oldZInd = this.currZoomInd;
	this.currZoomInd -= 1;
	
	$(this.zoomStrIDs[oldZInd]).html("");

    window.util.transitioner.fadeOut($(this.zoomStrIDs[oldZInd]));
    window.util.transitioner.fadeIn($(this.zoomStrIDs[this.currZoomInd]));

    this.adjustTimelinePosWithZoom(this.approxNumTilesArr[this.currZoomInd]);

}

Timeline.prototype.zoomOut = function() {
	if(this.currZoomInd >= this.zoomScaleArr.length - 1) return;
	if (this.currZoomInd >= this.maxZoomInd) return;
	var oldZInd = this.currZoomInd;
	this.currZoomInd += 1;

	$(this.zoomStrIDs[oldZInd]).html("");

    window.util.transitioner.fadeOut($(this.zoomStrIDs[oldZInd]));
    window.util.transitioner.fadeIn($(this.zoomStrIDs[this.currZoomInd]));

    this.adjustTimelinePosWithZoom(this.approxNumTilesArr[this.currZoomInd]);
}

//First and last events' start time
function setStartEndTimeline() {
	this.startDate;
	this.endDate;
	if (this.nodesArr.length < 1) {
		if(this.eventObj === undefined) {	//EventsTimeline
			this.startDate = new Date();
			this.timelineStart = getScaledTime(getFormatTime(this.startDate));
		}
		else {	//ItemsTimeline -> already within an event, no items added
			this.startDate = getFormatDate(this.eventObj.s_time);
			this.timelineStart = this.eventObj.scaledTime;
		}
		this.endDate = this.startDate;
		this.timelineEnd = this.timelineStart;
		this.timelineMin = getScaledTime(getFormatTime(new Date(this.startDate.setDate(startDate.getDate() - 2))));
		this.timelineMax = getScaledTime(getFormatTime(new Date(this.endDate.setDate(endDate.getDate() + 2))));
		return;
	}

	this.startDate = getFormatDate(this.nodesArr[0].s_time);
	this.timelineStart = this.nodesArr[0].scaledTime;
	this.endDate = getFormatDate(this.nodesArr[this.nodesArr.length-1].s_time);
	this.timelineEnd = this.nodesArr[this.nodesArr.length -1].scaledTime;

	var tlDiff = this.timelineEnd - this.timelineStart;
	var temp1, temp2;
	var tmp1Date = this.startDate;
	var tmp2Date = this.endDate;
	if (tlDiff < 5*this.zoomScaleArr[0]) {		//less than 4 days, will pad +/-2 days
		this.maxZoomInd = 0;
		this.currZoomInd = 0;
		temp1 = tmp1Date.setDate(tmp1Date.getDate() - 2);
		temp2 = tmp2Date.setDate(tmp2Date.getDate() + 2);
	}
	else if (tlDiff < 5*this.zoomScaleArr[1]) {	//less than 4 weeks, will pad +/-2 weeks
		this.maxZoomInd = 1;
		this.currZoomInd = 1;
		temp1 = tmp1Date.setDate(tmp1Date.getDate() - 14);
		temp2 = tmp2Date.setDate(tmp2Date.getDate() + 14);
	}
	else if (tlDiff < 5*this.zoomScaleArr[2]) {	//less than 4 months, will pad +/-2 months
		this.maxZoomInd = 2;
		this.currZoomInd = 2;
		temp1 = tmp1Date.setMonth(tmp1Date.getMonth() - 2);
		temp2 = tmp2Date.setMonth(tmp2Date.getMonth() + 2);
	}
	else {										//pad +/-2 years
		this.maxZoomInd = 3;
		this.currZoomInd = 3;
		temp1 = tmp1Date.setMonth(tmp1Date.getMonth() - 24);
		temp2 = tmp2Date.setMonth(tmp2Date.getMonth() + 24);
	}
	this.minDate = new Date(temp1);
	this.maxDate = new Date(temp2);
	this.timelineMin = getScaledTime(getFormatTime(this.minDate));
	this.timelineMax = getScaledTime(getFormatTime(this.maxDate));
	this.startDate = getFormatDate(this.nodesArr[0].s_time);
	this.endDate = getFormatDate(this.nodesArr[this.nodesArr.length -1].s_time);
}

function getFormatTime(dateType) {
	//returns yyyyMMdd000000
	//NOT scaled. For purpose of EVENTS timeline, if no events exist
	var year = dateType.getFullYear();
	var month = "" + (dateType.getMonth() + 1);
	var day = dateType.getDate();

	if(month.length === 1) month = "0" + month;
	if(day.length === 1) day = "0" + day;
	return year + "" + month + "" + day + "000000";
}

function getFormatDate(time) {
	//time = yyyyMMddHHmmss

	var givenYear = time.substring(0, 4);
	var givenMonth = time.substring(4, 6);
	var givenDay = time.substring(6, 8);
	return (new Date(givenYear, givenMonth*1-1, givenDay));

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

	var MonthDayNum = [31,30,31,30,31,30,31,31,30,31,30,31];
	var daysInMonth = MonthDayNum[givenMonth*1 - 1]

	scaledTime += Math.round( (givenMonth-1)/12 * 100) * 100000000;
	scaledTime += Math.round( (givenDay-1)/daysInMonth * 100 ) * 1000000;
	scaledTime += Math.round( (givenHour)/24 * 100) * 10000;
	scaledTime += Math.round( (givenMinute)/60*100 ) * 100;
	scaledTime += Math.round( (givenSecond)/60 *100 );

	return scaledTime;
}


Timeline.prototype.initializeDraggableTimelineToMiddle = function(approxNumTiles) {

    $("#timelineImg").css("width", 200*approxNumTiles + "px");
    var parentPos = $("#timelineNav").offset();
    var childPos = $("#timelineImg").offset();

    var img = $("#timelineImg").draggable({ containment: '#timelineImgWrapper'}),
        h = img.height(),
        w = img.width(),
        outer = $('#timelineNav'),
        oH = outer.height(),
        oW = outer.width(),
        iH = h + (h - oH),
        iW = w + (w - oW),
        iT = '-' + ((iH - oH)/2) + 'px',
        iL = '-' + ((iW - oW)/2) + 'px';

    $('#timelineImgWrapper').css({ width: iW, height: iH, top: iT, left: iL });

	this.createHtmlEltsLabels(this.approxNumTilesArr, this.currZoomInd);

    var leftPosToSetImgPos = 0;
    //FOR: EventsTimeline: Current date
    if (this.eventObj === undefined) {
    	var currScaledTime = getScaledTime(getFormatTime(new Date()));
    	
    	//case: currscaledtime is out of range
    	if (currScaledTime > this.timelineEnd)
    		currScaledTime = this.timelineEnd;

    	var ratio = (currScaledTime - this.timelineMin) /
    				(this.timelineMax - this.timelineMin);
    	leftPosToSetImgPos = Math.round(w - oW - (ratio * w) + oW/2);
    }
    //FOR: ItemsTimeline: Go to beginning
    else {
    	leftPosToSetImgPos = Math.round(w - oW);
    }
    this.setSliderPos(leftPosToSetImgPos);
}


Timeline.prototype.adjustTimelinePosWithZoom = function(approxNumTiles) {
	var oldLeft = parseInt($("#timelineImg").css("left"));
	var oldw = parseInt($("#timelineImg").css("width"));
	var oldoW = parseInt($('#timelineNav').css("width"));


	var ratio = (oldw - oldoW - oldLeft + oldoW/2)/oldw;

	var offset = oldLeft *1 % 200; 

    $("#timelineImg").css("width", Math.round(200*approxNumTiles) + "px");
    var parentPos = $("#timelineNav").offset();
    var childPos = $("#timelineImg").offset();

    var img = $("#timelineImg").draggable({ containment: '#timelineImgWrapper'}),
        h = img.height(),
        w = img.width(),
        outer = $('#timelineNav'),
        oH = outer.height(),
        oW = outer.width(),
        iH = h + (h - oH),
        iW = w + (w - oW),
        iT = '-' + ((iH - oH)/2) + 'px',
        iL = '-' + ((iW - oW)/2) + 'px';

    $('#timelineImgWrapper').css({ width: iW, height: iH, top: iT, left: iL });

	this.createHtmlEltsLabels(this.approxNumTilesArr, this.currZoomInd);
	var leftPosToSetImgPos = Math.round(w - oW - (ratio * w) + oW/2);

    this.setSliderPos(Math.floor(leftPosToSetImgPos/200)*200 + offset);
    /*TOCHANGE: ADJUST TO ZOOM IN AND KEEP OFFSET AS MOD
    //FOR: EventsTimeline: Current date
    if (this.eventObj === undefined) {
    	var currScaledTime = getScaledTime(getFormatTime(new Date()));
    	
    	//case: currscaledtime is out of range
    	if (currScaledTime > this.timelineEnd)
    		currScaledTime = this.timelineEnd;

    	var ratio = (currScaledTime - this.timelineMin) /
    				(this.timelineMax - this.timelineMin);
    	leftPosToSetImgPos = Math.round(w - oW - (ratio * w) + oW/2);
    }
    //FOR: ItemsTimeline: Go to beginning
    else {
    	leftPosToSetImgPos = Math.round(w - oW);
    }
    */
}

Timeline.prototype.setSliderPos = function(centeredScaledTime) {

    var w = $("#timelineImg").width();
    var oW = $('#timelineNav').width();

	//centeredScaledTime = time you want to position around
    if(centeredScaledTime > w-oW) centeredScaledTime = w-oW;
    if (centeredScaledTime < 0) centeredScaledTime = 0;

    $("#timelineImg").css({left: centeredScaledTime + 'px'});
}