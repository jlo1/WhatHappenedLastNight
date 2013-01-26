/* Queries using the current user data and the Facebook Graph API to get
   information about events, users, etc. */

// Get all events for one user
function get_all_user_events() {
  $.getJSON("https://graph.facebook.com/me/events?limit=50&type=attending&access_token=" + CURR_USER.access_token + "&callback=?", function(response) {
    console.log(response);
  });
}

function filter_events(query) {

}
    
    
    
    * Get events the current user is attending, if not listed, run getJSON on the "next" pagination field
    $.getJSON("https://graph.facebook.com/me/events/attending?access_token=" + 
		"AAACEdEose0cBAJG9ZA3xmcpxZC5x4gJwJzwKyyJlAze1ZAII2P83o85pQE60uiZCLUSL6weZCtrXZCKmYlSgcqU95L16ZBSZARPa3a3UMg2DzQZDZD&callback=?", function(response) {
					console.log(response);
			});
*/