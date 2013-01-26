function signUpForEvent(description, start_time, end_time, fb_event_id, title, user_id) {
	$.ajax({
		url: "http://www.justingreet.com/WhatHappenedLastNight/php/signUpForEvent.php",
		type: "post",
		data: {description: description, start_time: start_time, end_time: end_time, fb_event_id: fb_event_id, title: title, user_id: user_id},
		dataType: "text", 
		success: function(response, textStatus) {
			console.log("Response is (drum roll...) " + response);
		},
		error: function(jqXHR, textStatus, errorThrown){
			alert("Error: " + textStatus + " type: " + errorThrown);
			console.log(textStatus);
			console.log(jqXHR.statusText);
		}
	});
}

/* TODO: get the formatted time that the comment was made! */
function sendNewComment(user_id, item_id, comment_text, time_posted) {
	time = new Date();
	time = time.toString('yyy-MM-dd');
	console.log(time);
	$.ajax({
		url: "http://www.justingreet.com/WhatHappenedLastNight/php/submitNewComment.php",
		type: "post",
		data: {user_id: user_id, item_id: item_id, comment_text: comment_text, time_posted: time_posted},
		dataType: "text", 
		success: function(response, textStatus) {
			console.log("Response is (drum roll...) " + response);
		},
		error: function(jqXHR, textStatus, errorThrown){
			alert("Error: " + textStatus + " type: " + errorThrown);
			console.log(textStatus);
			console.log(jqXHR.statusText);
		}
	});
}

function updateTimeTaken(item_id, time_taken) {
	$.ajax({
		url: "http://www.justingreet.com/WhatHappenedLastNight/php/submitChangeItemTimeCreated.php",
		type: "post",
		data: {item_id: item_id, time_taken: time_taken},
		dataType: "text", 
		success: function(response, textStatus) {
			console.log("Response is (drum roll...) " + response);
		},
		error: function(jqXHR, textStatus, errorThrown){
			alert("Error: " + textStatus + " type: " + errorThrown);
			console.log(textStatus);
			console.log(jqXHR.statusText);
		}
	});
}

function readUserEvents(user_id) {
	$.ajax({
		url: "http://www.justingreet.com/WhatHappenedLastNight/php/readEventsForUser.php",
		type: "post",
		data: {user_id: user_id},
		dataType: "xml", 
		success: function(response, textStatus) {
			console.log("Response is (drum roll...) \n" + response);
		},
		error: function(jqXHR, textStatus, errorThrown){
			alert("Error: " + textStatus + " type: " + errorThrown);
			console.log(textStatus);
			console.log(jqXHR.statusText);
		}
	});
}

function readEventIDs(user_id) {
	var allIDs = [];
	$.ajax({
		url: "http://www.justingreet.com/WhatHappenedLastNight/php/readEventIDsForUser.php",
		type: "post",
		data: {user_id: user_id},
		dataType: "xml", 
		async: false,
		success: function(response, textStatus) {
			$(response).find("EventID").each(function() {
				allIDs.push($(this).text());
			});
		},
		error: function(jqXHR, textStatus, errorThrown){
			alert("Error: " + textStatus + " type: " + errorThrown);
			console.log(textStatus);
			console.log(jqXHR.statusText);
		}
	});
	return allIDs;
}