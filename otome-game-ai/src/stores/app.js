import { defineStore } from 'pinia'

export const useAppStore = defineStore('app', {
  state: () => ({
    theme: 'light',
    characters: [
      {
        name: '樱井苍',
        image: '/otomeGame/images/character1.png',
        personality: '傲娇贵公子',
        voiceSample: 'sample1.mp3'
      },
      {
        name: '神崎凛',
        image: '/otomeGame/images/character2.png',
        personality: '温柔学长',
        voiceSample: 'sample2.mp3'
      },
      {
        name: '藤原悠真',
        image: '/otomeGame/images/character3.png',
        personality: '霸道总裁',
        voiceSample: 'sample3.mp3'
      },
      {
        name: '橘朔也',
        image: '/otomeGame/images/character4.png',
        personality: '病娇艺术家',
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