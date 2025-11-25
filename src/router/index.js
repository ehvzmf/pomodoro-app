import { createRouter, createWebHistory } from 'vue-router'
import PomodoroTimer from '../components/PomodoroTimer.vue'
import StatisticsView from '../components/StatisticsView.vue'
import SettingsView from '../components/SettingsView.vue'
import PublishingShowcase from '../components/publishing/PublishingShowcase.vue'

// 라우트 정의
const routes = [
  {
    path: '/',
    name: 'home',
    component: PomodoroTimer
  },
  {
    path: '/statistics',
    name: 'statistics',
    component: StatisticsView
  },
  {
    path: '/settings',
    name: 'settings',
    component: SettingsView
  },
  {
    path: '/publishing',
    name: 'publishing',
    component: PublishingShowcase
  }
]

// 라우터 생성
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

export default router
