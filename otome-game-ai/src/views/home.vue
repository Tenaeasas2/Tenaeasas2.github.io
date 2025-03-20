<script setup>
import { onMounted } from 'vue'
import * as THREE from 'three'
import { useAppStore } from '@/stores/app'
import { useRouter } from 'vue-router'
// import { VideoPlay, VideoPause } from '@element-plus/icons-vue'

const store = useAppStore()
const router = useRouter()

const handleSelectCharacter = (char) => {
  store.selectCharacter(char)
  router.push('/chat-room')
}

let renderer, scene, camera, particles

onMounted(() => {
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

  const geometry = new THREE.BufferGeometry()
  const vertices = []
  for (let i = 0; i < 5000; i++) {
    vertices.push(
      Math.random() * 2000 - 1000,
      Math.random() * 2000 - 1000,
      Math.random() * 2000 - 1000
    )
  }
  geometry.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3))
  const material = new THREE.PointsMaterial({
    size: 2,
    color: 0xE8B4E6,
    transparent: true,
    opacity: 0.8
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
  <v-app :theme="store.theme">
    <div id="bg" class="background"></div>
    <el-container class="pa-8">
      <el-row justify="center">
        <el-col :span="24" :md="20">
          <el-card class="glass-card rounded-xl pa-6">
            <v-card-title class="text-h3 font-weight-bold text-pink-darken-1 text-center">
              <!-- ❤️ 乙女AI训练工坊 ❤️ -->
            </v-card-title>
            <el-row class="el-row--flex  flex-nowrap justify-space-between" :gutter="20">
              <el-col v-for="(char, i) in store.characters" :key="i" :span="6" class="mb-8 px-2">
                <div class="character-card">
                  <div class="character-info">
                    <h3 class="character-name text-h5 my-2">{{ char.name }}</h3>
                    <div class="tags">
                      <el-tag type="info" effect="dark" size="large">{{ char.personality }}</el-tag>
                    </div>
                  </div>
                  <img :src="char.image" height="180" style="width: 100%; object-fit: contain" />
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
  </v-app>
</template>

<style lang="scss">
:root {
  --primary-pink: #FFB7D5;
  --secondary-purple: #D5B7FF;
  --glass-bg: rgba(255, 255, 255, 0.15);
}

.el-container {
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
}

.background {
  position: fixed;
  width: 100vw;
  height: 100vh;
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
  position: relative;
  z-index: 999;
  filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.1));
}
</style>
