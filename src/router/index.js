// Composables
import { createRouter, createWebHistory } from 'vue-router'
import { useStorage } from "vue3-storage-secure";
import { nextTick } from 'vue'
import { APP_NAMES } from '@/plugins/dictionary';

const DEFAULT_TITLE = APP_NAMES.capitalize;

const routes = [
  // ? Default routes
  {
    path: '/register',
    component: () => import('@/layouts/empty-layout.vue'),
    children: [
      {
        path: '',
        name: 'Register',
        component: () => import('@/pages/register.vue'),
        meta: { head: `Register - ${DEFAULT_TITLE}` }
      },
    ],
  },


  {
    path: '/',
    component: () => import('@/layouts/empty-layout.vue'),
    children: [
      {
        path: '',
        name: 'Login',
        component: () => import('@/pages/login.vue'),
        meta: { head: `Login - ${DEFAULT_TITLE}` }
      },
    ],
  },

  {
    path: '/password-reset',
    component: () => import('@/layouts/empty-layout.vue'),
    children: [
      {
        path: '',
        name: 'Password Reset',
        component: () => import('@/pages/password-reset.vue'),
        meta: { head: `Password Reset - ${DEFAULT_TITLE}` }
      },
    ],
  },

  {
    path: '/dashboard',
    component: () => import('@/layouts/default-layout.vue'),
    children: [
      {
        path: '',
        name: 'Dashboard',
        component: () => import('@/pages/dashboard.vue'),
        meta: { head: `Dashboard - ${DEFAULT_TITLE}` }
      },
    ],
  },
  {
    path: '/marketplace',
    component: () => import('@/layouts/default-layout.vue'),
    children: [
      {
        path: '',
        name: 'Marketplace',
        component: () => import('@/pages/marketplace.vue'),
        meta: { head: `Marketplace - ${DEFAULT_TITLE}` }
      },
    ],
  },
  {
    path: '/rec-single',
    component: () => import('@/layouts/default-layout.vue'),
    children: [
      {
        path: '',
        name: 'Rec Single',
        component: () => import('@/pages/rec-single.vue'),
        meta: { head: `Rec Single - ${DEFAULT_TITLE}` }
      },
    ],
  },
  {
    path: '/settings',
    component: () => import('@/layouts/default-layout.vue'),
    children: [
      {
        path: '',
        name: 'Settings',
        component: () => import('@/pages/settings.vue'),
        meta: { head: `Settings - ${DEFAULT_TITLE}` }
      },
    ],
  },
  {
    path: '/my-portfolio',
    component: () => import('@/layouts/default-layout.vue'),
    children: [
      {
        path: '',
        name: 'My portfolio',
        component: () => import('@/pages/my-portfolio.vue'),
        meta: { head: `My portfolio - ${DEFAULT_TITLE}` }
      },
    ],
  },
  {
    path: '/market-trends',
    component: () => import('@/layouts/default-layout.vue'),
    children: [
      {
        path: '',
        name: 'Market trends',
        component: () => import('@/pages/market-trends.vue'),
        meta: { head: `Market trends - ${DEFAULT_TITLE}` }
      },
    ],
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
})


router.beforeEach((to, from, next) => {
  if (to.path === '/auth') return next({ name: 'Login' })


  // this route requires auth, check if logged in
  // if not, redirect to login page.
  const tokenAuth = useStorage().getStorageSync("tokenAuth")
  if (to.matched.some(record => record.meta.requiresAuth) && !tokenAuth)
    return next({ name: 'Login' })

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
