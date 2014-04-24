var Multiplication = function() {

	this.numValue = document.getElementById('numValue');
	this.bnt = document.getElementById('bnt');
	this.printMul = document.getElementById('printMul');
}

Multiplication.prototype.btnClickHandler = function() {

	var op1 = numValue.value;
	var validity = numValue.checkValidity();

	if(validity) {
		var str = "";

		for(var op2 = 1; op2 <= 9; op2++) {
			printMul.innerHTML += str + op1 + " * " + op2 + " = " + (op1*op2) + "<br>";
		}
	}
	else 
		alert("1~9단까지만 입력이 가능합니다.");
};

Multiplication.prototype.btnClickEvent = function() {
	btn.addEventListener("click", this.btnClickHandler.bind(window));
	// btn.addEventListener("click", $.bind(this.btnClickHandler, window));
};
