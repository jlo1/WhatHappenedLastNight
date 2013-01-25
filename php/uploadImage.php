<?php
	/*include("uploadClass.php"); //classes is the map where the class file is stored
	$upload = new file_upload();

	//$upload->upload_dir = 'uploads/';
	$upload->upload_dir = "";
	$upload->extensions = array('.png', '.jpg', '.zip', '.pdf'); // specify the allowed extensions here
	$upload->rename_file = true;


	if(!empty($_FILES)) {
		$upload->the_temp_file = $_FILES['userfile']['tmp_name'];
		$upload->the_file = $_FILES['userfile']['name'];
		imagejpeg($upload->the_file, 'basicImage.jpg');
		
		$exif = exif_read_data('basicImage.jpg', 0, true);
		foreach ($exif as $key => $section) {
			foreach ($section as $name => $val) {
				echo "$key.$name: $val<br />\n";
			}
		}
		echo("User file: " . $upload->the_file);
		$upload->http_error = $_FILES['userfile']['error'];
		$upload->do_filename_check = 'y'; // use this boolean to check for a valid filename
		if ($upload->upload()) {

			echo '<div id="status">success</div>';
			echo '<div id="message">'. $upload->file_copy .' Successfully Uploaded</div>';
			//return the upload file
			echo '<div id="uploadedfile">'. $upload->file_copy .'</div>';

		} else {

			echo '<div id="status">failed</div>';
			echo '<div id="message">'. $upload->show_error_string() .'</div>';

		}
	}*/
	
   $destination_path = getcwd().DIRECTORY_SEPARATOR;
 
   $result = 0;
 
   $target_path = $destination_path . basename( $_FILES['myfile']['name']);
	echo("Name: " . $_FILES['myfile']['name'] . "\n");
   if(@move_uploaded_file($_FILES['myfile']['tmp_name'], "latest.jpg")) {
      echo("Uploaded the file");
   }
   
	$exif = exif_read_data('latest.jpg', 0, true);
	foreach ($exif as $key => $section) {
		foreach ($section as $name => $val) {
			echo "$key.$name: $val<br />\n";
		}
	}
 
   sleep(1);
?>