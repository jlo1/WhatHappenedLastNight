<?php
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
	$root = $xmlDoc -> appendChild($xmlDoc -> createElement("EventIDs"));
	
	$login_entry = "SELECT event_id FROM attendanceRecord WHERE user_id = " . $user_id;
	$login_success = mysql_query($login_entry, $link);
	
	while ($row = mysql_fetch_array($login_success)) {	
		$root->appendChild($xmlDoc->createElement("EventID", $row['event_id']));
	}
	/* return the XML doc we created */
	echo $xmlDoc->saveXML();
	
	/* Close db connection */ 
	mysql_close($link);
?>