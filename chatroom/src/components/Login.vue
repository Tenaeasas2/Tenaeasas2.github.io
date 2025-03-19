<template>
  <div class="login-container">
    <div class="login-header">
      <h2>欢迎登录</h2>
      <p>请输入您的用户名开始聊天</p>
    </div>
    <el-form :model="form" label-width="80px" class="login-form" ref="loginForm">
      <el-form-item label="用户名" prop="username">
        <el-input v-model="form.username" placeholder="请输入用户名" @focus="handleInputFocus" @blur="handleInputBlur"
          @input="handleInputChange" class="animated-input">
          <i slot="prefix" class="el-icon-user-solid"></i>
          <i slot="suffix" class="el-icon-view" @click="togglePasswordVisibility"></i>
        </el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit" class="login-btn" :class="{ 'btn-animate': isAnimating }">
          <i class="el-icon-s-promotion"></i>
          登录
        </el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
export default {
  data () {
    return {
      form: {
        username: ''
      },
      isAnimating: false
    }
  },
  methods: {
    handleInputChange () {
      const input = this.$refs.loginForm.$el.querySelector('.el-input__inner');
      if (this.form.username.trim()) {
        input.style.borderColor = '#1e3c72';
        input.style.boxShadow = '0 0 0 2px rgba(30, 60, 114, 0.2)';
      } else {
        input.style.borderColor = '#dcdfe6';
        input.style.boxShadow = 'none';
      }
    },
    onSubmit () {
      if (this.form.username.trim()) {
        this.isAnimating = true;
        setTimeout(() => {
          this.$emit('login', this.form.username);
          this.isAnimating = false;
        }, 500);
      } else {
        this.$message.error('请输入用户名');
      }
    },
    handleInputFocus () {
      this.$refs.loginForm.$el.querySelector('.el-input__inner').style.borderColor = '#1e3c72';
    },
    handleInputBlur () {
      this.$refs.loginForm.$el.querySelector('.el-input__inner').style.borderColor = '#dcdfe6';
    },
    togglePasswordVisibility () {
      const input = this.$refs.loginForm.$el.querySelector('.el-input__inner');
      input.type = input.type === 'password' ? 'text' : 'password';
    }
  }
}
</script>

<style scoped>
.login-container {
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: linear-gradient(135deg, #1e3c72 0%, #2a5298 100%);
}

.login-header {
  text-align: center;
  margin-bottom: 40px;
  color: white;
  animation: fade-in 0.5s ease;
  position: relative;
}

.login-decoration {
  position: absolute;
  bottom: -20px;
  left: 50%;
  transform: translateX(-50%);
  width: 60px;
  height: 4px;
  background: linear-gradient(90deg, rgba(255, 255, 255, 0) 0%, rgba(255, 255, 255, 0.8) 50%, rgba(255, 255, 255, 0) 100%);
  animation: decoration-flow 2s infinite;
}

@keyframes decoration-flow {
  0% {
    transform: translateX(-50%) scaleX(0);
  }

  50% {
    transform: translateX(-50%) scaleX(1);
  }

  100% {
    transform: translateX(-50%) scaleX(0);
  }
}

.login-header h2 {
  font-size: 28px;
  font-weight: bold;
  margin-bottom: 8px;
}

.login-header p {
  font-size: 14px;
  opacity: 0.8;
}

@keyframes fade-in {
  0% {
    opacity: 0;
    transform: translateY(-20px);
  }

  100% {
    opacity: 1;
    transform: translateY(0);
  }
}

.login-form {
  padding: 40px;
  background: rgba(255, 255, 255, 0.9);
  border-radius: 16px;
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.2);
  animation: slide-up 0.5s ease;
}

@keyframes slide-up {
  0% {
    transform: translateY(20px);
    opacity: 0;
  }

  100% {
    transform: translateY(0);
    opacity: 1;
  }
}

.el-form-item {
  margin-bottom: 24px;
}

.login-btn {
  width: 100%;
  margin-top: 16px;
  transition: all 0.3s ease;
  background: linear-gradient(135deg, #1e3c72 0%, #2a5298 100%);
  border: none;
  position: relative;
  overflow: hidden;
}

.login-btn::after {
  content: '';
  position: absolute;
  top: 50%;
  left: 50%;
  width: 300%;
  height: 300%;
  background: radial-gradient(circle, rgba(255, 255, 255, 0.4) 10%, transparent 10.01%);
  transform: translate(-50%, -50%) scale(0);
  transition: transform 0.5s ease, opacity 0.5s ease;
  pointer-events: none;
}

.login-btn:active::after {
  transform: translate(-50%, -50%) scale(1);
  opacity: 0;
}

.login-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(30, 60, 114, 0.3);
}

.btn-animate {
  animation: pulse 0.5s;
}

@keyframes pulse {
  0% {
    transform: scale(1);
  }

  50% {
    transform: scale(1.05);
  }

  100% {
    transform: scale(1);
  }
}

.el-input__inner {
  border-radius: 8px;
  padding: 12px 16px 12px 40px;
  transition: all 0.3s ease;
}

.el-input__inner:focus {
  border-color: #1e3c72;
  box-shadow: 0 0 0 2px rgba(30, 60, 114, 0.2);
}

.el-input__inner:hover {
  border-color: #1e3c72;
}
</style>