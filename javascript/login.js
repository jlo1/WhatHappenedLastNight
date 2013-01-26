function loginUser(name, access_token, fb_url) {
	$.ajax({
		url: "http://www.justingreet.com/WhatHappenedLastNight/php/submitLogin",
		type: "post",
		data: {name: name, fb_url: fb_url, access_token: access_token},
		dataType: "text", 
		success: function(response, textStatus) {
			console.log(response);
		},
		error: function(jqXHR, textStatus, errorThrown){
			alert("Error: " + textStatus + " type: " + errorThrown);
			console.log(textStatus);
			console.log(jqXHR.statusText);
		}
	});
}
