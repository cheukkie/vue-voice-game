<template>
    <div>
        <h2>Single player</h2>
        <router-link to="/single/classic/info">
            <button disabled class="btn is-block">Classic (Coming soon)</button>
        </router-link>
        <router-link to="/single/survival/info">
            <button class="btn is-block">Survival (Experimental)</button>
        </router-link>
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
