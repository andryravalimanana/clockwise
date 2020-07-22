
// let hour = 17;
// let minute = 55;
const height =  screen.height * 0.5;
const positions = {
    top: "150%",
    // left: "0%"
};
const positions2 = {
    top: "300%",
    // left: "8%"
};
let minuteCanvas = new Clock("minuteCanvas", height, height, positions2, 5, true);
let hourCanvas = new Clock("hourCanvas", height * 0.4, height  * 0.4, positions);
let hour, minute;

setInterval(drawClock, 1000);

function drawClock() {
    const now = new Date();
    hour = now.getHours();
    minute = now.getMinutes()/5;
    // minute++;
    // if(minute >= 60){
    //     hour++;
    //     minute = 0;
    // }
    // m = minute/5;
    // beep();
    if(hour >= 21){
        hour = hour - 24;
    }
    if(minute == 0.4){
        minuteCanvas.stopBeep();
    }
    for (let index = 0; index < targets.length; index++) {
        const t = targets[index];
        if(hour < t.hour){
            minuteCanvas.setBlockColor(t.color);
            hourCanvas.setBlockColor(t.color);
            hourCanvas.setTarget(t.hour);
            document.getElementById("title").innerText = t.title;
            break;
        }
    }
    minuteCanvas.setTarget(12);
    minuteCanvas.setTime(minute);
    hourCanvas.setTime(hour+1);
}