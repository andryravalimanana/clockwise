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

let hour = 1;
let minute = 40;
const height =  screen.height * 0.5;
const positions = {
    top: "50%",
    left: "5%"
};
const positions2 = {
    top: "50%",
    right: "5%"
};
let hourCanvas = new Clock("hourCanvas", height, height, positions);
let minuteCanvas = new Clock("minuteCanvas", height, height, positions2);

setInterval(drawClock, 1000);

function drawClock() {
    let target = 12;
    // const now = new Date();
    // const hour = now.getHours();
    // const minute = now.getMinutes()/5;
    minute++;
    if(minute >= 60){
        hour++;
        minute = 0;
    }
    m = minute/5;
    console.log(hour);
    console.log(minute);

    for (let index = 0; index < targets.length; index++) {
        const t = targets[index];
        if(hour < t.hour){
            target = t.hour;
            hourCanvas.setBlockColor(t.color);
            minuteCanvas.setBlockColor(t.color);
        }
    }
    hourCanvas.setTarget(target);
    hourCanvas.setHour(hour);
    minuteCanvas.setTarget(12);
    minuteCanvas.setHour(m);
}