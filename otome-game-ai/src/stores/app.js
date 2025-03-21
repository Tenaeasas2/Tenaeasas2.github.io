import { defineStore } from 'pinia'

export const useAppStore = defineStore('app', {
  state: () => ({
    theme: 'light',
    characters: [
      {
        name: '李泽言',
        image: '/otomeGame/images/character1.png',
        personality: '霸道总裁',
        voiceSample: 'sample1.mp3'
      },
      {
        name: '许墨',
        image: '/otomeGame/images/character2.png',
        personality: '温柔教授',
        voiceSample: 'sample2.mp3'
      },
      {
        name: '白起',
        image: '/otomeGame/images/character3.png',
        personality: '热血警察',
        voiceSample: 'sample3.mp3'
      },
      {
        name: '周棋洛',
        image: '/otomeGame/images/character4.png',
        personality: '阳光偶像',
        voiceSample: 'sample4.mp3'
      }
    ],
    selectedCharacter: null,
    trainingRecords: [],
    currentAudio: null,
    isPlaying: false
  }),
  actions: {
    selectCharacter (char) {
      this.selectedCharacter = char
      this.trainingRecords = []
    },
    addTrainingRecord (record) {
      this.trainingRecords.push(record)
    },
    playAudio (url) {
      if (this.currentAudio) {
        this.currentAudio.pause()
      }
      this.currentAudio = new Audio(url)
      this.currentAudio.play()
      this.isPlaying = true
    },
    pauseAudio () {
      if (this.currentAudio) {
        this.currentAudio.pause()
        this.isPlaying = false
      }
    },
    togglePlay (payload) {
      if (this.currentPlaying === payload.name) {
        this.audioInstance.pause()
        this.currentPlaying = null
        this.audioInstance = null
      } else {
        if (this.audioInstance) {
          this.audioInstance.pause()
        }
        this.audioInstance = new Audio(`/audio/${payload.voiceSample}`)
        this.audioInstance.play()
        this.currentPlaying = payload.name
      }
    }
  }
})