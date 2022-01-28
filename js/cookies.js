function sc(name, value, days) {
 var expires = "";
 if (days) {
  var date = new Date();
  date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
  expires = `expires=${date.toUTCString()}`;
 }
 document.cookie = `${ name }=${ value }; ${ expires }; path=/`;

 console.info(document.cookie);
}

function gc(cname) {
 var name = cname + "=";
 var ca = document.cookie.split(";");
 for (var i = 0; i < ca.length; i++) {
  var c = ca[i];
  while (c.charAt(0) === " ") c = c.substring(1);
  if (c.indexOf(name) !== -1) return c.substring(name.length, c.length);
 }
 return "";
}
