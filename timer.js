let targets = [
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

var hCanvas = document.getElementById("hourCanvas");
var mCanvas = document.getElementById("minuteCanvas");
hCanvas.height = screen.height * 0.7;
hCanvas.width = screen.height * 0.7;
mCanvas.height = screen.height * 0.7;
mCanvas.width = screen.height * 0.7;
var hCtx = hCanvas.getContext("2d");
var mCtx = mCanvas.getContext("2d");
var color = '#1E9FCE';
var title = '';
var radius = hCanvas.height / 2;
hCtx.translate(radius, radius);
mCtx.translate(radius, radius);
radius = radius * 0.90
setInterval(drawClock, 1000);

function drawClock() {
    var target = 6;
    const now = new Date();
    var hour = now.getHours();
    // var hour = 7;
    for (let index = 0; index < targets.length; index++) {
        const t = targets[index];
        if (hour < t.hour) {
            target = t.hour;
            color = t.color+'9e';
            title = t.title;
            document.getElementById("title").innerText = title;
            break;
        } else {
            target = targets[0].hour;
            color = targets[0].color+'9e';
            title = targets[0].title;
            document.getElementById("title").innerText = title;
        }
    }
    drawFace(hCtx, radius);
    drawFace(mCtx, radius);
    drawTime(hCtx, radius, target);
    drawTime(mCtx, radius, target);
    drawNumbers(hCtx, radius, hCanvas);
    drawNumbers(mCtx, radius, mCanvas);
    drawDelimiter(radius);
}

function drawDelimiter(radius) {
    for (let index = 1; index < 13; index++) {
        drawLineInNumber(index, radius * 0.007);
    }
}

function drawFace(ctx, radius) {
    var grad;
    ctx.beginPath();
    ctx.arc(0, 0, radius, 0, 2 * Math.PI);
    ctx.fillStyle = 'white';
    ctx.fill();
    grad = ctx.createRadialGradient(0, 0, radius * 0.95, 0, 0, radius * 1.05);
    grad.addColorStop(0, '#333');
    grad.addColorStop(0.5, 'white');
    grad.addColorStop(1, '#333');
    ctx.strokeStyle = grad;
    ctx.lineWidth = radius * 0.1;
    ctx.stroke();
    ctx.beginPath();
    ctx.arc(0, 0, radius * 0.05, 0, 2 * Math.PI);
    ctx.fillStyle = '#333';
    ctx.fill();
}

function drawNumbers(ctx, radius, canvas) {
    var ang;
    var num;
    ctx.beginPath();
    ctx.font = radius * 0.15 + "px arial";
    ctx.textBaseline = "middle";
    ctx.textAlign = "center";
    for (num = 1; num < 13; num++) {
        ang = num * Math.PI / 6;
        ctx.rotate(ang);
        ctx.translate(0, -radius * 0.85);
        ctx.rotate(-ang);
        ctx.fillText(num.toString(), 0, 0);
        ctx.rotate(ang);
        ctx.translate(0, radius * 0.85);
        ctx.rotate(-ang);
        canvas.fillStyle = "#ff00ff";
        ctx.fill();
    }
}

function drawTime(ctx, radius, target) {
    var now = new Date();
    var hour = now.getHours();
    var minute = now.getMinutes();
    var second = now.getSeconds();
    //hour
    hour = hour % 12;
    hour = (hour * Math.PI / 6) +
        (minute * Math.PI / (6 * 60)) +
        (second * Math.PI / (360 * 60));
    var hourFloat = getHourAndMinute();
    // hourFloat = 7;
    hourFloat = hourFloat % 12;
    target = target % 12;
    drawHand(ctx, hour, radius, radius * 0.007, "red");
    drawHourBock(radius, hourFloat, target);
    const leftHour = time_convert(((target - hourFloat < 0)? (12 - hourFloat + target)*60:(target - hourFloat) * 60));
    document.getElementById("MyClockDisplay").innerText = leftHour;
}

function getHourAndMinute() {
    const now = new Date();
    var hour = now.getHours();
    const minute = now.getMinutes();
    const second = now.getSeconds();
    hour = hour + minute / 60 + second / 3600;
    return hour;
}

function time_convert(num) {
    var hours = Math.floor(num / 60);
    var minutes = num % 60;
    return hours + "h " + Math.round(minutes) + "mn left";
}

function drawHand(ctx, pos, length, width, color = "#000") {
    ctx.beginPath();
    ctx.strokeStyle = color;
    ctx.lineWidth = width;
    ctx.lineCap = "round";
    ctx.moveTo(0, 0);
    ctx.rotate(pos);
    ctx.lineTo(0, -length * 0.95);
    ctx.stroke();
    ctx.rotate(-pos);
    ctx.fill();
}

function drawLineInNumber(number, height) {
    var target = number;
    //Target
    target = target % 12;
    target = (target * Math.PI / 30) * 5;
    drawHand(ctx, target, radius, height);
}

function drawHourBock(radius, hour, target) {
    drawLineInNumber(target, radius * 0.007);
    hour = hour - 3;
    target = target - 3;
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.fillStyle = color;
    ctx.arc(0, 0, radius * 0.95, hour * Math.PI / 6, target * Math.PI / 6);
    ctx.fill();
    ctx.fillStyle = "#000";
}