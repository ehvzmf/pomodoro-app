<template>
  <BasePopup :is-open="isOpen" title="간편인증" @close="closeModal">
    <div class="auth-grid">
      <button 
        v-for="(method, index) in authMethods" 
        :key="index"
        class="auth-button"
        @click="handleAuth(method.id)"
      >
        <div class="auth-icon" v-html="method.icon"></div>
        <span class="auth-label">{{ method.label }}</span>
      </button>
    </div>
  </BasePopup>
</template>

<script setup>
import { ref } from 'vue'
import BasePopup from './BasePopup.vue'

const props = defineProps({
  isOpen: {
    type: Boolean,
    required: true
  }
})

const emit = defineEmits(['close', 'select'])

const authMethods = ref([
  { id: 'kakao', label: '카카오', icon: '💬' },
  { id: 'naver', label: '네이버', icon: '🟢' },
  { id: 'google', label: '구글', icon: '🔵' },
  { id: 'apple', label: 'Apple', icon: '🍎' },
  { id: 'phone', label: '휴대폰', icon: '📱' },
  { id: 'pass', label: 'PASS', icon: '🔐' },
  { id: 'kb', label: 'KB모바일', icon: '🏦' },
  { id: 'shinhan', label: '신한인증', icon: '💳' },
  { id: 'toss', label: '토스', icon: '💙' },
  { id: 'payco', label: 'PAYCO', icon: '🅿️' },
  { id: 'samsung', label: '삼성패스', icon: '📲' },
  { id: 'biometric', label: '생체인증', icon: '👆' },
  { id: 'pin', label: 'PIN', icon: '🔢' },
  { id: 'email', label: '이메일', icon: '✉️' },
  { id: 'sms', label: 'SMS', icon: '💬' },
  { id: 'more', label: '더보기', icon: '⋯' }
])

const closeModal = () => {
  emit('close')
}

const handleAuth = (methodId) => {
  emit('select', methodId)
  console.log('선택된 인증 방법:', methodId)
}
</script>

<style lang="scss" scoped>
@import '@/assets/styles/variables';
@import '@/assets/styles/mixins';

.auth-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: $spacing-md;
  
  @include mobile {
    gap: $spacing-sm;
  }
}

.auth-button {
  @include button-reset;
  @include flex-center;
  flex-direction: column;
  gap: $spacing-xs;
  padding: $spacing-lg $spacing-md;
  background: $gray-50;
  border: 1px solid $gray-200;
  border-radius: $radius-lg;
  transition: all $transition-fast;
  
  @include mobile {
    padding: $spacing-md $spacing-xs;
  }

  &:hover {
    background: $gray-100;
    border-color: $primary-color;
    transform: translateY(-2px);
    box-shadow: $shadow-md;
  }

  &:active {
    transform: translateY(0);
  }
}

.auth-icon {
  font-size: 2rem;
  line-height: 1;
  
  @include mobile {
    font-size: 1.5rem;
  }
}

.auth-label {
  font-size: $font-size-xs;
  color: $gray-700;
  text-align: center;
  font-weight: 500;
  
  @include mobile {
    font-size: 0.625rem; // 10px
  }
}
</style>
