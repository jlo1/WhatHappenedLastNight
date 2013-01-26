/* When the user submits an item, if it is an image this is true. 
 * If it is a note, this is false */
IS_IMAGE = false;

/* Store the object that contains information about the user currently logged in */
CUR_USER = {id: 564};

CUR_EVENT_ITEMS = [new Item(14, 8, 3, "3:00", 0, "The first ever message. Crazy night", []), 
					new Item(15, 8, 3, "2:30", 1, "lol.jpg", []), 
					new Item(16, 8, 5, "7:30", 0, "Glad That night finally finished up!", [])];

/* If an event is being looked at, store the object that contains its information.
 * This is used when a user adds a comment or an item */
CUR_EVENT = new Event(8, "Tartan Hacks", "The party going down at Tartan Hacks", "1-1-2010", "1-2-2010", "fb1", "CHANGE", CUR_EVENT_ITEMS);
