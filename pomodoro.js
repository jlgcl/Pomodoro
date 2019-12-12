/* THE ODIN PROJECT - POMODORO CLOCK PROJECT - WEB DEV101
COMMENCED: 08DEC2019

PSEUDOCODE:
    1) update the first half of the display value depending on workDisp input.
    2) decrease the display value after "start".

METHODS/APPROACH:
    - setTimeout(): performs function only once.
    - setInterval()
        - performs function iteratively; repeats execution.

LEARNED:

STATUS:
    - update display time depending on workDisp input - COMPLETED
    - countdown from existing disp value. - COMPLETED
    - start/stop/refresh
    - after disp value is done, replace the value with rest disp.

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
    let newStr = "";

    workI.addEventListener("click", function() {
        timeWd = parseInt(workDisp.textContent);
        workDisp.textContent = timeWd + 1;
        newStr = workDisp.textContent;
        disp.textContent = workDisp.textContent.replace(/[^0]\w/m, newStr+":00");
    })

    workD.addEventListener("click", function() {
        timeWd = parseInt(workDisp.textContent);
        workDisp.textContent = timeWd - 1;
        newStr = workDisp.textContent;
        disp.textContent = workDisp.textContent.replace(/[^0]\w/m, newStr+":00");
    })

    restI.addEventListener("click", function() {
        timeRd = parseInt(restDisp.textContent);
        restDisp.textContent = timeRd + 1;
    })

    restD.addEventListener("click", function() {
        timeRd = parseInt(restDisp.textContent);
        restDisp.textContent = timeRd - 1;
    })


    let timeB = [];

    start.addEventListener("click", function() {
        
        setInterval(function() {
        
            let timeA = disp.textContent.split("");                //['2', '5', ':', '0', '0']; ['2', '5', ':', '5', '9'] NOT: ['2', '5', ':', '59']
            //STATUS BOOKMARK1 (COMPLETED): splitting in to 4 arrays again; we must make it so that we are passing "59", not "5", "9"
            let timeJoin = timeA.join("").split(":");
            timeJoin.splice(1, 0, ":");                            //["25", ":", "59"]
            
            timeB = timeJoin.map(function(x){                     //[25, NaN, 00]
                return parseInt(x);
            })                          
            timeB.splice(1, 1, ":");                                //[25, ":", 00] 
            console.log(timeB)
        
            if (timeB[2] == 0) {
                timeB[2] = 59;
                timeB[0] = timeB[0] - 1;
                timeB.splice(2, 1, timeB[2]);                       //[25, ":", 59]
                disp.textContent = timeB.join("");                  //[25:59]
                //display must be in form: "xx:xx" in string
                //console.log(timeB);
            }else {
                timeB.splice(2, 1, (timeB[2]-1));                   //why does this only increment third digit? 59 -> 4 -> 3 -> ...
                disp.textContent = timeB.join("");
                //console.log(timeB);
            }

        },1000)
    })

    pause.addEventListener("click", function() {
        disp.textContent = timeB.join("");
        //STATUS BOOKMARK2: pause the display.
    })

}

setClock();