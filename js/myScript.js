	var httpRequest;
	
	function Pageloaded() {
		CheckOnlineStatus("load");
		document.body.addEventListener("offline", function () { CheckOnlineStatus("offline")}, false);
		document.body.addEventListener("online", function () { CheckOnlineStatus("online")}, false);
	}

	function CheckOnlineStatus(msg) {
		var condition = navigator.onLine ? "ONLINE" : "OFFLINE";
		if(condition=="OFFLINE"){
			localStorage.removeItem('ObjToJSON');
			sessionStorage.removeItem('ObjToJSON');
		}
	}
	
	function readFromLocalStorage(){
		var finalString = JSON.parse(localStorage.getItem('ObjToJSON'));
		document.getElementById("txtFirstName").value=finalString.FirstName;
		document.getElementById("txtLastName").value=finalString.LastName;
		document.getElementById("txtEmail").value=finalString.Email;
		document.getElementById("txtPassword").value=finalString.Password;
		document.getElementById("txtConfirmPassword").value=finalString.CPassword;
		document.getElementById("txtDOB").value=finalString.DOB;
		document.getElementById("txtDOBTime").value=finalString.DOBwithtime;
		document.getElementById("txtLocalDOB").value=finalString.LocalDOB;
		document.getElementById("txtSSN").value=finalString.SSN;
		document.getElementById("txtPhone").value=finalString.Phone;
		document.getElementById("txtCreditCard").value=finalString.CreditCardNo;	
	}

	function readFromSessionStorage(){
		var finalString2 = JSON.parse(sessionStorage.getItem('ObjToJSON'));
		document.getElementById("txtFirstName").value=finalString2.FirstName;
		document.getElementById("txtLastName").value=finalString2.LastName;
		document.getElementById("txtEmail").value=finalString2.Email;
		document.getElementById("txtPassword").value=finalString2.Password;
		document.getElementById("txtConfirmPassword").value=finalString2.CPassword;
		document.getElementById("txtDOB").value=finalString2.DOB;
		document.getElementById("txtDOBTime").value=finalString2.DOBwithtime;
		document.getElementById("txtLocalDOB").value=finalString2.LocalDOB;
		document.getElementById("txtSSN").value=finalString2.SSN;
		document.getElementById("txtPhone").value=finalString2.Phone;
		document.getElementById("txtCreditCard").value=finalString2.CreditCardNo;
	}

	function isPhoneNumberFormatValid(){
		var ph=document.getElementById("txtPhone").value;
		var phPattern=/^(\+\d{1,2}\s)?\(?\d{3}\)?[\s.-]\d{3}[\s.-]\d{4}$/;
		if(ph.match(phPattern)){
			alert("Phone Number is Valid");
			return true; 
		}
		else{
			alert("Phone Number is Invalid! Please enter a valid Phone Number of format xxx-xxx-xxxx");
			return false;	
		}
	}

	function isValidEmail(){
		var emailAdd=document.getElementById("txtEmail").value;
		var emailPattern = /^[\w\-\.\+]+\@[a-zA-Z0-9\.\-]+\.[a-zA-z0-9]{2,4}$/;
		if(emailAdd.match(emailPattern)){
			alert('Email is Valid');
			return true; 
		}
		else{
			alert('Email is NOT VALID. Please match the requested format (abc@example.com)');
			return false;
		}
	}

	function myCreation(e){
		e.preventDefault();
		var myForm = document.getElementById("myForm");
		var formData = new FormData(myForm);
		var ObjToJSON = new Object();
		ObjToJSON.FirstName=document.getElementById("txtFirstName").value;
		ObjToJSON.LastName=document.getElementById("txtLastName").value;
		ObjToJSON.Email=document.getElementById("txtEmail").value;
		ObjToJSON.Password=document.getElementById("txtPassword").value;
		ObjToJSON.CPassword=document.getElementById("txtConfirmPassword").value;
		ObjToJSON.DOB=document.getElementById("txtDOB").value;
		ObjToJSON.DOBwithtime=document.getElementById("txtDOBTime").value;
		ObjToJSON.LocalDOB=document.getElementById("txtLocalDOB").value;
		ObjToJSON.SSN=document.getElementById("txtSSN").value;
		ObjToJSON.Phone=document.getElementById("txtPhone").value;
		ObjToJSON.CreditCardNo=document.getElementById("txtCreditCard").value;
		if(typeof(Storage)!="undefined"){
			localStorage.setItem('ObjToJSON', JSON.stringify(ObjToJSON));
			sessionStorage.setItem('ObjToJSON', JSON.stringify(ObjToJSON));
		}
		if (window.XMLHttpRequest) {
			httpRequest = new XMLHttpRequest();
		}
		else if (window.ActiveXObject) {
			httpRequest = new ActiveXObject("Msxml2.XMLHTTP");
		}
		else {
			alert("Ajax is not supported by this browser");
		}
		httpRequest.onreadystatechange = handleResponse;
		httpRequest.open("POST", myForm.action,true);
		httpRequest.setRequestHeader("Content-Type", "application/json");
		httpRequest.send(JSON.stringify(ObjToJSON));
	}
	
	function handleResponse(e) { 
		if (e.target.readyState == XMLHttpRequest.DONE && e.target.status == 200) {
			alert(e.target.responseText);
			//document.getElementById("target").innerHTML = e.target.responseText;
		}
	}

	function checkPassword(str) {
		var level = 0;
		var p1 = /[a-z]/;
		var p2 = /[A-Z]/;
		var p3 = /[0-9]/;
		var p4 = /[\!\@\#\$\%\^\&\*\(\)\-\_\=\+\[\{\]\}\|\\\;\:\'\"\,\<\.\>\/\?\`\~]/;
		var res=0;
		if(str.length>=8)
			level++;
		if(p1.test(str))
			level++;
		if(p2.test(str))
			level++;
		if(p3.test(str))
			level++;
		if(p4.test(str))
			level++;
		if(level>=0 && level<=5) {
			res = ((level)/(5))*100;
			res = Math.floor(res);
		}
		else {
			res = 0;
		}
		var passStrength = document.getElementById("passwordStrength");
		passStrength.setAttribute("value",res);
	}
	
	function matchPassword(n) {
		var original = document.getElementById("txtPassword").value;
        var confirm = document.getElementById("txtConfirmPassword").value;
        if(original == confirm ){
			document.getElementById("matched").style.display="inline";
			document.getElementById("matched").innerHTML = "Your Passwords Matched";
			document.getElementById("matched").style.color="Green";
        }
		else {
			document.getElementById("matched").style.display="inline"
			document.getElementById("matched").innerHTML = "Your Passwords Do Not Match";
			document.getElementById("matched").style.color="Red";
		}
	}
	
	function allowDrop(e) {
		e.preventDefault();
	}

	function drag(e) {
		e.dataTransfer.setData("text", e.target.id);
	}

	function drop(e) {
		e.preventDefault();
		var data = e.dataTransfer.getData("text");
		e.target.appendChild(document.getElementById(data));
		if (document.getElementById("src").childNodes.length==4) {
			document.getElementById("msg").innerHTML="";
			document.getElementById("btnCreation").disabled=false;
		}
	}