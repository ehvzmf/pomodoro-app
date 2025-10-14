<template>
  <div class="min-h-screen bg-gray-50 p-6 pb-20">
    <div class="max-w-md mx-auto">
      <!-- 헤더 -->
      <header class="text-center mb-8">
        <h1 class="text-3xl font-bold text-gray-800 mb-2">📊 Statistics</h1>
        <p class="text-gray-600">Track your productivity and progress</p>
      </header>

      <!-- 오늘의 통계 -->
      <div class="bg-white rounded-2xl shadow-lg p-6 mb-6">
        <h2 class="text-xl font-semibold text-gray-800 mb-4">Today's Progress</h2>
        
        <div class="grid grid-cols-2 gap-4">
          <div class="text-center p-4 bg-red-50 rounded-lg">
            <div class="text-2xl font-bold text-red-600">{{ todayStats.completedSessions }}</div>
            <div class="text-sm text-gray-600">Completed Sessions</div>
          </div>
          
          <div class="text-center p-4 bg-green-50 rounded-lg">
            <div class="text-2xl font-bold text-green-600">{{ formatTime(todayStats.focusTime) }}</div>
            <div class="text-sm text-gray-600">Focus Time</div>
          </div>
          
          <div class="text-center p-4 bg-blue-50 rounded-lg">
            <div class="text-2xl font-bold text-blue-600">{{ todayStats.completedTasks }}</div>
            <div class="text-sm text-gray-600">Tasks Completed</div>
          </div>
          
          <div class="text-center p-4 bg-purple-50 rounded-lg">
            <div class="text-2xl font-bold text-purple-600">{{ todayStats.productivity }}%</div>
            <div class="text-sm text-gray-600">Productivity</div>
          </div>
        </div>
      </div>

      <!-- 주간 통계 -->
      <div class="bg-white rounded-2xl shadow-lg p-6 mb-6">
        <h2 class="text-xl font-semibold text-gray-800 mb-4">This Week</h2>
        
        <div class="space-y-3">
          <div v-for="(day, index) in weeklyStats" :key="index" class="flex items-center justify-between">
            <span class="text-gray-600">{{ day.name }}</span>
            <div class="flex items-center space-x-2">
              <div class="w-32 bg-gray-200 rounded-full h-2">
                <div 
                  class="bg-red-500 h-2 rounded-full transition-all duration-300"
                  :style="{ width: `${(day.sessions / 8) * 100}%` }"
                ></div>
              </div>
              <span class="text-sm font-medium text-gray-800 w-8">{{ day.sessions }}</span>
            </div>
          </div>
        </div>
      </div>

      <!-- 월간 목표 -->
      <div class="bg-white rounded-2xl shadow-lg p-6">
        <h2 class="text-xl font-semibold text-gray-800 mb-4">Monthly Goal</h2>
        
        <div class="text-center">
          <div class="relative w-32 h-32 mx-auto mb-4">
            <svg class="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
              <circle cx="50" cy="50" r="45" fill="none" stroke="#e5e7eb" stroke-width="8"/>
              <circle 
                cx="50" cy="50" r="45" 
                fill="none" 
                stroke="#ef4444" 
                stroke-width="8"
                stroke-linecap="round"
                :stroke-dasharray="`${circumference} ${circumference}`"
                :stroke-dashoffset="monthlyProgressOffset"
                class="transition-all duration-1000"
              />
            </svg>
            <div class="absolute inset-0 flex items-center justify-center">
              <div class="text-center">
                <div class="text-2xl font-bold text-gray-800">{{ monthlyGoal.completed }}</div>
                <div class="text-sm text-gray-500">/ {{ monthlyGoal.target }}</div>
              </div>
            </div>
          </div>
          
          <p class="text-gray-600">
            {{ Math.round((monthlyGoal.completed / monthlyGoal.target) * 100) }}% of monthly goal achieved
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

// 통계 데이터 (실제로는 localStorage나 API에서 가져올 예정)
const todayStats = ref({
  completedSessions: 3,
  focusTime: 75 * 60, // 75분 (초 단위)
  completedTasks: 5,
  productivity: 85
})

const weeklyStats = ref([
  { name: 'Mon', sessions: 6 },
  { name: 'Tue', sessions: 4 },
  { name: 'Wed', sessions: 8 },
  { name: 'Thu', sessions: 3 },
  { name: 'Fri', sessions: 7 },
  { name: 'Sat', sessions: 2 },
  { name: 'Sun', sessions: 5 }
])

const monthlyGoal = ref({
  completed: 65,
  target: 100
})

// 계산된 속성
const circumference = computed(() => 2 * Math.PI * 45)

const monthlyProgressOffset = computed(() => {
  const progress = monthlyGoal.value.completed / monthlyGoal.value.target
  return circumference.value - (progress * circumference.value)
})

// 유틸리티 함수
const formatTime = (seconds) => {
  const hours = Math.floor(seconds / 3600)
  const minutes = Math.floor((seconds % 3600) / 60)
  return hours > 0 ? `${hours}h ${minutes}m` : `${minutes}m`
}
</script>
