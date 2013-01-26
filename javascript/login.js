function loginUser(name, access_token, fb_url) {
	var user_id;
  $.ajax({
		url: "http://www.justingreet.com/WhatHappenedLastNight/php/submitLogin",
		type: "post",
		data: {name: name, fb_url: fb_url, access_token: access_token},
		dataType: "text",
    async:false,
		success: function(response, textStatus) {
			console.log("Response is (drum roll...) " + response);
      user_id = response;
		},
		error: function(jqXHR, textStatus, errorThrown){
			alert("Error: " + textStatus + " type: " + errorThrown);
			console.log(textStatus);
			console.log(jqXHR.statusText);
		}
	});
  return user_id;
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
    getUserInfo(access_token);
  
    } else {
      // cancelled
    }
  },{scope:'user_events,email'});
}

function getUserInfo(access_token) {
  console.log('Welcome!  Fetching your information.... ');
  
  FB.api('/me', function(response) {
    handleFacebookResponse(response,access_token);
	  console.log('Good to see you, ' + response.name + '.');
  });
}

function handleFacebookResponse(response,access_token) {
  userInfo = [response.name, response.link];

  var id = loginUser(userInfo[0],access_token,userInfo[1]);

  // Updating the CUR_USER global
  CUR_USER = new User(id,access_token,userInfo[0],userInfo[1]);
  get_all_user_events();
	readUserEventsJobe();
  console.log("ABOUT TO SWITCH PAGES!");
  switchPages("party-page");
}