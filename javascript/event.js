var Event = function(id, title, description, s_time, e_time, fb_link, home_image, itemsArr) {
	this.id = id;
	this.title = title;
	this.description = description;
	this.s_time = s_time;
	this.e_time = e_time;
	this.fb_link = fb_link;
	this.home_image = home_image;
	this.itemsArr = itemsArr;

	this.setup();
}

Event.prototype.setup = function() {
	this.scaledTime = getScaledTime(this.s_time);	//in timeline.js



};

