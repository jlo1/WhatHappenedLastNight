var submitted = false;

$(document).ready(function() {
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
  /*
  
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
	
	$('#fileUpload').ajaxForm({                 
            beforeSubmit: ShowRequest,
            success: SubmitSuccesful,
            error: AjaxError                               
    });
	
	function ShowRequest(formData, jqForm, options) {
          var queryString = $.param(formData);
          alert('BeforeSend method: \n\nAbout to submit: \n\n' + queryString);
          return true;
    }

	function AjaxError() {
	  alert("An AJAX error occured.");
	}

	function SubmitSuccesful(responseText, statusText) {        
	  alert("SuccesMethod:\n\n" + responseText);
	}    
	
	//testEXIF();
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


function submitNewActivityRequest() {
	$.ajax({
		url: "http://www.justingreet.com/Build18/php/submitNewActivity.php",
		type: "post",
		data: {task_description: task, users:users, timestamp: "7:00 on Tuesday"},
		dataType: "text", 
		success: function(response, textStatus) {
			$("#stuff").html(response);
		},
		error: function(jqXHR, textStatus, errorThrown){
			alert("Error: " + textStatus + " type: " + errorThrown);
			console.log(textStatus);
			console.log(jqXHR.statusText);
		}
	});
}
