<template>
    <div>
        <canvas id="canvas"></canvas>
        <div id="settings" class="hide">
            <div style="position: relative;">
                <!-- <input type="range" id="spacing" name="spacing" min="0" max="1" step="0.0001" /> -->
                <input type="range" id="spacing" name="spacing" min="0" max="1" step="0.0001" />
                <label for="spacing">Spacing</label>
            </div>

            <div style="position: relative;">
                <input type="range" id="a" name="a" min="0" max="1" step="0.0001" />
                <label for="a">Amplitude</label>
            </div>
            <div style="position: relative;">
                <!-- <input type="range" id="speed" name="speed" min="0" max="0.02" step="0.0001" /> -->
                <input type="range" id="speed" name="speed" min="0" max="0.02" step="0.0001" />
                <label for="speed">Speed</label>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'AudioWave',
        data: function () {
            return {

            };
        },
        mounted: function () {
            let Sine = (function () {
                let canvas, ctx;
                let width, height;

                let spacingEl, aEl, speedEl;

                let startTime, currTime, runTime;
                let spacing = 0.0308,
                    a = 0.1924,
                    speed = 0.0055;

                function init(options) {
                    canvas = document.getElementById(options.canvas);
                    canvas.width = options.w;
                    canvas.height = options.h;

                    width = canvas.width;
                    height = canvas.height;

                    ctx = canvas.getContext("2d");

                    startTime = new Date().getTime();

                    spacingEl = document.getElementById("spacing");
                    spacingEl.value = spacing;
                    spacingEl.addEventListener("input", () => {
                        spacing = spacingEl.value;
                    });

                    aEl = document.getElementById("a");
                    aEl.value = a;
                    aEl.addEventListener("input", () => {
                        a = aEl.value;
                    });

                    speedEl = document.getElementById("speed");
                    speedEl.value = speed;
                    speedEl.addEventListener("input", () => {
                        speed = speedEl.value;
                    });

                    window.addEventListener("resize", () => {
                        canvas.width = window.innerWidth;
                        canvas.height = window.innerHeight;

                        width = canvas.width;
                        height = canvas.height;
                    });

                    mainLoop();
                }

                function mainLoop() {
                    requestAnimationFrame(mainLoop);

                    ctx.clearRect(0, 0, width, height);

                    draw();
                    update();
                }

                function draw() {
                    // console.log("draw");
                    ctx.beginPath();
                    ctx.lineWidth = 3;
                    ctx.strokeStyle = "rgb(66,133,244)";

                    let h = Math.sin(runTime * speed) * a;
                    let pointList = getPath(h);

                    for (let i = 0; i < width; i++) {
                        if (i === 0) {
                            ctx.moveTo(pointList[0][0], pointList[0][1]);
                        } else {
                            ctx.lineTo(pointList[i][0], pointList[i][1]);
                        }
                    }
                    ctx.stroke();
                }

                function update() {
                    // console.log("update");
                    currTime = new Date().getTime();
                    runTime = currTime - startTime;
                }

                function getPath(h) {
                    let loopNum = 0;
                    let pointList = [];

                    for (let i = 0; i < width / 2; i++) {
                        pointList[loopNum] = [loopNum, Math.sin(loopNum * spacing) * (i * h) + height / 2];
                        loopNum++;
                    }

                    for (let i = width / 2; i > 0; i--) {
                        pointList[loopNum] = [loopNum, Math.sin(loopNum * spacing) * (i * h) + height / 2];
                        loopNum++;
                    }
                    return pointList;
                }

                return {
                    init
                };
            })();

            Sine.init({
                canvas: "canvas",
                w: window.innerWidth,
                h: window.innerHeight
            });
        }
    }
</script>

<style>
    .hide{
        display: none;
    }
    #canvas {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        z-index: -1;
        opacity: 0.3;
    }
</style>