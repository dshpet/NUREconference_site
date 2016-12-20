<?php
  ini_set('display_errors','On');
  error_reporting(E_ALL);

	class Cookies {
		private static $name  = "sakmit-admin-cookie";
		private static $value = "somerandomkey";
		private static $life  = 86400; // 1 day

		public static function has() {
			return isset($_COOKIE[self::$name]) && $_COOKIE[self::$name] == self::$value;
		}

		public static function give() {
			setcookie(self::$name, self::$value, time() + self::$life);
		}
	}
?>