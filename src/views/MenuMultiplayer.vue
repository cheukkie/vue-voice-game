<template>
    <div>
        <h2>Multiplayer</h2>
        <router-link to="/multi/classic/info">
            <button class="btn is-block">Classic</button>
        </router-link>
        <router-link to="/multi/survival/info">
            <button class="btn is-block">Survival</button>
        </router-link>
        <button disabled class="btn is-block">Pick & Pass (Coming soon)</button>
        <router-link to="/">
            <button class="btn is-block is-ghost">Back</button>
        </router-link>
    </div>
</template>

<script>
export default {
    
}
</script>

<style>

</style>
