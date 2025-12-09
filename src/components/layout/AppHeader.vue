<template>
  <header class="app-header" :class="{ 'app-header--transparent': transparent }">
    <div class="header-container">
      <div class="header-logo">
        <h1>LOGO</h1>
      </div>
      <nav class="header-nav">
        <a href="#" class="nav-link">서비스 소개</a>
        <a href="#" class="nav-link">고객센터</a>
        <a href="#" class="nav-link">공지사항</a>
      </nav>
    </div>
  </header>
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

.app-header {
  background: $white;
  border-bottom: 1px solid $gray-200;
  padding: $spacing-md 0;

  &--transparent {
    background: transparent;
    border-bottom: none;
  }
}

.header-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 $spacing-lg;
  display: flex;
  justify-content: space-between;
  align-items: center;

  @include mobile {
    padding: 0 $spacing-md;
  }
}

.header-logo {
  h1 {
    font-size: $font-size-xl;
    font-weight: 700;
    color: $primary-color;
    margin: 0;
  }
}

.header-nav {
  display: flex;
  gap: $spacing-xl;

  @include mobile {
    gap: $spacing-md;
  }
}

.nav-link {
  font-size: $font-size-base;
  color: $gray-700;
  text-decoration: none;
  transition: color 0.2s;

  &:hover {
    color: $primary-color;
  }

  @include mobile {
    font-size: $font-size-sm;
  }
}
</style>
