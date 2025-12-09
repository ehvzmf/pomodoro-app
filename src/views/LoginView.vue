<template>
  <div class="login-view">
    <div class="login-container">
      <div class="login-header">
        <h1 class="login-title">로그인</h1>
        <p class="login-description">계정에 로그인하세요</p>
      </div>

      <form class="login-form" @submit.prevent="handleLogin">
        <BaseInput
          id="email"
          v-model="formData.email"
          type="email"
          label="이메일"
          placeholder="example@email.com"
          :required="true"
          :error="errors.email"
          error-message="올바른 이메일을 입력하세요"
        />

        <BaseInput
          id="password"
          v-model="formData.password"
          type="password"
          label="비밀번호"
          placeholder="비밀번호를 입력하세요"
          :required="true"
          :error="errors.password"
          error-message="비밀번호를 입력하세요"
        />

        <div class="login-options">
          <BaseCheckbox
            id="remember"
            v-model="formData.rememberMe"
            label="로그인 상태 유지"
          />
          <a href="#" class="find-account-link" @click.prevent="handleFindAccount">
            계정 찾기
          </a>
        </div>

        <BaseButton
          type="submit"
          variant="primary"
          size="lg"
          :loading="isLoading"
          class="login-button"
        >
          로그인
        </BaseButton>
      </form>

      <div class="login-divider">
        <span>또는</span>
      </div>

      <div class="social-login">
        <BaseButton
          variant="outline"
          size="lg"
          class="social-button"
          @click="handleSocialLogin('kakao')"
        >
          카카오로 로그인
        </BaseButton>
        <BaseButton
          variant="outline"
          size="lg"
          class="social-button"
          @click="handleSocialLogin('google')"
        >
          Google로 로그인
        </BaseButton>
      </div>

      <div class="signup-link">
        <span>계정이 없으신가요?</span>
        <a href="#" @click.prevent="handleSignup">회원가입</a>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'
import BaseInput from '@/components/publishing/BaseInput.vue'
import BaseButton from '@/components/publishing/BaseButton.vue'
import BaseCheckbox from '@/components/publishing/BaseCheckbox.vue'

const formData = reactive({
  email: '',
  password: '',
  rememberMe: false
})

const errors = reactive({
  email: false,
  password: false
})

const isLoading = ref(false)

const validateForm = () => {
  errors.email = !formData.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)
  errors.password = !formData.password || formData.password.length < 6
  
  return !errors.email && !errors.password
}

const handleLogin = async () => {
  if (!validateForm()) {
    return
  }

  isLoading.value = true
  
  try {
    // TODO: 실제 로그인 API 호출
    await new Promise(resolve => setTimeout(resolve, 1000))
    console.log('로그인 시도:', formData)
    
    // 로그인 성공 후 처리
    alert('로그인 성공!')
  } catch (error) {
    console.error('로그인 실패:', error)
    alert('로그인에 실패했습니다.')
  } finally {
    isLoading.value = false
  }
}

const handleFindAccount = () => {
  // TODO: 계정 찾기 페이지로 이동 또는 팝업 열기
  console.log('계정 찾기')
}

const handleSocialLogin = (provider) => {
  // TODO: 소셜 로그인 처리
  console.log(`${provider} 로그인`)
}

const handleSignup = () => {
  // TODO: 회원가입 페이지로 이동
  console.log('회원가입')
}
</script>

<style lang="scss" scoped>
@use '@/assets/styles/mixins' as *;

.login-view {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: $gray-50;
  padding: $spacing-md;
}

.login-container {
  width: 100%;
  max-width: 400px;
  background: $white;
  border-radius: $radius-lg;
  padding: $spacing-xl;
  box-shadow: $shadow-md;

  @include desktop {
    max-width: 480px;
    padding: $spacing-2xl;
  }
}

.login-header {
  text-align: center;
  margin-bottom: $spacing-xl;
}

.login-title {
  font-size: $font-size-xl;
  font-weight: 700;
  color: $gray-800;
  margin-bottom: $spacing-xs;

  @include desktop {
    font-size: $font-size-2xl;
  }
}

.login-description {
  font-size: $font-size-sm;
  color: $gray-600;

  @include desktop {
    font-size: $font-size-base;
  }
}

.login-form {
  display: flex;
  flex-direction: column;
  gap: $spacing-md;

  @include desktop {
    gap: $spacing-lg;
  }
}

.login-options {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: -$spacing-xs;
}

.find-account-link {
  font-size: $font-size-sm;
  color: $primary-color;
  text-decoration: none;
  transition: color 0.2s;

  &:hover {
    color: $primary-dark;
    text-decoration: underline;
  }
}

.login-button {
  width: 100%;
  margin-top: $spacing-md;
}

.login-divider {
  position: relative;
  text-align: center;
  margin: $spacing-xl 0;

  &::before {
    content: '';
    position: absolute;
    top: 50%;
    left: 0;
    right: 0;
    height: 1px;
    background: $gray-200;
  }

  span {
    position: relative;
    display: inline-block;
    padding: 0 $spacing-md;
    background: $white;
    color: $gray-500;
    font-size: $font-size-sm;
  }
}

.social-login {
  display: flex;
  flex-direction: column;
  gap: $spacing-sm;

  @include desktop {
    gap: $spacing-md;
  }
}

.social-button {
  width: 100%;
}

.signup-link {
  text-align: center;
  margin-top: $spacing-xl;
  font-size: $font-size-sm;
  color: $gray-600;

  @include desktop {
    font-size: $font-size-base;
  }

  a {
    color: $primary-color;
    text-decoration: none;
    font-weight: 600;
    margin-left: $spacing-xs;
    transition: color 0.2s;

    &:hover {
      color: $primary-dark;
      text-decoration: underline;
    }
  }
}
</style>
