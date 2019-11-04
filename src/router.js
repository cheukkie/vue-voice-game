import Vue from 'vue';
import Router from 'vue-router';

import Menu from '@/views/Menu.vue';
import Players from '@/views/Players.vue';
import Info from '@/views/Info.vue';
import Playing from '@/views/Playing.vue';

Vue.use(Router)

const appRouter = new Router({
  // mode: 'history',
  routes: [{
      path: '/',
      name: 'Menu',
      component: Menu,
    },
    {
      path: '/multiplayer/players',
      name: 'Players',
      component: Players,
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