<?php
ini_set('display_errors','On');
error_reporting(E_ALL);

include "util.php";

if (!Util::isRequestMethod('POST'))
  die();

$authorNames 		= $_POST["name"];
$title 				= $_POST["reportName"];
$address 			= $_POST["address"];
$email 				= $_POST["email"];
$section 			= $_POST["section"];
$participation 		= $_POST["participation"];
$additionalThemes 	= $_POST["additionalTheme"];

$isStudent 			= isset($_POST["studentCheckbox"]);

// if is a student
$university 		= $_POST["university"];
$faculty 			= $_POST["faculty"];
$department 		= $_POST["cathedral"];
$group 				= $_POST["group"];
$scientificDirector = $_POST["lead"];

// else
$country 			= $_POST["country"];
$city 				= $_POST["city"];
$organisation 		= $_POST["organisation"];
$position 			= $_POST["position"];
$degree 			= $_POST["degree"];

$subject = $authorNames . " " . $title;

$body = "";
$body .= "Заявка от " . $authorNames . " на тему " . $title . "\r\n";
$body .= "Секция " . $section . "\r\n";
$body .= "Участвует " . ($participation == "och" ? "очно" : "заочно") . "\r\n";
$body .= "Контактные данные: " . "\r\n";
$body .= 	"\t" . $address . "\r\n";
$body .= 	"\t" . $email . "\r\n";

$body .= "\r\n";
if ($isStudent)
{
	$body .= "ВУЗ: " . $university . "\r\n";
	$body .= "Факультет: " . $faculty . "\r\n";
	$body .= "Кафедра: " . $department . "\r\n";
	$body .= "Группа: " . $group . "\r\n";
	$body .= "Научный руководитель: " . $scientificDirector . "\r\n";
}
else
{
	$body .= "Страна: " . $country . "\r\n";
	$body .= "Город: " . $city . "\r\n";
	$body .= "Организация: " . $organisation . "\r\n";
	$body .= "Должность: " . $position . "\r\n";
	$body .= "Ученая степень: " . $degree . "\r\n";
}

// is it always required?
if ($additionalThemes != "")
	$body .= "\r\n" . "Дополнительные темы: " . $additionalThemes . "\r\n";

$from    = "no-reply@sakmit.nure.ua";
$to      = "nickname.qxo@gmail.com";

$headers  = "From: $from \r\n";
$headers .= "Reply-To: $email \r\n";

// needs SMTP configured
mail($to, $subject, $body, $headers);

Util::redirectLocal("thankYou.html");
?>