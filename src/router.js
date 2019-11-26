import Vue from 'vue';
import Router from 'vue-router';

import Menu from '@/views/Menu.vue';
import MenuSingleplayer from '@/views/MenuSingleplayer.vue';
import MenuMultiplayer from '@/views/MenuMultiplayer.vue';

import Settings from '@/views/Settings.vue';
import Info from '@/views/Info.vue';
import AddPlayers from '@/views/AddPlayers.vue';
import Playing from '@/views/Playing.vue';
import Winner from '@/views/Winner.vue';

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
      path: '/single',
      name: 'Single player',
      component: MenuSingleplayer,
    },
    {
      path: '/multi',
      name: 'Multi player',
      component: MenuMultiplayer,
    },
    {
      path: '/settings',
      name: 'Settings',
      component: Settings,
    },
    {
      path: '/:category/:mode/players',
      name: 'Add players',
      component: AddPlayers,
    },
    {
      path: '/:category/:mode/info',
      name: 'Info',
      component: Info,
    },
    {
      path: '/:category/:mode/playing',
      name: 'Playing',
      component: Playing,
    },
    {
      path: '/:category/:mode/winner',
      name: 'Winner',
      component: Winner,
    },
  ]
});
export default appRouter;