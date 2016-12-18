// Copy-paste from Java's String source
String.prototype.hashCode = function() {
  var hash = 0, i, chr, len;
  if (this.length === 0) return hash;
  for (i = 0, len = this.length; i < len; i++) {
    chr   = this.charCodeAt(i);
    hash  = ((hash << 5) - hash) + chr;
    hash |= 0; // Convert to 32bit integer
  }
  return hash;
};

var hashes = [
	1216985755
];

function tryLogin() {
	var password = $('#password').val();
	var hash     = password.hashCode();

	if (hashes.indexOf(hash) < 0)
		tryAgain();
	else
		onLoggedIn();
}

function tryAgain() {
	console.log('wrong password');
	// maybe some red glowing animation?
}

function giveCookie() {
	var expirationDate = new Date();
	expirationDate.setTime(expirationDate.getTime() + 7 * 24 * 60 * 60);
	document.cookie = 'hasAdminAccess=1; expires=' + 
	                  expirationDate.toUTCString() +
	                  ';';
}

function onLoggedIn() {
	console.log('logged in');
	giveCookie();
	goToAdminPage();
}

// Returns Bool
function tryRefreshCookie() {
	var cookieParts = document.cookie.split(';');
	for (var i = 0; i < cookieParts.length; ++i) {
		var part = cookieParts[i].trim();
		if (part.indexOf('hasAdminAccess') >= 0) {
			giveCookie(); // refresh expiration date
			return true;
		}
	}

	return false;
}

function goToAdminPage() {
	window.location.href = "/adminPage";
}

$(document).ready(function() {
	// Redirect if already has cookie
	if (tryRefreshCookie())
		goToAdminPage();
	else {
		$('#login-form').submit(function(e) {
			e.preventDefault();
			tryLogin();
		})
	}
});