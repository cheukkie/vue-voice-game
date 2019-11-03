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
          <div>
            <h2>Select game mode</h2>
            <button disabled class="btn">Single player</button>
            <button class="btn">Multi player</button>
            <button disabled class="btn">Leaderboards</button>
            <button disabled class="btn">Settings</button>
          </div>
          <div v-if="!gameSettingsStatus">
            <h2>Rules</h2>
            <FormInputRange v-model="gameModeSettings.maxPlayers" :min="2" :max="4" label="Spelers" />
            <FormInputSelect v-model="gameModeSettings.targetScore" placeholder="Select win score - default 5"
              :options="gameModeSettings.scoreOptions" />
            <br>
            <button class="btn" v-if="!gameSettingsStatus" @click="saveGameSettings">Opslaan</button>
          </div>

          <div v-if="!gameStarted && gameSettingsStatus && allPlayers.length < gameModeSettings.maxPlayers">
            <h2>Add players</h2>
            <AllPlayers view="list" />
            <AddPlayer />
          </div>
          <div v-if="allPlayers.length >= gameModeSettings.maxPlayers && !gameStarted">
            <h2>Explanation</h2>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Aperiam molestias inventore commodi aut ducimus enim nobis ad saepe dicta eligendi!</p>
            <button class="btn" @click="beginGame">Start game</button>
          </div>

          <div v-if="gameStarted && gameSettingsStatus && !gameOverStatus">
            Ronde {{ curRound }}
            <RecordPanel :player="curPlayer" />
          </div>
          <div v-if="gameOverStatus">
            <h2>Winner!</h2>
            <AllPlayers view="list" />
            <button class="btn" @click="resetGame">Play again</button>
          </div>
        </div>
        <div v-else>
          <p>This is an experiment with Web Speech API</p>
          <p>To play this game please use a Chrome browser.</p>
        </div>
      </div>
    </div>

    <div v-if="gameStarted && gameSettingsStatus && !gameOverStatus">
      <AllPlayers view="icons" />
    </div>
    <AudioWave :animate="waveAnimation" />

  </div>
</template>

<script>
  import {
    mapGetters,
    mapActions
  } from 'vuex';
  import AllPlayers from './components/AllPlayers.vue';
  import AddPlayer from './components/AddPlayer.vue';
  import RecordPanel from './components/RecordPanel.vue';
  import AudioWave from './components/AudioWave.vue';
  import FormInputRange from './components/FormInputRange.vue';
  import FormInputSelect from './components/FormInputSelect.vue';

  export default {
    name: 'app',
    data: function () {
      return {
        webSpeech: false,
        waveAnimation: false,
        gameModeSettings: {
          maxPlayers: 2,
          targetScore: 5,
          scoreOptions: [{
            value: 5,
            label: 'Winscore: 5'
          },{
            value: 10,
            label: 'Winscore: 10'
          }, {
            value: 15,
            label: 'Winscore: 15'
          }, {
            value: 20,
            label: 'Winscore: 20'
          }, {
            value: 30,
            label: 'Winscore: 30'
          }]
        }
      };
    },
    methods: {
      ...mapActions(['setWinningScore', 'resetGame', 'settingsSet', 'startGame']),
      beginGame() {
        //this.settingsSet();
        this.startGame();
        this.waveAnimation = true;
      },
      saveGameSettings() {
        const winningScore = parseInt(this.gameModeSettings.targetScore);
        this.setWinningScore(winningScore);
        this.settingsSet();
      }
    },
    computed: {
      ...mapGetters(['allPlayers', 'curPlayer', 'curRound', 'gameOverStatus', 'gameSettingsStatus', 'gameStarted']),
    },
    mounted: function () {
      window.SpeechRecognition = window.webkitSpeechRecognition || window.SpeechRecognition;
      if ('webkitSpeechRecognition' in window) {
        // speech recognition API supported
        this.webSpeech = true;
      }
    },
    components: {
      AddPlayer,
      AllPlayers,
      RecordPanel,
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