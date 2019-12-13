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
    - setInterval() & clearInterval()

STATUS:
    - update display time depending on workDisp input - COMPLETED
    - countdown from existing disp value. - COMPLETED
    - start/stop/refresh - COMPLETED
    - after disp value is done, replace the value with rest disp. - COMPLETED
        - must ensure that the ending display is "00:00", not "00:0"
    - display :00 when work display is lower than 10.

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
        
        var intervali = setInterval(function() {
        
            let timeA = disp.textContent.split("");                //['2', '5', ':', '0', '0']; ['2', '5', ':', '5', '9'] NOT: ['2', '5', ':', '59']
            //STATUS BOOKMARK1 (COMPLETED): splitting in to 4 arrays again; we must make it so that we are passing "59", not "5", "9"
            let timeJoin = timeA.join("").split(":");
            timeJoin.splice(1, 0, ":");                            //["25", ":", "59"]
            
            timeB = timeJoin.map(function(x){                     //[25, NaN, 00]
                return parseInt(x);
            })                          
            timeB.splice(1, 1, ":");                                //[25, ":", 00] 
        
            //display "00:00", not "00:0" manually...(too bad)
            if (timeB[2] <= 10 && timeB[2] > 0) {   //when timeB[2] == 0, [xx, ":", 00] is passed through so no need for adding ":0"
                timeB.splice(1, 1, ":0");
            }

            //display "00:00", not "0"
            if (timeB[1] <= 10) {
                timeB.splice(1, 1, ":00");
            }

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

            //IMPORTANT: code to replace to rest display must be here because display must countdown through interval function.
            if (disp.textContent == "0:00") {
                disp.textContent = restDisp.textContent + ":00";
            }

        },100)

        //pause the time; NOTE: can't put this eventlistener outside of the current one because "intervali" can't be passed outside.
        pause.addEventListener("click", function(){
            clearInterval(intervali);
        })
    })

    //restart display
    restart.addEventListener("click", function() {
        disp.textContent = workDisp.textContent + ":00";
    })


}

setClock();