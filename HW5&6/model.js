function Account(typeOfContribution, number, PIN, balance, creationDate, user, userType, accountHistory) {
	this.number = number;
	this.PIN = PIN;
	this.balance = balance;
	this.creationDate = creationDate;
	this.user = user;
	this.userType = userType;
	this.accountHistory = accountHistory;
	this.typeOfContribution = typeOfContribution;
}

Account.prototype.getAccountHistory = function () {
	return this.accountHistory;
}
Account.prototype.setAccountHistory = function (accountHistory) {
	this.accountHistory = accountHistory;
}
Account.prototype.getUserType = function () {
	return this.userType;
}
Account.prototype.setUserType = function (userType) {
	this.userType = userType;
}
Account.prototype.getUser = function () {
	return this.user;
}
Account.prototype.setUser = function (user) {
	this.user = user;
}
Account.prototype.getCreationDate = function () {
	return this.creationDate;
}
Account.prototype.setCreationDate = function (creationDate) {
	this.creationDate = creationDate;
}
Account.prototype.getBalance = function () {
	return this.balance;
}
Account.prototype.setBalance = function (balance) {
	this.balance = balance;
}
Account.prototype.getPIN = function () {
	return this.PIN;
}
Account.prototype.setPIN = function (PIN) {
	this.PIN = PIN;
}
Account.prototype.getNumber = function () {
	return this.number;
}
Account.prototype.setNumber = function (number) {
	this.number = number;
}
Account.prototype.getTypeOfContribution = function () {
	return this.typeOfContribution;
}

function CurrentAccount(typeOfContribution) {
	Account.call(this, typeOfContribution);
}

function SavingsAccount(typeOfContribution) {
	Account.call(this, typeOfContribution);
}

SavingsAccount.prototype = Object.create(Account.prototype);
SavingsAccount.prototype.constructor = SavingsAccount;

CurrentAccount.prototype = Object.create(CurrentAccount.prototype);
CurrentAccount.prototype.constructor = CurrentAccount;

/* for testing

var obj = new CurrentAccount();
obj.setNumber(414214124214);
obj.setAccountHistory([{"id" : 1, "text" : "blocked 1000 USD"} ]);
obj.setBalance(586);
obj.setCreationDate((new Date()).toDateString());
obj.setPIN(7777);
obj.setUser("auhpriem");
obj.setUserType("hhh");
console.log("getNumber: " + obj.getNumber());
console.log("getAccountHistory: " + obj.getAccountHistory()[0].text);
console.log("getBalance: " + obj.getBalance());
console.log("getCreationDate: " + obj.getCreationDate());
console.log("getPIN: " + obj.getPIN());
console.log("getTypeOfContribution: " + obj.getTypeOfContribution());
console.log("getUser: " + obj.getUser());
console.log("getUserType: " + obj.getUserType());

*/