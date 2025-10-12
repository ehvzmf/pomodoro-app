# 🍅 Pomodoro App

A modern web-based Pomodoro timer application built with Vue.js and Tailwind CSS. This project focuses on creating an intuitive productivity tool that helps users manage their time effectively using the Pomodoro Technique.

## 📋 Table of Contents
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Getting Started](#getting-started)
- [Project Structure](#project-structure)
- [Development Schedule](#development-schedule)

## ✨ Features

### 🏠 Home (Timer Interface)
- **Pomodoro Timer**: Start, pause, and stop functionality with visual feedback
- **Session Management**: Automatic switching between work sessions (25min) and breaks (5min/15min)
- **Visual Progress**: Real-time countdown display with circular progress indicator
- **Sound Notifications**: Audio alerts for session transitions

### 📝 Task Management
- **Daily Todo List**: Create, edit, and delete today's tasks
- **Task Completion**: Check off completed tasks with visual feedback
- **Task Priority**: Organize tasks by importance and urgency
- **Progress Tracking**: Visual representation of daily task completion

### 📊 Statistics
- **Session Analytics**: Track completed Pomodoro sessions over time
- **Productivity Insights**: Daily, weekly, and monthly productivity reports
- **Goal Progress**: Monitor achievement of daily and weekly focus goals
- **Visual Charts**: Interactive graphs showing productivity trends

### ⚙️ Settings
- **Timer Customization**: Adjust work session and break durations
- **Notification Preferences**: Configure sound alerts and browser notifications
- **Theme Selection**: Choose between light and dark modes
- **Auto-start Options**: Configure automatic session transitions

## 🛠 Tech Stack

### Frontend
- **Vue.js 3**: Progressive JavaScript framework with Composition API
- **Tailwind CSS**: Utility-first CSS framework for responsive design
- **Vite**: Fast build tool and development server
- **Vue Router**: Client-side routing for single-page application

### Backend (Planned)
- **Express.js**: Node.js web framework for API development
- **RESTful API**: Standard HTTP methods for data operations
- **JSON**: Data format for client-server communication

### Development Tools
- **ESLint**: Code linting and formatting
- **MSW (Mock Service Worker)**: API mocking for development and testing
- **Git**: Version control system

## 🚀 Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn package manager

### Installation
```bash
# Clone the repository
git clone https://github.com/ehvzmf/pomodoro-app.git

# Navigate to project directory
cd pomodoro-app

# Install dependencies
npm install

# Start development server
npm run dev
```

### Build for Production
```bash
# Build the application
npm run build

# Preview the production build
npm run preview
```

## 📁 Project Structure
```
pomodoro-app/
├── public/                 # Static assets
├── src/
│   ├── components/        # Reusable Vue components
│   ├── views/            # Page components
│   ├── assets/           # Stylesheets and images
│   ├── utils/            # Utility functions
│   └── main.js           # Application entry point
├── package.json          # Dependencies and scripts
└── vite.config.js       # Vite configuration
```

## 📅 Development Schedule

### Milestone 1: Core Frontend Development
프론트엔드 핵심 기능 구현 및 사용자 인터페이스 완성

#### Sprint 1: 홈화면 및 기본 환경설정
- 뽀모도로 타이머 UI/UX 구현
- 기본 레이아웃 및 컴포넌트 구조 설계
- Tailwind CSS 스타일링 시스템 구축
- 타이머 로직 및 상태 관리 구현

#### Sprint 2: 통계 화면
- 사용 통계 데이터 시각화 구현
- 차트 라이브러리 연동 및 대시보드 구성
- 로컬 스토리지를 활용한 데이터 저장
- 반응형 디자인 적용

#### Sprint 3: MSW로 네트워크 모킹 추가
- API 엔드포인트 설계 및 모킹 구현
- 서버 통신 로직 준비
- 데이터 플로우 테스트 및 검증
- 에러 핸들링 구현

#### Sprint 4: 환경 설정 및 알림 기능
- 사용자 설정 페이지 구현
- 브라우저 알림 API 연동
- 오디오 알림 시스템 구축
- 사용성 테스트 및 UI/UX 개선

### Milestone 2: Backend Integration
Express.js 서버 구축 및 데이터 영속성 구현

#### 목표
- 사용자 데이터의 안전한 저장 및 관리
- RESTful API를 통한 클라이언트-서버 통신
- 사용자 인증 및 개인화 기능 추가
- 데이터베이스 연동 및 백업 시스템 구축 