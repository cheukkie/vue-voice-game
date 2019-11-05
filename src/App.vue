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
    <AppFooter />
    <ModalContainer v-if="modalOpen"></ModalContainer>
    <!--
    <NotificationContainer
      :auto-hide-after="0"
      type="modal"
      role="success"
      pos-x="right" 
      pos-y="bottom"
      title="Notification title"
      msg="This is a message">
    </NotificationContainer>
    -->
  </div>
</template>

<script>
  // Input text component
  // Notification component
  // URL Params
  // Save to localstorage
  // Audiowave mobile
  // GAME MODES

  import { mapGetters } from 'vuex';
  
  import AppHeader from '@/components/AppHeader.vue';
  import AppBody from '@/components/AppBody.vue';
  import AppFooter from '@/components/AppFooter.vue';

  import ModalContainer from '@/components/ModalContainer.vue';
  import NotificationContainer from '@/components/NotificationContainer.vue';

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
      ...mapGetters(['curPlayer', 'curRound', 'gameOverStatus', 'gameSettingsStatus', 'gameStarted']),
    },
    components: {
      AppHeader,
      AppBody,
      AppFooter,
      ModalContainer,
      NotificationContainer
    }
  };
</script>

<style lang="scss">
  @import "@/styles/_global.scss";

  .hide{
      display: none;
  }
  #app {
    font-family: $fontMain;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    height: 100vh;
    width: 100vw;
    display: flex;
    justify-content: center;
    flex-direction: column;
  }

  .container {
      display: flex;
      flex-direction: column;
      justify-content: center;
      padding: 10px;
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
    justify-content: center;
    align-items: center;
    height: 100%;
    width: 100%;
  }

</style>