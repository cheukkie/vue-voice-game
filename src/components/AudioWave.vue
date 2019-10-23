<template>
    <div>
        <canvas id="audiowave"></canvas>
        <button class="btn" v-if="!volumeMeter" @click="beginDetect">Detect</button>
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
                audioContext: '',
                mediaStreamSource: null,
                meter: null,
                volumeMeter: 0
            };
        },
        methods: {
            beginDetect() {
                this.audioContext = new (window.AudioContext || window.webkitAudioContext)()
                if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
                    navigator.mediaDevices.getUserMedia({audio: true}).then((stream) => {
                        this.mediaStreamSource = this.audioContext.createMediaStreamSource(stream);
                        this.meter = this.createAudioMeter(this.audioContext);
                        this.mediaStreamSource.connect(this.meter);
                    })
                }
            },
            createAudioMeter(audioContext, clipLevel, averaging, clipLag) {
                const processor = audioContext.createScriptProcessor(512);
                processor.onaudioprocess = this.volumeAudioProcess;
                processor.clipping = false;
                processor.lastClip = 0;
                processor.volume = 0;
                processor.clipLevel = clipLevel || 0.98;
                processor.averaging = averaging || 0.95;
                processor.clipLag = clipLag || 750;

                // this will have no effect, since we don't copy the input to the output,
                // but works around a current Chrome bug.
                processor.connect(this.audioContext.destination);

                processor.checkClipping = function () {
                    if (!this.clipping) {
                        return false
                    }
                    if ((this.lastClip + this.clipLag) < window.performance.now()) {
                    this.clipping = false
                    }
                    return this.clipping
                }

                processor.shutdown = function () {
                    this.disconnect()
                    this.onaudioprocess = null
                }

                return processor;
            },
            volumeAudioProcess(event) {
                const buf = event.inputBuffer.getChannelData(0);
                const bufLength = buf.length;
                let sum = 0;
                let x;

                // Do a root-mean-square on the samples: sum up the squares...
                for (var i = 0; i < bufLength; i++) {
                    x = buf[i];
                    if (Math.abs(x) >= this.clipLevel) {
                        this.clipping = true;
                        this.lastClip = window.performance.now();
                    }
                    sum += x * x;
                }

                // ... then take the square root of the sum.
                const rms = Math.sqrt(sum / bufLength);

                // Now smooth this out with the averaging factor applied
                // to the previous sample - take the max here because we
                // want "fast attack, slow release."
                this.volume = Math.max(rms, this.volume * this.averaging);
                //document.getElementById('audio-value').innerHTML = this.volume;

                this.volumeMeter = rms;
            }
        },
        mounted: function () {
            const vm = this;
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
                        pointList[loopNum] = [loopNum, Math.sin(loopNum * vm.volumeMeter) * (i * h) + height / 2];
                        loopNum++;
                    }

                    for (let i = width / 2; i > 0; i--) {
                        pointList[loopNum] = [loopNum, Math.sin(loopNum * vm.volumeMeter) * (i * h) + height / 2];
                        loopNum++;
                    }
                    return pointList;
                }

                return {
                    init
                };
            })();

            Sine.init({
                canvas: "audiowave",
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
    #audiowave {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        z-index: -1;
        opacity: 0.7;
    }
</style>