<template>
  <!-- eslint-disable -->
  <div>
    <canvas id="audiowave" :visible="visible" />
    <div id="settings" class="hide">
      <div style="position: relative;">
        <!-- <input type="range" id="spacing" name="spacing" min="0" max="1" step="0.0001" /> -->
        <input id="spacing" type="range" name="spacing" min="0" max="1" step="0.0001">
        <label for="spacing">Spacing</label>
      </div>
      <div style="position: relative;">
        <input id="a" type="range" name="a" min="0" max="1" step="0.0001">
        <label for="a">Amplitude</label>
      </div>
      <div style="position: relative;">
        <!-- <input type="range" id="speed" name="speed" min="0" max="0.02" step="0.0001" /> -->
        <input id="speed" type="range" name="speed" min="0" max="0.02" step="0.0001">
        <label for="speed">Speed</label>
      </div>
    </div>
  </div>
</template>

<script>
// https://codepen.io/djoga98/pen/rqjPao
// https://codepen.io/huooo/pen/xJNPOL
// https://github.com/cwilso/volume-meter/
// https://medium.com/@radarboy3000

export default {
  name: 'AudioWave',
  props: {
    animate: Boolean,
    visible: Boolean,
    mobileUser: Boolean,
  },
  data() {
    return {
      audioContext: '',
      mediaStreamSource: null,
      meter: null,
      volumeMeter: 0,
    };
  },
  watch: {
    animate() {
      if (!this.mobileUser) {
        this.beginDetect();
      }
    },
  },
  mounted() {
    const vm = this;

    /* eslint-disable */

    const Sine = (function () {
      let canvas; let
        ctx;
      let width; let
        height;

      let spacingEl; let aEl; let
        speedEl;

      let startTime; let currTime; let
        runTime;
      let spacing = 0.0308;
      let a = 0.1924;
      let speed = 0.0055;

      const spacing2 = 0.8292;
      const a2 = 0.0393;
      const speed2 = 0.0158;

      const spacing3 = 0.4411;
      const a3 = 0.3799;
      const speed3 = 0.0096;


      function init(options) {
        canvas = document.getElementById(options.canvas);
        canvas.width = options.w;
        canvas.height = options.h;

        width = canvas.width;
        height = canvas.height;

        ctx = canvas.getContext('2d');

        startTime = new Date().getTime();

        spacingEl = document.getElementById('spacing');
        spacingEl.value = spacing;
        spacingEl.addEventListener('input', () => {
          spacing = spacingEl.value;
        });

        aEl = document.getElementById('a');
        aEl.value = a;
        aEl.addEventListener('input', () => {
          a = aEl.value;
        });

        speedEl = document.getElementById('speed');
        speedEl.value = speed;
        speedEl.addEventListener('input', () => {
          speed = speedEl.value;
        });

        window.addEventListener('resize', () => {
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

        // line 1 - blue
        ctx.beginPath();
        ctx.lineWidth = 2;
        ctx.strokeStyle = 'rgb(66,133,244)';

        const h = Math.sin(runTime * speed) * a;
        const pointList = getPath(h);

        for (let i = 0; i < width; i++) {
          if (i === 0) {
            ctx.moveTo(pointList[0][0], pointList[0][1]);
          } else {
            ctx.lineTo(pointList[i][0], pointList[i][1]);
          }
        }
        ctx.stroke();

        // line 2 - red
        ctx.beginPath();
        ctx.lineWidth = 2;
        ctx.strokeStyle = 'red';

        const h2 = Math.sin(runTime * speed2) * a2;
        const pointList2 = getPath(h2);

        for (let i = 0; i < width; i++) {
          if (i === 0) {
            ctx.moveTo(pointList2[0][0], pointList2[0][1]);
          } else {
            ctx.lineTo(pointList2[i][0], pointList2[i][1]);
          }
        }
        ctx.stroke();

        // line 3 - green
        ctx.beginPath();
        ctx.lineWidth = 2;
        ctx.strokeStyle = 'green';

        const h3 = Math.sin(runTime * speed3) * a3;
        const pointList3 = getPath(h3);

        for (let i = 0; i < width; i++) {
          if (i === 0) {
            ctx.moveTo(pointList3[0][0], pointList3[0][1]);
          } else {
            ctx.lineTo(pointList3[i][0], pointList3[i][1]);
          }
        }
        ctx.stroke();

        // line 4 - yellow
        ctx.beginPath();
        ctx.lineWidth = 2;
        ctx.strokeStyle = 'yellow';

        const h4 = Math.sin(runTime * 0) * 0;
        const pointList4 = getPath(h4);

        for (let i = 0; i < width; i++) {
          if (i === 0) {
            ctx.moveTo(pointList4[0][0], pointList4[0][1]);
          } else {
            ctx.lineTo(pointList4[i][0], pointList4[i][1]);
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
        const pointList = [];

        if (vm.mobileUser) {
          vm.volumeMeter = spacing;
        }

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
        init,
      };
    }());

    Sine.init({
      canvas: 'audiowave',
      w: window.innerWidth,
      h: window.innerHeight,
    });
  },
  methods: {
    beginDetect() {
      this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
      if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
        navigator.mediaDevices.getUserMedia({ audio: true }).then((stream) => {
          this.mediaStreamSource = this.audioContext.createMediaStreamSource(stream);
          this.meter = this.createAudioMeter(this.audioContext);
          this.mediaStreamSource.connect(this.meter);
        });
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
          return false;
        }
        if ((this.lastClip + this.clipLag) < window.performance.now()) {
          this.clipping = false;
        }
        return this.clipping;
      };

      processor.shutdown = function () {
        this.disconnect();
        this.onaudioprocess = null;
      };

      return processor;
    },
    volumeAudioProcess(event) {
      const buf = event.inputBuffer.getChannelData(0);
      const bufLength = buf.length;
      let sum = 0;
      let x;

      // Do a root-mean-square on the samples: sum up the squares...
      for (let i = 0; i < bufLength; i++) {
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
      // document.getElementById('audio-value').innerHTML = this.volume;

      this.volumeMeter = rms;
    },
  },

};
</script>

<style lang="scss" scoped>
    #audiowave {
        position: fixed;
        bottom: 0;
        left: 0;
        width: 100vw;
        height: 100vh;
        z-index: -1;
        opacity: 0;
        transition: .25s all ease;
        &[visible]{
            opacity: .15;
        }
    }
</style>
