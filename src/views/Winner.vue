<template>
  <div>
    <h2>Winner!</h2>
    <AllPlayers view="list" />
    <router-link to="/">
      <button
        class="btn is-block"
        @click="resetGame">
        Play again
      </button>
    </router-link>
  </div>
</template>

<script>
import { createNamespacedHelpers } from 'vuex';
import AllPlayers from '@/components/AllPlayers.vue';

const {
  mapMutations: mapGameMutations,
} = createNamespacedHelpers('game');
export default {
  components: {
    AllPlayers,
  },
  methods: {
    ...mapGameMutations([
      'RESET_GAME',
    ]),
  },
};
</script>

<style>

</style>
