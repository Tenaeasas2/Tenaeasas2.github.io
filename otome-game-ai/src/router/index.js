import { createRouter, createWebHistory } from 'vue-router'
import DialogScene from '@/components/DialogScene.vue'
import { useAppStore } from '@/stores/app'

export const router = createRouter({
  history: createWebHistory(),
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