<template>
    <div>
        <h2>How to play</h2>
        <p>There are <strong>{{ maxPlayers }} players</strong> in total. The first player to reach the score of <strong>{{ gameWinningScore }} points</strong> will win the game.</p>
        <router-link to="/multiplayer/players">
            <button class="btn is-block">Add players</button>
        </router-link>
        <router-link to="?modal=rules">
            <button class="btn is-block">Change rules</button>
        </router-link>
        <router-link to="/">
            <button class="btn is-block is-ghost">Back</button>
        </router-link>
    </div>
</template>

<script>
import { mapGetters,mapActions } from 'vuex';
export default {
    computed:{
        ...mapGetters(['maxPlayers','gameWinningScore']),
    },
    
}
</script>

<style>

</style>
