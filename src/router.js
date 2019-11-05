import Vue from 'vue';
import Router from 'vue-router';

import Menu from '@/views/Menu.vue';
import Info from '@/views/Info.vue';
import AddPlayers from '@/views/AddPlayers.vue';
import Playing from '@/views/Playing.vue';
import Settings from '@/views/Settings.vue';

Vue.use(Router)

const appRouter = new Router({
  // mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Menu',
      component: Menu,
    },
    {
      path: '/settings',
      name: 'Settings',
      component: Settings,
    },
    {
      path: '/multiplayer/players',
      name: 'Add players',
      component: AddPlayers,
    },
    {
      path: '/multiplayer/info',
      name: 'Info',
      component: Info,
    },
    {
      path: '/multiplayer/playing',
      name: 'Playing',
      component: Playing,
    },
  ]
});
export default appRouter;