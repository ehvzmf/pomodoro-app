<template>
  <div class="flex flex-col items-center justify-center min-h-screen bg-gray-50 p-6">
    <!-- 헤더 -->
    <header class="text-center mb-8">
      <h1 class="text-4xl font-bold text-gray-800 mb-2">🍅 Pomodoro Timer</h1>
      <p class="text-gray-600">Focus on your tasks, one pomodoro at a time</p>
    </header>

    <!-- 타이머 메인 섹션 -->
    <div class="bg-white rounded-2xl shadow-lg p-8 max-w-md w-full">
      <!-- 세션 타입 표시 -->
      <div class="text-center mb-6">
        <span class="inline-block px-4 py-2 rounded-full text-sm font-medium"
              :class="sessionTypeClass">
          {{ sessionType }}
        </span>
      </div>

      <!-- 원형 진행률 표시기 -->
      <div class="relative w-64 h-64 mx-auto mb-8">
        <svg class="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
          <!-- 배경 원 -->
          <circle
            cx="50" cy="50" r="45"
            fill="none"
            stroke="#e5e7eb"
            stroke-width="2"
          />
          <!-- 진행률 원 -->
          <circle
            cx="50" cy="50" r="45"
            fill="none"
            :stroke="progressColor"
            stroke-width="2"
            stroke-linecap="round"
            :stroke-dasharray="`${circumference} ${circumference}`"
            :stroke-dashoffset="strokeDashoffset"
            class="transition-all duration-1000 ease-out"
          />
        </svg>
        
        <!-- 타이머 텍스트 -->
        <div class="absolute inset-0 flex items-center justify-center">
          <div class="text-center">
            <div class="text-4xl font-bold text-gray-800 mb-1">
              {{ formattedTime }}
            </div>
            <div class="text-sm text-gray-500">
              {{ isRunning ? 'Focus Time' : 'Paused' }}
            </div>
          </div>
        </div>
      </div>

      <!-- 컨트롤 버튼들 -->
      <div class="flex justify-center space-x-4">
        <button
          @click="toggleTimer"
          :class="isRunning ? 'bg-red-500 hover:bg-red-600' : 'bg-green-500 hover:bg-green-600'"
          class="px-6 py-3 text-white font-medium rounded-lg transition-colors duration-200 min-w-[100px]"
        >
          {{ isRunning ? 'Pause' : 'Start' }}
        </button>
        
        <button
          @click="resetTimer"
          class="px-6 py-3 bg-gray-500 text-white font-medium rounded-lg hover:bg-gray-600 transition-colors duration-200"
        >
          Reset
        </button>
      </div>

      <!-- 세션 정보 -->
      <div class="mt-6 text-center text-sm text-gray-600">
        <p>Session {{ completedSessions + 1 }} • {{ completedSessions }} completed today</p>
      </div>
    </div>

    <!-- 오늘의 할일 섹션 (간단 버전) -->
    <div class="mt-8 bg-white rounded-lg shadow p-6 max-w-md w-full">
      <h3 class="text-lg font-semibold text-gray-800 mb-4">Today's Tasks</h3>
      <div class="space-y-2">
        <div class="flex items-center space-x-3">
          <input type="checkbox" class="rounded" />
          <span class="text-gray-700">Complete project presentation</span>
        </div>
        <div class="flex items-center space-x-3">
          <input type="checkbox" class="rounded" />
          <span class="text-gray-700">Review code changes</span>
        </div>
        <div class="flex items-center space-x-3">
          <input type="checkbox" class="rounded" checked />
          <span class="text-gray-700 line-through text-gray-500">Morning workout</span>
        </div>
      </div>
      <button class="mt-4 text-blue-500 text-sm hover:text-blue-600">
        + Add new task
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'

// 상태 관리
const isRunning = ref(false)
const timeLeft = ref(25 * 60) // 25분 = 1500초
const sessionType = ref('Focus Time')
const completedSessions = ref(0)

// 타이머 설정
const WORK_TIME = 25 * 60 // 25분
const SHORT_BREAK = 5 * 60 // 5분
const LONG_BREAK = 15 * 60 // 15분

let interval = null

// 계산된 속성들
const formattedTime = computed(() => {
  const minutes = Math.floor(timeLeft.value / 60)
  const seconds = timeLeft.value % 60
  return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`
})

const circumference = computed(() => 2 * Math.PI * 45) // 반지름 45의 원둘레

const strokeDashoffset = computed(() => {
  const totalTime = sessionType.value === 'Focus Time' ? WORK_TIME : 
                   sessionType.value === 'Short Break' ? SHORT_BREAK : LONG_BREAK
  const progress = (totalTime - timeLeft.value) / totalTime
  return circumference.value - (progress * circumference.value)
})

const progressColor = computed(() => {
  return sessionType.value === 'Focus Time' ? '#ef4444' : '#10b981'
})

const sessionTypeClass = computed(() => {
  return sessionType.value === 'Focus Time' 
    ? 'bg-red-100 text-red-800'
    : 'bg-green-100 text-green-800'
})

// 메서드들
const toggleTimer = () => {
  isRunning.value = !isRunning.value
  
  if (isRunning.value) {
    interval = setInterval(() => {
      timeLeft.value--
      
      if (timeLeft.value <= 0) {
        handleSessionComplete()
      }
    }, 1000)
  } else {
    clearInterval(interval)
  }
}

const resetTimer = () => {
  isRunning.value = false
  clearInterval(interval)
  
  if (sessionType.value === 'Focus Time') {
    timeLeft.value = WORK_TIME
  } else if (sessionType.value === 'Short Break') {
    timeLeft.value = SHORT_BREAK
  } else {
    timeLeft.value = LONG_BREAK
  }
}

const handleSessionComplete = () => {
  isRunning.value = false
  clearInterval(interval)
  
  // 간단한 알림 (나중에 더 정교하게 만들 수 있음)
  alert(`${sessionType.value} completed!`)
  
  if (sessionType.value === 'Focus Time') {
    completedSessions.value++
    // 4번의 포커스 세션 후에는 긴 휴식, 아니면 짧은 휴식
    if (completedSessions.value % 4 === 0) {
      sessionType.value = 'Long Break'
      timeLeft.value = LONG_BREAK
    } else {
      sessionType.value = 'Short Break'
      timeLeft.value = SHORT_BREAK
    }
  } else {
    sessionType.value = 'Focus Time'
    timeLeft.value = WORK_TIME
  }
}

// 컴포넌트 정리
onUnmounted(() => {
  if (interval) {
    clearInterval(interval)
  }
})
</script>

<style scoped>
/* 추가적인 커스텀 스타일이 필요하면 여기에 작성 */
</style>
