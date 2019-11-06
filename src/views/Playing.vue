<template>
    <div class="game-view">
        <div v-if="gameStarted && gameSettingsStatus && !gameOverStatus">
            <RecordPanel :player="curPlayer" />
        </div>
        <div v-if="gameOverStatus">
            <h2>Winner!</h2>
            <AllPlayers view="list" />
            <router-link to="/">
                <button class="btn" @click="resetGame">Play again</button>
            </router-link>
        </div>
        <NotificationContainer v-if="allPlayers.length === 0" :auto-hide-after="5" type="modal" role="warning" pos-x="center" pos-y="center">
            <h2>No players found</h2>
            <p> Returning to menu...</p>
            <br><br>
            <CountDown :time="5" />
        </NotificationContainer>
        <div id="gameInfo" v-if="gameStarted && gameSettingsStatus && !gameOverStatus">
            <div><h2>Ronde {{ curRound }}</h2></div>
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
    #gameInfo{
        position: fixed;
        bottom: 50px;
        left: 0;
        right: 0;
    }
    .game-view{
        margin-bottom: 20vh;
    }
</style>