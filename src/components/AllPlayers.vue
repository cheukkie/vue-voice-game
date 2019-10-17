<template>
    <ul>
        <li v-for="player in allPlayers" :key="player.name">naam: {{ player.name }} - score: {{ player.score }}</li>
    </ul>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: 'AllPlayers',
  computed: mapGetters(['allPlayers'])
};
</script>

<style>
</style>
