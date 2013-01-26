function readUserEventsJobe() {
	user_id = CUR_USER.id;
	$.ajax({
		url: "http://www.justingreet.com/WhatHappenedLastNight/php/readEventsForUser.php",
		type: "post",
		data: {user_id: user_id},
		dataType: "text", 
		async: false,
		success: function(response, textStatus) {
			//console.log(response);
			parseHugeXML(response);
		},
		error: function(jqXHR, textStatus, errorThrown){
			//alert("Error: " + textStatus + " type: " + errorThrown);
			console.log("AJAX ERROR!");
			console.log(textStatus);
			console.log(jqXHR.statusText);
		}
	});
}

function parseHugeXML(response) {
	allEvents = [];
	$(response).find("Event").each(function() {
		var title = $(this).find("title").text();
		var event_id = $(this).find("event_id").text();
		var description = $(this).find("description").text();
		var s_time = $(this).find("startTime").text();
		var e_time = $(this).find("endTime").text();
		var fb_event_id = $(this).find("fb_event_id").text();
		var home_image = $(this).find("homeImage").text();
		var images = [];
		$(this).find("Item").each(function() {
			var item_id = $(this).find("item_id").text();
			var is_image = $(this).find("is_image").text();
			var content = $(this).find("content").text();
			var time_created = $(this).find("time_created").text();
			var poster_username = $(this).find("poster_username").text();
			var comments = [];
			$(this).find("Comment").each(function () {
				var comment_maker = $(this).find("username").text();
				var comment_time = $(this).find("time_posted").text();
				var comment_text = $(this).find("comment_text").text();
				comments.push(new Comment(event_id, comment_maker, comment_text, comment_time));
			});
			images.push(new Item(item_id, event_id, poster_username, time_created, is_image, contents, comments));
		});
		allEvents.push(new Event(event_id, title, description, s_time, e_time, fb_event_id, home_image, images));
		
		EVENT_TIMELINE = new Timeline(allEvents);
	});
	//console.log(allEvents);
	
}