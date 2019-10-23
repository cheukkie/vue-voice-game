<template>
  <div id="app">
    <div class="container">
      <h1>
        <span>
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M15.526 11.409c-1.052.842-7.941 6.358-9.536 7.636l-2.697-2.697 7.668-9.504 4.565 4.565zm5.309-9.867c-2.055-2.055-5.388-2.055-7.443 0-1.355 1.356-1.47 2.842-1.536 3.369l5.61 5.61c.484-.054 2.002-.169 3.369-1.536 2.056-2.055 2.056-5.388 0-7.443zm-9.834 17.94c-2.292 0-3.339 1.427-4.816 2.355-1.046.656-2.036.323-2.512-.266-.173-.211-.667-.971.174-1.842l-.125-.125-1.126-1.091c-1.372 1.416-1.129 3.108-.279 4.157.975 1.204 2.936 1.812 4.795.645 1.585-.995 2.287-2.088 3.889-2.088 1.036 0 1.98.464 3.485 2.773l1.461-.952c-1.393-2.14-2.768-3.566-4.946-3.566z"/></svg>
        </span>
          Voice Game
      </h1>
      <div v-if="webSpeech">
        <div v-if="!gameSettingsStatus">
          <FormInputRange v-model="gameModeSettings.maxPlayers" :min="2" :max="8" label="Spelers" />
          <FormInputSelect v-model="gameModeSettings.targetScore" placeholder="Selecteer een win score" :options="[5,10,15,20,30]" />
          <br>
          <button class="btn" v-if="!gameSettingsStatus" @click="saveGameSettings">Opslaan</button>
        </div>

        <AllPlayers />
        <AddPlayer v-if="gameSettingsStatus && allPlayers.length < gameModeSettings.maxPlayers" />
        <!-- <button class="btn" v-if="allPlayers.length >= gameModeSettings.maxPlayers" @click="startGame">Play</button> -->

        <div v-if="allPlayers.length >= gameModeSettings.maxPlayers && gameSettingsStatus && !gameOverStatus">
          Ronde {{ curRound }}
          <RecordBtn :player="curPlayer" />
        </div>
        <div v-if="gameOverStatus">
          <button class="btn" @click="resetGame">Reset</button>
        </div>
      </div>
      <div v-else>
        <p>This is an experiment with Web Speech API</p>
        <p>To play this game please use a Chrome browser.</p>
      </div>
      <AudioWave />
    </div>
  </div>
</template>

<script>
  import { mapGetters, mapActions } from 'vuex';
  import AllPlayers from './components/AllPlayers.vue';
  import AddPlayer from './components/AddPlayer.vue';
  import RecordBtn from './components/RecordBtn.vue';
  import AudioWave from './components/AudioWave.vue';
  import FormInputRange from './components/FormInputRange.vue';
  import FormInputSelect from './components/FormInputSelect.vue';

  export default {
    name: 'app',
    data: function () {
      return {
        webSpeech: false,
        //gameRunning: false,

        gameModeSettings: {
          maxPlayers: 2,
          targetScore: 5,
        }
      };
    },
    methods: {
      ...mapActions(['setWinningScore','resetGame','settingsSet']),
      // startGame() {
      //   //this.gameRunning = true;
      //   this.settingsSet();
      // },
      saveGameSettings(){
        this.settingsSet();
        
        const winningScore = parseInt(this.gameModeSettings.targetScore);
        console.log(winningScore);
        this.setWinningScore(winningScore);
      }
    },
    computed: {
      ...mapGetters(['allPlayers','curPlayer','curRound','gameOverStatus','gameSettingsStatus']),
    },
    mounted: function () {
      window.SpeechRecognition = window.webkitSpeechRecognition || window.SpeechRecognition;
      if ('webkitSpeechRecognition' in window) {
        // speech recognition API supported
        this.webSpeech = true;
      } else {
        // speech recognition API not supported
      }
    },
    components: {
      AddPlayer,
      AllPlayers,
      RecordBtn,
      AudioWave,
      FormInputRange,
      FormInputSelect,
    }
  };
</script>

<style lang="scss">
  html {
    box-sizing: border-box;
  }
  *, *:before, *:after {
    box-sizing: inherit;
  }
  body{
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
    display:flex;
    justify-content: center;
  }
  .container{
    background-color: rgba(255,255,255,0.95);
    border-radius: 15px;
    padding: 20px;
    max-width: 320px;
    margin: auto;
    box-shadow: 0 20px 15px rgba(0,0,0,0.15);
  }
  h1{
    color: #0F9D58;
    margin: 0 0 10px 0;
    span{
      display: inline-flex;
      vertical-align: middle;
      justify-content: center;
      align-items: center;
      border-radius: 100%;
      border: solid 2px #0F9D58;
      width: 45px;
      height: 45px;
      text-align: center;
      vertical-align: middle;
    }
    svg{
      display: inline-block;
      path{
        fill: #0F9D58;
      }
    }
  }
  .btn{
    display: block;
    border-radius: 25px;
    border: none;
    -webkit-appearance: none;
    color: rgba(244,160,0,1);
    background-color: #ffffff;
    font-weight: bold;
    width: 100%;
    font-size: 16px;
    padding: 10px 15px;
    margin: 10px 0;
    box-shadow: 0 5px 10px 0 rgba(0,0,0,0.15);
    outline: 0;
    &:hover{
      cursor: pointer;
      background-color: rgba(244,160,0,1);
      color: #ffffff;
    }
  }
</style>