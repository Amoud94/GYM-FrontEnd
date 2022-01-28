import Vue from 'vue';
import Router from 'vue-router';
import Home from './components/Home.vue';
import Login from './components/Login.vue';

Vue.use(Router);

export const router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/home',
      component: Home
    },
    {
      path: '/login',
      component: Login
    },
    {
      path: '/profile',
      name: 'profile',
      // lazy-loaded
      component: () => import('./components/Profile.vue')
    },
    {
      path: '/manager',
      name: 'manager',
      // lazy-loaded
      component: () => import('./components/BoardManager.vue')
    },
    {
      path: '/coach',
      name: 'coach',
      // lazy-loaded
      component: () => import('./components/BoardCoach.vue')
    },
    {
      path: '/employee',
      name: 'employee',
      // lazy-loaded
      component: () => import('./components/BoardEmployee.vue')
    }
  ]
});
router.beforeEach((to, from, next) => {
	const publicPages = ['/login', '/register', '/home'];
	const authRequired = !publicPages.includes(to.path);
	const loggedIn = localStorage.getItem('user');
  
	// trying to access a restricted page + not logged in
	// redirect to login page
	if (authRequired && !loggedIn) {
	  next('/login');
	} else {
	  next();
	}
  });