<template>
    <div>
        <h2>How to play</h2>
        <p>There are <strong><u>{{ maxPlayers }} players</u></strong> or teams in total. The first team/player to reach the score of <strong><u>{{ gameWinningScore }} points</u></strong> will win the game. Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellat cum saepe maiores ut, reiciendis aspernatur?</p>
        <router-link to="/multiplayer/players">
            <button class="btn">Add players</button>
        </router-link>
        <router-link to="?modal=rules">
            <button class="btn">Change rules</button>
        </router-link>
        <router-link to="/">
            <button class="btn is-ghost">Back</button>
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
