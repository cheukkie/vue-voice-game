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
    <NotificationContainer
      v-if="notificationInfo.active"

      :active="notificationInfo.active"
      :auto-hide-after="notificationInfo.autoHideAfter"
      :pos-x='notificationInfo.posX'
      :pos-y='notificationInfo.posY'
      :type='notificationInfo.type'
      :role='notificationInfo.role'
      :title='notificationInfo.title'
      :msg='notificationInfo.msg'
    />
    
  </div>
</template>

<script>
  // Input text component
  // URL Params
  // input range component
  // BUG after skip dont show notif
  // Edit player names
  // Save to localstorage
  // Clean code audiowave
  // Unique words
  // Win view
  // single player
  // GAME MODES

  
  import { createNamespacedHelpers } from 'vuex';
	const {
    mapState: mapNotificationState,
    mapActions: mapNotificationActions,
  } = createNamespacedHelpers('notification');
  const { mapActions: mapConfigActions, } = createNamespacedHelpers('config');

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
      ...mapConfigActions(['setMobileUser']),
      ...mapNotificationActions(['showNotification']),
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
      
      if(isMobile){
        this.showNotification({
          autoHideAfter : 0,
          title         : 'Hello mobile you!',
          msg           : 'We are glad you are using this app on mobile. Keep in mind that the recording part of the game is working slower on mobile.',
          role          : 'default',
          type          : 'modal'
        });
      }
      
    },
    watch:{
      $route(to,from){
        // console.log(from);
        // console.log(to);
        this.checkParams(to,from);
      }
    },
    computed: {
      ...mapNotificationState({
        notificationInfo: state => { return state;}
      }),
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

