<template>
  <el-container class="scene-container">
    <el-row class="character-row" align="bottom">
      <el-col :span="8">
        <v-img :src="currentCharacter.image" class="character-illustration" contain max-height="70vh" />
      </el-col>
    </el-row>

    <el-row class="dialog-row" align="bottom">
      <el-col :span="10" :offset="1">
        <el-card class="glass-dialog" elevation="12">
          <v-card-text class="dialog-content">
            <div class="character-name">{{ currentCharacter.name }}</div>
            <div ref="dialogText" class="dialog-text" :class="{ 'typing-effect': isTyping }">{{ displayedText }}</div>
          </v-card-text>

          <v-card-actions class="dialog-actions">
            <el-button type="danger" @click="handleVoiceInteraction" :loading="isRecording">
              <i class="iconfont icon-microphone"></i>
              语音输入
            </el-button>

            <v-spacer></v-spacer>

            <el-button type="info" @click="nextDialogStep" v-if="showNextButton">
              继续
              <i class="iconfont icon-arrow-right"></i>
            </el-button>
          </v-card-actions>
        </el-card>
      </el-col>
    </el-row>
  </el-container>
</template>

<script setup>
import { computed, ref, watch } from 'vue'
import { useAppStore } from '@/stores/app'

const store = useAppStore()
const dialogText = ref(null)
const currentStep = ref(0)
const isTyping = ref(false)
const isRecording = ref(false)

const currentCharacter = computed(() => store.selectedCharacter)
const currentDialog = computed(() => store.trainingRecords)

const displayedText = computed(() => {
  return currentDialog.value[currentStep.value]?.content || ''
})

const showNextButton = computed(() => {
  return !isTyping.value && currentStep.value < currentDialog.value.length - 1
})

watch(displayedText, (newVal) => {
  if (newVal) {
    animateText()
  }
})

const animateText = async () => {
  isTyping.value = true
  const text = displayedText.value
  const element = dialogText.value

  await element.animate([
    { opacity: 0, transform: 'translateY(10px)' },
    { opacity: 1, transform: 'translateY(0)' }
  ], {
    duration: 500,
    easing: 'cubic-bezier(0.4, 0, 0.2, 1)'
  }).finished

  isTyping.value = false
}

const nextDialogStep = () => {
  currentStep.value = Math.min(currentStep.value + 1, currentDialog.value.length - 1)
}

const handleVoiceInteraction = () => {
  // 语音交互逻辑
}
</script>

<style lang="scss" scoped>
.scene-container {
  height: 100vh;
  position: relative;
}

.character-illustration {
  filter: drop-shadow(0 0 20px rgba(255, 183, 213, 0.5));
}

.glass-dialog {
  background: rgba(255, 255, 255, 0.9) !important;
  backdrop-filter: blur(12px);
  border: 1px solid rgba(255, 255, 255, 0.3);
  border-radius: 24px;

  .dialog-content {
    min-height: 200px;
    padding: 24px;

    .character-name {
      font-size: 1.5rem;
      color: #ff4081;
      margin-bottom: 16px;
      font-weight: 700;
    }

    .dialog-text {
      font-size: 1.2rem;
      line-height: 1.6;
      min-height: 120px;
      opacity: 0;

      &.typing-effect {
        animation: typing 0.08s steps(40) forwards;
      }
    }
  }
}

@keyframes typing {
  from {
    opacity: 0;
  }

  to {
    opacity: 1;
  }
}
</style>