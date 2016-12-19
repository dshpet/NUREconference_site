<?php
	
	include "cookies.php";

	echo json_encode(
		  ["hasAdminAccess" => Cookies::has()]
		);
?>