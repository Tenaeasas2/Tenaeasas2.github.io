<template>
  <div class="ai-chat-container">
    <div class="gallery-content">
      <el-carousel :interval="5000" height="80vh" direction="vertical" trigger="hover" arrow="always">
        <el-carousel-item v-for="(img, index) in images" :key="index">
          <div class="image-container">
            <img :src="img" :alt="'图片' + (index + 1)" class="gallery-image" />
          </div>
        </el-carousel-item>
      </el-carousel>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      images: (() => {
        const req = require.context('@/assets/img/swipeImg', false, /\.png$/)
        return req.keys().map(req)
      })()
    };
  }
};
</script>

<style scoped>
.gallery-content {
  flex: 1;
  overflow: hidden;
}

.image-container {
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(0, 0, 0, 0.9);
}

.gallery-image {
  max-width: 70vh;
  max-height: 90vh;
  object-fit: contain;
  transform: rotate(90deg);
  border-radius: 8px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.3);
  transition: transform 0.3s ease;
  aspect-ratio: 9/16;
}

.gallery-image:hover {
  transform: scale(1.02);
}



.el-carousel__item {
  background-color: #f5f7fa;
  height: 100% !important;
}
</style>