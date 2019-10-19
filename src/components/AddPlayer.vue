<template>
    <form @submit.prevent="onSubmit">
        <label for="name">
        Speler <input id="name" type="text" placeholder="Naam" v-model="name">
        </label>
        <button :disabled="!name" >+ Add player</button>
    </form>
</template>

<script>
import { mapActions } from 'vuex';

export default {
  data: function() {
    return {
      name: ''
    };
  },
  methods: {
    ...mapActions(['addPlayer']),
    onSubmit() {
      this.addPlayer(this.name);
      this.name = '';
    }
  },
  computed: {}
};
</script>

<style>
</style>
