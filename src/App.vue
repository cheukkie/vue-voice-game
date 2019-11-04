<template>
  <div id="app">
    <AppHeader />
    <AppBody>
      <div v-if="webSpeech">
        <router-view />
      </div>
      <div v-else>
        <h2>Woops!</h2>
        <p>This is an experiment with <a
            href="https://developer.mozilla.org/en-US/docs/Web/API/Web_Speech_API/Using_the_Web_Speech_API"
            target="_blank">Web Speech API</a>. To play this game please use a Chrome browser.</p>
      </div>
    </AppBody>
    
    <AllPlayers view="icons" v-if="gameStarted && gameSettingsStatus && !gameOverStatus" />
    <AudioWave :animate="isAudioWaveStarted" />
    
    <ModalContainer v-if="modalOpen"></ModalContainer>

  </div>
</template>

<script>
  // URL Params
  // GAME MODES
  // Save to localstorage

  import { mapGetters } from 'vuex';
  
  import AppHeader from '@/components/AppHeader.vue';
  import AppBody from '@/components/AppBody.vue';
  import AllPlayers from '@/components/AllPlayers.vue';
  import AudioWave from '@/components/AudioWave.vue';

  import ModalContainer from '@/components/ModalContainer.vue';

  export default {
    name: 'app',
    data: function () {
      return {
        webSpeech: false,
        modalOpen: false,
      };
    },
    methods: {
      checkParams(to,from){
        if( to.query.modal ){
          this.modalOpen = true;
          if(to.query.modal === 'rules'){
            //console.log('show rules');
          }
        }else{
          this.modalOpen = false;
        }
      }
    },
    mounted: function () {
      window.SpeechRecognition = window.webkitSpeechRecognition || window.SpeechRecognition;
      if ('webkitSpeechRecognition' in window) {
        // speech recognition API supported
        this.webSpeech = true;
      }
      this.checkParams(this.$route);
    },
    watch:{
      $route(to,from){
        // console.log(from);
        // console.log(to);
        this.checkParams(to,from);
      }
    },
    computed: {
      ...mapGetters(['curPlayer', 'curRound', 'gameOverStatus', 'gameSettingsStatus', 'gameStarted','isAudioWaveStarted']),
    },
    components: {
      AppHeader,
      AudioWave,
      AppBody,
      ModalContainer,
      AllPlayers
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
    background-color: #fff;
    margin: 0;
  }
  .hide{
      display: none;
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

  a {
    text-decoration: none;
  }

  p>a {
    text-decoration: underline;
  }

  .svg-icon {
    display: inline-flex;
    align-items: center;
    height: 100%;
    width: 100%;
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

    &[disabled] {
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