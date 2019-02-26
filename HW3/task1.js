var user = prompt("Request User Name", "Valero");
var hasNumber = /\d/;
if (!hasNumber.test(user)) {
    alert((String(user)).split("").reverse().join(""));
} else {
    alert((String(user)).toUpperCase());
}