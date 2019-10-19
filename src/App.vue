<template>
  <div id="app">
    <h1>VOICE GAME</h1>
    <!-- <HelloWorld msg="Welcome to Your Vue.js App"/> -->
    <div v-if="webSpeech">

      <div v-if="!gameModeSettings.setMaxPlayers">
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
        <button v-if="!gameModeSettings.setMaxPlayers" @click="gameModeSettings.setMaxPlayers = true">Opslaan</button>
      </div>

      <AllPlayers />
      <AddPlayer v-if="gameModeSettings.setMaxPlayers && playersTotal < gameModeSettings.maxPlayers" />
      <button v-if="playersTotal >= gameModeSettings.maxPlayers && !gameRunning" @click="startGame">Play</button>

      <div v-if="gameRunning">
        Ronde {{ curGameRound }}
        <RecordBtn :player="playerCurrent" />
      </div>
    </div>
    <div v-else>
      <p>This is an experiment with Web Speech API</p>
      <p>To play this game please use a Chrome browser.</p>
    </div>
  </div>
</template>

<script>
  import {
    mapGetters
  } from 'vuex';
  import AllPlayers from './components/AllPlayers.vue';
  import AddPlayer from './components/AddPlayer.vue';
  import RecordBtn from './components/RecordBtn.vue';

  export default {
    name: 'app',
    data: function () {
      return {
        webSpeech: false,
        gameRound: 1,
        gameRunning: false,

        gameModeSettings: {
          maxPlayers: 2,
          setMaxPlayers: false,
          targetScore: 5,
        }
      };
    },
    methods: {
      ...mapGetters(['allPlayers','curPlayer','curRound']),
      startGame() {
        this.gameRunning = true;
      },
    },
    computed: {
      playersTotal() {
        return this.allPlayers().length;
      },
      playerCurrent() {
        return this.curPlayer();
      },
      curGameRound(){
        return this.curRound();
      }
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
      RecordBtn
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
</style>