var targets = [
    {
        hour: 6,
        title: "Sleeping time",
        color: '#1B3D61'
    },
    {
        hour: 9,
        title: "Morning Self-Care",
        color: '#1E9FCE'
    },
    {
        hour: 12,
        title: "Working time",
        color: '#529F8E'
    },
    {
        hour: 13,
        title: "Break time",
        color: '#FCCD57'
    },
    {
        hour: 18,
        title: "Working time",
        color: '#529F8E'
    },
    {
        hour: 21,
        title: "Thinking time & Planning",
        color: '#DD8DD7'
    }
];

// let hour = 17;
// let minute = 55;
const height =  screen.height * 0.5;
const positions = {
    top: "60%",
    left: "0%"
};
const positions2 = {
    top: "50%",
    left: "8%"
};
let minuteCanvas = new Clock("minuteCanvas", height, height, positions2, 5, true);
let hourCanvas = new Clock("hourCanvas", height * 0.4, height  * 0.4, positions);

setInterval(drawClock, 1000);

function drawClock() {
    const now = new Date();
    let hour = now.getHours();
    let minute = now.getMinutes()/5;
    // minute++;
    // if(minute >= 60){
    //     hour++;
    //     minute = 0;
    // }
    // m = minute/5;
    if(hour >= 21){
        hour = hour - 24;
    }
    console.log(hour+":"+minute);
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