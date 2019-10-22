<template>
    <ul>
        <li v-for="(player,index) in allPlayers" :key="index">
            <div v-if="player.winner">
                <strong>Winnaar!</strong>
            </div>
            <div>{{ player.name }}: {{ player.score }}</div>
            <button v-if="!gameSettingsStatus" @click="removePlayer(index)">Delete player</button>
        </li>
    </ul>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

export default {
  name: 'AllPlayers',
  computed: mapGetters(['allPlayers','gameSettingsStatus']),
  methods:{
      ...mapActions(['removePlayer'])
  }
};
</script>

<style lang="scss" scoped>
    ul{
        margin: auto;
        padding: 0;
        text-align: center;
        list-style: none;
        li{
            background-color: #ccc;
            display: inline-block;
            border-radius: 5px;
            margin: 5px;
            padding: 10px;
            text-align: center;
        }
    }
</style>