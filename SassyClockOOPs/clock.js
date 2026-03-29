// New and improved SASSY CLOCK in OOP format
var Clock = /** @class */ (function () {
    function Clock() {
        var sassyClockDisplayElement = document.getElementById("output");
        if (sassyClockDisplayElement) {
            this.sassyClock = sassyClockDisplayElement;
        }
        else {
            throw new Error("Could not find the #output in the HTML!");
        }
    }
    Clock.prototype.start = function () {
        var _this = this;
        this.sassyClock.innerText = "Current time: " + new Date().toLocaleTimeString();
        setInterval(function () {
            _this.sassyClock.innerText = "Current time: " + new Date().toLocaleTimeString();
        }, 1000);
        setTimeout(function () {
            _this.sassyClock.innerText += "\n\n5 seconds have passed!";
        }, 5000);
        setTimeout(function () {
            _this.sassyClock.innerText += "\n\nnow 10 seconds have passed!";
        }, 10000);
        setTimeout(function () {
            _this.sassyClock.innerText += "\n\n15 seconds of your life just passed!";
        }, 15000);
        setTimeout(function () {
            _this.sassyClock.innerText += "\n\n20 seconds have passed!";
        }, 20000);
        setTimeout(function () {
            _this.sassyClock.innerText += "\n\nAren't you bored?";
        }, 25000);
        setTimeout(function () {
            _this.sassyClock.innerText += "\n\nOr just boring...";
        }, 30000);
        setTimeout(function () {
            _this.sassyClock.innerText += "\n\nLOL just kidding!";
        }, 35000);
        setTimeout(function () {
            _this.sassyClock.innerText += "\n\nor maybe not, it's been 40 seconds 😬";
        }, 40000);
        setTimeout(function () {
            _this.sassyClock.innerText += "\n\nBoredom is actually a good thing";
        }, 45000);
        setTimeout(function () {
            _this.sassyClock.innerText += "\n\nit breeds creativity";
        }, 50000);
        setTimeout(function () {
            _this.sassyClock.innerText += "\n\nso maybe you are simply";
        }, 55000);
        setTimeout(function () {
            _this.sassyClock.innerText += "\n\na genius in the making 😉";
        }, 60000);
        setTimeout(function () {
            _this.sassyClock.innerText += "\n\nSeriously, though, it's been 65 seconds!";
        }, 65000);
        setTimeout(function () {
            _this.sassyClock.innerText += "\n\nStop looking at me! I need some 'me' time.";
        }, 70000);
        setTimeout(function () {
            _this.sassyClock.innerText += "\n\nOkay, genius, I'm not a babysitter 😏";
        }, 75000);
        setTimeout(function () {
            _this.sassyClock.innerText += "\n\nLive your life!";
        }, 80000);
        setTimeout(function () {
            _this.sassyClock.innerText += "\n\nDo something worthwhile";
        }, 85000);
        setTimeout(function () {
            _this.sassyClock.innerText += "\n\nand make your life meaningful";
        }, 90000);
        setTimeout(function () {
            _this.sassyClock.innerText += "\n\nLike the sand through an hourglass";
        }, 95000);
        setTimeout(function () {
            _this.sassyClock.innerText += "\n\nTime waits for no one...";
        }, 100000);
        setTimeout(function () {
            _this.sassyClock.innerText += "\n\nBut I will just keep on ticking.";
        }, 105000);
    };
    return Clock;
}());
var clock = new Clock();
clock.start();
/* THE FOLLOWING IS FOR THE OG CLOCK from Module 6 NOT USING OOP FORMAT
let now = new Date();
document.getElementById("output").innerText = "Current time: " + now.toLocaleTimeString();

setInterval(function() {
    now = new Date();
    document.getElementById("output").innerText = "Current time: " + now.toLocaleTimeString();
}, 1000);

setTimeout(function() {
   document.getElementById("output").innerText += "\n\n5 seconds have passed!";
}, 5000);

setTimeout(function()  {
    document.getElementById("output").innerText += "\n\nnow 10 seconds have passed!"
}, 10000)

setTimeout(function(){
    document.getElementById("output").innerText += "\n\n15 seconds of your life just passed!"
}, 15000)

setTimeout(function(){
    document.getElementById("output").innerText += "\n\n20 seconds have passed!"
}, 20000)

setTimeout (function(){
    document.getElementById("output").innerText += "\n\nLike the sand through an hourglass!"
}, 25000)

setTimeout (function() {
    document.getElementById("output").innerText += "\n\nSeriously, it's been 30 seconds!"
}, 30000)

setTimeout (function(){
    document.getElementById("output").innerText += "\n\nWhat are you doing?! 35 seconds later..."
}, 35000)

setTimeout (function() {
    document.getElementById("output").innerText += "\n\nStop looking at me!"
}, 40000)

setTimeout (function() {
    document.getElementById("output").innerText += "\n\nGo live your life!"
}, 45000)

setTimeout (function() {
    document.getElementById("output").innerText += "\n\nTime waits for no one..."
}, 46000)

setTimeout (function() {
    document.getElementById("output").innerText += "\n\nAnd this clock will just keep on ticking."
}, 47000)

*/
