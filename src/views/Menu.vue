<template>
    <div>
        <h2>Select game mode</h2>        
        <button disabled class="btn">Single player</button>
        <router-link to="/multiplayer/info">
            <button class="btn">Multiplayer</button>
        </router-link>
        <!-- <button>Multi player</button> -->
        <button disabled class="btn">Leaderboards</button>
        <button disabled class="btn">Settings</button>
    </div>
</template>

<script>
export default {
}
</script>

<style>

</style>
