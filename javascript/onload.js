var currTimeline;

window.onload = function () {
    window.util = new Util();
    window.util.patchFnBind();
    window.util.transitioner = new Transitioner();

    var events = [];
    events.push(new Event(0, "First Event", "Just testing out an event",
    	"20130220000000", "20130110000030", "20130126000000", "", "", [], []));
    events.push(new Event(0, "Second Event", "Time goes so fast~!!",
    	"20130425230000", "20130123000030", "20130126000000", "", "", [], []));
    events.push(new Event(0, "Third Event", "What the heck happened last night?!",
    	"20130625100000", "20130524000030", "20130126000000", "", "", [], []));
    
    currTimeline = new Timeline(events);
}