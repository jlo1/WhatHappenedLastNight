function loginUser(name, access_token, fb_url) {
	$.ajax({
		url: "http://www.justingreet.com/WhatHappenedLastNight/php/submitLogin",
		type: "post",
		data: {name: name, fb_url: fb_url, access_token: access_token},
		dataType: "text", 
		success: function(response, textStatus) {
			//console.log(response);
		},
		error: function(jqXHR, textStatus, errorThrown){
			alert("Error: " + textStatus + " type: " + errorThrown);
			console.log(textStatus);
			console.log(jqXHR.statusText);
		}
	});
}

// Facebook SDK function - necessary for Facebook login
window.fbAsyncInit = function() {
  
  // Initializes Facebook login, links to app
  FB.init({
    appId      : '279428165518892', // App ID for What Happened Last Night?
    channelUrl : '//www.justingreet.com/WhatHappenedLastNight/channel.html', // Channel File
    status     : true, // check login status
    cookie     : true, // enable cookies to allow the server to access the session
    xfbml      : true  // parse XFBML
  });
  
  // Determines whether or not the user is logged into the app, only
  // logged into Facebook, or not logged in at all
  FB.getLoginStatus(function(response) {
    if (response.status === 'connected') {
      
      // connected
      console.log("connected");
      
    } else if (response.status === 'not_authorized') {
      
      // not_authorized
      console.log("not authorized");
      
    } else {
      
      // not_logged_in
      console.log("not logged in");
      
    }
    });
};

// Load the SDK Asynchronously
(function(d) {
  var js, id = 'facebook-jssdk', ref = d.getElementsByTagName('script')[0];
  if (d.getElementById(id)) {return;}
  js = d.createElement('script'); js.id = id; js.async = true;
  js.src = "//connect.facebook.net/en_US/all.js";
  ref.parentNode.insertBefore(js, ref);
} (document));

// Gets the user's access_token and calls another function to get their name
// and URL, then runs the PHP function loginUser to save the data to the
// database. Also updates the CUR_USER global
function login() {
  FB.login(function(response) {
    console.log(response);
    if (response.authResponse) {
      // connected
      var access_token = FB.getAuthResponse()['accessToken'];
      var userInfo = getUserInfo();
      var id = loginUser(userInfo[0],access_token,userInfo[1]);
      
      // Updating the CUR_USER global
      CUR_USER.access_token = access_token;
      CUR_USER.id = id;
	    CUR_USER.access_token = access_token;
	    CUR_USER.username = userInfo[2];
      CUR_USER.fb_url = userInfo[1];
  
    } else {
      // cancelled
    }
  });
}

function getUserInfo() {
  console.log('Welcome!  Fetching your information.... ');
  FB.api('/me', function(response) {
    console.log('Good to see you, ' + response.name + '.');
    return [response.name, response.link, response.username];
  });
}