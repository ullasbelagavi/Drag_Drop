<?php
			
			$conn=mysqli_connect("localhost","root","","");
			// Check connection
			if (mysqli_connect_errno()) {
				echo "Failed to connect to MySQL: " . mysqli_connect_error();
			}
			$request_body = file_get_contents('php://input');
			$phpArray= (array)json_decode($request_body, true);
			$fname = md5($phpArray['FirstName']);
			$lname = md5($phpArray['LastName']); 
			$email = md5($phpArray['Email']); 
			$password = md5($phpArray['Password']); 
			$cpassword = $phpArray['CPassword']; 
			$dob = $phpArray['DOB'];
			$dobtime = $phpArray['DOBwithtime'];
			$doblocaltime= $phpArray['LocalDOB'];
			$ssn= $phpArray['SSN'];
			$telephone= $phpArray['Phone'];
			$creditcardnumber= $phpArray['CreditCardNo'];
			
			
			$sql = "INSERT INTO cmpe280.registration values ('$fname','$lname','$email' ,'$password', '$dob','$doblocaltime','$dobtime','$ssn',	'$telephone','$creditcardnumber')";
			
			if (!mysqli_query($conn,$sql)) {
			die('Registration is incomplete - Error: ' . mysqli_error($conn));
			}
			echo "Registration Successful!!!";			
				
			mysqli_close($conn);
?>