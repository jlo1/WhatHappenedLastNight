<?php
	
	//This is the folder the image should be placed in
	$destination_path = getcwd().DIRECTORY_SEPARATOR . "imageUploads" . DIRECTORY_SEPARATOR;
 
	//If the directory for the image doesn't exist, make it (should only ever happen once) 
	if (!is_dir($destination_path)) mkdir($destination_path);
	
	//Append the name of the image to the end of the destination path
	$target_path = $destination_path . basename( $_FILES['myfile']['name']);
	
	echo($target_path . "\n");
	echo("Name: " . $_FILES['myfile']['name'] . "\n");
	
	//Actually upload the file
	if(@move_uploaded_file($_FILES['myfile']['tmp_name'], "imageUploads" . DIRECTORY_SEPARATOR . "latest2.jpg")) {
		echo("Uploaded the file\n");
	}
   
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
	$exif_ifdo = exif_read_data("imageUploads" . DIRECTORY_SEPARATOR . "latest2.jpg", "IFDO", 0);
	//Get the time the photo was originally taken 
	echo("Original date time: " . $exif_ifdo['DateTime']);
	
	/*foreach ($exif as $key => $section) {
		foreach ($section as $name => $val) {
			echo "$key.$name: $val<br />\n";
		}
	}*/
?>