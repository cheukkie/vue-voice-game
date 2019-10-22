<template>
  <div id="app">
    <h1>VOICE GAME</h1>
    <div v-if="webSpeech">
      <div v-if="!gameSettingsStatus">
        <div>
          <label for="setPlayers">
            Aantal spelers:
            <input id="setPlayers" min="2" max="4" type="range" v-model="gameModeSettings.maxPlayers">
            {{ gameModeSettings.maxPlayers }}
          </label>
        </div>
        <div>
          <label for="setScore">
            Score om te winnen:
            <input id="setScore" min="5" max="20" type="range" v-model="gameModeSettings.targetScore">
            {{ gameModeSettings.targetScore }}
          </label>
        </div>
        <button v-if="!gameSettingsStatus" @click="saveGameSettings">Opslaan</button>
      </div>

      
      <AddPlayer v-if="gameSettingsStatus && allPlayers.length < gameModeSettings.maxPlayers" />
      <AllPlayers />
      <!-- <button v-if="allPlayers.length >= gameModeSettings.maxPlayers" @click="startGame">Play</button> -->

      <div v-if="allPlayers.length >= gameModeSettings.maxPlayers && gameSettingsStatus && !gameOverStatus">
        Ronde {{ curRound }}
        <RecordBtn :player="curPlayer" />
      </div>
      <div v-if="gameOverStatus">
        <button @click="resetGame">Reset</button>
      </div>
    </div>
    <div v-else>
      <p>This is an experiment with Web Speech API</p>
      <p>To play this game please use a Chrome browser.</p>
    </div>
    <AudioWave />
  </div>
</template>

<script>
  import { mapGetters, mapActions } from 'vuex';
  import AllPlayers from './components/AllPlayers.vue';
  import AddPlayer from './components/AddPlayer.vue';
  import RecordBtn from './components/RecordBtn.vue';
  import AudioWave from './components/AudioWave.vue';

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
      startGame() {
        //this.gameRunning = true;
        this.settingsSet();
      },
      saveGameSettings(){
        this.settingsSet();
        
        const winningScore = parseInt(this.gameModeSettings.targetScore);
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
      AudioWave
    }
  };
</script>

<style>
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin-top: 60px;
  }
  h1{
    color: #0F9D58;
  }
</style>