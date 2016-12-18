<?php
if (!isset($_POST))
	die();

$subject = $_POST["subject"];
$body    = $_POST["body"];
$sender  = $_POST["sender"];
$from    = "no-reply@sakmit.nure.ua";
$to      = "nickname.qxo@gmail.com";

$headers  = "From: $from \r\n";
$headers .= "Reply-To: $sender \r\n";

// needs SMTP configured
mail($to, $subject, $body, $headers);
?>