$(document).ready(function() {
	$("#fb_login").click(function() {
		login();
	});
	
	$(".navBar ul li").bind("click", function() {
		if (!IN_LOGOUT) {
			$(".navBar ul li").animate({maxWidth: 200}, 500);
			$(this).animate({maxWidth: MAX_NAV_SIZE}, 1000);
			
			var newID = $(this).attr("class"); 
			switch(newID)
				{
				case "calendar":
				  switchPages("event-page");
				  CUR_NAV_NAME = "calendar";
				  break;
				case "nights":
				  switchPages("party-page");
				  CUR_NAV_NAME = "nights";
				  break;
				//Case logout
				default:
				  //Do SOmething special
				}
		}
		IN_LOGOUT = false;
	});
	
	$("#yesLogout").click(function() {
		switchPages("login-page");
	});
	
	$("#noLogout").click(function() {
		IN_LOGOUT = true;
		$(".logout").animate({maxWidth: 200}, 500);
		var newDest = "." + CUR_NAV_NAME;
		$(newDest).animate({maxWidth: MAX_NAV_SIZE}, 1000);
	});
	
	$("#uploadImage .visiblePart").click(function() {
		if (IMAGE_NOT_EXPANDED) {
			$("#uploadImage").animate({right: 0}, 500);
			IMAGE_NOT_EXPANDED = false;
		}
		else {
			$("#uploadImage").animate({right: -380}, 500);
			IMAGE_NOT_EXPANDED = true;
		}
	});
	
	$("#addNote .visiblePart").click(function() {
		if (NOTE_NOT_EXPANDED) {
			$("#addNote").animate({right: 0, height: 400, top: 200}, 1000);
			NOTE_NOT_EXPANDED = false;
		}
		else {
			$("#addNote").animate({right: -380, height: 40, top: 600}, 1000);
			NOTE_NOT_EXPANDED = true;
		}
	});
	
	$("#noteButton").click(function() {
		
	});
	
	/* Format what happens when the form should be submitted */
	$('#fileUpload').ajaxForm({ 
		beforeSubmit: ShowRequest,
		success: SubmitSuccesful,
		error: AjaxError                               
    });
});

function switchPages(targetPageID) {
	//Don't do anything if they want to navigate to the same page.
	if (targetPageID == CUR_NAV_ID) return;
	
	if (targetPageID == "login-page") $(".navBar").addClass("hideMe");
	
	if (CUR_NAV_ID == "login-page") $(".navBar").removeClass("hideMe");
	
	$(".page").removeClass("active");
	
	var targetPage = "#" + targetPageID;
	$(targetPage).addClass("active");
	CUR_NAV_ID = targetPageID;
}
	
/* function to append data to the form before it gets sent */
function ShowRequest(formData, jqForm, options) {
	CUR_USER = {id: 45};
	console.log(formData);
	var eventID = formData.push({name: "eventID", required: false, type:"text", value: "9"});//CUR_EVENT.id.toString()});
	var userID = formData.push({name: "userID", required: false, type:"text", value: CUR_USER.id.toString()});
	
	if (IS_IMAGE) {
		//Add the fact that it's an image
		formData.push({name: "isImage", required: false, type: "text", value: "1"});
		//Add the content to be empty
		formData.push({name: "note", required: false, type: "text", value: ""});
		//Add the time created to be empty
		formData.push({name: "timeCreated", required: false, type: "text", value: ""});
	}
	else {
		//Add the fact that it's an image
		formData.push({name: "isImage", required: false, type: "text", value: "0"});
		var curDate = new Date();
		curDate = curDate.toString();
		//Add the current time 
		formData.push({name: "timeCreated", required: false, type: "text", value: curDate});
	}
	return true;
}

function AjaxError() {
  alert("An AJAX error occured.");
}

function SubmitSuccesful(responseText, statusText) {      
  if (responseText !== "true") {
	$("#uploadDeets").html("<p>Sorry, that photo can't be uploaded.</p>");
	$("#uploadImage").animate({right: -380}, 5000);
  }
  else {
	$("#uploadImage").animate({right: -380}, 500);
  }
} 

function updateTimeTaken(item_id, time_taken) {
	$.ajax({
		url: "http://www.justingreet.com/WhatHappenedLastNight/php/submitChangeItemTimeCreated.php",
		type: "post",
		data: {item_id: item_id, time_taken: time_taken},
		dataType: "text", 
		success: function(response, textStatus) {
			console.log("Response is (drum roll...) " + response);
			$("#uploadImage").animate({right: -380}, 500);
		},
		error: function(jqXHR, textStatus, errorThrown){
			alert("Error: " + textStatus + " type: " + errorThrown);
			console.log(textStatus);
			console.log(jqXHR.statusText);
		}
	});
}

function sendNewComment(user_id, item_id, comment_text, time_posted) {
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