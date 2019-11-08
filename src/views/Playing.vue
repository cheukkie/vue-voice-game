<template>
    <div class="game-view">
        <div id="gameRound" v-if="allPlayers.length > 0"><h2>Round {{ curRound }}</h2></div>
        <RecordPanel :player="curPlayer" v-if="gameStarted && gameSettingsStatus && !gameOverStatus" />
        <div v-if="gameOverStatus">
            <h2>Winner!</h2>
            <AllPlayers view="list" />
            <router-link to="/">
                <button class="btn is-block" @click="resetGame">Play again</button>
            </router-link>
        </div>
        <NotificationContainer v-if="allPlayers.length === 0" :auto-hide-after="5" type="modal" role="warning" pos-x="center" pos-y="center">
            <h2>No players found</h2>
            <p>Returning to menu...</p>
            <br><br>
            <CountDown :time="5" />
        </NotificationContainer>
        <div id="playerInfo" v-if="gameStarted && gameSettingsStatus && !gameOverStatus">
            <AllPlayers view="icons" v-if="gameStarted && gameSettingsStatus && !gameOverStatus" />
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
        data:function(){
            return {
                msg: ''
            }
        },
        methods:{
            ...mapActions(['resetGame']),
        },
        mounted:function(){
            if( this.allPlayers.length === 0 ){
                setTimeout(()=>{
                    this.$router.push('/');
                },5000);
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

<style scoped>
    #playerInfo{
        position: fixed;
        bottom: 50px;
        left: 0;
        right: 0;
    }
    #gameRound{
        position: fixed;
        top: 40px;
        width: 100%;
        text-align: center;
        left: 0;
    }
    /* .game-view{
        margin-bottom: 20vh;
    } */
</style>