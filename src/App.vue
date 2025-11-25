<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import BottomNavigation from './components/BottomNavigation.vue'

// 현재 라우트 정보 가져오기
const route = useRoute()

// 현재 탭을 라우트 이름으로 계산
const currentTab = computed(() => route.name || 'home')
</script>

<template>
  <div id="app">
    <!-- 메인 콘텐츠 영역 -->
    <main class="pb-16">
      <!-- RouterView가 현재 라우트에 맞는 컴포넌트를 렌더링 -->
      <RouterView />
    </main>

    <!-- 하단 네비게이션 -->
    <BottomNavigation :current-tab="currentTab" />
  </div>
</template>

<style>
#app {
  min-height: 100vh;
  margin: 0;
  padding: 0;
  font-family: 'Inter', system-ui, -apple-system, sans-serif;
}

/* 전역 스타일 리셋 */
* {
  box-sizing: border-box;
}

body {
  margin: 0;
  padding: 0;
}
</style>
