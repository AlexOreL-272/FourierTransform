let wave = []; // (a + bi) cords
let time = 0;
let fourier = [];
let drawing = []; // (x, y) cords

const states = { USER: 0, MACHINE: 1 };
let state = -1;

function setup() {
    createCanvas(1200, 700);
}

function mousePressed() {
    state = states.USER;
    wave = [];
    time = 0;
    fourier = [];
    drawing = [];
}

function mouseReleased() {
    state = states.MACHINE;
    fourier = dft(wave);
    fourier.sort((a, b) => b.amplitude - a.amplitude);
}

function draw() {
    background(0);

    if (state == states.USER) {
        let c = createVector(mouseX, mouseY);
        //drawing.push(c);
        wave.push(new Complex(c.x, c.y));

        noFill();
        stroke(255);
        beginShape();
        for (let v of wave)
            vertex(v.re, v.im);
        endShape();
    } else if (state == states.MACHINE) {
        background(0);

        let v = epicycleEnd(0, 0, fourier);
        drawing.unshift(v);

        stroke(255);
        beginShape();
        noFill();
        for (let pt of drawing)
            vertex(pt.x, pt.y);
        endShape();

        time += TWO_PI / fourier.length;

        if (time > TWO_PI) {
            time = 0;
            drawing = [];
        }
    }
}

function epicycleEnd(x, y, fou) {
    noFill();
    for (let i of fou) {
        let prevX = x,
            prevY = y,
            freq = i.freq,
            radius = i.amplitude,
            phase = i.phase;

        x += radius * cos(freq * time + phase);
        y += radius * sin(freq * time + phase);

        stroke(255, 100);
        if (prevX && prevY) {
            circle(prevX, prevY, radius * 2);
            //stroke(255);
            line(prevX, prevY, x, y);
        }
    }

    return createVector(x, y);
}

// function polar2cartesian(rad, angle) {
//     return createVector(rad * cos(angle), rad * sin(angle));
// }