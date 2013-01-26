<?php
/* Events sorted by start time (oldest to newest)
<Events>
	<Event>
		<title>
		<description>
		<homeImage>
		<startTime>
		<endTime>
		<fb_event_id>
		<event_id>
		<Items>
			<Item>
				<item_id>
				<is_image>
				<content>
				<time_created>
				<poster_username>
				<Comments>
					<Comment>
						<username>
						<time_posted>
						<comment_text>
					</Comment>
					...
				</Comments>
			</Item>
			...
		</Items>
	</Event>
	...
</Events> */

	/* First get the variables passed to the function */
	$user_id = $_POST["user_id"];
	
	/* db info */
	$hostname = "db452350691.db.1and1.com";
	$database = "db452350691";
	$username = "dbo452350691";
	$password = "tartanhacks123";
	
	/* Connect to database and return error if it doesn't work */
	$link = mysql_connect($hostname, $username, $password);
	if (!$link) {
		die("Connection failed: " . mysql_error());
	}
	
	$db_selected = mysql_select_db($database, $link);
	if (!db_selected) {
		die("Can\'t select database: " . mysql_error());
	}
	
	/* Make an XML document to return */
	$xmlDoc = new DOMDocument();
	$root = $xmlDoc -> appendChild($xmlDoc -> createElement("Events"));
	
	$events_entry = "SELECT DISTINCT event_id, description, start_time, end_time, facebook_event_id, home_image, title FROM event INNER JOIN attendanceRecord USING(event_id) WHERE attendanceRecord.user_id = " . $user_id . " ORDER BY start_time ASC";
	$events_result = mysql_query($events_entry, $link);
	
	while ($row = mysql_fetch_array($events_result)) {	
		echo("Parsing an event.\n");
		$curAct = $root->appendChild($xmlDoc->createElement("Event"));
		
		$curAct->appendChild($xmlDoc->createElement("title", $row['title']));
		
		$curAct->appendChild($xmlDoc->createElement("description", $row['description']));
		
		$curAct->appendChild($xmlDoc->createElement("homeImage", $row['home_image']));
		
		$curAct->appendChild($xmlDoc->createElement("startTime", $row['start_time']));
		
		$curAct->appendChild($xmlDoc->createElement("endTime", $row['end_time']));
		
		$curAct->appendChild($xmlDoc->createElement("fb_event_id", $row['facebook_event_id']));
		
		$curAct->appendChild($xmlDoc->createElement("event_id", $row['event_id']));
		
		$nowItems = $curAct->appendChild($xmlDoc->createElement("Items"));
		
		$items_entry = "SELECT item_id, is_image, content, time_created, user_name FROM item INNER JOIN user USING(user_id) WHERE item.event_id = " . $row['event_id'] . " ORDER BY time_created ASC";
		$items_result = mysql_query($items_entry, $link);
		
		while ($smallRow = mysql_fetch_array($items_result)) {
			echo("Parsing an item.\n");
			$singleItem = $nowItems->appendChild($xmlDoc->createElement("Item"));
			$singleItem->appendChild($xmlDoc->createElement("item_id", $smallRow['item_id']));
			$singleItem->appendChild($xmlDoc->createElement("is_image", $smallRow['is_image']));
			$singleItem->appendChild($xmlDoc->createElement("content", $smallRow['content']));
			$singleItem->appendChild($xmlDoc->createElement("time_created", $smallRow['time_created']));
			$singleItem->appendChild($xmlDoc->createElement("poster_username", $smallRow['user_name']));
			$nowComments = $singleItem->appendChild($xmlDoc->createElement("Comments"));
			
			$comments_entry = "SELECT user_name, time_posted, comment_text FROM comment INNER JOIN user USING(user_id) WHERE comment.item_id = " . $smallRow['item_id'] . " ORDER BY time_posted ASC";
			$comments_result = mysql_query($comments_entry, $link);
			
			while ($tinyRow = mysql_fetch_array($comments_result)) {
				echo("Parsing an item.\n");
				$singleComment = $nowComments->appendChild($xmlDoc->createElement("Comment"));
				$singleComment->appendChild($xmlDoc->createElement("username", $tinyRow['user_name']));
				$singleComment->appendChild($xmlDoc->createElement("time_posted", $tinyRow['time_posted']));
				$singleComment->appendChild($xmlDoc->createElement("comment_text", $tinyRow['comment_text']));
				
			}
		}
	}
			
	/* return the XML doc we created */
	echo $xmlDoc->saveXML();
	
	/* Close db connection */ 
	mysql_close($link);
?>
		