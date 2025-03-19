// 假设已经安装了 vue-router@3
// 以下是生成路由配置的代码
// 引入 Vue 和 VueRouter
import Vue from 'vue';
import VueRouter from 'vue-router';

// 使用 VueRouter 插件
Vue.use(VueRouter);

// 自动导入 views 目录下的所有 Vue 组件
// const files = require.context('@/views', true, /\.vue$/);
// const routes = [
//   { path: '/', redirect: '/index' },
// ].concat(files.keys().map(key => {
//   const name = key.replace(/\.\/(.*)\.vue$/, '$1');
//   return {
//     path: `/${name}`,
//     name: name,
//     component: () => import(`@/views/${name}.vue`)
//   };
// }));
const routes = [
  {
    path: '/',
    name: 'index',
    component: () => import('@/views/index.vue'),
    redirect: '/home',
    children: [
      {
        path: '/AIChat',
        name: 'AIChat',
        component: () => import('@/views/AIChat.vue')
      },
      {
        path: '/chat',
        name: 'chat',
        component: () => import('@/views/chat.vue')
      },
      {
        path: '/home',
        name: 'home',
        component: () => import('@/views/home.vue')
      },
      {
        path: '/imageGallery',
        name: 'imageGallery',
        component: () => import('@/views/ImageGallery.vue')
      },
    ]
  },

];

// 创建 router 实例
const router = new VueRouter({
  mode: 'history',
  base: '/chat-room/',
  routes
});
export default router;
