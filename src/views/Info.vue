<template>
    <div>
        <h2>How to play {{ mode }} mode</h2>


        <p v-if="mode==='classic'">
            There are <strong>{{ maxPlayers }} players</strong> in total. The first player to reach the score of <strong>{{ gameWinningScore }} points</strong> will win the game.
        </p>
        <p v-if="mode === 'survival'">
            <span v-if="category==='multi'">
                There are <strong>{{ maxPlayers }} players</strong>. Each player gets
            </span> 
            <span v-if="category==='single'">
                You get
            </span>
            <strong>
                {{ maxLives }}
                <span v-if="maxLives === 1">life.</span>
                <span v-else>lives.</span>
            </strong> 
            
            Each time a mistake is made, we take a life. 
            <span v-if="category==='multi'">Last man standing wins.</span>
            <span v-if="category==='single'">Survive as many rounds as possible.</span>
        </p>

        <router-link :to="`/${category}/${mode}/players`">
            <button class="btn is-block">
                Add player<span v-if="category === 'multi'">s</span>
            </button>
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
        mounted: function(){
            if(this.category === 'single' ){
                this.setMaxPlayers(1);
            }
            if(this.category === 'multi' && this.maxPlayers === 1){
                this.setMaxPlayers(2);
            }
        },
        methods:{
            ...mapActions(['setMaxPlayers']),
        },
        computed: {
            ...mapGetters(['maxLives','maxPlayers','gameWinningScore']),
        },
        
    }
</script>

<style>

</style>
