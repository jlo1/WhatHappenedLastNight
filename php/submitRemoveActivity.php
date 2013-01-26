<?php

	/* Get the variable passed to the php call ( */
	$taskID = $_POST["taskID"];
	
	/* Connect to the db */
	$hostname = "db450742974.db.1and1.com";
	$database = "db450742974";
	$username = "dbo450742974";
	$password = "build18";
	
	/* Connect to database and return error if it doesn't work */
	$link = mysql_connect($hostname, $username, $password);
	if (!$link) {
		die("Connection failed: " . mysql_error());
	}
	
	$db_selected = mysql_select_db($database, $link);
	if (!db_selected) {
		die("Can\'t select database: " . mysql_error());
	}

	/* First make a new activity */
	$update_activity_entry = "UPDATE activity SET is_deleted = 1 WHERE task_id = " . $taskID;
	$update_success = mysql_query($update_activity_entry, $link);
	
	/* Return an error if the delete fails */
	if (!$update_success) {
		die("Can\'t update activity.");
	}
	
	/* First make a new activity */
	$update_taskList_entry = "DELETE FROM taskList WHERE task_id = " . $taskID;
	$update_success = mysql_query($update_taskList_entry, $link);
	
	/* Return an error if the delete fails */
	if (!$update_success) {
		die("Can\'t update taskList.");
	}
	
	echo "true";
	
	/* Close db connection */ 
	mysql_close($link);	
?>