/* THE ODIN PROJECT - POMODORO CLOCK PROJECT - WEB DEV101
COMMENCED: 08DEC2019

PSEUDOCODE:
    1) update the first half of the display value depending on workDisp input.
    2) decrease the display value after "start".

METHODS/APPROACH:
    - setTimeout() 
    - setInterval()
        - performs function iteratively.

LEARNED:

STATUS:

*/

var workDisp = document.getElementById("workDisp");
var restDisp = document.getElementById("restDisp");
var disp = document.getElementById("display");
var start = document.getElementById("start");
var pause = document.getElementById("pause");
var restart = document.getElementById("restart");
var workI = document.getElementById("workIncr");
var workD = document.getElementById("workDecr");
var restI = document.getElementById("restIncr");
var restD = document.getElementById("restDecr");
var currentTime = document.getElementById("display").textContent;

function setClock() {
    
    let timeWd = 0;
    let timeRd = 0;

    workI.addEventListener("click", function() {
        timeWd = parseInt(workDisp.textContent);
        workDisp.textContent = timeWd + 1;
    })

    workD.addEventListener("click", function() {
        timeWd = parseInt(workDisp.textContent);
        workDisp.textContent = timeWd - 1;
    })

    restI.addEventListener("click", function() {
        timeRd = parseInt(restDisp.textContent);
        restDisp.textContent = timeRd + 1;
    })

    restD.addEventListener("click", function() {
        timeRd = parseInt(restDisp.textContent);
        restDisp.textContent = timeRd - 1;
    })
}

setClock();