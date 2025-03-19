<template>
  <div class="weather-container">
    <div v-if="weather" class="weather-info">
      <span class="weather-icon">{{ weatherIcon }}</span>
      <span class="weather-temp">{{ weather.temp }}°C</span>
      <span class="weather-description">{{ weather.description }}</span>
    </div>
    <div v-else class="weather-loading">加载天气中...</div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      weather: null
    };
  },
  computed: {
    weatherIcon () {
      if (!this.weather) return '';
      const iconMap = {
        'clear': '☀️',
        'clouds': '☁️',
        'rain': '🌧️',
        'snow': '❄️',
        'thunderstorm': '⛈️',
        'mist': '🌫️'
      };
      return iconMap[this.weather.main.toLowerCase()] || '🌤️';
    }
  },
  created () {
    this.generateRandomWeather();
    setInterval(() => {
      this.generateRandomWeather();
    }, 60000); // 每分钟更新一次
  },
  methods: {
    generateRandomWeather () {
      const weatherTypes = [
        { main: 'clear', description: '晴天', temp: this.getRandomTemp(20, 35) },
        { main: 'clouds', description: '多云', temp: this.getRandomTemp(15, 30) },
        { main: 'rain', description: '雨天', temp: this.getRandomTemp(10, 25) },
        { main: 'snow', description: '下雪', temp: this.getRandomTemp(-5, 5) },
        { main: 'thunderstorm', description: '雷阵雨', temp: this.getRandomTemp(15, 25) },
        { main: 'mist', description: '雾天', temp: this.getRandomTemp(5, 15) }
      ];
      this.weather = weatherTypes[Math.floor(Math.random() * weatherTypes.length)];
    },
    getRandomTemp (min, max) {
      return Math.floor(Math.random() * (max - min + 1)) + min;
    }
  }
};
</script>

<style scoped>
.weather-container {
  display: flex;
  align-items: center;
  margin-left: 20px;
}

.weather-info {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 14px;
}

.weather-icon {
  font-size: 18px;
}

.weather-temp {
  font-weight: bold;
}

.weather-description {
  color: #666;
}

.weather-loading {
  font-size: 14px;
  color: #666;
}
</style>