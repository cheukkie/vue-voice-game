<template>
  <div>
    <div
      v-if="getAllPlayers.length > 0"
      id="gameRound">
      <h2>Round {{ getCurrentRound }}</h2>
    </div>
    <RecordPanel
      v-if="isGameStarted && isSettingsSet && !isGameOver"
      :player="getCurrentPlayer"
      :category="$route.params.category"
      :mode="$route.params.mode" />
    <div
      v-if="isGameStarted && isSettingsSet && !gameOverStatus"
      id="playerInfo">
      <AllPlayers
        v-if="isGameStarted && isSettingsSet && !gameOverStatus"
        view="icons"
        :mode="$route.params.mode" />
    </div>
  </div>
</template>

<script>
import { createNamespacedHelpers } from 'vuex';
import AllPlayers from '@/components/AllPlayers.vue';
import RecordPanel from '@/components/RecordPanel.vue';

const {
  mapState: mapPlayersState,
  mapGetters: mapPlayersGetters,
} = createNamespacedHelpers('players');
const {
  mapState: mapGameState,
} = createNamespacedHelpers('game');
const {
  mapActions: mapNotificationActions,
} = createNamespacedHelpers('notification');

export default {
  components: {
    AllPlayers,
    RecordPanel,
  },
  computed: {
    ...mapPlayersState({
      getAllPlayers: (state) => state.players,
    }),
    ...mapPlayersGetters([
      'getCurrentPlayer',
    ]),
    ...mapGameState({
      getCurrentRound: (state) => state.round,
      isGameStarted: (state) => state.started,
      isGameOver: (state) => state.game_over,
      isSettingsSet: (state) => state.settings_set,
    }),
  },
  mounted() {
    if (this.getAllPlayers.length === 0) {
      this.showNotification({
        autoHideAfter: 3,
        title: 'No players found',
        msg: 'Returning to menu...',
        role: 'warning',
        type: 'modal',
        posX: 'center',
        posY: 'center',
      });

      setTimeout(() => {
        this.$router.push('/');
      }, 4000);
    }
  },
  methods: {
    ...mapNotificationActions(['showNotification']),
  },

};
</script>

<style lang="scss" scoped>
    #playerInfo{
        position: fixed;
        @include rem(bottom, 50px);
        left: 0;
        right: 0;

        @media screen and (max-height: 480px) and (orientation: landscape) {
            display:flex;
            bottom: 0;
            left: 0;
            right: auto;
            top: 0;
            margin: auto;
            height: 100%;
            @include rem(width, 50px);
        }
    }
    #gameRound{
        position: fixed;
        @include rem(top, 40px);
        width: 100%;
        text-align: center;
        left: 0;
        @media screen and (max-height: 480px) and (orientation: landscape) {
            right: 0;
            top: 0;
            height: 100%;
            @include rem(width, 50px);
            left: auto;
            writing-mode: vertical-rl;
            text-orientation: upright;
        }
    }
</style>
