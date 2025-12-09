import { createRouter, createWebHistory } from 'vue-router'
import PomodoroTimer from '../components/PomodoroTimer.vue'
import StatisticsView from '../components/StatisticsView.vue'
import SettingsView from '../components/SettingsView.vue'
import PublishingShowcase from '../components/publishing/PublishingShowcase.vue'
import LoginView from '../views/LoginView.vue'
import LoginViewVer2 from '../views/LoginViewVer2.vue'
import LoginViewVer3 from '../views/LoginViewVer3.vue'
import TableView from '../views/TableView.vue'

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
  },
  {
    path: '/login',
    name: 'login',
    component: LoginView
  },
  {
    path: '/login-v2',
    name: 'login-v2',
    component: LoginViewVer2
  },
  {
    path: '/login-v3',
    name: 'login-v3',
    component: LoginViewVer3
  },
  {
    path: '/table',
    name: 'table',
    component: TableView
  }
]

// 라우터 생성
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

export default router
