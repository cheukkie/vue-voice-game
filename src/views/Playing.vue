<template>
    <div>
        <div v-if="gameStarted && gameSettingsStatus && !gameOverStatus">
            <div>Ronde {{ curRound }}</div>
            <RecordPanel :player="curPlayer" />
        </div>
        <div v-if="gameOverStatus">
            <h2>Winner!</h2>
            <AllPlayers view="list" />
            <router-link to="/">
                <button class="btn" @click="resetGame">Play again</button>
            </router-link>
        </div>
        <div v-if="msg" v-html="msg"></div>
        <AllPlayers id="allPlayersIcons" view="icons" v-if="gameStarted && gameSettingsStatus && !gameOverStatus" />
    </div>
</template>

<script>
    import { mapGetters, mapActions } from 'vuex';

    import AllPlayers from '@/components/AllPlayers.vue';
    import RecordPanel from '@/components/RecordPanel.vue';

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
                this.msg = '<h2>No players found</h2><p> Returning to menu...<p>';
                setTimeout(()=>{
                    this.$router.push('/');
                },2000);
            }
        },
        computed:{
            ...mapGetters(['allPlayers','curPlayer', 'curRound', 'gameOverStatus', 'gameSettingsStatus', 'gameStarted']),
        },
        components:{
            AllPlayers,
            RecordPanel
        }
    }
</script>

<style scoped>
    #allPlayersIcons{
        position: fixed;
        bottom: 50px;
        left: 0;
    }
</style>