// Composables
import { createRouter, createWebHistory } from 'vue-router'
import { useStorage } from "vue3-storage-secure";
import { inject, nextTick } from 'vue'
import { APP_NAMES } from '@/plugins/dictionary';
import { ICP_PROVIDE_COLLECTION } from '@/services/icp-provider';

const DEFAULT_TITLE = APP_NAMES.capitalize;

const routes = [
  // ? Default routes
  {
    path: '/',
    component: () => import('@/layouts/default-layout.vue'),
    meta: { requiresAuth: true },
    children: [
      {
        path: 'dashboard',
        name: 'Dashboard',
        component: () => import('@/pages/dashboard.vue'),
        meta: { head: `Dashboard - ${DEFAULT_TITLE}` }
      },
      {
        path: 'marketplace',
        name: 'Marketplace',
        component: () => import('@/pages/marketplace.vue'),
        meta: { head: `Marketplace - ${DEFAULT_TITLE}` }
      },
      {
        path: '/rec-single-portfolio',
        name: 'RecSinglePortfolio',
        component: () => import('@/pages/rec-single-portfolio.vue'),
        meta: { head: `Rec Single Portfolio - ${DEFAULT_TITLE}` }
      },
      {
        path: 'rec-single-marketplace',
        name: 'RecSingleMarketplace',
        component: () => import('@/pages/rec-single-marketplace.vue'),
        meta: { head: `Rec Single - ${DEFAULT_TITLE}` }
      },
      {
        path: 'settings',
        name: 'Settings',
        component: () => import('@/pages/settings.vue'),
        meta: { head: `Settings - ${DEFAULT_TITLE}` }
      },
      {
        path: 'support',
        name: 'Support',
        component: () => import('@/pages/support.vue'),
        meta: { head: `Support - ${DEFAULT_TITLE}` }
      },
      {
        path: 'my-portfolio',
        name: 'MyPortfolio',
        component: () => import('@/pages/my-portfolio.vue'),
        meta: { head: `My portfolio - ${DEFAULT_TITLE}` }
      },
      {
        path: 'my-transactions',
        name: 'MyTransactions',
        component: () => import('@/pages/my-transactions.vue'),
        meta: { head: `My transactions - ${DEFAULT_TITLE}` }
      },
      {
        path: 'profile',
        name: 'Profile',
        component: () => import('@/pages/profile.vue'),
        meta: { head: `Profile - ${DEFAULT_TITLE}` }
      },
      {
        path: 'market-trends',
        name: 'Market trends',
        component: () => import('@/pages/market-trends.vue'),
        meta: { head: `Market trends - ${DEFAULT_TITLE}` }
      },
    ],
  },


  // ? Authenticated routes
  {
    path: '/auth',
    component: () => import('@/layouts/empty-layout.vue'),
    children: [
      {
        path: 'register',
        name: 'Register',
        component: () => import('@/pages/register.vue'),
        meta: { head: `Register - ${DEFAULT_TITLE}` }
      },
      {
        path: 'login',
        name: 'Login',
        component: () => import('@/pages/login.vue'),
        meta: { head: `Login - ${DEFAULT_TITLE}` }
      },
      {
        path: 'password-reset',
        name: 'Password Reset',
        component: () => import('@/pages/password-reset.vue'),
        meta: { head: `Password Reset - ${DEFAULT_TITLE}` }
      },
    ],
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
})


router.beforeEach(async (to, from, next) => {
  if (to.path === '/') return next({ name: 'Dashboard' })
  else if (to.path === '/auth') return next({ name: 'Login' })


  //!FIXME commented for testing
  /* // this route requires auth, check if logged in
  // if not, redirect to login page.
  const isAuthenticated = await inject(ICP_PROVIDE_COLLECTION.authClient).isAuthenticated()
  // const tokenAuth = useStorage().getStorageSync("tokenAuth")
  if (to.matched.some(record => record.meta.requiresAuth) && !isAuthenticated)
    return next({ name: 'Login' }) */

  // go to wherever I'm going
  next()
})


router.afterEach((to, from) => {
  // Use next tick to handle router history correctly
  // see: https://github.com/vuejs/vue-router/issues/914#issuecomment-384477609
  nextTick(() => {
    if (to.meta.head) document.title = to.meta.head.toString();
    else document.title = DEFAULT_TITLE;
  });
});

export default router
