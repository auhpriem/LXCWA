(function () {
	function toJSONString(form) {
		var elements = form.querySelectorAll("input, select, textarea");
		var obj;
		if (elements[1].value == "current") {
			obj = new CurrentAccount(elements[1].value);
		} else if (elements[1].value == "savings") {
			obj = new SavingsAccount(elements[1].value);
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
		var updButton = document.getElementById("upd");
		var delButton = document.getElementById("del");

		updButton.addEventListener('click', function (e) {
			e.preventDefault();
			var json = toJSONString(form);
			//output.innerHTML = json;
			console.log(json);
			xhr = new XMLHttpRequest();
			xhr.withCredentials = true;
			xhr.addEventListener("readystatechange", function () {
				if (this.readyState === 4) {
					alert(this.responseText);
					updateDataTable();
				}
			});
			xhr.open("PUT", "http://195.50.2.67:2403/aliaksandrhlushko-collection/" + document.getElementById("uid").value);
			xhr.setRequestHeader("Content-Type", "application/json");
			xhr.send(json);
		}, false);

		delButton.addEventListener('click', function (e) {
			e.preventDefault();
			//output.innerHTML = json;
			xhr = new XMLHttpRequest();
			xhr.withCredentials = true;
			xhr.addEventListener("readystatechange", function () {
				if (this.readyState === 4) {
					alert(this.responseText);
					updateDataTable();
				}
			});
			xhr.open("DELETE", "http://195.50.2.67:2403/aliaksandrhlushko-collection/" + document.getElementById("uid").value);
			xhr.setRequestHeader("Content-Type", "application/json");
			xhr.send();
		}, false);

		addButton.addEventListener('click', function (e) {
			e.preventDefault();
			var json = toJSONString(form);
			//output.innerHTML = json;
			console.log(json);
			xhr = new XMLHttpRequest();
			xhr.withCredentials = true;
			xhr.addEventListener("readystatechange", function () {
				if (this.readyState === 4) {
					alert(this.responseText);
					updateDataTable();
				}
			});
			xhr.open("POST", "http://195.50.2.67:2403/aliaksandrhlushko-collection");
			xhr.setRequestHeader("Content-Type", "application/json");
			xhr.send(json);
		}, false);

		updateDataTable();

	});

})();

function onRowClick(tableId, callback) {
	var table = document.getElementById(tableId),
		rows = table.getElementsByTagName("tr"),
		i;
	for (i = 0; i < rows.length; i++) {
		table.rows[i].onclick = function (row) {
			return function () {
				callback(row);
			};
		}(table.rows[i]);
	}
};

function updateDataTable() {
	xhr_upd_table = new XMLHttpRequest();
	xhr_upd_table.withCredentials = true;
	xhr_upd_table.addEventListener("readystatechange", function () {
		if (this.readyState === 4) {
			result = JSON.parse(this.response);
			//console.log(result);
			var resultTBody = document.createElement('tbody');
			result.map(function (nthCPU) {
				resultTBody.appendChild(parseResponeRowToTableRow(nthCPU));
			});

			var table = document.getElementById('TBody').parentElement;
			table.replaceChild(resultTBody, document.getElementById('TBody'));
			resultTBody.id = 'TBody';
			console.log('success');

			//add listener to table rows
			onRowClick("TResult", function (row) {
				var curID = row.getElementsByTagName("th")[0].innerHTML;
				console.log("Current ID>>", curID);

				var currentRow = row.getElementsByTagName("td");
				document.getElementById("uid").value = curID;

				document.getElementById("number").value = currentRow[0].innerHTML;
				document.getElementById("typeOfContribution").value = currentRow[1].innerHTML;
				document.getElementById("PIN").value = currentRow[2].innerHTML;
				document.getElementById("balance").value = currentRow[3].innerHTML;
				//var accountCreationDate = new Date(currentRow[4].innerHTML);
				//MyDateString = ('000' + accountCreationDate.getFullYear()).slice(-4) + '-' + ('0' + accountCreationDate.getDate()).slice(-2) +
				//	'-' + ('0' + (accountCreationDate.getMonth() + 1)).slice(-2);
				document.getElementById("DateOfAccountCreation").value = currentRow[4].innerHTML;
				document.getElementById("user").value = currentRow[5].innerHTML;
				document.getElementById("userType").value = currentRow[6].innerHTML;
			});
		}
	});

	xhr_upd_table.open("GET", "http://195.50.2.67:2403/aliaksandrhlushko-collection");
	xhr_upd_table.setRequestHeader("Content-Type", "application/json");
	xhr_upd_table.send();

};

function parseResponeRowToTableRow(rows) {
	var row = document.createElement('tr');

	id = document.createElement('th');
	id.innerText = rows['id'];
	row.appendChild(id);

	number = document.createElement('td');
	number.innerText = rows['number'];
	row.appendChild(number);

	typeOfContribution = document.createElement('td');
	typeOfContribution.innerText = rows['typeOfContribution'];
	row.appendChild(typeOfContribution);

	PIN = document.createElement('td');
	PIN.innerText = rows['PIN'];
	row.appendChild(PIN);

	balance = document.createElement('td');
	balance.innerText = rows['balance'];
	row.appendChild(balance);

	creationDate = document.createElement('td');
	var accountCreationDate = new Date(rows['creationDate']);
	MyDateString = ('000' + accountCreationDate.getFullYear()).slice(-4) +
		'-' + ('0' + (accountCreationDate.getMonth() + 1)).slice(-2) + '-' + ('0' + accountCreationDate.getDate()).slice(-2);
	//console.log(MyDateString);
	creationDate.innerText = MyDateString;
	row.appendChild(creationDate);

	user = document.createElement('td');
	user.innerText = rows['user'];
	row.appendChild(user);

	userType = document.createElement('td');
	userType.innerText = rows['userType'];
	row.appendChild(userType);


	return row;
};