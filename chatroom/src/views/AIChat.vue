<template>
  <div class="ai-chat-container">

    <div class="header">
      <h2>AI 智能助手</h2>
    </div>

    <div class="messages">
      <!-- <video class='video-back' src="../assets/img/ai.mp4" autoplay loop muted></video> -->
      <div v-for="(message, index) in messages" :key="index" class="message"
        :class="{ 'ai-message': message.role === 'assistant', 'user-message': message.role === 'user' }">
        <el-avatar :src="message.role === 'user'
        ? avatar
        : img
        " class="message-avatar" />
        <div class="message-bubble">
          <div class="message-content" v-html="formatMessage(message.content)"></div>
          <!-- <div class="message-time">{{ message.timestamp | formatTime }}</div> -->
        </div>
      </div>

      <!-- 加载状态 -->
      <div v-if="isLoading" class="message ai-message loading-indicator">
        <el-avatar :src="img" class="message-avatar" />
        <div class="message-bubble loading-bubble">
          <van-loading color="#1989fa" />
        </div>
      </div>
    </div>

    <div class="input-area">
      <el-input v-model="inputMessage" placeholder="输入您的问题..." @keyup.enter.native="sendMessage" class="input-box">
        <el-button slot="append" icon="el-icon-position" @click="sendMessage" :loading="isLoading">发送</el-button>
      </el-input>
    </div>

  </div>
</template>

<script>
import img from '../assets/img/AI头像.png';
import avatar from '../assets/img/羊.png';

export default {
  data () {
    return {
      avatar,
      img,
      messages: [],
      inputMessage: '',
      isLoading: false
    };
  },
  methods: {
    formatMessage (content) {
      return content.replace(/```(\w*)\n([\s\S]*?)```/g, (match, lang, code) => {
        return `<div class="code-block">
          ${lang ? `<div class="code-language">${lang}</div>` : ''}
          <pre><code>${code.trim()}</code></pre>
        </div>`
      })
    },
    async sendMessage () {
      if (!this.inputMessage.trim()) return;

      const userMessage = {
        role: 'user',
        content: this.inputMessage,
        timestamp: new Date().getTime()
      };

      this.messages.push(userMessage);
      this.inputMessage = '';

      try {
        this.isLoading = true;
        const aiResponse = await this.$chatCompletion([
          ...this.messages,
          userMessage
        ]);
        const tempMessage = {
          role: 'assistant',
          fullContent: aiResponse,
          content: '',
          timestamp: new Date().getTime(),
          isTyping: true
        };
        this.messages.push(tempMessage);

        let index = 0;
        const typingInterval = setInterval(() => {
          if (index < aiResponse.length) {
            tempMessage.content += aiResponse.charAt(index);
            this.messages.splice(this.messages.length - 1, 1, { ...tempMessage });
            index++;
          } else {
            clearInterval(typingInterval);
            tempMessage.isTyping = false;
            this.messages.splice(this.messages.length - 1, 1, { ...tempMessage });
          }
        }, 30);
        this.isLoading = false;
      } catch (error) {
        console.error('发送消息失败:', error);
        this.$message.error(
          error.message.includes('余额不足')
            ? 'AI服务不可用：请检查API密钥或账户余额'
            : '消息发送失败，请稍后重试'
        );
        this.isLoading = false;
      }
    }
  },
  filters: {
    formatTime (timestamp) {
      return new Date(timestamp).toLocaleTimeString();
    }
  }
};
</script>

<style scoped>
.ai-chat-container {
  height: 100%;
  display: flex;
  flex-direction: column;
}

.video-back {
  width: 100%;
  object-fit: cover;
  z-index: -1;
}

.messages {
  z-index: 2;
  flex: 1;
  overflow-y: auto;
  padding: 20px;
}

.ai-chat-container .header {
  background: linear-gradient(to right, var(--header-gradient, #409EFF), #66b1ff);
  padding: 16px 24px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
}

.header h2 {
  color: white;
  margin: 0;
  font-size: 1.5em;
  display: flex;
  align-items: center;
  gap: 12px;
}

.header h2::before {
  content: '';
  display: block;
  width: 32px;
  height: 32px;
  /* background: url('/ai-avatar.png') center/contain no-repeat; */
  filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.1));
}

@media (max-width: 768px) {
  .header {
    padding: 12px 16px;
  }

  .header h2 {
    font-size: 1.2em;
    gap: 8px;
  }

  .header h2::before {
    width: 24px;
    height: 24px;
  }
}

.message {
  display: flex;
  margin: 15px 0;
}

.message-avatar {
  width: 40px;
  height: 40px;
  margin: 0 15px;
}

.message-bubble {
  max-width: 70%;
  padding: 12px 16px;
  border-radius: 12px;
  position: relative;
}

.user-message {
  flex-direction: row-reverse;
}

.user-message .message-bubble {
  background-color: #409EFF;
  color: white;
}

.code-block {
  background-color: #282c34;
  border-radius: 8px;
  padding: 16px;
  margin: 12px 0;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  position: relative;
}

.code-language {
  position: absolute;
  top: -12px;
  right: 16px;
  background: #61afef;
  color: white;
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 0.8em;
  font-family: 'Fira Code', monospace;
}

.code-block pre {
  margin: 0;
  overflow-x: auto;
}

.code-block code {
  font-family: 'Fira Code', monospace;
  font-size: 0.9em;
  line-height: 1.5;
  color: #abb2bf;
  white-space: pre-wrap;
}

@keyframes typing {
  from {
    width: 0
  }

  to {
    width: 100%
  }
}

@keyframes blink-caret {

  from,
  to {
    border-color: transparent
  }

  50% {
    border-color: #409EFF
  }
}

.typing {
  position: relative;
  overflow: hidden;
  border-right: 2px solid #409EFF;
  animation:
    typing 3.5s steps(40, end) forwards,
    blink-caret .75s step-end infinite;
}

.message-content {
  min-height: 1.2em;
}

/* 加载动画 */
.loading-bubble {
  position: relative;
  background: linear-gradient(145deg, #f5f7fa 30%, #e6f7ff 70%);
  min-height: 60px;
  box-shadow: 0 8px 32px rgba(64, 158, 255, 0.15);
  overflow: hidden;
  animation: breathing 2.5s ease-in-out infinite;
}



@keyframes particle-flow {
  0% {
    transform: rotate(0deg) translate(0);
  }

  100% {
    transform: rotate(360deg) translate(50px);
  }
}

@keyframes breathing {

  0%,
  100% {
    transform: scale(1);
    opacity: 0.95;
  }

  50% {
    transform: scale(1.02);
    opacity: 1;
  }
}

.dot-wave {
  display: flex;
  gap: 8px;
  padding: 12px;
}

.dot {
  width: 12px;
  height: 12px;
  animation:
    dot-wave 1.2s cubic-bezier(0.68, -0.55, 0.27, 1.55) infinite,
    dot-glow 1.5s ease-in-out infinite;
  background:
    radial-gradient(circle at 30% 30%,
      #fff 10%,
      var(--dot-color, #409EFF) 80%);
  box-shadow: 0 2px 6px rgba(64, 158, 255, 0.3);
}

@keyframes dot-glow {

  0%,
  100% {
    opacity: 0.9;
  }

  50% {
    opacity: 1;
    box-shadow: 0 2px 10px rgba(64, 158, 255, 0.5);
  }
}

@keyframes dot-wave {

  0%,
  80%,
  100% {
    transform: translateY(0) scale(1);
    opacity: 0.8;
  }

  40% {
    transform: translateY(-15px) scale(1.2);
    opacity: 1;
  }
}

.wave-loader {
  background: linear-gradient(90deg,
      rgba(64, 158, 255, 0.8) 0%,
      rgba(102, 177, 255, 0.9) 50%,
      rgba(64, 158, 255, 0.8) 100%);
  animation:
    wave-loader 1.2s cubic-bezier(0.4, 0, 0.2, 1) infinite,
    glow-pulse 2s ease-in-out infinite;
  height: 4px;
  border-radius: 2px;
  box-shadow: 0 2px 8px rgba(64, 158, 255, 0.3);
}

@keyframes glow-pulse {

  0%,
  100% {
    filter: drop-shadow(0 0 5px rgba(64, 158, 255, 0.3));
  }

  50% {
    filter: drop-shadow(0 0 10px rgba(64, 158, 255, 0.6));
  }
}


@keyframes wave-loader {
  0% {
    background-position: 200% 0;
  }

  100% {
    background-position: -200% 0;
  }
}

/* 骨架屏效果 */
.skeleton-loader {
  background: #f5f7fa;
  padding: 16px;
  border-radius: 12px;
}

.skeleton-line {
  height: 14px;
  background: linear-gradient(90deg,
      #ececec 25%,
      #f5f5f5 50%,
      #ececec 75%);
  background-size: 200% 100%;
  animation: skeleton-loading 1.5s ease-in-out infinite;
  border-radius: 4px;
  margin-bottom: 8px;
}

@keyframes skeleton-loading {
  0% {
    background-position: 200% 0;
  }

  100% {
    background-position: -200% 0;
  }
}

.ai-message .message-bubble {
  background-color: #f5f7fa;
  border: 1px solid #ebeef5;
}

.input-area {
  padding: 20px;
  border-top: 1px solid #ebeef5;
}

.input-box {
  border-radius: 20px;
}
</style>