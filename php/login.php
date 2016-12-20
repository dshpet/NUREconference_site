<?php
ini_set('display_errors','On');
error_reporting(E_ALL);

include "cookies.php";
include "util.php";

function tryLogin() {
  $hashes = array(
    1216985755 // 'password' hashed in js
  );

  if (Util::isRequestMethod('POST'))
    return in_array($_POST['password'], $hashes);
  else
    return Cookies::has();
}

if (tryLogin()) {
  Cookies::give();
  Util::redirectLocal('adminPage.html');
}
else
  Util::redirectLocal('login.html');
?>