<template>
  <div id="app">
    <AppHeader />
    <AppBody>
      <router-view v-if="webSpeech" />
      <div v-else>
        <h2>Woops!</h2>
        <p>This is an experiment with <a
            href="https://developer.mozilla.org/en-US/docs/Web/API/Web_Speech_API/Using_the_Web_Speech_API"
            target="_blank">Web Speech API</a>. To play this game please use a Chrome browser.</p>
      </div>
    </AppBody>
    <AppFooter />
    <ModalContainer v-if="modalOpen"></ModalContainer>
    
  </div>
</template>

<script>
  // Input text component
  // URL Params
  // Save to localstorage
  // Clean playing view & remove notification container
  // Clean code audiowave
  // GAME MODES

  import { mapGetters, mapActions } from 'vuex';
  import { isMobile } from 'mobile-device-detect';
  
  import AppHeader from '@/components/AppHeader.vue';
  import AppBody from '@/components/AppBody.vue';
  import AppFooter from '@/components/AppFooter.vue';

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
      ...mapActions(['setMobileUser']),
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
      this.setMobileUser(isMobile);
      
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
    min-height: 100vh;
    width: 100vw;
    display: flex;
    justify-content: center;
    flex-direction: column;
  }

  .container {
      display: flex;
      flex-direction: column;
      justify-content: center;
      padding: 15px;
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