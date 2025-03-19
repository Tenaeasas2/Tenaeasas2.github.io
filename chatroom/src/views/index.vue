<template>
  <div class="mobile-container">
    <!-- 顶部导航栏 -->
    <header class="app-header">
      <div class="header-left">
        <el-icon @click.native="showShare = true" name="menu" class="nav-icon"></el-icon>
      </div>
      <h1 class="app-title"></h1>
      <div class="header-right">
        <Weather />
        <!-- <el-icon name="search" class="nav-icon"></el-icon> -->
      </div>
    </header>

    <!-- 内容滚动区域 -->
    <main class="content-area">
      <router-view></router-view>

    </main>

    <!-- 底部导航 -->
    <nav class="bottom-tab">
      <div class="tab-item" v-for="(tab, index) in tabs" :key="index" @click="switchTab(index)"
        :class="{ active: activeTab === index }">
        <el-icon :name="tab.icon" class="tab-icon"></el-icon>
        <span class="tab-label">{{ tab.label }}</span>
      </div>
    </nav>
    <van-share-sheet v-model="showShare" title="立即分享给好友" :options="options" @select="onSelect" />
  </div>
</template>

<script>
import Weather from '../components/Weather.vue'
import { Toast } from 'vant';

export default {
  components: {
    Weather
  },
  data () {
    return {
      activeTab: 0,
      tabs: [
        { icon: 'setting', label: '主页', path: '/home' },
        { icon: 'chat-round', label: 'AI', path: '/AIChat' },
        // { icon: 'setting', label: '聊天', path: '/chat' }
      ],
      options: [
        [
          { name: '微信', icon: 'wechat' },
          { name: '朋友圈', icon: 'wechat-moments' },
          { name: '微博', icon: 'weibo' },
          { name: 'QQ', icon: 'qq' },
        ],
        [
          { name: '复制链接', icon: 'link' },
          { name: '分享海报', icon: 'poster' },
          { name: '二维码', icon: 'qrcode' },
          { name: '小程序码', icon: 'weapp-qrcode' },
        ],
      ],
      showShare: false,
    }
  },
  methods: {
    onSelect (option) {
      switch (option.name) {
        case '微信':
        case '朋友圈':
          // TODO: 对接微信分享SDK
          Toast.success('分享功能准备中');
          break;
        case '复制链接':
          navigator.clipboard.writeText(window.location.href)
            .then(() => Toast.success('链接已复制'))
            .catch(() => Toast.fail('复制失败'));
          break;
        default:
          Toast('暂不支持该分享方式');
      }
      this.showShare = false;
    },
    switchTab (index) {
      if (this.$route.path !== this.tabs[index].path) {
        this.activeTab = index;
        this.$router.push(this.tabs[index].path).catch(err => { });
      }
    }
  }
}
</script>

<style scoped>
.mobile-container {
  display: flex;
  flex-direction: column;
  height: 100vh;
  background: #f5f5f5;
}

::v-deep .van-tabs__content {
  min-height: 34vh;
  background: #fff;
}



.app-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 1rem;
  height: 3rem;
  background: #ffffff;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 100;
}

.app-title {
  font-size: 1.1rem;
  color: #333;
  font-weight: 500;
}

.nav-icon {
  font-size: 1.2rem;
  padding: 0.5rem;
  color: #666;
}

.content-area {
  flex: 1;
  margin-top: 3rem;
  margin-bottom: 3rem;
  overflow: hidden;
}



.content-placeholder {
  background: white;
  border-radius: 0.5rem;
  padding: 1rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}



.bottom-tab {
  display: flex;
  justify-content: space-around;
  height: 3rem;
  background: #ffffff;
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  box-shadow: 0 -2px 8px rgba(0, 0, 0, 0.1);
}

.tab-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 0.2rem 0;
  flex: 1;
  transition: all 0.2s;
}

.tab-item.active {
  color: #409eff;
}

.tab-icon {
  font-size: 1.2rem;
  margin-bottom: 0.2rem;
}

.tab-label {
  font-size: 0.7rem;
  transform: scale(0.9);
}

@media (min-width: 768px) {
  .mobile-container {
    max-width: 450px;
    margin: 0 auto;
  }
}
</style>