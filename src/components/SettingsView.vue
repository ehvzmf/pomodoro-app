<template>
  <div class="min-h-screen bg-gray-50 p-6 pb-20">
    <div class="max-w-md mx-auto">
      <!-- 헤더 -->
      <header class="text-center mb-8">
        <h1 class="text-3xl font-bold text-gray-800 mb-2">⚙️ Settings</h1>
        <p class="text-gray-600">Customize your pomodoro experience</p>
      </header>

    <!-- 타이머 설정 -->
    <div class="bg-white rounded-2xl shadow-lg p-6 mb-6">
      <h2 class="text-xl font-semibold text-gray-800 mb-4">Timer Settings</h2>
      
      <div class="space-y-4">
        <!-- 포커스 시간 -->
        <div class="flex items-center justify-between">
          <div>
            <label class="text-gray-700 font-medium">Focus Time</label>
            <p class="text-sm text-gray-500">Duration of work sessions</p>
          </div>
          <div class="flex items-center space-x-3">
            <button 
              @click="adjustTime('focus', -5)"
              class="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center hover:bg-gray-300 transition-colors"
            >
              <span class="text-gray-600">−</span>
            </button>
            <span class="font-medium text-gray-800 w-12 text-center">{{ settings.focusTime }}m</span>
            <button 
              @click="adjustTime('focus', 5)"
              class="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center hover:bg-gray-300 transition-colors"
            >
              <span class="text-gray-600">+</span>
            </button>
          </div>
        </div>

        <!-- 짧은 휴식 -->
        <div class="flex items-center justify-between">
          <div>
            <label class="text-gray-700 font-medium">Short Break</label>
            <p class="text-sm text-gray-500">Break between sessions</p>
          </div>
          <div class="flex items-center space-x-3">
            <button 
              @click="adjustTime('shortBreak', -1)"
              class="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center hover:bg-gray-300 transition-colors"
            >
              <span class="text-gray-600">−</span>
            </button>
            <span class="font-medium text-gray-800 w-12 text-center">{{ settings.shortBreak }}m</span>
            <button 
              @click="adjustTime('shortBreak', 1)"
              class="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center hover:bg-gray-300 transition-colors"
            >
              <span class="text-gray-600">+</span>
            </button>
          </div>
        </div>

        <!-- 긴 휴식 -->
        <div class="flex items-center justify-between">
          <div>
            <label class="text-gray-700 font-medium">Long Break</label>
            <p class="text-sm text-gray-500">Break after 4 sessions</p>
          </div>
          <div class="flex items-center space-x-3">
            <button 
              @click="adjustTime('longBreak', -5)"
              class="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center hover:bg-gray-300 transition-colors"
            >
              <span class="text-gray-600">−</span>
            </button>
            <span class="font-medium text-gray-800 w-12 text-center">{{ settings.longBreak }}m</span>
            <button 
              @click="adjustTime('longBreak', 5)"
              class="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center hover:bg-gray-300 transition-colors"
            >
              <span class="text-gray-600">+</span>
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- 알림 설정 -->
    <div class="bg-white rounded-2xl shadow-lg p-6 mb-6">
      <h2 class="text-xl font-semibold text-gray-800 mb-4">Notifications</h2>
      
      <div class="space-y-4">
        <!-- 사운드 알림 -->
        <div class="flex items-center justify-between">
          <div>
            <label class="text-gray-700 font-medium">Sound Alerts</label>
            <p class="text-sm text-gray-500">Play sound when sessions end</p>
          </div>
          <button 
            @click="settings.soundEnabled = !settings.soundEnabled"
            :class="settings.soundEnabled ? 'bg-red-500' : 'bg-gray-300'"
            class="relative inline-flex h-6 w-11 items-center rounded-full transition-colors"
          >
            <span 
              :class="settings.soundEnabled ? 'translate-x-6' : 'translate-x-1'"
              class="inline-block h-4 w-4 transform rounded-full bg-white transition-transform"
            />
          </button>
        </div>

        <!-- 브라우저 알림 -->
        <div class="flex items-center justify-between">
          <div>
            <label class="text-gray-700 font-medium">Browser Notifications</label>
            <p class="text-sm text-gray-500">Show desktop notifications</p>
          </div>
          <button 
            @click="toggleBrowserNotifications"
            :class="settings.browserNotifications ? 'bg-red-500' : 'bg-gray-300'"
            class="relative inline-flex h-6 w-11 items-center rounded-full transition-colors"
          >
            <span 
              :class="settings.browserNotifications ? 'translate-x-6' : 'translate-x-1'"
              class="inline-block h-4 w-4 transform rounded-full bg-white transition-transform"
            />
          </button>
        </div>

        <!-- 자동 시작 -->
        <div class="flex items-center justify-between">
          <div>
            <label class="text-gray-700 font-medium">Auto-start Sessions</label>
            <p class="text-sm text-gray-500">Automatically start next session</p>
          </div>
          <button 
            @click="settings.autoStart = !settings.autoStart"
            :class="settings.autoStart ? 'bg-red-500' : 'bg-gray-300'"
            class="relative inline-flex h-6 w-11 items-center rounded-full transition-colors"
          >
            <span 
              :class="settings.autoStart ? 'translate-x-6' : 'translate-x-1'"
              class="inline-block h-4 w-4 transform rounded-full bg-white transition-transform"
            />
          </button>
        </div>
      </div>
    </div>

    <!-- 테마 설정 -->
    <div class="bg-white rounded-2xl shadow-lg p-6 mb-6">
      <h2 class="text-xl font-semibold text-gray-800 mb-4">Appearance</h2>
      
      <div class="space-y-4">
        <div>
          <label class="text-gray-700 font-medium block mb-2">Theme</label>
          <div class="flex space-x-3">
            <button 
              @click="settings.theme = 'light'"
              :class="settings.theme === 'light' ? 'ring-2 ring-red-500' : 'ring-1 ring-gray-300'"
              class="flex-1 p-3 rounded-lg bg-white border text-center transition-all"
            >
              <div class="text-2xl mb-1">☀️</div>
              <div class="text-sm">Light</div>
            </button>
            <button 
              @click="settings.theme = 'dark'"
              :class="settings.theme === 'dark' ? 'ring-2 ring-red-500' : 'ring-1 ring-gray-300'"
              class="flex-1 p-3 rounded-lg bg-gray-800 text-white border text-center transition-all"
            >
              <div class="text-2xl mb-1">🌙</div>
              <div class="text-sm">Dark</div>
            </button>
          </div>
        </div>
      </div>
    </div>

      <!-- 저장 버튼 -->
      <div class="text-center">
        <button 
          @click="saveSettings"
          class="bg-red-500 text-white px-8 py-3 rounded-lg font-medium hover:bg-red-600 transition-colors"
        >
          Save Settings
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

// 설정 상태
const settings = ref({
  focusTime: 25,
  shortBreak: 5,
  longBreak: 15,
  soundEnabled: true,
  browserNotifications: false,
  autoStart: false,
  theme: 'light'
})

// 시간 조정 함수
const adjustTime = (type, minutes) => {
  const newValue = settings.value[type] + minutes
  
  // 최소/최대값 제한
  if (type === 'focusTime') {
    settings.value[type] = Math.max(5, Math.min(60, newValue))
  } else if (type === 'shortBreak') {
    settings.value[type] = Math.max(1, Math.min(30, newValue))
  } else if (type === 'longBreak') {
    settings.value[type] = Math.max(5, Math.min(60, newValue))
  }
}

// 브라우저 알림 권한 요청
const toggleBrowserNotifications = async () => {
  if (!settings.value.browserNotifications) {
    if ('Notification' in window) {
      const permission = await Notification.requestPermission()
      if (permission === 'granted') {
        settings.value.browserNotifications = true
      } else {
        alert('브라우저 알림 권한이 필요합니다.')
      }
    } else {
      alert('이 브라우저는 알림을 지원하지 않습니다.')
    }
  } else {
    settings.value.browserNotifications = false
  }
}

// 설정 저장
const saveSettings = () => {
  // 실제로는 localStorage나 API에 저장
  localStorage.setItem('pomodoroSettings', JSON.stringify(settings.value))
  alert('설정이 저장되었습니다!')
}

// 컴포넌트 마운트 시 저장된 설정 불러오기
import { onMounted } from 'vue'
onMounted(() => {
  const savedSettings = localStorage.getItem('pomodoroSettings')
  if (savedSettings) {
    settings.value = { ...settings.value, ...JSON.parse(savedSettings) }
  }
})
</script>
