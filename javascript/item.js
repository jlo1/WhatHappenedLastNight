var Item = function(id, event_id, user_name, s_time, isImage, content, commentsArr) {
	this.id = id;
	this.event_id = event_id;
	this.user_name = user_name;
	//"s_time" to be consistent with Event object for timeline.js
	this.s_time = s_time;
	this.isImage = isImage;
	this.content = content;
	this.commentsArr = commentsArr;

	this.setup();
}

Item.prototype.setup = function() {
	this.scaledTime = getScaledTime(this.s_time);	//in timeline.js

};


