<template>
  <div>
    <h2>Menu</h2>
    <router-link to="/single/">
      <button class="btn is-block">
        Single player
      </button>
    </router-link>
    <router-link to="/multi/">
      <button class="btn is-block">
        Multiplayer
      </button>
    </router-link>
    <button
      disabled
      class="btn is-block">
      Leaderboards (Coming soon)
    </button>
    <router-link to="/settings">
      <button class="btn is-block">
        Settings
      </button>
    </router-link>
  </div>
</template>

<script>
export default {
};
</script>

<style>

</style>
