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