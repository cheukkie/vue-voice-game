<template>
    <div>
        <h2>How to play</h2>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Aperiam molestias inventore commodi aut ducimus enim nobis ad saepe dicta eligendi!</p>
        <router-link to="/multiplayer/playing">
            <button class="btn" @click="beginGame">Start game</button>
        </router-link>
    </div>
</template>

<script>
import { mapGetters,mapActions } from 'vuex';
export default {
    methods:{
        ...mapActions(['startGame']),
        beginGame() {
            //this.settingsSet();
            this.startGame();
            //this.waveAnimation = true;
        }
    }
}
</script>

<style>

</style>
