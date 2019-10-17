<template>
  <div id="app">
    <h1>VOICE GAME</h1>
    <!-- <HelloWorld msg="Welcome to Your Vue.js App"/> -->
    <div v-if="webSpeech">
      
      <AddPlayer />
      <AllPlayers />

      <button>Play</button>
      <RecordBtn />
    </div>
    <div v-else>
      <p>This is an experiment with Web Speech API</p>
      <p>To play this game please use a Chrome browser.</p>
    </div>
  </div>
</template>

<script>
// import HelloWorld from './components/HelloWorld.vue';
import AllPlayers from './components/AllPlayers.vue';
import AddPlayer from './components/AddPlayer.vue';
import RecordBtn from './components/RecordBtn.vue';

export default {
  name: 'app',
  data: function() {
    return {
      webSpeech: false
    };
  },
  computed: {
    playerCount() {
      console.log(this.$store.state.players.length);
      return this.$store.state.player.length;
    }
  },
  mounted: function() {
    window.SpeechRecognition =
      window.webkitSpeechRecognition || window.SpeechRecognition;

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