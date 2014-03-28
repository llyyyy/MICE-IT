	// class명은 대문자로
	// 변수는 소문자로
(function() {
	//즉시실행 함수
	var number = "";
	// number숨기기
	
	function Phone(options) {
		this.model = options.model;
		this.color = options.color;
	}

	Phone.prototype.getQuality = function() {
		if(this.model = "Nexus") 
			console.log("=>This model is good.");
	};

	Phone.prototype.getNumber = function() {
		if(number === "")
			console.log("번호가 없습니다. 개통이 필요합니다.");
			
	};
	
	Phone.prototype.setNumber = function(userNumber) {
		number = userNumber;
		
	};
	
	/* 상속관련
	function Nexus(options) {
		
		Phone.call(this, options);
		this.android = true;
		
	}
	
	Nexus.prototype.os = function() {
		console.log("넥서스는!?");
	};
	*/
	
	window.Phone = Phone;
//상속관련 	window.Phone = Nexus;
	
})(); // 함수 안에 싸서 국한됨...

/* 상속관련
var bestPhone = new Nexus({model:"Nexus",color:"black"});
console.log(bestPhone);
*/


var myPhone = new Phone({model:"Nexus",color:"black"});
var friendPhone = new Phone({model:"iPhone", color:"white"});

console.log(myPhone.model);
console.log(myPhone.color);
myPhone.getQuality();
myPhone.setNumber("01000000000");

console.log("--------------------");

console.log(friendPhone.model);
console.log(friendPhone.color);
