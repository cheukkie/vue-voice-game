<template>
    <div>
        <div v-if="gameStarted && gameSettingsStatus && !gameOverStatus">
            Ronde {{ curRound }}
            <RecordPanel :player="curPlayer" />
        </div>
        <div v-if="gameOverStatus">
            <h2>Winner!</h2>
            <AllPlayers view="list" />
            <router-link to="/">
                <button class="btn" @click="resetGame">Play again</button>
            </router-link>
        </div>
        
    </div>
</template>

<script>
    import { mapGetters, mapActions } from 'vuex';

    import AllPlayers from '@/components/AllPlayers.vue';
    import RecordPanel from '@/components/RecordPanel.vue';

    export default {
        methods:{
            ...mapActions(['resetGame']),
        },
        computed:{
            ...mapGetters(['curPlayer', 'curRound', 'gameOverStatus', 'gameSettingsStatus', 'gameStarted']),
        },
        components:{
            AllPlayers,
            RecordPanel
        }
    }
</script>

<style>

</style>