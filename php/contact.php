<?php
ini_set('display_errors','On');
error_reporting(E_ALL);

include "util.php";

if (!Util::isRequestMethod('POST'))
  die();

$subject = "[SAKMIT] Contact letter from: " . $_POST["name"];
$body    = $_POST["message"];
$sender  = $_POST["email"];
$from    = "no-reply@sakmit.nure.ua";
$to      = "nickname.qxo@gmail.com";

$headers  = "From: $from \r\n";
$headers .= "Reply-To: $sender \r\n";

// needs SMTP configured
mail($to, $subject, $body, $headers);

Util::redirectLocal("thankYou.html");
?>