<template>
    <div class="game-view">
        <div id="gameRound" v-if="allPlayers.length > 0"><h2>Round {{ curRound }}</h2></div>
        <RecordPanel 
            v-if="gameStarted && gameSettingsStatus && !gameOverStatus"
            :player="curPlayer" 
            :category = "$route.params.category"
            :mode = "$route.params.mode"
        />
        <div v-if="gameOverStatus">
            <h2>Winner!</h2>
            <AllPlayers view="list" />
            <router-link to="/">
                <button class="btn is-block" @click="resetGame">Play again</button>
            </router-link>
        </div>
        <div id="playerInfo" v-if="gameStarted && gameSettingsStatus && !gameOverStatus">
            <AllPlayers view="icons" :mode="$route.params.mode" v-if="gameStarted && gameSettingsStatus && !gameOverStatus" />
        </div>
    </div>
</template>

<script>
    import { mapGetters, mapActions } from 'vuex';

    import AllPlayers from '@/components/AllPlayers.vue';
    import RecordPanel from '@/components/RecordPanel.vue';
    import NotificationContainer from '@/components/NotificationContainer.vue';
    import CountDown from '@/components/CountDown.vue';

    export default {
        methods:{
            ...mapActions(['resetGame','showNotification']),
        },
        mounted:function(){
            if( this.allPlayers.length === 0 ){
                this.showNotification({
                    autoHideAfter : 3,
                    title         : 'No players found',
                    msg           : 'Returning to menu...',
                    role          : 'warning',
                    type          : 'modal',
                    posX          : 'center',
                    posY          : 'center',
                });

                setTimeout(()=>{
                    this.$router.push('/');
                },4000);
            }
        },
        computed:{
            ...mapGetters(['allPlayers','curPlayer', 'gameOverStatus', 'gameSettingsStatus', 'gameStarted','curRound']),
        },
        components:{
            AllPlayers,
            RecordPanel,
            NotificationContainer,
            CountDown
        }
    }
</script>

<style lang="scss" scoped>
    #playerInfo{
        position: fixed;
        @include rem(bottom, 50px);
        left: 0;
        right: 0;

        @media screen and (max-height: 480px) and (orientation: landscape) {
            display:flex;
            bottom: 0;
            left: 0;
            right: auto;
            top: 0;  
            margin: auto;
            height: 100%;
            @include rem(width, 50px);
        }
    }
    #gameRound{
        position: fixed;
        @include rem(top, 40px);
        width: 100%;
        text-align: center;
        left: 0;
        @media screen and (max-height: 480px) and (orientation: landscape) {
            right: 0;
            top: 0;
            height: 100%;
            @include rem(width, 50px);
            left: auto;
            writing-mode: vertical-rl;
            text-orientation: upright;
        }
    }
</style>