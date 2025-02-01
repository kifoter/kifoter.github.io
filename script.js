//canvas prep
var canv = document.getElementById("canv");
canv.width = window.innerWidth; 
canv.height = window.innerHeight;
var c = canv.getContext("2d");
c.beginPath();

//heart prep
const heart = new Image();
heart.src = "heart.png";
var heartsPos = [];
var heartsDir = [];

for(let i = 0; i <= 500; i++) {
	heartsPos[i] = [parseFloat(window.getComputedStyle(yesButton).left.slice(0, -2)) + 50,
					parseFloat(window.getComputedStyle(yesButton).top.slice(0, -2)) + 7];
	heartsDir[i] = [Math.random() * 2 - 1, Math.random() * 2 - 1];
}
var speed = 3;
var heartsLoop;

var heartsMovement = function() {
	//cleaning
	c.clearRect(0, 0, canv.width, canv.height);

	//positioning on ctx
	for(let i = 0; i < heartsPos.length; i++) {
		c.drawImage(heart, heartsPos[i][0], heartsPos[i][1], heart.width / 8, heart.height / 8);
	}

	//adding velocity
	for(let i = 0; i < heartsPos.length; i++) {
		heartsPos[i][0] += heartsDir[i][0] * speed;
		heartsPos[i][1] += heartsDir[i][1] * speed;
	}
	
	//checking if it bumped in a corner
	for(let i = 0; i < heartsDir.length; i++) {
		if(heartsPos[i][1] >= window.innerHeight) {
			heartsDir[i][1] *= -1;
		}
		if(heartsPos[i][1] <= 0) {
			heartsDir[i][1] *= -1;
		}
		if(heartsPos[i][0] >= window.innerWidth) {
			heartsDir[i][0] *= -1;
		}
		if(heartsPos[i][0] <= 0) {
			heartsDir[i][0] *= -1;
		}
	}

	//drawing results
	c.stroke();
};

//pushing away no button
var rbRotation = 0;
var rbPosX = 32;

var buttonFlight = function() {
	document.getElementById("noButton").style.transform = "rotate(" + rbRotation.toString() + "deg)";
	document.getElementById("noButton").style.left = rbPosX.toString() + "vw";

	rbRotation += 10;
	rbPosX += 1.5;
}

//pushing away the question
var qRotation = 0;
var qPosY = 25;

var questionFlight = function() {
	document.getElementById("question").style.transform = "rotate(" + qRotation.toString() + "deg)";
	document.getElementById("question").style.marginTop = qPosY.toString() + "vw";

	qRotation += 0.4;
	qPosY -= 1.5;
}

var bSize = [15, 10];
var bPos = [0, 0];
var oldBPos = [0, 0];

var makegreenbigger = function() {
	oldBPos = [parseFloat(window.getComputedStyle(yesButton).left.slice(0, -2)) / window.innerWidth * 100, 
			 parseFloat(window.getComputedStyle(yesButton).top.slice(0, -2)) / window.innerHeight * 100];

	bSize[0] *= 1.5;
	bSize[1] *= 1.5;
	document.getElementById("yesButton").style.width = bSize[0].toString() + "vw";
	document.getElementById("yesButton").style.height = bSize[1].toString() + "vh";

	bPos[0] = oldBPos[0] - (bSize[0] - bSize[0] / 1.5) / 2;
	bPos[1] = oldBPos[1] - (bSize[1] - bSize[1] / 1.5) / 2;
	document.getElementById("yesButton").style.left = bPos[0].toString() + "vw";
	document.getElementById("yesButton").style.top = bPos[1].toString() + "vh";
}

var hooray = function() {
	document.getElementById("yesButton").style.width = "15vw";
	document.getElementById("yesButton").style.height = "10vh";

	document.getElementById("yesButton").style.left = "32vw";
	document.getElementById("yesButton").style.top = "47vh";

	bSize = [15, 10];
	bPos = [0, 0];
	style = [0, 0];

	if(heartsLoop === undefined) {
		heartsLoop = setInterval(heartsMovement, 10);
		setInterval(buttonFlight, 10);
		setInterval(questionFlight, 10);
	}
	
}






