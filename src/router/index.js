import Login from '../views/login/index';
import Admin from '../views/admin';

const routes = [
  {
    name: 'Login',
    path: '/login',
    component: Login,
    title: '登陆',
    exact: false,
    hide: true
  },
  {
    name: '主页',
    path: '/',
    component: Admin,
    title: '主页',
    exact: true,
    hide: true
  }
];

export default routes;