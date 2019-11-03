<template>
    <ul :class="{icons: view === 'icons'}">
        <li :class="{'is-winner': player.winner, 'is-active': player.currentPlayer}" v-for="(player,index) in allPlayers" :key="index">
            <span v-if="player.winner">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                    <path d="M3 16l-3-10 7.104 4 4.896-8 4.896 8 7.104-4-3 10h-18zm0 2v4h18v-4h-18z" /></svg>
            </span>
            <span class="name">{{ displayName(player.name) }}</span>
            <span class="score">{{ player.score }}</span>
            <span class="indicator" v-if="player.currentPlayer"></span>
            <button v-if="!gameSettingsStatus" @click="removePlayer(index)">Delete player</button>
            <button v-if="!gameSettingsStatus">Edit name</button>
        </li>
    </ul>
</template>

<script>
    import {
        mapGetters,
        mapActions
    } from 'vuex';

    export default {
        name: 'AllPlayers',
        props: {
            view: String,
        },
        computed: {
            ...mapGetters(['allPlayers', 'gameSettingsStatus']),
        },
        methods: {
            ...mapActions(['removePlayer']),
            displayName: function(name) {
                if (this.view === 'icons') {
                    return name.charAt(0);
                } else {
                    return name;
                }
            }
        }
    };
</script>

<style lang="scss" scoped>
    ul {
        margin: auto;
        padding: 0;
        text-align: center;
        list-style: none;
        width: 100%;

        li {
            position: relative;
            display: flex;
            justify-content: space-between;
            align-items: center;
            border-radius: 15px;
            border: solid 1px rgba(244, 160, 0, 1);
            color: rgba(244, 160, 0, 1);
            margin: 0 0 5px 0;
            padding: 0 15px;
            text-align: center;
            border-radius: 25px;
            height: 40px;
            font-weight: bold;

            svg {
                margin-right: 5px;

                path {
                    fill: #ffffff;
                }
            }

            .indicator{
                position: absolute;
                display: block;
                width: 0; 
                height: 0; 
                left: -10px;
                margin:auto;

                border-top: 5px solid transparent;
                border-bottom: 5px solid transparent;
                
                border-left: 5px solid rgba(244, 160, 0, 1);
            }

            &.is-winner {
                background-color: rgba(244, 160, 0, 1);
                color: #fff;
            }

            .name {
                text-overflow: ellipsis;
                white-space: nowrap;
                overflow: hidden;
                margin-right: 20px;
                text-align: left;
                flex: 1;
            }
        }

        &.icons {
            li {
                display: inline-block;
                height: 40px;
                width: 40px;
                margin: 5px;
                padding: 0;
            }

            .indicator{
                left: 0;
                right: 0;
                bottom: -10px;

                border-right: 5px solid transparent;
                border-bottom: 5px solid rgba(244, 160, 0, 1);
                
                border-left: 5px solid transparent;
            }
            .name {
                margin: 0;
                line-height: 40px;
            }

            .score {
                position: absolute;
                top: -5px;
                right: -10px;
                background-color: #f4a000;
                width: 20px;
                height: 20px;
                border-radius: 100%;
                color: #fff;
                font-size: 12px;
                line-height: 20px;
                text-align: center;
            }
        }
    }
</style>