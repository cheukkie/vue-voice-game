<template>
  <div id="app">
    <header>
      <h1>
        <span>
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
            <path
              d="M15.526 11.409c-1.052.842-7.941 6.358-9.536 7.636l-2.697-2.697 7.668-9.504 4.565 4.565zm5.309-9.867c-2.055-2.055-5.388-2.055-7.443 0-1.355 1.356-1.47 2.842-1.536 3.369l5.61 5.61c.484-.054 2.002-.169 3.369-1.536 2.056-2.055 2.056-5.388 0-7.443zm-9.834 17.94c-2.292 0-3.339 1.427-4.816 2.355-1.046.656-2.036.323-2.512-.266-.173-.211-.667-.971.174-1.842l-.125-.125-1.126-1.091c-1.372 1.416-1.129 3.108-.279 4.157.975 1.204 2.936 1.812 4.795.645 1.585-.995 2.287-2.088 3.889-2.088 1.036 0 1.98.464 3.485 2.773l1.461-.952c-1.393-2.14-2.768-3.566-4.946-3.566z" />
          </svg>
        </span>
        Voice Game
      </h1>
    </header>
    <div class="container">
      <div class="panel">
        <div v-if="webSpeech">
          <router-view />
        </div>
        <div v-else>
          <p>This is an experiment with Web Speech API</p>
          <p>To play this game please use a Chrome browser.</p>
        </div>
      </div>
    </div>
    <AudioWave :animate="waveAnimation" />

  </div>
</template>

<script>
  import AudioWave from '@/components/AudioWave.vue';
  
  export default {
    name: 'app',
    data: function () {
      return {
        webSpeech: false,
        waveAnimation: false
      };
    },
    methods: {
      
    },
    mounted: function () {
      window.SpeechRecognition = window.webkitSpeechRecognition || window.SpeechRecognition;
      if ('webkitSpeechRecognition' in window) {
        // speech recognition API supported
        this.webSpeech = true;
      }
    },
    components: {
      AudioWave,
    }
  };
</script>

<style lang="scss">
  html {
    box-sizing: border-box;
  }

  *,
  *:before,
  *:after {
    box-sizing: inherit;
  }

  body {
    background-color: #f4f4f4;
    margin: 0;
  }

  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    height: 100vh;
    width: 100vw;
    padding: 15px;
    display: flex;
    justify-content: center;
    flex-direction: column;
  }

  .container {
    display: flex;
    flex-direction: column;
    justify-content: center;

    width: 100%;
    max-width: 600px;
    margin: auto;
    flex: 2;
  }
  .panel{
    background-color: rgba(255, 255, 255, 0.85);
    border-radius: 15px;
    padding: 20px;
    box-shadow: 0 20px 15px rgba(0, 0, 0, 0.15);
  }

  h1 {
    color: rgb(15, 157, 88);
    margin: 0;
    font-size: 24px;

    span {
      display: inline-flex;
      vertical-align: middle;
      justify-content: center;
      align-items: center;
      border-radius: 100%;
      border: solid 2px #0f9d58;
      width: 45px;
      height: 45px;
      text-align: center;
      vertical-align: middle;
    }

    svg {
      display: inline-block;

      path {
        fill: #0F9D58;
      }
    }
  }

  .btn {
    display: block;
    border-radius: 25px;
    border: none;
    -webkit-appearance: none;
    color: rgba(244, 160, 0, 1);
    background-color: #ffffff;
    font-weight: bold;
    width: 100%;
    font-size: 16px;
    padding: 10px 15px;
    margin: 10px 0;
    box-shadow: 0 5px 10px 0 rgba(0, 0, 0, 0.15);
    outline: 0;

    &[disabled]{
      cursor: not-allowed;
      color: rgba(0, 0, 0, 0.15);
    }

    &:hover:not([disabled]) {
      cursor: pointer;
      background-color: rgba(244, 160, 0, 1);
      color: #ffffff;
    }
  }

  .btn-round {
    display: block;
    width: 80px;
    height: 80px;
    padding: 15px;
    margin: 10px auto;
    -webkit-appearance: none;
    border-radius: 100%;
    text-align: center;
    box-shadow: 0 15px 20px 0 rgba(0, 0, 0, 0.25);
    border: solid 5px #ffffff;
    cursor: pointer;
    transition: all .25s ease;
    outline: 0;

    &.is-red {
      background-color: rgba(219, 68, 55, 1);
    }

    &.is-yellow {
      background-color: rgba(244, 160, 0, 1);
    }

    &.is-green {
      background-color: rgba(15, 157, 88, 1);
    }

    &.is-blue {
      background-color: rgba(66, 133, 244, 1);
    }

    &:disabled,
    &:disabled:hover {
      opacity: 0.25;
      box-shadow: 0 0px 5px 0 rgba(0, 0, 0, 0.15);
      cursor: not-allowed;
    }

    &:hover {
      box-shadow: 0 5px 10px 0 rgba(0, 0, 0, 0.15);
    }

    &:active {
      box-shadow: 0 0px 5px 0 rgba(0, 0, 0, 0.15);
    }

    svg {
      width: 100%;
      height: 100%;

      path {
        fill: #ffffff;
      }
    }
  }

  .btn-group {
    .btn-round {
      display: inline-block;
      margin: 10px 15px;
    }
  }
</style>