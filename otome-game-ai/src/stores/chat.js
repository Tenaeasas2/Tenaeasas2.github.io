import { defineStore } from 'pinia'

export const useChatStore = defineStore('chat', {
  state: () => ({
    messages: [],
    currentCharacter: '系统'
  }),
  actions: {
    sendMessage (message) {
      this.messages.push(message)
    }
  }
})