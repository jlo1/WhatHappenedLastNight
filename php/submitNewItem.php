<?php
	/* First get the variables passed to the function */
	$eventID = intval($_POST["eventID"]);
	$userID = intval($_POST["userID"]);
	// Must be a 1 or a 0
	$isImage = intval($_POST["isImage"]);
	$content = "\"" . "\"";
	$timeCreated = "\"" . "\"";
	$tempFileName = "\"" . "\"";
	// If there's no image, there's text 
	if ($isImage == 0) {
		$content = "\"" . $_POST["note"] . "\"";
		$timeCreated = "\"" . $_POST["timeCreated"] . "\"";
	}
	else {
		$tempFileName = $_FILES['myfile']['tmp_name'];
	}
	
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

	/* First make a new activity */
	$item_entry = "INSERT INTO item VALUES(NULL, " . $eventID . ", " . $userID . ", " . $timeCreated . ", " . strval($isImage) . ", " . $content . ")";
	$item_success = mysql_query($item_entry, $link);
	$new_item_id = mysql_insert_id();
	
	if ($isImage == 0) {
		die("true");
	}
	/* If there's an image, we need to store it on the server and get the time it was created */
	else {
		//echo("About to process image");
		//This is the folder the image should be placed in
		$destination_path = getcwd().DIRECTORY_SEPARATOR . "imageUploads" . DIRECTORY_SEPARATOR;
 
		//If the directory for the image doesn't exist, make it (should only ever happen once) 
		if (!is_dir($destination_path)) mkdir($destination_path);
	
		//Append the name of the image to the end of the destination path
		//$target_path = $destination_path . basename( $_FILES['myfile']['name']);
	
		//echo("Name: " . $_FILES['myfile']['name'] . "\n");
	
		//Actually upload the file
		if(@move_uploaded_file($tempFileName, "imageUploads" . DIRECTORY_SEPARATOR . strval($new_item_id) . ".jpg")) {
		}
		
		/* set the home image if this is the first one for the event */
		$home_entry = "UPDATE event SET home_image = \"http://www.justingreet.com/WhatHappenedLastNight/php/imageUploads/" . strval($new_item_id) . ".jpg\" WHERE event_id = " . $eventID . " AND home_image IS NULL";
		$home_result = mysql_query($home_entry, $link);
		
		if (!$home_result) {
			die("Error updating home image source");
		}
		
		//Get the time the photo was originally taken 
		//echo("Original date time: " . $exif_ifdo['DateTime']);
		
		/* Now update the content to point to the location of the image I just wrote */
		$update_entry = "UPDATE item SET content = \"http://www.justingreet.com/WhatHappenedLastNight/php/imageUploads/" . strval($new_item_id) . ".jpg\" WHERE item_id = " . $new_item_id;
		$update_success = mysql_query($update_entry, $link);
		
		if (!$update_success) {
			die("Error updating the content source");
		}
		
		$exif_ifdo = exif_read_data("imageUploads" . DIRECTORY_SEPARATOR . strval($new_item_id) . ".jpg", "IFDO", 0);
		if (empty($exif_ifdo['DateTime'])) {
			die($new_item_id);
		}
		else {
			$dateTime = $exif_ifdo['DateTime'];
			$change_dateTime = "UPDATE item SET time_created = " . "\"" . strval($dateTime) . "\"" . " WHERE item_id = " . $new_item_id;
			$change_success = mysql_query($change_dateTime, $link);
			
			if (!$change_success) {
				die("Couldn't update the date time of the picture.");
			}	
		}
	}
	
	echo("true");
		
	
	
	/* Now, if there is one, save the image */
	/*else {
		//This is the folder the image should be placed in
		$destination_path = getcwd().DIRECTORY_SEPARATOR . "imageUploads" . DIRECTORY_SEPARATOR;
 
		//If the directory for the image doesn't exist, make it (should only ever happen once) 
		if (!is_dir($destination_path)) mkdir($destination_path);
	
		//Append the name of the image to the end of the destination path
		//$target_path = $destination_path . basename( $_FILES['myfile']['name']);
	
		//echo("Name: " . $_FILES['myfile']['name'] . "\n");
	
		//Actually upload the file
		if(@move_uploaded_file($_FILES['myfile']['tmp_name'], "imageUploads" . DIRECTORY_SEPARATOR . "latest2.jpg")) {
			echo("Uploaded the file\n");
		}
		
		$exif_ifdo = exif_read_data("imageUploads" . DIRECTORY_SEPARATOR . "latest2.jpg", "IFDO", 0);
		//Get the time the photo was originally taken 
		echo("Original date time: " . $exif_ifdo['DateTime']);
	}*/
   
	//$exif = exif_read_data("latest.jpg", 0, true);
	
	/* Before we get any data from it, we need to make sure the image is aligned correctly */
	/*$image = imagecreatefromstring(file_get_contents("imageUploads" . DIRECTORY_SEPARATOR . "latest2.jpg"));
	$exif = exif_read_data("imageUploads" . DIRECTORY_SEPARATOR . "latest2.jpg");
	if(!empty($exif['Orientation'])) {
		switch($exif['Orientation']) {
			case 8:
				$image = imagerotate($image,90,0);
				break;
			case 3:
				$image = imagerotate($image,180,0);
				break;
			case 6:
				$image = imagerotate($image,-90,0);
				break;
		}
	}
	
	$rand_ending = rand();
	echo("temp file location: " . "imageUploads" . DIRECTORY_SEPARATOR . "temp" . strval($rand_ending) . ".jpg\n");
	file_put_contents("imageUploads" . DIRECTORY_SEPARATOR . "temp" . strval($rand_ending) . ".jpg", file_get_contents($image));*/
	
	//Now that the file is there, get all the EXIF data for it.
	//$exif = exif_read_data("imageUploads" . DIRECTORY_SEPARATOR . "latest2.jpg", "IFDO", 0);

	
	/*foreach ($exif as $key => $section) {
		foreach ($section as $name => $val) {
			echo "$key.$name: $val<br />\n";
		}
	}*/
?>