<template>
  <div class="scroll-container">
    <van-swipe class="my-swipe" :autoplay="3000" indicator-color="white">
      <van-swipe-item>
        <video class='video-back' src="../assets/img/ai.mp4" autoplay loop muted></video>

      </van-swipe-item>
      <van-swipe-item>2</van-swipe-item>


    </van-swipe>

    <van-grid style=" margin: 10px 0;">
      <van-grid-item icon="user-circle-o" text="文字" />
      <van-grid-item icon="photo-o" text="文字" />
      <van-grid-item icon="photo-o" text="文字" />
      <van-grid-item icon="photo-o" text="文字" />
      <van-grid-item icon="photo-o" text="文字" />
      <van-grid-item icon="photo-o" text="文字" />
      <van-grid-item icon="photo-o" text="文字" />
      <van-grid-item icon="photo-o" text="文字" />
    </van-grid>
    <van-tabs v-model="active">
      <van-tab title="标签 1"><van-empty description="描述文字" /></van-tab>
      <van-tab title="标签 2"><van-skeleton title avatar :row="3" /></van-tab>
      <van-tab title="标签 3">内容 3</van-tab>
      <van-tab title="标签 4">内容 4</van-tab>
    </van-tabs>
  </div>
</template>

<script>
export default {
  data () {
    return {
      active: 2,

    }
  },
}
</script>

<style scoped>
.scroll-container {
  height: 100%;
  overflow-y: auto;
  -webkit-overflow-scrolling: touch;
  padding: 1rem;
}

.video-back {
  width: 100%;
  height: 100%;
  object-fit: cover;
  z-index: -1;
  pointer-events: none;
}


.my-swipe {
  height: 150px;
}

.my-swipe .van-swipe-item {
  color: #fff;
  font-size: 20px;
  line-height: 150px;
  text-align: center;
  background-color: #39a9ed;
}
</style>