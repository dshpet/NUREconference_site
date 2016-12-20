<?php
ini_set('display_errors','On');
error_reporting(E_ALL);

  class Util {
  	public static function redirectLocal($url) {
  		header("Location: http://".$_SERVER['HTTP_HOST'].'/'.$url, true, 301);
  		die();
  	}

  	public static function isRequestMethod($method) {
  		return strtoupper($_SERVER['REQUEST_METHOD']) == $method;
  	}
  }
?>