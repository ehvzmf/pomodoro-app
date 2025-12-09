<template>
  <div class="login-page">
    <AppHeader :transparent="true" />
    
    <main class="login-main">
      <div class="login-content">
        <!-- 왼쪽 영역: 포탈 정보 -->
        <div class="portal-info">
          <div class="portal-text">
            <h2>Welcome to Our Portal</h2>
            <p class="portal-description">
              안전하고 편리한 통합 인증 시스템으로<br />
              다양한 서비스를 이용하실 수 있습니다.
            </p>
            <ul class="portal-features">
              <li>✓ 간편한 로그인 방식</li>
              <li>✓ 안전한 개인정보 보호</li>
              <li>✓ 다양한 서비스 연동</li>
              <li>✓ 24시간 고객 지원</li>
            </ul>
          </div>
        </div>

        <!-- 오른쪽 영역: 로그인 폼 -->
        <div class="login-form-container">
          <h3 class="form-title">로그인</h3>
          
          <!-- 간편 로그인 버튼 -->
          <div class="quick-login-buttons">
            <BaseButton
              variant="outline"
              class="quick-login-btn"
              @click="handleQuickLogin('easy')"
            >
              <span class="btn-icon">🔐</span>
              간편인증 로그인
            </BaseButton>
            <BaseButton
              variant="outline"
              class="quick-login-btn"
              @click="handleQuickLogin('sms')"
            >
              <span class="btn-icon">📱</span>
              SMS 로그인
            </BaseButton>
          </div>

          <div class="divider">
            <span>또는</span>
          </div>

          <!-- 로그인 폼 -->
          <form class="login-form" @submit.prevent="handleLogin">
            <BaseInput
              id="username"
              v-model="formData.username"
              label="아이디"
              placeholder="아이디를 입력하세요"
              :required="true"
            />

            <BaseInput
              id="password"
              v-model="formData.password"
              type="password"
              label="비밀번호"
              placeholder="비밀번호를 입력하세요"
              :required="true"
            />

            <p class="info-text">
              ℹ️ 인증번호는 입력하신 연락처로 발송됩니다.
            </p>

            <!-- 인증번호 입력 -->
            <div class="verification-group">
              <BaseInput
                id="verification-code"
                v-model="formData.verificationCode"
                label="인증번호"
                placeholder="인증번호 6자리"
                :maxlength="6"
              />
              <BaseButton
                type="button"
                variant="secondary"
                class="send-code-btn"
                @click="handleSendCode"
                :disabled="codeSent"
              >
                {{ codeSent ? '재발송' : '발송' }}
              </BaseButton>
            </div>

            <!-- 타이머 -->
            <div v-if="showTimer" class="timer">
              <span class="timer-icon">⏱</span>
              <span class="timer-text">{{ formattedTime }}</span>
            </div>

            <!-- SMS/이메일 선택 -->
            <div class="contact-type">
              <label class="contact-label">인증 방식 선택:</label>
              <div class="radio-list radio-list--horizontal">
                <BaseRadio
                  id="contact-sms"
                  v-model="formData.contactType"
                  name="contactType"
                  value="sms"
                  label="SMS"
                />
                <BaseRadio
                  id="contact-email"
                  v-model="formData.contactType"
                  name="contactType"
                  value="email"
                  label="이메일"
                />
              </div>
            </div>

            <BaseButton
              type="submit"
              variant="primary"
              size="lg"
              class="login-button"
              :loading="isLoading"
            >
              로그인
            </BaseButton>
          </form>

          <!-- 하단 링크 -->
          <div class="form-footer">
            <div class="footer-links">
              <a href="#" @click.prevent="handleFindId">아이디 찾기</a>
              <span class="link-divider">|</span>
              <a href="#" @click.prevent="handleFindPassword">비밀번호 찾기</a>
            </div>
            <BaseButton
              variant="ghost"
              class="signup-btn"
              @click="handleSignup"
            >
              회원가입
              <span class="arrow-icon">→</span>
            </BaseButton>
          </div>
        </div>
      </div>
    </main>
    
    <AppFooter :transparent="true" />
  </div>
</template>

<script setup>
import { ref, reactive, computed, onBeforeUnmount } from 'vue'
import AppHeader from '@/components/layout/AppHeader.vue'
import AppFooter from '@/components/layout/AppFooter.vue'
import BaseInput from '@/components/publishing/BaseInput.vue'
import BaseButton from '@/components/publishing/BaseButton.vue'
import BaseRadio from '@/components/publishing/BaseRadio.vue'

const formData = reactive({
  username: '',
  password: '',
  verificationCode: '',
  contactType: 'sms'
})

const isLoading = ref(false)
const codeSent = ref(false)
const showTimer = ref(false)
const timeLeft = ref(180) // 3분
let timerInterval = null

const formattedTime = computed(() => {
  const minutes = Math.floor(timeLeft.value / 60)
  const seconds = timeLeft.value % 60
  return `${minutes}:${seconds.toString().padStart(2, '0')}`
})

const startTimer = () => {
  showTimer.value = true
  timeLeft.value = 180
  
  if (timerInterval) {
    clearInterval(timerInterval)
  }
  
  timerInterval = setInterval(() => {
    if (timeLeft.value > 0) {
      timeLeft.value--
    } else {
      clearInterval(timerInterval)
      showTimer.value = false
      codeSent.value = false
    }
  }, 1000)
}

const handleSendCode = () => {
  if (!formData.username) {
    alert('아이디를 먼저 입력해주세요.')
    return
  }
  
  codeSent.value = true
  startTimer()
  alert(`인증번호가 ${formData.contactType === 'sms' ? 'SMS' : '이메일'}로 발송되었습니다.`)
}

const handleQuickLogin = (type) => {
  console.log(`${type} 간편 로그인`)
  alert(`${type === 'easy' ? '간편인증' : 'SMS'} 로그인 페이지로 이동합니다.`)
}

const handleLogin = async () => {
  if (!formData.username || !formData.password) {
    alert('아이디와 비밀번호를 입력해주세요.')
    return
  }

  isLoading.value = true
  
  try {
    await new Promise(resolve => setTimeout(resolve, 1000))
    console.log('로그인 시도:', formData)
    alert('로그인 성공!')
  } catch (error) {
    console.error('로그인 실패:', error)
    alert('로그인에 실패했습니다.')
  } finally {
    isLoading.value = false
  }
}

const handleFindId = () => {
  console.log('아이디 찾기')
}

const handleFindPassword = () => {
  console.log('비밀번호 찾기')
}

const handleSignup = () => {
  console.log('회원가입')
}

onBeforeUnmount(() => {
  if (timerInterval) {
    clearInterval(timerInterval)
  }
})
</script>

<style lang="scss" scoped>
@use '@/assets/styles/mixins' as *;

.login-page {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background: $white;
}

.login-main {
  flex: 1;
  padding: $spacing-lg 40px;
  background: $white;

  @include mobile {
    padding: 10px 20px;
  }
}

.login-content {
  display: grid;
  grid-template-columns: 1.2fr 0.8fr;
  gap: $spacing-xl;
  align-items: center;
  min-height: 60vh;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-radius: $radius-lg;
  padding: $spacing-2xl;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);

  @include mobile {
    grid-template-columns: 1fr;
    gap: 0;
    min-height: auto;
    padding: 0;
    border-radius: 0;
    background: transparent;
    box-shadow: none;
  }
}

/* 왼쪽 포탈 정보 */
.portal-info {
  display: flex;
  flex-direction: column;
  gap: $spacing-lg;
  color: $white;

  @include mobile {
    height: 120px;
    justify-content: center;
    padding: 0 20px;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    gap: $spacing-xs;
  }
}

.portal-text {
  h2 {
    font-size: $font-size-2xl;
    font-weight: 700;
    color: $white;
    margin-bottom: $spacing-md;

    @include desktop {
      font-size: 2rem;
    }

    @include mobile {
      font-size: $font-size-lg;
      margin-bottom: $spacing-xs;
    }
  }

  .portal-description {
    font-size: $font-size-base;
    color: rgba(255, 255, 255, 0.95);
    line-height: 1.6;
    margin-bottom: $spacing-lg;

    @include mobile {
      font-size: $font-size-sm;
      margin-bottom: 0;
    }
  }
}

.portal-features {
  list-style: none;
  padding: 0;
  margin: 0;

  li {
    font-size: $font-size-base;
    color: rgba(255, 255, 255, 0.95);
    padding: $spacing-sm 0;
    border-bottom: 1px solid rgba(255, 255, 255, 0.3);

    &:last-child {
      border-bottom: none;
    }
  }

  @include mobile {
    display: none;
  }
}

/* 오른쪽 로그인 폼 */
.login-form-container {
  background: $white;
  border-radius: $radius-lg;
  padding: $spacing-xl $spacing-lg;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.08);
  border: 1px solid $gray-200;
  max-width: 380px;

  @include mobile {
    padding: $spacing-xl $spacing-lg;
    max-width: 100%;
    border-radius: 0;
    border: none;
    border-top: 1px solid $gray-200;
    box-shadow: none;
  }
}

.form-title {
  font-size: $font-size-lg;
  font-weight: 700;
  color: $gray-800;
  margin: 0 0 $spacing-md 0;
  text-align: center;
}

.quick-login-buttons {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: $spacing-xs;
  margin-bottom: $spacing-md;

  @include mobile {
    grid-template-columns: 1fr;
  }
}

.quick-login-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: $spacing-xs;
  font-size: $font-size-sm;
  padding: $spacing-sm;

  .btn-icon {
    font-size: $font-size-base;
  }
}

.divider {
  position: relative;
  text-align: center;
  margin: $spacing-md 0;

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
    padding: 0 $spacing-sm;
    background: $white;
    color: $gray-500;
    font-size: $font-size-xs;
  }
}

.login-form {
  display: flex;
  flex-direction: column;
  gap: $spacing-sm;
}

.info-text {
  font-size: $font-size-xs;
  color: $gray-600;
  margin: -$spacing-xs 0 0 0;
  padding: $spacing-xs;
  background: $gray-50;
  border-radius: $radius-sm;
}

.verification-group {
  display: grid;
  grid-template-columns: 1fr auto;
  gap: $spacing-xs;
  align-items: end;

  .send-code-btn {
    height: 40px;
    padding: 0 $spacing-md;
    white-space: nowrap;
    font-size: $font-size-sm;
  }
}

.timer {
  display: flex;
  align-items: center;
  gap: $spacing-xs;
  padding: $spacing-xs $spacing-sm;
  background: #fff3cd;
  border-radius: $radius-sm;
  color: #856404;
  font-size: $font-size-xs;
  font-weight: 600;
  margin-top: -$spacing-xs;

  .timer-icon {
    font-size: $font-size-sm;
  }
}

.contact-type {
  padding: $spacing-sm;
  background: $gray-50;
  border-radius: $radius-sm;

  .contact-label {
    display: block;
    font-size: $font-size-xs;
    font-weight: 600;
    color: $gray-700;
    margin-bottom: $spacing-xs;
  }
}

.radio-list--horizontal {
  display: flex;
  gap: $spacing-md;
}

.login-button {
  width: 100%;
  margin-top: $spacing-sm;
}

.form-footer {
  margin-top: $spacing-md;
  padding-top: $spacing-md;
  border-top: 1px solid $gray-200;
  display: flex;
  justify-content: space-between;
  align-items: center;

  @include mobile {
    flex-direction: column;
    gap: $spacing-sm;
    align-items: stretch;
  }
}

.footer-links {
  display: flex;
  gap: $spacing-xs;
  align-items: center;

  a {
    font-size: $font-size-xs;
    color: $gray-600;
    text-decoration: none;
    transition: color 0.2s;

    &:hover {
      color: $primary-color;
    }
  }

  .link-divider {
    color: $gray-400;
    font-size: $font-size-xs;
  }
}

.signup-btn {
  display: flex;
  align-items: center;
  gap: $spacing-xs;
  padding: $spacing-xs $spacing-md;
  color: $primary-color;
  font-weight: 600;
  font-size: $font-size-xs;

  .arrow-icon {
    transition: transform 0.2s;
  }

  &:hover .arrow-icon {
    transform: translateX(4px);
  }
}
</style>
