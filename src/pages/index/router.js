import HomePage from './webviews/home-page/index.vue';
import MyPage from './webviews/my-page/index.vue';

const routes = [
    {
        path: '/',
        component: HomePage,
        name: 'home',
    },
    {
        path: '/my',
        component: MyPage,
        name: 'my',
    },
];

export default routes;