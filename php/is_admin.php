<?php
	
	ini_set('display_errors','On');
	error_reporting(E_ALL);

	include "cookies.php";

	echo json_encode(
		  ["hasAdminAccess" => Cookies::has()]
		);
?>