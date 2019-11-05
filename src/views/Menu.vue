<template>
    <div>
        <h2>Select game mode</h2>        
        <button disabled class="btn">Single player (Coming soon)</button>
        <router-link to="/multiplayer/info">
            <button class="btn">Multiplayer</button>
        </router-link>
        <!-- <button>Multi player</button> -->
        <button disabled class="btn">Leaderboards (Coming soon)</button>
        <router-link to="/settings">
            <button class="btn">Settings</button>
        </router-link>
    </div>
</template>

<script>
export default {
}
</script>

<style>

</style>
