<template>
    <ul>
        <li :class="{winner: player.winner}" v-for="(player,index) in allPlayers" :key="index">
            <span v-if="player.winner">
                <!-- <strong>Winnaar! </strong> -->
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M3 16l-3-10 7.104 4 4.896-8 4.896 8 7.104-4-3 10h-18zm0 2v4h18v-4h-18z"/></svg>
            </span>
            <span class="name">{{ player.name }}</span>
            <span class="score">{{ player.score }}</span>
            <button v-if="!gameSettingsStatus" @click="removePlayer(index)">Delete player</button>
            <button v-if="!gameSettingsStatus">Edit name</button>
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
            display: flex;
            justify-content: space-between;
            align-items: center;
            border-radius: 15px;
            border: solid 1px rgba(244,160,0,1);
            color: rgba(244,160,0,1);
            margin: 0 0 5px 0;
            padding: 0 15px;
            text-align: center;
            border-radius: 25px;
            height: 40px;
            font-weight: bold;
            svg{
                margin-right: 5px;
                path{
                    fill: #ffffff;
                }
            }
            &.winner{
                background-color: rgba(244,160,0,1);
                color: #fff;
            }
            .name{
                text-overflow: ellipsis;
                white-space: nowrap;
                overflow: hidden;
                margin-right: 20px;
                text-align: left;
                flex: 1;
            }
            .score{
                
            }
        }
    }
</style>