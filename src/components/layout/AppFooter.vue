<template>
  <footer class="app-footer" :class="{ 'app-footer--transparent': transparent }">
    <div class="footer-container">
      <div class="footer-info">
        <p class="footer-text">© 2024 Company Name. All rights reserved.</p>
        <div class="footer-links">
          <a href="#" class="footer-link">이용약관</a>
          <span class="divider">|</span>
          <a href="#" class="footer-link">개인정보처리방침</a>
          <span class="divider">|</span>
          <a href="#" class="footer-link">고객센터</a>
        </div>
      </div>
      <div class="footer-contact">
        <p>고객센터: 1588-0000</p>
        <p>이메일: support@example.com</p>
      </div>
    </div>
  </footer>
</template>

<script setup>
defineProps({
  transparent: {
    type: Boolean,
    default: false
  }
})
</script>

<style lang="scss" scoped>
@use '@/assets/styles/mixins' as *;

.app-footer {
  background: $gray-800;
  color: $gray-300;
  padding: $spacing-xl 0;
  margin-top: auto;

  &--transparent {
    background: transparent;
    color: $gray-700;

    .footer-text,
    .footer-contact p {
      color: $gray-600;
    }

    .footer-link {
      color: $gray-700;

      &:hover {
        color: $primary-color;
      }
    }

    .divider {
      color: $gray-400;
    }
  }
}

.footer-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 $spacing-lg;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;

  @include mobile {
    flex-direction: column;
    gap: $spacing-lg;
    padding: 0 $spacing-md;
  }
}

.footer-info {
  display: flex;
  flex-direction: column;
  gap: $spacing-sm;
}

.footer-text {
  font-size: $font-size-sm;
  color: $gray-400;
  margin: 0;
}

.footer-links {
  display: flex;
  gap: $spacing-sm;
  align-items: center;
}

.footer-link {
  font-size: $font-size-sm;
  color: $gray-300;
  text-decoration: none;
  transition: color 0.2s;

  &:hover {
    color: $white;
  }
}

.divider {
  color: $gray-600;
}

.footer-contact {
  text-align: right;

  @include mobile {
    text-align: left;
  }

  p {
    font-size: $font-size-sm;
    color: $gray-400;
    margin: 0 0 $spacing-xs 0;

    &:last-child {
      margin-bottom: 0;
    }
  }
}
</style>
