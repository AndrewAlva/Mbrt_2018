<?php 
	$recipient = "studio@mandelbrot.mx";
	$subject = "You got mail";

	$name = $_POST['name'];
	$company = $_POST['company'];
	$email = $_POST['email'];
	$budget = $_POST['budget'];
	$timeline = $_POST['timeline'];
	$category = $_POST['category'];
	$project = $_POST['project'];
	$formcontent="Hey Mandelbrot, this is a new email written by a user through mandebrot.mx official site; this is what they say:\n\nHi, my name is $name, My company is $company, which belongs to the category $category. My email address is: $email\n\nI have a budget of: $budget and a timescope of $timeline\n\nMy project is about this, $project.\n\nHope to get news from you soon.\n\n\n\nThanks.";
	$mailheader = "From: $email \r\n";
	
	if($subject == false || $name == false || $email == false || $project == false){
		$mail_sent = false;
		
		?>

		<script type="text/javascript">
			alert("We can't send the message with blank fields, please fill the fields required.");
			window.location = '/';
		</script>

		<?php
	} else {
		$mail_sent = mail($recipient, $subject, $formcontent, $mailheader) or die("Error!");
		if ($mail_sent == true){ ?>
			<script language="javascript" type="text/javascript">
				alert('Great! Your message was sent successfully.');
				window.location = '/';
			</script>

		<?php 
		} else { 
		?>

			<script type="text/javascript">
				alert('There was an error and the message could not be sent, try again and if the error persists, try to reach us by our social media channels.');
				window.location = '/';
			</script>
		
		<?php 
		} 
	}	
?>