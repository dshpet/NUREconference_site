<?php

function makeCookie() {
	return [
	  "name"  => "sakmit-admin-cookie",
	  "value" => "somerandomkey",
	  "life"  => 60 * 60 * 24 // 1 day
	];
}

function giveCookie() {
  $cookie = makeCookie();
	setcookie($cookie["name"], $cookie["value"], time() + $cookie["life"]);
}

function onLoggedIn() {
	giveCookie(); // refresh
  header("Location: /adminPage.html", true, 301);
}

$hashes = [
  1216985755 // 'password' hashed in js
];

if (strtoupper($_SERVER['REQUEST_METHOD']) != 'POST') {
	$cookie = makeCookie();
	if ($_COOKIE[$cookie["name"]] == $cookie["value"])
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