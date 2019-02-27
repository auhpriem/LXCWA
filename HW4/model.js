function Account(typeOfContribution, number, PIN, balance, creationDate, user, userType, accountHistory ) {
	this.number = number;
	this.PIN = PIN;
	this.balance = balance;
	this.creationDate = creationDate;
	this.user = user;
	this.userType = userType;
	this.accountHistory = accountHistory;
	this.typeOfContribution = typeOfContribution;

	this.getAccountHistory = function () {
		return this.accountHistory;
	}
	this.setAccountHistory = function (accountHistory) {
		this.accountHistory = accountHistory;
	}
	this.getUserType = function () {
		return this.userType;
	}
	this.setUserType = function (userType) {
		this.userType = userType;
	}
	this.getUser = function () {
		return this.user;
	}
	this.setUser = function (user) {
		this.user = user;
	}
	this.getCreationDate = function () {
		return this.creationDate;
	}
	this.setCreationDate = function (creationDate) {
		this.creationDate = creationDate;
	}
	this.getBalance = function () {
		return this.balance;
	}
	this.setBalance = function (balance) {
		this.balance = balance;
	}
	this.getPIN = function () {
		return this.PIN;
	}
	this.setPIN = function (PIN) {
		this.PIN = PIN;
	}
	this.getNumber = function () {
		return this.number;
	}
	this.setNumber = function (number) {
		this.number = number;
	}
	this.getTypeOfContribution = function () {
		return this.typeOfContribution;
	}
}

function CurrentAccount(typeOfContribution) {
	Account.call(this, typeOfContribution);
}

function SavingsAccount(typeOfContribution) {
	Account.call(this, typeOfContribution);
}

(function () {
	function toJSONString(form) {
		var elements = form.querySelectorAll("input, select, textarea");
		var obj;
		if( elements[0].value == "current" ){
			obj = new CurrentAccount(elements[0].value);
		}else if( elements[0].value == "savings" ){
			obj = new SavingsAccount(elements[0].value);
		} else {
			return "";
		}

		for (var i = 0; i < elements.length; ++i) {
			var element = elements[i];
			switch (element.name) {
				case 'number':
					obj.setNumber(element.value);
					break;
				case 'PIN':
					obj.setPIN(element.value);
					break;
				case 'balance':
					obj.setBalance(element.value);
					break;
				case 'DateOfAccountCreation':
					obj.setCreationDate(element.value);
					break;
				case 'user':
					obj.setUser(element.value);
					break;
				case 'userType':
					obj.setUserType(element.value);
					break;
			}
		}

		return JSON.stringify(obj);
	}

	document.addEventListener("DOMContentLoaded", function () {
		var form = document.getElementById("mainForm");
		var output = document.getElementById("output");
		var addButton = document.getElementById("add");

		addButton.addEventListener('click', function (e) {
			e.preventDefault();
			var json = toJSONString(form);
			output.innerHTML = json;

		}, false);

	});

})();

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