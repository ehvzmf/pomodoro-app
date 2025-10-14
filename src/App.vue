<script setup>
import { ref } from 'vue'
import PomodoroTimer from './components/PomodoroTimer.vue'
import StatisticsView from './components/StatisticsView.vue'
import SettingsView from './components/SettingsView.vue'
import BottomNavigation from './components/BottomNavigation.vue'

// 현재 활성 탭
const currentTab = ref('home')

// 탭 변경 핸들러
const handleTabChange = (tab) => {
  currentTab.value = tab
}
</script>

<template>
  <div id="app">
    <!-- 메인 콘텐츠 영역 -->
    <main class="pb-16"> <!-- 하단 네비게이션 공간 확보 -->
      <!-- 홈 화면 -->
      <PomodoroTimer v-if="currentTab === 'home'" />
      
      <!-- 통계 화면 -->
      <StatisticsView v-else-if="currentTab === 'statistics'" />
      
      <!-- 설정 화면 -->
      <SettingsView v-else-if="currentTab === 'settings'" />
    </main>

    <!-- 하단 네비게이션 -->
    <BottomNavigation 
      :current-tab="currentTab" 
      @tab-change="handleTabChange" 
    />
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
