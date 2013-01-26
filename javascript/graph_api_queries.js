/* Queries using the current user data and the Facebook Graph API to get
   information about events, users, etc. */

// Get all events for one user
function get_all_user_events() {
  $.getJSON("https://graph.facebook.com/me/events?fields=name,description,start_time,end_time,location&limit=50&since=1232966686&type=attending&access_token=" + CUR_USER.access_token + "&callback=?", function(response) {
    var all_events = response;
    var current_events = readEventIDs(parseInt(4));
    console.log(current_events);
    var filtered_events = [];
    filtered_events = all_events.data.filter(function (e) {
      for(ev in current_events) {
        if(current_events[ev] == e.id) {
          return false;
        }
      }
      return true;
    });
    console.log(filtered_events);
  });
}