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
