<template>
  <el-container class="chat-container">
    <el-card class="glass-card chat-window rounded-xl" elevation="12">
      <el-card-title class="bg-pink-darken-1">
        <el-icon left>mdi-forum</el-icon>
        角色聊天室
      </el-card-title>

      <el-card-text class="messages-box">
        <div el-for="(msg, index) in messages" :key="index" class="message-item">
          <div class="character-name text-pink-darken-1">{{ msg.character }}</div>
          <div class="dialog-text typing-effect">{{ msg.content }}</div>
        </div>
      </el-card-text>

      <el-card-actions>
        <el-text-field el-model="newMessage" label="输入消息" variant="outlined" @keyup.enter="sendMessage"
          hide-details></el-text-field>
        <el-btn color="pink-darken-1" variant="tonal" @click="sendMessage" :disabled="!newMessage">
          <el-icon right>mdi-send</el-icon>
          发送
        </el-btn>
      </el-card-actions>
    </el-card>
  </el-container>
</template>

<script setup>
import { ref } from 'vue'
import { useChatStore } from '@/stores/chat'

const chatStore = useChatStore()
const newMessage = ref('')

const sendMessage = () => {
  if (newMessage.value.trim()) {
    chatStore.sendMessage({
      character: chatStore.currentCharacter,
      content: newMessage.value.trim()
    })
    newMessage.value = ''
  }
}
</script>

<style scoped lang="scss">
.chat-window {
  width: 800px;
  height: 600px;
  display: flex;
  flex-direction: column;
  background: var(--glass-bg) !important;
  backdrop-filter: blur(20px);
  border-radius: 24px !important;
}

.messages-box {
  flex-grow: 1;
  overflow-y: auto;
  padding: 24px;
}

.message-item {
  margin: 16px 0;
  padding: 16px;
  border-radius: 16px;
  background: var(--glass-bg);
  box-shadow: 0 8px 32px rgba(255, 184, 213, 0.15);
  backdrop-filter: blur(4px);

  .character-name {
    font-size: 1.2rem;
    font-weight: 500;
    margin-bottom: 8px;
  }

  .dialog-text {
    font-size: 1.1rem;
    line-height: 1.6;
    opacity: 0;
    animation: typing 0.08s steps(40) forwards;
  }
}

@keyframes typing {
  from {
    opacity: 0;
    transform: translateY(10px);
  }

  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>