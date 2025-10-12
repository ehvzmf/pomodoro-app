<script setup>
import PomodoroTimer from './components/PomodoroTimer.vue'
</script>

<template>
  <div id="app">
    <PomodoroTimer />
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
