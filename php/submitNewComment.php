<?php
	/* First get the variables passed to the function */
	$user_id = $_POST["user_id"];
	$item_id = $_POST["item_id"];
	$text = "\"" . $_POST["comment_text"] . "\"";
	$time = "\"" . $_POST["time_posted"] . "\"";
	
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
	
	$login_entry = "INSERT INTO comment VALUES(NULL, " . $user_id . ", " . $item_id . ", " . $text . ", " . $time . ")";
	$login_success = mysql_query($login_entry, $link);
	echo("true");

?>