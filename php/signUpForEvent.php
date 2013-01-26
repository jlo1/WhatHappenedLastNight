<?php
	/* First get the variables passed to the function */
	$descr = "\"" . $_POST["description"] . "\"";
	$s_time = "\"" . $_POST["start_time"] . "\"";
	$e_time = "\"" . $_POST["end_time"] . "\"";
	$fb_event_id = "\"" . $_POST["fb_event_id"] . "\"";
	echo("fb_event_id: " . $fb_event_id);
	$title = "\"" . $_POST["title"] . "\"";
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
	
	$eventID;
	
	$login_entry = "SELECT * FROM event WHERE facebook_event_id = " . $fb_event_id;
	$login_success = mysql_query($login_entry, $link);
	$num_results = mysql_num_rows($login_success);
	if ($num_results > 0) {
		echo("num results greater 0\n");
		$id_entry = "SELECT event_id FROM event WHERE facebook_event_id = " . $fb_event_id;
		$id_success = mysql_query($id_entry, $link);
		while ($row = mysql_fetch_array($id_success)) {
			$eventID = $row['event_id'];
		}	
	}
	else {
		echo("num results 0\n");
		$register_entry = "INSERT INTO event VALUES(NULL, " . $descr . ", " . $s_time . ", " . $e_time . ", " . $fb_event_id . ", NULL, " . $title . ")";
		echo("register entry: " . $register_entry . "\n");
		$register_success = mysql_query($register_entry, $link);
		$eventID = mysql_insert_id();
	}
	
	$user_entry = "INSERT INTO attendanceRecord VALUES(NULL, " . $eventID . ", " . $user_id . ")";
	$user_success = mysql_query($user_entry, $link);
	
	echo($eventID);

?>