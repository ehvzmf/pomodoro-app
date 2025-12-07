<template>
  <div class="auth-grid-modal">
    <button v-for="(m, i) in methods" :key="i" class="auth-grid-item" @click="$emit('select', m.id)">
      <div class="icon">{{ m.icon }}</div>
      <div class="label">{{ m.label }}</div>
    </button>
  </div>
</template>

<script setup>
const methods = [
  { id: 'kakao', label: '카카오', icon: '💬' },
  { id: 'naver', label: '네이버', icon: '🟢' },
  { id: 'google', label: '구글', icon: '🔵' },
  { id: 'apple', label: 'Apple', icon: '🍎' },
  { id: 'phone', label: '휴대폰', icon: '📱' },
  { id: 'pass', label: 'PASS', icon: '🔐' },
  { id: 'more', label: '더보기', icon: '⋯' }
]
</script>

<style scoped lang="scss">
@import '@/assets/styles/variables';
@import '@/assets/styles/mixins';

.auth-grid-modal {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: $spacing-md;
}

.auth-grid-item {
  @include button-reset;
  @include flex-center;
  flex-direction: column;
  padding: $spacing-md;
  background: $gray-50;
  border-radius: $radius-md;
  border: 1px solid $gray-200;
}

.icon { font-size: 1.5rem; }
.label { margin-top: $spacing-xs; font-size: $font-size-sm }

@include mobile {
  .auth-grid-modal { grid-template-columns: repeat(3, 1fr); gap: $spacing-sm; }
}
</style>
