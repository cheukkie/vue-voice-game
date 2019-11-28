<template>
  <div>
    <h2>Player<span v-if="category === 'multi'">s</span></h2>
    <AllPlayers view="list" />
    <div v-if="getAllPlayers.length < maxPlayers">
      <form @submit.prevent="onSubmit">
        <div class="inputHolder">
          <input
            ref="player"
            v-model="name"
            type="text"
            placeholder="New player"
            :disabled="isRecording">
        </div>
        <div v-if="category === 'multi'">
          <div
            v-for="(n,index) in (maxPlayers-(getAllPlayers.length+1))"
            :key="index">
            <div class="inputHolder">
              <input
                disabled
                type="text"
                placeholder="New player">
            </div>
          </div>
        </div>
        <button
          class="hide"
          @click.prevent="onSubmit">
          Add player
        </button>
      </form>
      <div class="btn-group">
        <RecordBtn
          color="red"
          :show-interim-results="true"
          @click.native="startRecording"
          @recordBtnOutput="addName"
          @recordBtnEnd="endRecording" />
        <button
          class="btn-icon is-blue"
          :disabled="!name || isRecording"
          title="Add player"
          @click.prevent="onSubmit">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="100%"
            height="100%"
            viewBox="0 0 24 24">
            <path
              d="M19.5 15c-2.483 0-4.5 2.015-4.5 4.5s2.017 4.5 4.5 4.5 4.5-2.015 4.5-4.5-2.017-4.5-4.5-4.5zm2.5 5h-2v2h-1v-2h-2v-1h2v-2h1v2h2v1zm-7.18 4h-14.815l-.005-1.241c0-2.52.199-3.975 3.178-4.663 3.365-.777 6.688-1.473 5.09-4.418-4.733-8.729-1.35-13.678 3.732-13.678 6.751 0 7.506 7.595 3.64 13.679-1.292 2.031-2.64 3.63-2.64 5.821 0 1.747.696 3.331 1.82 4.5z" />
          </svg>
        </button>
      </div>
    </div>
    <router-link
      v-if="getAllPlayers.length === maxPlayers"
      :to="`/${category}/${mode}/playing`">
      <button
        :disabled="getAllPlayers.length < maxPlayers"
        class="btn is-block"
        @click="beginGame">
        Play
      </button>
    </router-link>
    <router-link :to="`/${category}/${mode}/info`">
      <button class="btn is-block is-ghost">
        Back
      </button>
    </router-link>
  </div>
</template>

<script>
import {
  createNamespacedHelpers,
} from 'vuex';


import AllPlayers from '@/components/AllPlayers.vue';
import RecordBtn from '@/components/RecordBtn.vue';

const {
  mapMutations: mapGameMutations,
  mapActions: mapGameActions,
} = createNamespacedHelpers('game');
const {
  mapState: mapPlayersState,
  mapMutations: mapPlayersMutations,
} = createNamespacedHelpers('players');

export default {
  name: 'Players',
  components: {
    RecordBtn,
    AllPlayers,
  },
  data() {
    return {
      name: '',
      isRecording: false,
      category: this.$route.params.category,
      mode: this.$route.params.mode,
    };
  },
  computed: {
    ...mapPlayersState({
      getAllPlayers: (state) => state.players,
      maxPlayers: (state) => state.max_players,
    }),
  },
  updated() {
    const vm = this;
    this.$nextTick(() => {
      if (vm.getAllPlayers.length < vm.maxPlayers) {
        vm.$refs.player.focus();
      }
    });
  },
  mounted() {
    if (this.getAllPlayers.length < this.maxPlayers) {
      this.$refs.player.focus();
    }
    if (this.category === 'single' && this.getAllPlayers.length > 1) {
      this.KEEP_FIRST_PLAYER();
    }
  },
  methods: {
    ...mapGameMutations([
      'SETTINGS_SET',
    ]),
    ...mapGameActions([
      'startGame',
    ]),
    ...mapPlayersMutations([
      'KEEP_FIRST_PLAYER',
      'ADD_PLAYER',
    ]),
    beginGame() {
      this.SETTINGS_SET();
      this.startGame();
    },
    onSubmit() {
      this.ADD_PLAYER(this.capitalize(this.name));
      this.name = '';
    },
    addName(output) {
      if (output === '') {
        this.isRecording = false;
      }
      this.name = this.capitalize(output);
    },
    capitalize(value) {
      if (!value) return '';
      value = value.toString();
      return value.charAt(0).toUpperCase() + value.slice(1);
    },
    startRecording() {
      this.isRecording = true;
    },
    endRecording() {
      this.isRecording = false;
      this.onSubmit();
    },
  },
};
</script>
<style lang="scss" scoped>
  $borderRadius: 25px;

  .inputHolder {
    display: flex;
    justify-content: center;
    width: 100%;
    @include rem(height, 40px);
    @include rem(margin-bottom, 5px);
  }

  input[type="text"] {
    -webkit-appearance: none;
    display: block;
    width: 100%;
    border: none;
    @include rem(padding, 0 15px);
    border: solid 1px #dddddd;
    border-radius: $borderRadius;
    color: $color1;
    @include rem(font-size, 14px);
    font-weight: bold;
    outline: 0;

    &:focus {
      border-color: $color1;
    }

    &:disabled {
      opacity: .35;
    }
  }
</style>
