<template>
  <div class="login-page">
    <AppHeader :transparent="true" />
    
    <main class="login-main">
      <div class="login-content">
        <!-- 왼쪽 영역: 포탈 정보 -->
        <div class="portal-info">
          <div class="portal-text">
            <h2>안전한 인증 시스템</h2>
            <p class="portal-description">
              최신 보안 기술로 보호되는<br />
              안심하고 사용할 수 있는 플랫폼입니다.
            </p>
            <ul class="portal-features">
              <li>✓ 2단계 인증 지원</li>
              <li>✓ 생체 인증 연동</li>
              <li>✓ 실시간 보안 모니터링</li>
              <li>✓ 간편한 계정 관리</li>
            </ul>
          </div>
        </div>

        <!-- 오른쪽 영역: 간편 로그인 폼 -->
        <div class="login-form-container">
          <h3 class="form-title">로그인</h3>
          
          <!-- 간편 로그인 버튼 -->
          <div class="quick-login-buttons">
            <div class="quick-login-wrapper">
              <div class="tooltip">간편한 로그인을 이용하세요!</div>
              <BaseButton
                variant="outline"
                class="quick-login-btn quick-login-btn--active"
                @click="handleQuickLogin('easy')"
              >
                <span class="btn-icon">🔐</span>
                간편인증 로그인
              </BaseButton>
            </div>
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

          <!-- 간편인증 로그인 버튼 -->
          <div class="easy-auth-wrapper">
            <div class="easy-auth-tooltip">간편한 로그인을 이용하세요!</div>
            <BaseButton
              type="button"
              variant="primary"
              size="lg"
              class="easy-auth-button"
              @click="handleQuickLogin('easy')"
            >
              <span class="btn-icon">🔐</span>
              간편인증 로그인
            </BaseButton>
          </div>

          <!-- 안내 문구 -->
          <p class="info-text">
            ℹ️ 간편인증으로 빠르고 안전하게 로그인하세요.
          </p>

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

    <!-- 하단 버튼 영역 -->
    <div class="bottom-actions">
      <div class="action-buttons">
        <BaseButton variant="ghost" class="action-btn">고객센터</BaseButton>
        <BaseButton variant="ghost" class="action-btn">공지사항</BaseButton>
        <BaseButton variant="ghost" class="action-btn">서비스 소개</BaseButton>
      </div>

      <div class="manual-box">
        <div class="manual-row">
          <BaseButton variant="outline" size="sm" class="manual-btn">이용 매뉴얼</BaseButton>
          <BaseButton variant="outline" size="sm" class="manual-btn">설치 가이드</BaseButton>
          <BaseButton variant="outline" size="sm" class="manual-btn">FAQ</BaseButton>
        </div>
        <div class="manual-row">
          <a href="#" class="popup-link">개인정보처리방침</a>
          <span class="divider-text">|</span>
          <a href="#" class="popup-link">이용약관</a>
          <span class="divider-text">|</span>
          <a href="#" class="popup-link">보안정책</a>
        </div>
      </div>
    </div>
    
    <AppFooter :transparent="true" />
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import AppHeader from '@/components/layout/AppHeader.vue'
import AppFooter from '@/components/layout/AppFooter.vue'
import BaseButton from '@/components/publishing/BaseButton.vue'

const handleQuickLogin = (type) => {
  console.log(`${type} 간편 로그인`)
  alert(`${type === 'easy' ? '간편인증' : 'SMS'} 로그인 페이지로 이동합니다.`)
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

// 스크롤 시 헤더 배경 변경
const handleScroll = () => {
  const header = document.querySelector('.app-header')
  if (!header) return
  
  // 이미지 영역 높이(180px)를 지나면 헤더 배경 흰색
  if (window.scrollY > 180) {
    header.style.background = '#ffffff'
    header.style.borderBottom = '1px solid #e5e7eb'
  } else {
    header.style.background = 'transparent'
    header.style.borderBottom = 'none'
  }
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll)
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})
</script>

<style lang="scss" scoped>
@use '@/assets/styles/mixins' as *;

.login-page {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background: $white;

  @include mobile {
    padding-top: 0;
    background: $white;
  }
}

.login-main {
  flex: 1;
  padding: $spacing-lg 40px;
  background: $white;

  @include mobile {
    padding: 0;
    padding-top: 180px; // 이미지 영역 높이만큼
    background: $white;
  }
}

.login-content {
  display: grid;
  grid-template-columns: 1.2fr 0.8fr;
  gap: $spacing-xl;
  align-items: center;
  min-height: 40vh;
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
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 180px;
    padding: $spacing-md 20px;
    padding-top: 60px; // 헤더 높이만큼 로고 아래 공간 확보
    z-index: 1;
    // 배경 이미지 영역 - 이미지 경로만 추가하면 됩니다
    // background-image: url('@/assets/images/login-bg.jpg');
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
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

/* 오른쪽 간편 로그인 폼 */
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
    box-shadow: none;
    margin: 0;
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
}

.quick-login-wrapper {
  position: relative;
}

.tooltip {
  position: absolute;
  top: -8px;
  left: 50%;
  transform: translateX(-50%);
  background: $primary-color;
  color: $white;
  padding: $spacing-xs $spacing-sm;
  border-radius: $radius-sm;
  font-size: $font-size-xs;
  white-space: nowrap;
  box-shadow: $shadow-md;
  z-index: 10;

  &::after {
    content: '';
    position: absolute;
    bottom: -4px;
    left: 50%;
    transform: translateX(-50%);
    width: 0;
    height: 0;
    border-left: 4px solid transparent;
    border-right: 4px solid transparent;
    border-top: 4px solid $primary-color;
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

  &--active {
    background: rgba($primary-color, 0.1);
    border-color: $primary-color;
    color: $primary-color;
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

.info-text {
  font-size: $font-size-xs;
  color: $gray-600;
  margin: 0 0 $spacing-md 0;
  padding: $spacing-xs;
  background: $gray-50;
  border-radius: $radius-sm;

  &--highlight {
    background: rgba($primary-color, 0.1);
    color: $primary-color;
    border-left: 3px solid $primary-color;
  }
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
    grid-template-columns: 1fr 1fr;
  }
}

.quick-login-wrapper {
  position: relative;
}

.tooltip {
  display: none;
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

  &--active {
    background: rgba($primary-color, 0.1);
    border-color: $primary-color;
    color: $primary-color;
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

.easy-auth-wrapper {
  position: relative;
  margin-bottom: $spacing-md;
}

.easy-auth-tooltip {
  position: absolute;
  top: -12px;
  left: 50%;
  transform: translateX(-50%);
  background: $white;
  color: $primary-color;
  border: 2px solid $primary-color;
  border-radius: $radius-lg;
  padding: $spacing-xs $spacing-md;
  font-size: $font-size-xs;
  font-weight: 600;
  white-space: nowrap;
  box-shadow: 0 2px 8px rgba(239, 68, 68, 0.15);
  z-index: 10;

  &::after {
    content: '';
    position: absolute;
    bottom: -9px;
    left: 50%;
    transform: translateX(-50%);
    width: 0;
    height: 0;
    border-left: 9px solid transparent;
    border-right: 9px solid transparent;
    border-top: 9px solid $primary-color;
  }

  &::before {
    content: '';
    position: absolute;
    bottom: -6px;
    left: 50%;
    transform: translateX(-50%);
    width: 0;
    height: 0;
    border-left: 7px solid transparent;
    border-right: 7px solid transparent;
    border-top: 7px solid $white;
    z-index: 1;
  }
}

.easy-auth-button {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: $spacing-sm;

  .btn-icon {
    font-size: $font-size-lg;
  }
}

.info-text {
  font-size: $font-size-xs;
  color: $gray-600;
  margin: 0 0 $spacing-md 0;
  padding: $spacing-xs;
  background: $gray-50;
  border-radius: $radius-sm;
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

/* 하단 버튼 영역 */
.bottom-actions {
  padding: $spacing-xl 40px $spacing-lg;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: $spacing-xl;
  background: $white; // 하단은 흰색 배경

  @include mobile {
    flex-direction: column;
    padding: $spacing-lg 20px;
    gap: $spacing-lg;
    background: $white; // 모바일에서도 흰색 배경
  }
}

.action-buttons {
  display: flex;
  gap: $spacing-md;

  @include mobile {
    flex-wrap: wrap;
    gap: $spacing-sm;
  }
}

.action-btn {
  color: $gray-700;
  font-size: $font-size-sm;
  padding: $spacing-sm $spacing-md;

  &:hover {
    background: $gray-50;
  }
}

.manual-box {
  padding: $spacing-md $spacing-lg;
  background: $gray-50;
  border-radius: $radius-md;
  border: 1px solid $gray-200;
  display: flex;
  flex-direction: column;
  gap: $spacing-sm;

  @include mobile {
    width: 100%;
  }
}

.manual-row {
  display: flex;
  align-items: center;
  gap: $spacing-sm;
  flex-wrap: wrap;

  &:first-child {
    padding-bottom: $spacing-sm;
    border-bottom: 1px solid $gray-300;
  }
}

.manual-btn {
  font-size: $font-size-xs;
  padding: $spacing-xs $spacing-sm;
  white-space: nowrap;
}

.popup-link {
  font-size: $font-size-xs;
  color: $gray-600;
  text-decoration: none;
  transition: color 0.2s;

  &:hover {
    color: $primary-color;
  }
}

.divider-text {
  color: $gray-400;
  font-size: $font-size-xs;
}
</style>
