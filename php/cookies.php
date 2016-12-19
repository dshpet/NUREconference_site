<?php
	class Cookies {
		private static $name  = "sakmit-admin-cookie";
		private static $value = "somerandomkey";
		private static $life  = 60 * 60 * 24; // 1 day

		public static function has() {
			return $_COOKIE[self::$name] == self::$value;
		}

		public static function give() {
			setcookie(self::$name, self::$value, time() + self::$life);
		}
	}
?>