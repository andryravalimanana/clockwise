var countdownBtn = document.getElementsByClassName("countdownBtn")[0];
var countdownEdit = document.getElementsByClassName("countdownEdit")[0];
var playBtn = document.getElementsByClassName("playBtn")[0];
var buttonNumbers = [5, 10, 15, 20, 30, 40, 45, 50, 55];

function setBlockTime(blockTime){
    minuteCanvas.setSubTarget(blockTime/5+minute);
    minuteCanvas.onBeepStop(function () {
        stopTimer();
    });
    disableOtherButton(blockTime);
}

function stopTimer(){
    minuteCanvas.setSubTarget(undefined);
    resetBtnControl();
}

function resetBtnControl(){
    for (let index = 0; index < buttonNumbers.length; index++) {
        const buttonNumber = buttonNumbers[index];
        document.getElementsByClassName("btn-"+buttonNumber)[0].classList.remove("appear-disabled");
        document.getElementsByClassName("btn-"+buttonNumber)[0].classList.remove("btn-active");
    }
}

function disableOtherButton(activeButtonNumber){
    document.getElementsByClassName("btn-"+activeButtonNumber)[0].classList.add("btn-active");
    for (let index = 0; index < buttonNumbers.length; index++) {
        const buttonNumber = buttonNumbers[index];
        if(buttonNumber != activeButtonNumber){
            document.getElementsByClassName("btn-"+buttonNumber)[0].classList.add("appear-disabled");
        }
    }
}
