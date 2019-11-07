<template>
    <ul :class="{icons: view === 'icons'}">
        <li :class="{'is-winner': player.winner, 'is-active': player.currentPlayer}" v-for="(player,index) in allPlayers" :key="index">
            <span class="icon" v-if="player.winner">
                <span class="svg-icon">
                    <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 24 24">
                        <path d="M3 16l-3-10 7.104 4 4.896-8 4.896 8 7.104-4-3 10h-18zm0 2v4h18v-4h-18z" /></svg>
                </span>
            </span>
            <span class="name">{{ displayName(player.name) }}</span>
            <span class="score" v-if="gameStarted">{{ player.score }}</span>
            <span class="indicator" v-if="player.currentPlayer"></span>
        
            <button class="delete" @click="removePlayer(index)" v-if="view !== 'icons' && !gameOverStatus" title="Remove player">
                <div class="svg-icon">
                    <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 24 24"><path d="M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm4.151 17.943l-4.143-4.102-4.117 4.159-1.833-1.833 4.104-4.157-4.162-4.119 1.833-1.833 4.155 4.102 4.106-4.16 1.849 1.849-4.1 4.141 4.157 4.104-1.849 1.849z"/></svg>
                </div>
            </button>
        
        </li>
    </ul>
</template>

<script>
    import { mapGetters, mapActions } from 'vuex';

    export default {
        name: 'AllPlayers',
        props: {
            view: String,
        },
        computed: {
            ...mapGetters(['allPlayers', 'gameSettingsStatus','gameOverStatus','gameStarted']),
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
    @import '@/styles/setup/_variables.scss';

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
            border: solid 1px $color1;
            color: $color1;
            margin: 0 0 5px 0;
            padding: 0 15px;
            text-align: center;
            border-radius: 25px;
            height: 40px;
            font-weight: bold;

            svg {
                path {
                    fill: #ffffff;
                }
            }

            &.is-winner {
                background-color: $color1;
                color: #fff;
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
                
                border-left: 5px solid $color1;
            }

            .icon{
                width: 20px;
                height: 20px;
                margin-right: 5px;
            }
            

            .delete{
                margin: 0 0 0 10px;
                -webkit-appearance: none;
                border: none;
                height: 100%;
                background-color: transparent;
                width: 40px;
                height: 40px;
                cursor: pointer;
                
                svg path{
                    fill: #c5c5c5;
                }
                &:hover{
                    svg path{
                        fill: $color1;
                    }
                }
            }

            .name {
                text-overflow: ellipsis;
                white-space: nowrap;
                overflow: hidden;
                margin-right: 20px;
                text-align: left;
                flex: 12;
            }
        }

        &.icons {
            li {
                display: inline-block;
                height: 40px;
                width: 40px;
                margin: 5px;
                padding: 0;
                color: $color1;
                background-color: #ffffff;
                border: none;
                box-shadow: 0 5px 10px 0 rgba(0, 0, 0, 0.2);
                // &.is-active{
                //     background-color: $color1;
                //     color: #ffffff;
                //     .score{
                //         color: $color1;
                //         background-color: #ffffff;
                //     }
                // }
            }

            .indicator{
                left: 0;
                right: 0;
                bottom: -10px;

                border-right: 5px solid transparent;
                border-bottom: 5px solid $color1;
                
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
                background-color: $color1;
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