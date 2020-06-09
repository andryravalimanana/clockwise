class Clock {
    constructor(id, height, width, positions, numberFactor=1, showMinuteSeparator=false) {
        this.id = id;
        this.width = width;
        this.height = height;
        this.positions = positions;
        this.radius = this.height * 0.90 / 2;
        this.blockColor = 'red';
        this.target = 9;
        this.showMinuteSeparator = showMinuteSeparator;
        this.t = 12;
        this.numberFactor = numberFactor;
        this._initClock();
        this.setTarget(22);
        this.setTime(21);
    }

    setTarget(target){
        this.target = target - 3;
    }

    setTime(t){
        this.t = t - 3;
        this._initClock();
    }

    setBlockColor(color){
        this.blockColor = color;
    }

    _drawHourBock(t, target) {
        this._drawLineInNumber(target, this.radius * 0.007);
        this.ctx.beginPath();
        this.ctx.moveTo(0, 0);
        this.ctx.fillStyle = this.blockColor;
        this.ctx.arc(0, 0, this.radius * 0.95, t * Math.PI / 6, target * Math.PI / 6);
        this.ctx.fill();
        this.ctx.fillStyle = "#000";
    }

    _initClock(){
        this.canvas = document.getElementById(this.id);
        for (let p in this.positions) {
            if (this.positions.hasOwnProperty(p)) {
                this.canvas.setAttribute("style", ""+p+": "+this.positions[p]+";");
            }
        }
        this.canvas.height = this.height;
        this.canvas.width = this.width;
        this.ctx = this.canvas.getContext("2d");
        this.ctx.translate(this.radius/0.9, this.radius/0.9);
        this._drawFace();
        this._drawHourBock(this.t, this.target);
        this._drawNumbers();
        this._drawDelimiter();
    }

    _drawFace() {
        let grad;
        this.ctx.beginPath();
        this.ctx.arc(0, 0,  this.radius, 0, 2 * Math.PI);
        this.ctx.fillStyle = 'white';
        this.ctx.fill();
        grad = this.ctx.createRadialGradient(0, 0,  this.radius * 0.95, 0, 0,  this.radius * 1.05);
        grad.addColorStop(0, '#333');
        grad.addColorStop(0.5, 'white');
        grad.addColorStop(1, '#333');
        this.ctx.strokeStyle = grad;
        this.ctx.lineWidth =  this.radius * 0.1;
        this.ctx.stroke();
        this.ctx.beginPath();
        // this.ctx.arc(0, 0,  this.radius * 0.05, 0, 2 * Math.PI);
        this.ctx.fillStyle = '#333';
        this.ctx.fill();
    }

    _drawNumbers() {
        let ang;
        let num;
        this.ctx.beginPath();
        this.ctx.font = this.radius * 0.15 + "px arial";
        this.ctx.textBaseline = "middle";
        this.ctx.textAlign = "center";
        for (num = 1; num < 13; num++) {
            ang = num * Math.PI / 6;
            this.ctx.rotate(ang);
            this.ctx.translate(0, -this.radius * 0.85);
            this.ctx.rotate(-ang);
            if(this.numberFactor != 1){
                this.ctx.fillText((60-num*this.numberFactor).toString(), 0, 0);
            }else{
                this.ctx.fillText(num.toString(), 0, 0);
            }
            this.ctx.rotate(ang);
            this.ctx.translate(0, this.radius * 0.85);
            this.ctx.rotate(-ang);
            this.canvas.fillStyle = "#ff00ff";
            this.ctx.fill();
        }
    }

    _drawDelimiter() {
        for (let index = 1; index < 13; index++) {
            this._drawLineInNumber(index, this.radius * 0.007);
            if(this.showMinuteSeparator){
                for (let j = 1; j < 5; j++) {
                    this._drawLineInNumber(j/5+index, this.radius * 0.0004);
                }
            } 
        }
    }

    _drawLineInNumber(number, height) {
        let target = number;
        //Target
        target = target % 12;
        target = (target * Math.PI / 30) * 5;
        this._drawHand(target, this.radius, height);
    }

    _drawHand(pos, length, width, color = "#000") {
        this.ctx.beginPath();
        this.ctx.strokeStyle = color;
        this.ctx.lineWidth = width;
        this.ctx.lineCap = "round";
        this.ctx.moveTo(0, 0);
        this.ctx.rotate(pos);
        this.ctx.lineTo(0, -length * 0.95);
        this.ctx.stroke();
        this.ctx.rotate(-pos);
        this.ctx.fill();
    }
}