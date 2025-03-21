import { createRouter, createWebHistory } from 'vue-router'


export const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
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