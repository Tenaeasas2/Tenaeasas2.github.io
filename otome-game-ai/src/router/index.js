import { createRouter, createWebHistory } from 'vue-router'


export const router = createRouter({
  history: createWebHistory("/otomeGame/"),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('@/views/home.vue')
    },
    {
      path: '/chat-room',
      name: 'ChatRoom',
      component: () => import('@/views/ChatRoom.vue')
    },

  ]
})