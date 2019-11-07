<template>
    <div>
        <h2>Select game mode</h2>        
        <button disabled class="btn is-block">Single player (Coming soon)</button>
        <router-link to="/multiplayer/info">
            <button class="btn is-block">Multiplayer</button>
        </router-link>
        <!-- <button>Multi player</button> -->
        <button disabled class="btn is-block">Leaderboards (Coming soon)</button>
        <router-link to="/settings">
            <button class="btn is-block">Settings</button>
        </router-link>
    </div>
</template>

<script>
export default {
}
</script>

<style>

</style>
