<template>
  <div>
    <h2>Change rules</h2>
    <FormInputRange
      v-model.number="gameModeSettings.maxPlayers"
      :min="2"
      :max="8"
      :value="gameModeSettings.maxPlayers"
      label="Players" />
    <FormInputRange
      v-if="mode ==='survival'"
      v-model.number="gameModeSettings.playerLives"
      :min="1"
      :max="5"
      :value="gameModeSettings.playerLives"
      label="Lives" />
    <FormInputSelect
      v-if="mode ==='classic'"
      v-model.number="gameModeSettings.targetScore"
      :placeholder="gameModeSettings.placeHolderText"
      :options="gameModeSettings.scoreOptions" />
    <br>
    <button
      class="btn is-block"
      @click="saveGameSettings">
      {{ button.label }}
    </button>
  </div>
</template>

<script>
import { createNamespacedHelpers } from 'vuex';

import FormInputRange from '@/components/FormInputRange.vue';
import FormInputSelect from '@/components/FormInputSelect.vue';

const { mapMutations: mapGameMutations } = createNamespacedHelpers('game');
const {
  mapState: mapPlayersState,
  mapMutations: mapPlayersMutations,
} = createNamespacedHelpers('players');

const classic = {
  placeHolder: 'Select win score - default 5',
  options: [
    {
      value: 5,
      label: 'Winscore: 5',
    }, {
      value: 10,
      label: 'Winscore: 10',
    }, {
      value: 15,
      label: 'Winscore: 15',
    }, {
      value: 20,
      label: 'Winscore: 20',
    }, {
      value: 30,
      label: 'Winscore: 30',
    },
  ],
};

export default {
  components: {
    FormInputRange,
    FormInputSelect,
  },
  data() {
    return {
      category: this.$route.params.category,
      mode: this.$route.params.mode,
      button: {
        label: '',
        states: {
          neutral: 'Save',
          progress: 'Saving rules...',
          success: 'Rules saved!',
        },
      },
      gameModeSettings: {
        maxPlayers: 2,
        targetScore: 5,
        playerLives: 1,
        placeHolderText: classic.placeHolder,
        scoreOptions: classic.options,
      },
    };
  },
  computed: {
    ...mapPlayersState({
      maxLives: (state) => state.max_lives,
      maxPlayers: (state) => state.max_players,
    }),
  },
  mounted() {
    this.button.label = this.button.states.neutral;
  },
  created() {
    this.gameModeSettings.playerLives = this.maxLives;
    this.gameModeSettings.maxPlayers = this.maxPlayers;
  },
  methods: {
    ...mapGameMutations([
      'SET_WINNING_SCORE',
      'SETTINGS_SET',
    ]),

    ...mapPlayersMutations([
      'SET_PLAYER_LIVES',
      'SET_MAX_PLAYERS',
    ]),
    saveGameSettings() {
      const winningScore = this.gameModeSettings.targetScore;
      const { playerLives } = this.gameModeSettings;
      const newMaxPlayers = this.gameModeSettings.maxPlayers;

      this.SET_MAX_PLAYERS(newMaxPlayers);
      this.SET_PLAYER_LIVES(playerLives);
      this.SET_WINNING_SCORE(winningScore);
      this.SETTINGS_SET();

      this.button.label = this.button.states.progress;

      setTimeout(() => {
        this.button.label = this.button.states.success;
      }, 1000);
      setTimeout(() => {
        this.button.label = this.button.states.neutral;
      }, 2000);
    },
  },


};
</script>

<style>

</style>
