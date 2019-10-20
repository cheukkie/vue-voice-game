<template>
    <ul>
        <li v-for="(player,index) in allPlayers" :key="`player-${index}`">
            <div v-if="player.winner">
                Winnaar!
            </div>
            <div><strong>Naam: {{ player.name }}</strong></div>
            <div>Score: {{ player.score }}</div>
            <button>Delete player</button>
        </li>
    </ul>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: 'AllPlayers',
  computed: mapGetters(['allPlayers'])
};
</script>

<style lang="scss" scoped>
    ul{
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