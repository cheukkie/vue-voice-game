<template>
    <div>
        <h2>How to play</h2>
        <p>There are <strong>{{ maxPlayers }} players/teams in total</strong>. The first team/player to reach the score of <strong>{{ gameWinningScore }} points</strong> will win the game. Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellat cum saepe maiores ut, reiciendis aspernatur?</p>
        <router-link to="/multiplayer/players">
            <button class="btn">Add players</button>
        </router-link>
        <router-link to="?modal=rules">
            <button class="btn">Change rules</button>
        </router-link>
        <router-link to="/">
            Back
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
