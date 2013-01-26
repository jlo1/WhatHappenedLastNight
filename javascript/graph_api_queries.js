/* Queries using the current user data and the Facebook Graph API to get
   information about events, users, etc. */

var filtered_events;

// Get all events for one user
function get_all_user_events() {
  $.getJSON("https://graph.facebook.com/me/events?fields=name,description,start_time,end_time,location&limit=50&since=1232966686&type=attending&access_token=" + CUR_USER.access_token + "&callback=?", function(response) {
    var all_events = response;
    var current_events = readEventIDs(parseInt(CUR_USER.id));
    filtered_events = all_events.data.filter(function (e) {
      for(ev in current_events) {
        if(current_events[ev] == e.id) {
          return false;
        }
      }
      return true;
    });
    console.log(filtered_events);
    display_all_user_events();
  });
}


function display_all_user_events() {
  //get_all_user_events();
  for(var i = 0; i < filtered_events.length; i++) {
    id = filtered_events[i].id;
    name = filtered_events[i].name;
    description = filtered_events[i].description;
    loc = filtered_events[i].location;
    start_time = filtered_events[i].start_time;
    end_time = filtered_events[i].end_time;
    
    var d = document.createElement("div");
    d.className = "event-result";
    $(d).data(id,{data:filtered_events[i]});
    
    var d1 = document.createElement("span");
    d1.className = "event-name";
    $(d1).append(name);
    $(d1).append("<br>");
    //var d2 = document.createElement("span");
    //d2.className = "description";
    //$(d2).append(description);
    var d3 = document.createElement("span");
    d3.className = "event-location";
    $(d3).append(loc);
    $(d3).append("<br>");
    var d4 = document.createElement("span");
    d4.className = "event-date";
    $(d4).append(((new Date(start_time)).toLocaleDateString()));
    $(d4).append("<br>");
    
    $(d).append(d1);
    //$(d).append(d2);
    $(d).append(d3);
    $(d).append(d4);
    
    $(".event-sidebar").append(d);
    console.log("should have added");
    
   
   /* $(".event-result").click(function() {
      $(this).id
    }*/
    
  }
}

function search(query) {
  console.log("SEARCHING");
  var matches = [];
  var query_regex = new RegExp(query,"gi");
  for(var i = 0; i < filtered_events.length; i++) {
    matches.push([i,filtered_events[i].name.match(query_regex).length]);
  }
  console.log(matches);
  matches = matches.sort(function (a,b) {
    return a[1].length - b[1].length;
  });
  console.log(matches);
}