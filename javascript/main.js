$(document).ready(function() {
	$("#fb_login").click(function() {
		login();
	});
});

function switchPages(targetPageID) {
	$(".page").removeClass("active");
	
	var targetPage = "#" + targetPageID;
	$(targetPage).addClass("active");
}