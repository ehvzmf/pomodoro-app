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
          <h3 class="form-title">간편 인증</h3>
          
          <div class="easy-login-content">
            <div class="tooltip-container">
              <div class="tooltip">간편한 로그인을 이용하세요!</div>
              <BaseButton
                variant="primary"
                size="lg"
                class="easy-login-button"
                @click="handleEasyLogin"
              >
                <span class="btn-icon">🔐</span>
                간편 인증 로그인
              </BaseButton>
            </div>
            
            <div class="login-guide">
              <p class="guide-text">
                ✓ 지문 또는 얼굴 인식으로 빠르게 로그인<br />
                ✓ 별도의 비밀번호 입력 불필요<br />
                ✓ 안전하고 편리한 인증 방식
              </p>
            </div>
          </div>

          <!-- 하단 링크 -->
          <div class="form-footer">
            <div class="footer-links">
              <a href="#" @click.prevent="handleBackToNormal">일반 로그인으로 돌아가기</a>
            </div>
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
import { ref } from 'vue'
import AppHeader from '@/components/layout/AppHeader.vue'
import AppFooter from '@/components/layout/AppFooter.vue'
import BaseButton from '@/components/publishing/BaseButton.vue'

const handleEasyLogin = () => {
  alert('간편 인증을 시작합니다.')
}

const handleBackToNormal = () => {
  alert('일반 로그인 페이지로 이동합니다.')
}
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
  min-height: 40vh;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-radius: $radius-lg;
  padding: $spacing-2xl;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);

  @include mobile {
    grid-template-columns: 1fr;
    gap: $spacing-lg;
    min-height: auto;
    padding: $spacing-xl $spacing-lg;
  }
}

/* 왼쪽 포탈 정보 */
.portal-info {
  display: flex;
  flex-direction: column;
  gap: $spacing-lg;
  color: $white;
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
  }

  .portal-description {
    font-size: $font-size-base;
    color: rgba(255, 255, 255, 0.95);
    line-height: 1.6;
    margin-bottom: $spacing-lg;
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
    padding: $spacing-lg;
    max-width: 100%;
  }
}

.form-title {
  font-size: $font-size-lg;
  font-weight: 700;
  color: $gray-800;
  margin: 0 0 $spacing-lg 0;
  text-align: center;
}

.easy-login-content {
  display: flex;
  flex-direction: column;
  gap: $spacing-lg;
  margin-bottom: $spacing-xl;
}

.tooltip-container {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: $spacing-sm;
}

.tooltip {
  background: $primary-color;
  color: $white;
  padding: $spacing-xs $spacing-md;
  border-radius: $radius-md;
  font-size: $font-size-sm;
  position: relative;
  white-space: nowrap;
  box-shadow: $shadow-md;
  animation: bounce 2s infinite;

  &::after {
    content: '';
    position: absolute;
    bottom: -6px;
    left: 50%;
    transform: translateX(-50%);
    width: 0;
    height: 0;
    border-left: 6px solid transparent;
    border-right: 6px solid transparent;
    border-top: 6px solid $primary-color;
  }
}

@keyframes bounce {
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-8px);
  }
}

.easy-login-button {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: $spacing-sm;
  padding: $spacing-lg;
  font-size: $font-size-base;

  .btn-icon {
    font-size: $font-size-lg;
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
    padding: 0 $spacing-md;
    background: $white;
    color: $gray-500;
    font-size: $font-size-sm;
  }
}

.login-guide {
  padding: $spacing-md;
  background: $gray-50;
  border-radius: $radius-md;
  border-left: 3px solid $primary-color;
}

.guide-text {
  font-size: $font-size-sm;
  color: $gray-700;
  line-height: 1.8;
  margin: 0;
}

.form-footer {
  padding-top: $spacing-md;
  border-top: 1px solid $gray-200;
  text-align: center;
}

.footer-links {
  a {
    font-size: $font-size-xs;
    color: $gray-600;
    text-decoration: none;
    transition: color 0.2s;

    &:hover {
      color: $primary-color;
    }
  }
}

/* 하단 버튼 영역 */
.bottom-actions {
  padding: $spacing-xl 40px $spacing-lg;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: $spacing-xl;

  @include mobile {
    flex-direction: column;
    padding: $spacing-lg 20px;
    gap: $spacing-lg;
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
