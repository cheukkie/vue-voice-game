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
    <ModalContainer v-if="modal.active">
      <ModalRules v-if="modal.content==='rules'" />
    </ModalContainer>
    <NotificationContainer />
    
  </div>
</template>

<script>
  // Input text component
  // URL Params
  // Notifications
  // Save to localstorage
  // Clean code audiowave
  // GAME MODES

  import { mapGetters, mapActions } from 'vuex';
  import { isMobile } from 'mobile-device-detect';
  
  import AppHeader from '@/components/AppHeader.vue';
  import AppBody from '@/components/AppBody.vue';
  import AppFooter from '@/components/AppFooter.vue';

  import NotificationContainer from '@/components/NotificationContainer.vue';

  import ModalContainer from '@/components/ModalContainer.vue';
  import ModalRules from '@/views/ModalRules.vue';

  export default {
    name: 'app',
    data: function () {
      return {
        webSpeech: false,
        modal:{
          active: false,
          content: '',
          views:[
            'rules'
          ]
        }
      };
    },
    methods: {
      ...mapActions(['setMobileUser']),
      checkParams(to,from){
        if( to.query.modal && this.modal.views.includes(to.query.modal) ){
          this.modal.active = true;
          this.modal.content = to.query.modal;
        }else{
          this.modal.active = false;
          this.modal.content = '';
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
      NotificationContainer,
      ModalContainer,
      ModalRules,
    }
  };
</script>
<style src="@/styles/_global.scss" lang="scss"></style>

