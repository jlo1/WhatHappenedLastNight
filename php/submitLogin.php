<?php
	/* First get the variables passed to the function */
	$name = "\"" . $_POST["name"] . "\"";
	$fb_url = "\"" . $_POST["fb_url"] . "\"";
	$access_token = "\"" . $_POST["access_token"] . "\"";
	
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
	
	$userID;
	
	$login_entry = "SELECT * FROM user WHERE fb_url = " . $fb_url;
	$login_success = mysql_query($login_entry, $link);
	$num_results = mysql_num_rows($login_success);
	if ($num_results > 0) {
		$update_entry = "UPDATE user SET access_token = " . $access_token . " WHERE fb_url = " . $fb_url;
		$update_success = mysql_query($update_entry, $link);
		
		$id_entry = "SELECT user_id FROM user WHERE fb_url = " . $fb_url;
		$id_success = mysql_query($id_entry, $link);
		while ($row = mysql_fetch_array($id_success)) {
			$userID = $row['user_id'];
		}	
	}
	else {
		$register_entry = "INSERT INTO user VALUES(NULL, " . $name . ", " . $access_token . ", " . $fb_url . ")";
		$register_success = mysql_query($register_entry, $link);
		$userID = mysql_insert_id();
	}
	
	echo($userID);

?>