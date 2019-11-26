<template>
    <div>
        <h2>Winner!</h2>
        <AllPlayers view="list" />
        <router-link to="/">
            <button class="btn is-block" @click="resetGame">Play again</button>
        </router-link>
    </div>
</template>

<script>
import { createNamespacedHelpers, mapMutations } from 'vuex';
const {
    mapMutations: mapGameMutations,
} = createNamespacedHelpers('game');
import AllPlayers from '@/components/AllPlayers.vue';
export default {
    methods:{
        ...mapGameMutations([
            'RESET_GAME',
        ])
    },
    components:{
        AllPlayers
    }
}
</script>

<style>

</style>