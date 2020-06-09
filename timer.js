const HEIGHT = screen.height * 0.7;
const WIDTH = screen.height * 0.7;
const RADIUS = HEIGHT * 0.90 / 2;

var canvas = document.getElementById("canvas");
canvas.height = HEIGHT;
canvas.width = WIDTH;
var ctx = canvas.getContext("2d");
ctx.translate(RADIUS/0.9, RADIUS/0.9);

setInterval(drawClock, 1000);

var color = '#1E9FCE';
var title = '';

function drawClock() {
    drawFace(ctx, RADIUS);
    drawTime(ctx, RADIUS, target);
    drawNumbers(ctx, RADIUS);
    drawDelimiter(RADIUS);
}

function drawDelimiter(RADIUS) {
    for (let index = 1; index < 13; index++) {
        drawLineInNumber(index, RADIUS * 0.007);
    }
}

function drawFace(ctx, RADIUS) {
    var grad;
    ctx.beginPath();
    ctx.arc(0, 0, RADIUS, 0, 2 * Math.PI);
    ctx.fillStyle = 'white';
    ctx.fill();
    grad = ctx.createRadialGradient(0, 0, RADIUS * 0.95, 0, 0, RADIUS * 1.05);
    grad.addColorStop(0, '#333');
    grad.addColorStop(0.5, 'white');
    grad.addColorStop(1, '#333');
    ctx.strokeStyle = grad;
    ctx.lineWidth = RADIUS * 0.1;
    ctx.stroke();
    ctx.beginPath();
    ctx.arc(0, 0, RADIUS * 0.05, 0, 2 * Math.PI);
    ctx.fillStyle = '#333';
    ctx.fill();
}

function drawNumbers(ctx, RADIUS) {
    var ang;
    var num;
    ctx.beginPath();
    ctx.font = RADIUS * 0.15 + "px arial";
    ctx.textBaseline = "middle";
    ctx.textAlign = "center";
    for (num = 1; num < 13; num++) {
        ang = num * Math.PI / 6;
        ctx.rotate(ang);
        ctx.translate(0, -RADIUS * 0.85);
        ctx.rotate(-ang);
        ctx.fillText(num.toString(), 0, 0);
        ctx.rotate(ang);
        ctx.translate(0, RADIUS * 0.85);
        ctx.rotate(-ang);
        canvas.fillStyle = "#ff00ff";
        ctx.fill();
    }
}

function drawTime(ctx, RADIUS, target) {
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
    drawHand(ctx, hour, RADIUS, RADIUS * 0.007, "red");
    drawHourBock(RADIUS, hourFloat, target);
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
    drawHand(ctx, target, RADIUS, height);
}

function drawHourBock(RADIUS, hour, target) {
    drawLineInNumber(target, RADIUS * 0.007);
    hour = hour - 3;
    target = target - 3;
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.fillStyle = color;
    ctx.arc(0, 0, RADIUS * 0.95, hour * Math.PI / 6, target * Math.PI / 6);
    ctx.fill();
    ctx.fillStyle = "#000";
}