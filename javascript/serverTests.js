var submitted = false;

var firstTime = true;

$(document).ready(function() {
	console.log("READY FIRED");
	/*$("#button").click(function() {

	});*/
	/*jQuery(function($){
		$('.fileUpload').fileUploader();
	});*/
	
	/*$('form[name=imageUploading]').submit(function(e) { 
        e.preventDefault();
        var thingToSubmit = $("fileVal").val();
		
		submitAJAX("post", "uploadImage.php", thingToSubmit);
    });*/
	/* Get the names of all the people at event with id = 331218348435
	$.getJSON("https://graph.facebook.com/331218348435/invited?access_token=" + 
		"AAACEdEose0cBAOoFoKFfyo58VK8M8ZAm29Sp34fMDLZBoriEyY3X2L85E3kOaEcHJiI7ZC7oYsxiGhg048FwzQNZCPQ2lsFbQGZByuZCLsWQZDZD&callback=?", function(response) {
				$(response.data).each(function() {
					console.log(this.name);
				});
			});

	*/
	/*$("#fileUpload").submit(function () {
		console.log("HERE");
		$(this).ajaxSubmit();
		//{data: {isImage: 0, note: "I am superman"}}
		return false;
	});*/
	
	if (firstTime) signUpForEvent("It's a good life", "6:00pm on Sunday", "8:00pm on Sunday", "12345", "Time is Now", 5);
	
	/*$('#fileUpload').ajaxForm({ 
		beforeSubmit: ShowRequest,
		success: SubmitSuccesful,
		error: AjaxError                               
    });
	
	function ShowRequest(formData, jqForm, options) {
		console.log(formData);
		var eventID = formData.push({name: "eventID", required: false, type:"text", value: CUR_EVENT.id.toString()});
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
        //var queryString = $.param(formData);
        // console.log('BeforeSend method: About to submit: ' + queryString);
        return true;
	}*/

  
  
  /* Get all the event data for event with id = 154212181397752
  $.getJSON("https://graph.facebook.com/154212181397752/?access_token=" + 
		"AAACEdEose0cBAIlxHBr7MEayBiCTtthpcjRS22sgdmAWeUbfZAuxIWKPkFNR59nfz2NILuZAU3eclVeOW1rvFgY0miJclOBZAdVxxZAZAZCAZDZD&callback=?", function(response) {
				console.log(response);
        id = response.id
        start_time = response.start_time
        end_time = response.end_time
        description = response.description
        title = response.name
        creation_time = response.updated_time
			});
	*/
  
  /* Get the home photo of an event with id = 154212181397752
  $.getJSON("https://graph.facebook.com/154212181397752/picture?access_token=" + 
		"AAACEdEose0cBAIlxHBr7MEayBiCTtthpcjRS22sgdmAWeUbfZAuxIWKPkFNR59nfz2NILuZAU3eclVeOW1rvFgY0miJclOBZAdVxxZAZAZCAZDZD&callback=?", function(response) {
				console.log(response.data.url);
			});
  */

	function AjaxError() {
	  alert("An AJAX error occured.");
	}

	function SubmitSuccesful(responseText, statusText) {      
	  console.log(responseText);
	}    
	
	firstTime = false;
});

function testEXIF() {
	/*var newImg = document.createElement("img");
	$(newImg).attr("src", "javascript/test1.jpg");
	$(newImg).attr("exif", "true");
	console.log(EXIF.getTag(newImg, "ExifVersion"));*/
	/*var oImg = document.getElementById("MyPrettyImage");

	console.log("I was taken by a " + EXIF.getTag(oImg, "Make") + " " + EXIF.getTag(oImg, "Model"));

	// or use the EXIF.pretty() function to put all tags in one string, one tag per line.

	console.log(EXIF.pretty(oImg.exifdata));*/
}

function submitAJAX(postOrGet, urlEnd, data) {
	$.ajax({
		url: "http://www.justingreet.com/WhatHappenedLastNight/php/" + urlEnd,
		type: postOrGet,
		data: data,
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


