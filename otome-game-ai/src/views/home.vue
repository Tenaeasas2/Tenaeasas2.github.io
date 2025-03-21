<script setup>
import { onMounted, onUnmounted, ref } from 'vue'
import * as THREE from 'three'
import { useAppStore } from '@/stores/app'
import { useRouter } from 'vue-router'
import ChatDialog from '@/components/ChatDialog.vue'
// import { VideoPlay, VideoPause } from '@element-plus/icons-vue'
const isMobile = ref(/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent))

const store = useAppStore()
const router = useRouter()
const showChatDialog = ref(false)

const handleTouchStart = (event) => {
  event.currentTarget.classList.add('touch-active')
}

const handleTouchEnd = (event) => {
  event.currentTarget.classList.remove('touch-active')
}

const handleSelectCharacter = (char) => {
  store.selectCharacter(char)
  if (isMobile.value) {
    router.push({
      path: '/chat-room',
      query: { character: char.name }
    })
  } else {
    showChatDialog.value = true
  }
}

let renderer, scene, camera, particles

onMounted(() => {
  const updateIsMobile = () => {
    isMobile.value = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)
  }
  // 初始化时更新一次
  updateIsMobile()

  // 监听窗口大小变化
  window.addEventListener('resize', updateIsMobile)

  // 组件卸载时移除监听
  onUnmounted(() => {
    window.removeEventListener('resize', updateIsMobile)
  })
  initThree()
  animate()
})
const isPlaying = (char) => {
  return store.currentPlaying === char.name
}

const toggleVoice = (char) => {
  store.togglePlay({
    name: char.name,
    voiceSample: char.voiceSample
  })
}
const initThree = () => {
  scene = new THREE.Scene()
  camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
  renderer = new THREE.WebGLRenderer({ alpha: true })
  renderer.setSize(window.innerWidth, window.innerHeight)
  document.querySelector('#bg').appendChild(renderer.domElement)

  // 添加窗口大小变化监听
  window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight
    camera.updateProjectionMatrix()
    renderer.setSize(window.innerWidth, window.innerHeight)
  })

  const geometry = new THREE.BufferGeometry()
  const vertices = []
  const particleCount = 3000;
  for (let i = 0; i < particleCount; i++) {
    vertices.push(
      Math.random() * 2000 - 1000,
      Math.random() * 2000 - 1000,
      Math.random() * 2000 - 1000
    )
  }
  geometry.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3))
  const material = new THREE.PointsMaterial({
    size: 4.5,
    color: 0xE8B4E6,
    transparent: true,
    opacity: 1
  })
  particles = new THREE.Points(geometry, material)
  scene.add(particles)
  camera.position.z = 1000
}

const animate = () => {
  requestAnimationFrame(animate)
  particles.rotation.x += 0.0001
  particles.rotation.y += 0.0001
  renderer.render(scene, camera)
}
</script>

<template>
  <el-main :theme="store.theme">
    <div id="bg" class="background"></div>
    <el-container class="pa-8">
      <el-row justify="center" style="height:100%">
        <el-col :span="24" :md="20" style="  display: flex;
  align-items: center;
  justify-content: center;">
          <el-card class="glass-card rounded-xl pa-6">
            <el-row class="el-row--flex  flex-nowrap justify-space-between" :gutter="20">
              <el-col v-for="(char, i) in store.characters" :key="i" :span="6" class="mb-8 px-2">
                <div class="character-card" @click="handleSelectCharacter(char)" @touchstart.passive="handleTouchStart"
                  @touchend="handleTouchEnd">
                  <div class="character-info">
                    <h3 class="character-name">{{ char.name }}</h3>
                    <div class="tags">
                      <el-tag type="info" effect="dark" size="large">{{ char.personality }}</el-tag>
                    </div>
                  </div>
                  <img :src="char.image" style="width: 100%; object-fit: contain" />
                  <el-icon class="voice-icon" :size="36" :color="isPlaying(char) ? '#FF4081' : '#E91E63'"
                    @click="toggleVoice(char)">
                    <component :is="isPlaying(char) ? 'VideoPause' : 'VideoPlay'" />
                  </el-icon>
                </div>
              </el-col>
            </el-row>
          </el-card>
        </el-col>
      </el-row>
    </el-container>
    <el-dialog v-model="showChatDialog" :title="store.selectedCharacter ? store.selectedCharacter.name : '对话'"
      width="60%" custom-class="chat-dialog" :show-close="false">
      <!-- <template #header="{ close, titleId, titleClass }">
        <div class="my-header">
          <h4 :id="titleId" :class="titleClass">{{ store.selectedCharacter ? store.selectedCharacter.name : '对话' }}</h4>
          <el-button type="danger" @click="close">
            <el-icon class="el-icon--left">
              <CircleCloseFilled />
            </el-icon>
            Close
          </el-button>
        </div>
      </template> -->
      <div class="sakura"></div>
      <div class="sakura"></div>
      <div class="sakura"></div>
      <div class="sakura"></div>
      <div class="sakura"></div>
      <ChatDialog :character="store.selectedCharacter" />
    </el-dialog>
  </el-main>
</template>

<style lang="scss">
:root {
  --primary-pink: #FFB7D5;
  --secondary-purple: #D5B7FF;
  --glass-bg: rgba(255, 255, 255, 0.15);
}

.el-main {
  width: 100%;
  height: 100%;
  margin: 0;
  padding: 0;
}

.my-header {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  gap: 16px;
}

.el-container {
  width: 100vw;
  height: 100%;

}

.el-dialog {
  background: rgba(255, 255, 255, 0.85) !important;
  backdrop-filter: blur(25px) saturate(200%) !important;
  border: 1px solid rgba(255, 255, 255, 0.5) !important;
  box-shadow: 0 12px 40px rgba(231, 156, 210, 0.3) !important;
  border-radius: 20px !important;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    inset: 0;
    background: linear-gradient(45deg, rgba(255, 214, 232, 0.6) 0%, rgba(255, 241, 248, 0.8) 100%);
    opacity: 0.5;
    mix-blend-mode: overlay;
    z-index: -1;
    border-radius: inherit;
  }

  &::after {
    content: '';
    position: absolute;
    inset: 0;
    background: radial-gradient(circle at 50% 50%, rgba(255, 255, 255, 0.2) 0%, transparent 60%);
    pointer-events: none;
  }
}

.background {
  position: fixed;
  width: 100vw;
  height: 100%;
  top: 0;
  left: 0;
  z-index: 0;
}

.glass-card {
  background: linear-gradient(135deg, rgba(255, 223, 240, 0.9) 0%, rgba(255, 255, 255, 0.8) 100%);
  backdrop-filter: blur(16px) saturate(180%);
  border: 1px solid rgba(255, 255, 255, 0.4);
  box-shadow: 0 8px 32px rgba(231, 156, 210, 0.2);

  &::before {
    content: '';
    position: absolute;
    inset: 0;
    background: linear-gradient(45deg, #ffd6e8 0%, #fff1f8 100%);
    opacity: 0.4;
    mix-blend-mode: overlay;
    z-index: -1;
    border-radius: inherit;
  }

  &::after {
    content: '';
    position: absolute;
    inset: -2px;
    background: url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' stroke='%23FFFFFF' stroke-width='1' opacity='0.2'%3E%3Cpath d='M0 50h100M50 0v100'/%3E%3C/g%3E%3C/svg%3E");
    opacity: 0.15;
    z-index: -1;
    border-radius: inherit;
  }
}

.el-dialog__title {
  font-family: 'Dancing Script', cursive;
  font-size: 2rem;
  color: #e83f6f;
  text-shadow: 1px 1px 2px rgba(255, 255, 255, 0.8);
  position: relative;

  &::after {
    content: '';
    position: absolute;
    bottom: -8px;
    left: 50%;
    width: 80%;
    height: 2px;
    background: linear-gradient(90deg, transparent 0%, #ffffff 50%, transparent 100%);
    transform: translateX(-50%);
  }
}

.character-card {
  position: relative;
  overflow: hidden;
  transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
  cursor: pointer;
  background: linear-gradient(145deg, rgba(255, 245, 250, 0.9) 0%, rgba(255, 230, 240, 0.8) 100%);
  border-radius: 16px;
  padding: 12px;

  &::before {
    content: '';
    position: absolute;
    inset: 0;
    background: url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 0h60v60H0z' fill='none'/%3E%3Cpath d='M30 5c13.8 0 25 11.2 25 25S43.8 55 30 55 5 43.8 5 30 16.2 5 30 5zm0-5C13.4 0 0 13.4 0 30s13.4 30 30 30 30-13.4 30-30S46.6 0 30 0z' fill='%23ffffff' opacity='0.1'/%3E%3C/svg%3E");
    opacity: 0.2;
  }

  .character-name {
    font-family: 'Dancing Script', cursive;
    font-size: 2rem;
    color: #e83f6f;
    text-shadow: 1px 1px 2px rgba(255, 255, 255, 0.8);
    position: relative;

    &::after {
      content: '';
      position: absolute;
      bottom: -8px;
      left: 50%;
      width: 80%;
      height: 2px;
      background: linear-gradient(90deg, transparent 0%, #ffffff 50%, transparent 100%);
      transform: translateX(-50%);
    }
  }

  &:hover {
    transform: translateY(-8px) scale(1.05) rotate(-2deg);
    box-shadow: 0 16px 32px rgba(232, 63, 111, 0.2) !important;

    .tags {
      transform: translateY(-10px);
      opacity: 1;
    }

    .character-name {
      &::after {
        width: 100%;
      }
    }
  }

  .tags {
    transition: all 0.3s ease;
    opacity: 0.8;

    .el-tag {
      position: relative;
      overflow: hidden;

      &::before {
        content: '';
        position: absolute;
        top: -50%;
        left: -50%;
        width: 200%;
        height: 200%;
        background: linear-gradient(45deg, transparent 25%, rgba(255, 255, 255, 0.4) 50%, transparent 75%);
        animation: badgeGlow 2s infinite linear;
      }
    }
  }

  img {
    transition: transform 0.5s cubic-bezier(0.4, 0, 0.2, 1);
    position: relative;
    z-index: 2;
    filter: drop-shadow(0 4px 12px rgba(232, 63, 111, 0.2));
  }
}

@keyframes badgeGlow {
  0% {
    transform: rotate(0deg) translateX(-50%);
  }

  100% {
    transform: rotate(360deg) translateX(-50%);
  }
}

@import url('https://fonts.googleapis.com/css2?family=Dancing+Script:wght@700&display=swap');

@keyframes petalFall {
  0% {
    transform: translateY(-100%) rotate(0deg);
  }

  100% {
    transform: translateY(100vh) rotate(360deg);
  }
}

.character-card:hover::after {
  content: '';
  position: absolute;
  top: -20px;
  left: -20px;
  right: -20px;
  bottom: -20px;
  background: linear-gradient(45deg, transparent 40%, rgba(255, 183, 213, 0.3) 60%, transparent 70%),
    repeating-linear-gradient(-45deg, rgba(255, 255, 255, 0.1) 0 2px, transparent 2px 4px);
  animation: petalFall 8s linear infinite;
  pointer-events: none;
}

.el-tag {
  background: linear-gradient(145deg, #ff9eb5, #ff7aa2) !important;
  border: 1px solid rgba(255, 255, 255, 0.3) !important;
}

.voice-icon {
  transition: all 0.3s ease;

  &:active {
    transform: scale(1.2);
    filter: drop-shadow(0 0 8px rgba(232, 63, 111, 0.8));
  }

  position: relative;
  z-index: 999;
  filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.1));
}

@media (max-width: 768px) {
  .el-col {
    flex: 0 0 100% !important;
    max-width: 100% !important;
  }

  .character-card {
    padding: 8px;
    margin-bottom: 12px;
    overflow: hidden;

    .character-name {
      font-size: 1.5rem !important;
      line-height: 1.2;
    }

    img {
      width: 100%;
      min-height: 200px;
      object-fit: contain;
    }
  }

  .glass-card {
    padding: 12px !important;
  }
}

// 添加樱花飘落动画
@keyframes sakuraFall {
  0% {
    transform: translateY(-10%) rotate(0deg);
    opacity: 1;
  }

  100% {
    transform: translateY(100vh) rotate(360deg);
    opacity: 0;
  }
}

.el-input__wrapper {


  box-shadow: 0 0 0 0px var(--el-input-border-color, var(--el-border-color)) inset;
}

.el-input__wrapper.is-focus {
  box-shadow: 0 0 0 0px var(--el-input-focus-border-color) inset;
}

.el-dialog {
  position: relative;
  overflow: hidden;

  .sakura {
    position: absolute;
    width: 15px;
    height: 15px;
    background: radial-gradient(circle, #ffb7d5 30%, transparent 70%);
    border-radius: 50%;
    animation: sakuraFall 5s linear infinite;
    pointer-events: none;

    &:nth-child(1) {
      left: 10%;
      animation-duration: 8s;
      animation-delay: 0s;
    }

    &:nth-child(2) {
      left: 30%;
      animation-duration: 6s;
      animation-delay: 2s;
    }

    &:nth-child(3) {
      left: 50%;
      animation-duration: 7s;
      animation-delay: 1s;
    }

    &:nth-child(4) {
      left: 70%;
      animation-duration: 9s;
      animation-delay: 3s;
    }

    &:nth-child(5) {
      left: 90%;
      animation-duration: 5s;
      animation-delay: 4s;
    }
  }
}
</style>
