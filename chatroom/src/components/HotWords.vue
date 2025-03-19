<template>
  <div class="hotwords-container">
    <van-notice-bar left-icon="volume-o" :text="currentHotWord" />

  </div>
</template>

<script>
import { generateHotSentence } from '@/utils/hotWords';


export default {
  data () {
    return {
      currentHotWord: '',
      refreshTimer: null
    };
  },
  mounted () {
    this.generateHotWord();
    this.refreshTimer = setInterval(() => {
      this.generateHotWord();
    }, 5000);
  },
  beforeDestroy () {
    clearInterval(this.refreshTimer);
  },
  methods: {
    generateHotWord () {
      this.currentHotWord = generateHotSentence();
    },
    copyHotWord () {
      if (this.currentHotWord) {
        navigator.clipboard.writeText(this.currentHotWord)
          .then(() => this.$toast.success('复制成功'))
          .catch(() => this.$toast.fail('复制失败'));
      }
    }
  }
};
</script>

<style scoped>
.hotwords-container {
  width: 100%;
  height: 40px;
}

.generate-btn {
  margin-right: 10px;
  padding: 7px 12px;
}

.van-notice-bar {
  background: #09f;
  color: #fff;
}

.hotword-text {
  font-size: 14px;
  color: #409eff;
  margin-right: 8px;
}

.copy-icon {
  cursor: pointer;
  color: #909399;
  transition: color 0.2s;
}

.copy-icon:hover {
  color: #409eff;
}
</style>