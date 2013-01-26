<?php
	
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
	
	/* Make an XML document to return */
	$xmlDoc = new DOMDocument();
	$root = $xmlDoc -> appendChild($xmlDoc -> createElement("TaskCount"));
	/* XML Structure
		<TaskCount>
			<Count>
				<User>$value</User>
				<Counter>$value</Counter>
			</Count>
		</TaskCount>
	*/
		/* Make the query */
	$activity_entry = "SELECT user_name, COUNT(*) FROM taskList INNER JOIN activity USING(task_id) WHERE completed = user_name GROUP BY user_name";
	$activity_result = mysql_query($activity_entry, $link);
	/* Format the result */
	/* NOTE: This must immediately follow the query */
	while ($row = mysql_fetch_array($activity_result)) {			
		$curAct = $root->appendChild($xmlDoc->createElement("Count"));
		
		$curAct->appendChild($xmlDoc->createElement("User", $row['user_name']));
		
		$curAct->appendChild($xmlDoc->createElement("Counter", $row['COUNT(*)']));
	}
	
	/* return the XML doc we created */
	echo $xmlDoc->saveXML();
	
	/* Close db connection */ 
	mysql_close($link);
	
?>