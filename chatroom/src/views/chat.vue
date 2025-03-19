<template>
  <div id="mian">
    <!-- <Login v-if="!isLoggedIn" @login="handleLogin" /> -->
    <div class="chat-container">
      <!-- <div class="header">
        <button class="menu-btn" @click="showDrawer = !showDrawer">
          <i class="el-icon-menu"></i>
        </button>
        <Weather />


      </div> -->
      <div class="messages">
        <div v-for="message in messages" :key="message.id + '-' + message.timestamp" class="message"
          :class="{ 'message-me': message.user === username }">
          <div class="message-header"
            :style="{ 'text-align': message.user === username ? 'right' : 'left', 'margin-bottom': '4px' }">
            <strong>{{ message.user }}</strong>
          </div>
          <div class="message-content">{{ message.text }}</div>
          <div class="message-time">{{ formatTime(message.timestamp) }}</div>
          <!-- 添加头像 -->
          <el-avatar :src="message.avatar || 'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png'"
            :style="{
          position: 'absolute',
          right: message.user === username ? '-50px' : 'auto',
          left: message.user === username ? 'auto' : '-50px',
          top: '50%',
          transform: 'translateY(-50%)'
        }"></el-avatar>
        </div>
      </div>
      <div class="input-area">
        <el-popover placement="bottom-start" trigger="click" popper-class="emoji-popover">
          <div class="emoji-picker"
            style="display: flex; flex-direction: column; width: 300px; max-height: 60vh; background: #fff; border-radius: 8px; box-shadow: 0 2px 12px 0 rgba(0,0,0,.1);">
            <transition name="fade" mode="out-in">
              <div class="emoji-tabs"
                style="display: flex; padding: 8px; border-bottom: 1px solid #eee; transition: all 0.3s ease;">
                <div v-for="(category, index) in emojiCategories" :key="index" @click="setActiveCategory(index)"
                  :style="{ color: activeCategory === index ? '#07c160' : '#666', padding: '4px 8px', cursor: 'pointer', fontSize: '14px' }">
                  {{ category }}</div>
              </div>
            </transition>
            <div class="emoji-grid" style="flex: 1; overflow-y: auto; padding: 8px;">
              <div style="display: grid; grid-template-columns: repeat(6, 1fr); gap: 4px;">
                <div v-for="emoji in list" :key="emoji" @click="addEmoji(emoji)"
                  style="padding: 6px; font-size: 24px; text-align: center; cursor: pointer; border-radius: 4px; transition: all 0.2s;"
                  @mouseenter="$event.target.style.transform = 'scale(1.2)'; $event.target.style.background = '#f0f7ff'"
                  @mouseleave="$event.target.style.transform = 'scale(1)'; $event.target.style.background = 'transparent'">
                  {{ emoji }}
                </div>
              </div>
            </div>
          </div>
          <el-button slot="reference" class="emoji-btn"
            style="padding: 8px; background: transparent; border: none; border-radius: 4px;"
            @mouseenter="$event.target.style.background = '#f0f7ff'"
            @mouseleave="$event.target.style.background = 'transparent'">
            <i class="el-icon-star-off" style="font-size: 20px; color: #409EFF;"></i>
          </el-button>
        </el-popover>
        <input v-model="newMessage" @keyup.enter="sendMessage" placeholder="输入消息..." />
        <button @click="sendMessage">
          <i class="el-icon-position"></i>
        </button>
      </div>
    </div>
    <div class="drawer" :class="{ 'drawer-open': showDrawer }">
      <div class="users-list">
        <h3>在线用户</h3>
        <div class="action-buttons">
          <el-button type="danger" @click="clearUsers">清空用户列表</el-button>
          <el-button type="primary" @click="refreshPage">刷新页面</el-button>
        </div>
        <ul class="user-list-container">
          <li v-for="(user, index) in users" :key="index" class="user-item">
            <div class="user-info">
              <el-avatar :src="user.avatar" size="small" class="user-avatar"></el-avatar>
              <div class="user-details">
                <span class="username">{{ user.name }}</span>
                <div class="user-status">
                  <el-tag :type="user.status === 'online' ? 'success' : 'info'" size="small">{{ user.status === 'online'
          ? '在线' : '离线' }}</el-tag>
                  <span class="last-active">{{ formatTime(user.lastActive) }}</span>
                </div>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import Login from '../components/Login.vue'

export default {
  data () {
    return {
      showDrawer: false,
      isLoggedIn: false,
      username: '',
      users: [],
      messages: [],
      newMessage: '',
      socket: null,
      emojiCategories: ['表情', '人物', '动物', '食物', '符号'],
      emojis: [
        ['😀', '😁', '😂', '🤣', '😃', '😄', '😅', '😆', '😉', '😊', '😋', '😎', '😍', '😘', '😗', '😙', '😚', '🙂', '🤗', '🤩'],
        ['👋', '🤚', '🖐', '✋', '🖖', '👌', '🤏', '✌', '🤞', '🤟', '🤘', '🤙', '👈', '👉', '👆', '👇', '🖕', '👍', '👎', '✊'],
        ['🐶', '🐱', '🐭', '🐹', '🐰', '🦊', '🐻', '🐼', '🐨', '🐯', '🦁', '🐮', '🐷', '🐸', '🐵', '🐔', '🐧', '🐦', '🐤', '🐣'],
        ['🍏', '🍎', '🍐', '🍊', '🍋', '🍌', '🍉', '🍇', '🍓', '🍈', '🍒', '🍑', '🥭', '🍍', '🥥', '🥝', '🍅', '🍆', '🥑', '🥦'],
        ['❤', '🧡', '💛', '💚', '💙', '💜', '🤎', '🖤', '🤍', '💔', '❣', '💕', '💞', '💓', '💗', '💖', '💘', '💝', '💟', '☮']
      ],
      list: ['😀', '😁', '😂', '🤣', '😃', '😄', '😅', '😆', '😉', '😊', '😋', '😎', '😍', '😘', '😗', '😙', '😚', '🙂', '🤗', '🤩'],
      activeCategory: 0,
      sendSound: new Audio(require('../assets/MP3/send.mp3')),
      receiveSound: new Audio(require('../assets/MP3/send.mp3'))
    }
  },
  components: {
    Login,
  },
  mounted () {
    if (!this.isLoggedIn) {
      // this.username = this.generateRandomName();
      this.connect();
    }
  },
  methods: {

    setActiveCategory (index) {
      this.activeCategory = index;
      this.list = this.emojis[index]
    },
    addEmoji (emoji) {
      this.newMessage += emoji;
    },
    reconnect () {
      const maxRetries = 5;
      let retryCount = 0;
      const reconnectWithBackoff = () => {
        if (retryCount >= maxRetries) {
          this.$message.error('重连失败，请检查网络连接');
          return;
        }
        const delay = Math.min(5000 * Math.pow(2, retryCount), 30000);
        retryCount++;
        console.log(`尝试第${retryCount}次重连，等待${delay}ms...`);
        setTimeout(() => {
          this.connect();
        }, delay);
      };
      reconnectWithBackoff();
    },
    handleLogin (username) {
      this.isLoggedIn = true;
      this.username = username;
      this.connect();
    },
    generateRandomName () {
      const adjectives = ['快乐的', '聪明的', '勇敢的', '可爱的', '神秘的'];
      const nouns = ['熊猫', '兔子', '猫咪', '狗狗', '小鸟'];
      return adjectives[Math.floor(Math.random() * adjectives.length)] + nouns[Math.floor(Math.random() * nouns.length)];
    },
    connect () {
      const storedUserId = localStorage.getItem('userId');
      const userId = storedUserId || Date.now();
      if (!storedUserId) {
        localStorage.setItem('userId', userId);
      }
      this.socket = new WebSocket('ws://10.0.0.176:8080');
      this.socket.onerror = (error) => {
        console.error('WebSocket error:', error);
        this.$message.error('WebSocket连接失败，正在尝试重新连接...');
        this.reconnect();
      };
      this.socket.onclose = () => {
        console.log('WebSocket connection closed');
        this.reconnect();
      };
      this.socket.onmessage = (event) => {
        const data = JSON.parse(event.data);
        if (data.type === 'message') {
          if (!this.messages.some(msg => msg.id === data.payload.id)) {
            this.messages.push(data.payload);
          }

          if (data.payload.user !== this.username) {
            this.receiveSound.play();
          }
        } else if (data.type === 'users') {
          this.users = data.payload.map(user => ({
            ...user,
            lastActive: user.lastActive || Date.now(),
            status: user.status || 'online'
          }));
        }
      };
      this.socket.onopen = () => {
        this.socket.send(JSON.stringify({
          type: 'join',
          payload: {
            name: this.username,
            id: userId
          }
        }));
      };
    },
    sendMessage () {
      if (!this.socket) {
        this.$message.error('WebSocket连接未建立');
        return;
      }
      if (this.newMessage.trim()) {
        const message = {
          id: Date.now(),
          user: this.username,
          text: this.newMessage,
          timestamp: Date.now()
        };
        console.log(message);

        this.socket.send(JSON.stringify({ type: 'message', payload: message }));
        this.newMessage = '';
        this.sendSound.play();
      }
    },
    formatTime (timestamp) {
      if (!timestamp) return '未知';
      const date = new Date(timestamp);
      const hours = date.getHours().toString().padStart(2, '0');
      const minutes = date.getMinutes().toString().padStart(2, '0');
      const seconds = date.getSeconds().toString().padStart(2, '0');
      return `${hours}:${minutes}:${seconds}`;
    },
    checkUserStatus (timestamp) {
      if (!timestamp) return false;
      const now = Date.now();
      return now - timestamp < 300000;
    },
    clearUsers () {
      this.$confirm('确定要清空所有用户吗？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.socket.send(JSON.stringify({ type: 'clear_users' }));
        this.$message({
          type: 'success',
          message: '已清空用户列表'
        });
        this.users = [];
      }).catch(() => { });
    },
    refreshPage () {
      window.location.reload();
    }
  }
}
</script>

<style scoped>
@import url("//at.alicdn.com/t/c/font_1234567_abcdefghijk.css");

.mian {
  width: 100%;
  height: 100%;
}

.chat-container {
  position: relative;
  max-width: 100%;
  margin: 0;
  padding: 0;
  height: 100vh;
  overflow: hidden;
}

.header {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 100;
  border-radius: 0;
  padding: 10px 15px;
  background: #2196f3;
  color: white;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  ;
}

.menu-btn {
  background: none;
  border: none;
  color: white;
  font-size: 24px;
  cursor: pointer;
  padding: 0;
  min-width: 44px;
  min-height: 44px;
}

.online-count {
  font-size: 14px;
}

.messages {
  /* padding-top: 50px;
  padding-bottom: 60px; */
  padding: 60px 50px;
  height: calc(100vh);
  background: #f0f0f0;
  overflow-y: auto;
  -webkit-overflow-scrolling: touch;
}

.message {
  max-width: 50vw;
  margin: 8px;
  margin-bottom: 16px;
  padding: 16px 20px;
  border-radius: 12px;
  background: #fafafa;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  word-break: break-word;
  position: relative;
  animation: fadeIn 0.2s ease-out;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  transition: all 0.2s ease;
}

.message-me {
  margin-left: auto;
  margin-right: 12px;
  background: #e8f5e9;
}

.message-time {
  font-size: 12px;
  color: #666;
  margin-top: 4px;
}

.input-area {
  background: #fff;
  position: fixed;
  bottom: 50px;
  left: 0;
  right: 0;
  z-index: 100;
  border-radius: 0;
  padding: 10px 15px;
}

.input-area input {
  flex: 1;
  padding: 16px 20px;
  border: 1px solid #e5e5e5;
  border-radius: 25px;
  outline: none;
  font-size: 16px;
  -webkit-tap-highlight-color: transparent;
  margin-right: 12px;
}

.input-area button {
  background: #2196f3;
  border: none;
  color: white;
  padding: 12px 20px;
  border-radius: 25px;
  cursor: pointer;
  min-width: 50px;
  min-height: 50px;
  -webkit-tap-highlight-color: transparent;
}

.message-me {
  margin-left: auto;
  background: #2196f3;
  color: white;
}

.message-me .message-time {
  text-align: right;
}

.message-me .message-header {
  text-align: right;
}

.drawer {
  position: fixed;
  top: 0;
  bottom: 0;
  right: -100%;
  width: 80%;
  max-width: 300px;
  background: #fafafa;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
  z-index: 1000;
  box-shadow: 2px 0 8px rgba(0, 0, 0, 0.1);
}

.drawer-open {
  right: 0;
}

.users-list {
  padding: 20px;
}

.message {
  position: relative;
  /* 为头像留出空间 */
}

.message-me {
  padding-right: 12px;
  padding-left: 50px;
  /* 为头像留出空间 */
}

.users-list h3 {
  font-size: 18px;
  margin-bottom: 16px;
}

.user-info {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 12px;
}

.username {
  font-size: 14px;
}

.last-active {
  font-size: 12px;
  color: #666;
}

.action-buttons {
  display: flex;
  gap: 8px;
  margin-bottom: 16px;
}

.el-button {
  min-width: 80px;
  min-height: 36px;
  font-size: 14px;
}

.emoji-btn {
  min-width: 44px;
  min-height: 44px;
}

.users-list ul {
  list-style: none;
  padding: 0;
  margin: 0;
  min-height: min-content;
}

.users-list li {
  padding: 8px 0;
  border-bottom: 1px solid #e5e5e5;
  min-height: 50px;
}

.user-info {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 10px 0;
  border-bottom: 1px solid #eee;
  min-width: min-content;
}

.username {
  font-weight: 500;
  flex: 1;
}

.last-active {
  font-size: 12px;
  color: #666;
}

.iconfont {
  font-size: 24px;
}
</style>