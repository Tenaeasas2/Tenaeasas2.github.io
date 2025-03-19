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
    this.weather = {
      temp: 25,
      description: '晴天',
      main: 'clear'
    };
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