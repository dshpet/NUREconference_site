<?php

include "cookies.php";

function onLoggedIn() {
	Cookies::give();
  header("Location: /adminPage.html", true, 301);
}

$hashes = [
  1216985755 // 'password' hashed in js
];

if (strtoupper($_SERVER['REQUEST_METHOD']) != 'POST') {
	if (Cookies::has())
		onLoggedIn();
	else
		header("Location: /login.html", true, 301);
}
else {
	$hash = $_POST['password'];
	if (in_array($hash, $hashes))
		onLoggedIn();
	else
		header("Location: /login.html", true, 301);
}
?>