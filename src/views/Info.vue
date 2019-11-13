<template>
    <div>
        <h2>How to play {{ mode }} mode</h2>
        <p>There are <strong>{{ maxPlayers }} players</strong> in total. The first player to reach the score of <strong>{{ gameWinningScore }} points</strong> will win the game.</p>
        <router-link :to="`/${category}/${mode}/players`">
            <button class="btn is-block">Add player<span v-if="category === 'multi'">s</span></button>
        </router-link>
        <router-link v-if="category === 'multi'" to="?modal=rules">
            <button class="btn is-block">Change rules</button>
        </router-link>
        <router-link :to="`/${category}`">
            <button class="btn is-block is-ghost">Back</button>
        </router-link>
    </div>
</template>

<script>
    import { mapGetters,mapActions } from 'vuex';
    export default {
        data: function(){
            return{
                category : this.$route.params.category,
                mode : this.$route.params.mode,
            }
        },
        computed: {
            ...mapGetters(['maxPlayers','gameWinningScore']),
        },
        
    }
</script>

<style>

</style>
