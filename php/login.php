<?php
ini_set('display_errors','On');
error_reporting(E_ALL);

include "cookies.php";

function onLoggedIn() {
  Cookies::give();
  header("Location: http://".$_SERVER['HTTP_HOST']."/adminPage.html", true, 301);
  die();
}

$hashes = array(
  1216985755 // 'password' hashed in js
);

if (strtoupper($_SERVER['REQUEST_METHOD']) != 'POST') {
	if (Cookies::has())
		onLoggedIn();
	else {
		header("Location: http://".$_SERVER['HTTP_HOST']."/login.html", true, 301);
		die();
	}
}
else {
	$hash = $_POST['password'];
	if (in_array($hash, $hashes))
		onLoggedIn();
	else {
		header("Location: http://".$_SERVER['HTTP_HOST']."/login.html", true, 301);
		die();
	}
}
?>