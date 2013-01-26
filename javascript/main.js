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