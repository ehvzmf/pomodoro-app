<template>
  <div class="table-view">
    <div class="table-container">
      <h1 class="page-title">테이블 보기</h1>
      
      <!-- 테이블 섹션 -->
      <section class="table-section">
        <h2 class="section-title">프로젝트 일정표</h2>
        
        <div class="table-wrapper">
          <table class="data-table">
            <!-- 제목 행 (전체 너비) -->
            <thead>
              <tr>
                <th colspan="9" class="table-main-header">2024년 1분기 프로젝트 계획</th>
              </tr>
            </thead>
            
            <tbody>
              <!-- 데이터 행 1 -->
              <tr>
                <td rowspan="3" class="row-header">프로젝트 A</td>
                <td colspan="2" class="merged-cell">기획 및 디자인 단계</td>
                <td class="regular-cell">2024.01.01</td>
                <td colspan="3" class="merged-large">
                  UI/UX 디자인 완료, 사용자 피드백 수집 및 반영
                </td>
                <td class="status-cell status-progress">진행중</td>
                <td class="regular-cell">홍길동</td>
              </tr>
              
              <tr>
                <!-- 제목1은 rowspan으로 생략 -->
                <td colspan="2" class="merged-cell">개발 단계</td>
                <td class="regular-cell">2024.02.01</td>
                <td colspan="3" class="merged-large">
                  프론트엔드 및 백엔드 개발 진행
                </td>
                <td class="status-cell status-pending">대기</td>
                <td class="regular-cell">김철수</td>
              </tr>
              
              <tr>
                <!-- 제목1은 rowspan으로 생략 -->
                <td colspan="2" class="merged-cell">테스트 및 배포</td>
                <td class="regular-cell">2024.03.01</td>
                <td colspan="3" class="merged-large">
                  QA 테스트, 버그 수정, 프로덕션 배포
                </td>
                <td class="status-cell status-pending">대기</td>
                <td class="regular-cell">이영희</td>
              </tr>
              
              <!-- 데이터 행 2 -->
              <tr>
                <td rowspan="3" class="row-header">프로젝트 B</td>
                <td colspan="2" class="merged-cell">요구사항 분석</td>
                <td class="regular-cell">2024.01.15</td>
                <td colspan="3" class="merged-large">
                  클라이언트 미팅, 요구사항 문서 작성
                </td>
                <td class="status-cell status-complete">완료</td>
                <td class="regular-cell">박민수</td>
              </tr>
              
              <tr>
                <!-- 제목2는 rowspan으로 생략 -->
                <td colspan="2" class="merged-cell">시스템 설계</td>
                <td class="regular-cell">2024.02.15</td>
                <td colspan="3" class="merged-large">
                  아키텍처 설계, 데이터베이스 스키마 작성
                </td>
                <td class="status-cell status-progress">진행중</td>
                <td class="regular-cell">최지우</td>
              </tr>
              
              <tr>
                <!-- 제목2는 rowspan으로 생략 -->
                <td colspan="2" class="merged-cell">구현 및 통합</td>
                <td class="regular-cell">2024.03.15</td>
                <td colspan="3" class="merged-large">
                  모듈 개발 및 시스템 통합 테스트
                </td>
                <td class="status-cell status-pending">대기</td>
                <td class="regular-cell">정수현</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
      
      <!-- 토글 섹션 -->
      <section class="toggle-section">
        <h2 class="section-title">자주 묻는 질문</h2>
        
        <div class="toggle-list">
          <div
            v-for="(item, index) in toggleItems"
            :key="index"
            class="toggle-item"
            :class="{ 'is-open': item.isOpen }"
          >
            <button
              class="toggle-header"
              @click="toggleItem(index)"
            >
              <span class="toggle-title">{{ item.title }}</span>
              <span class="toggle-icon">{{ item.isOpen ? '−' : '+' }}</span>
            </button>
            
            <transition name="toggle">
              <div v-if="item.isOpen" class="toggle-content">
                <p>{{ item.content }}</p>
              </div>
            </transition>
          </div>
        </div>
      </section>
      
      <!-- 콜아웃 섹션 -->
      <section class="callout-section">
        <h2 class="section-title">주요 안내사항</h2>
        
        <div class="callout callout--info">
          <div class="callout-header">
            <span class="callout-icon">ℹ️</span>
            <h3 class="callout-title">프로젝트 진행 시 유의사항</h3>
          </div>
          <ul class="callout-list">
            <li>각 단계별 마일스톤을 준수해야 합니다</li>
            <li>주간 진행상황 보고서를 작성해야 합니다</li>
            <li>이슈 발생 시 즉시 팀장에게 보고합니다</li>
            <li>코드 리뷰는 필수이며, 2명 이상의 승인이 필요합니다</li>
          </ul>
        </div>
        
        <div class="callout callout--warning">
          <div class="callout-header">
            <span class="callout-icon">⚠️</span>
            <h3 class="callout-title">보안 관련 주의사항</h3>
          </div>
          <ul class="callout-list">
            <li>민감한 정보는 환경 변수로 관리합니다</li>
            <li>API 키나 비밀번호를 코드에 직접 작성하지 않습니다</li>
            <li>외부 라이브러리 사용 시 보안 취약점을 점검합니다</li>
            <li>정기적으로 의존성 패키지를 업데이트합니다</li>
          </ul>
        </div>
        
        <div class="callout callout--success">
          <div class="callout-header">
            <span class="callout-icon">✅</span>
            <h3 class="callout-title">완료된 작업 체크리스트</h3>
          </div>
          <ul class="callout-list">
            <li>요구사항 분석 문서 작성 완료</li>
            <li>프로토타입 디자인 승인 완료</li>
            <li>개발 환경 셋업 완료</li>
            <li>Git 저장소 및 CI/CD 파이프라인 구축 완료</li>
          </ul>
        </div>
      </section>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const toggleItems = ref([
  {
    title: '프로젝트 일정을 변경하려면 어떻게 해야 하나요?',
    content: '프로젝트 매니저에게 일정 변경 요청서를 제출하고, 팀 회의를 통해 승인을 받아야 합니다. 변경 사항은 모든 이해관계자에게 공유되어야 합니다.',
    isOpen: false
  },
  {
    title: '새로운 팀원이 합류하면 어떤 절차를 거치나요?',
    content: '온보딩 프로세스를 진행하며, 개발 환경 셋업, 코드베이스 리뷰, 팀 소개 및 프로젝트 브리핑이 포함됩니다. 보통 1주일 정도 소요됩니다.',
    isOpen: false
  },
  {
    title: '긴급 이슈가 발생했을 때 대응 방법은?',
    content: '즉시 팀장에게 보고하고, 이슈 트래커에 등록합니다. 심각도에 따라 핫픽스 또는 정기 배포에 포함시킵니다.',
    isOpen: false
  },
  {
    title: '코드 리뷰는 얼마나 걸리나요?',
    content: '일반적으로 24시간 이내에 첫 번째 리뷰가 진행되며, 수정 사항이 있을 경우 추가로 1-2일이 소요될 수 있습니다.',
    isOpen: false
  }
])

const toggleItem = (index) => {
  toggleItems.value[index].isOpen = !toggleItems.value[index].isOpen
}
</script>

<style lang="scss" scoped>
@use '@/assets/styles/mixins' as *;

.table-view {
  min-height: 100vh;
  background: $gray-50;
  padding: 30px;
}

.table-container {
  max-width: 100vw;
  margin: 0 auto;

  @include desktop {
    max-width: 1000px;
  }
}

.page-title {
  font-size: $font-size-2xl;
  font-weight: 700;
  color: $gray-800;
  margin-bottom: $spacing-xl;
  text-align: center;

  @include desktop {
    font-size: 2.5rem;
    margin-bottom: $spacing-2xl;
  }
}

.section-title {
  font-size: $font-size-xl;
  font-weight: 600;
  color: $gray-800;
  margin-bottom: $spacing-lg;
  padding-bottom: $spacing-sm;
  border-bottom: 2px solid $gray-300;
}

/* 테이블 섹션 */
.table-section {
  @include card;
  padding: $spacing-lg;
  margin-bottom: $spacing-xl;

  @include desktop {
    padding: $spacing-2xl;
  }
}

.table-wrapper {
  overflow-x: auto;
  -webkit-overflow-scrolling: touch;
  border-radius: $border-radius-md;
  border: 1px solid $gray-200;
  
  /* 스크롤바 스타일링 */
  &::-webkit-scrollbar {
    height: 8px;
  }
  
  &::-webkit-scrollbar-track {
    background: $gray-100;
    border-radius: 4px;
  }
  
  &::-webkit-scrollbar-thumb {
    background: $gray-400;
    border-radius: 4px;
    
    &:hover {
      background: $gray-500;
    }
  }
}

.data-table {
  width: 100%;
  min-width: 800px; /* 모바일에서 가로 스크롤 보장 */
  border-collapse: collapse;
  background: $white;
  font-size: $font-size-sm;

  @include desktop {
    font-size: $font-size-base;
  }
  
  /* 제목 행 */
  .table-main-header {
    background: $primary-color;
    color: $white;
    font-size: $font-size-lg;
    font-weight: 700;
    padding: $spacing-md;
    text-align: center;
    border: 1px solid $primary-dark;

    @include desktop {
      font-size: $font-size-xl;
      padding: $spacing-lg;
    }
  }
  
  /* 행 헤더 (rowspan 적용된 첫 번째 칼럼) */
  .row-header {
    background: $gray-100;
    font-weight: 600;
    color: $gray-800;
    text-align: center;
    vertical-align: middle;
    padding: $spacing-md;
    border: 1px solid $gray-300;
    min-width: 100px;

    @include desktop {
      min-width: 120px;
    }
  }
  
  /* 2개 합쳐진 셀 */
  .merged-cell {
    background: $gray-50;
    font-weight: 500;
    padding: $spacing-sm $spacing-md;
    border: 1px solid $gray-300;
    text-align: center;
  }
  
  /* 일반 셀 */
  .regular-cell {
    padding: $spacing-sm $spacing-md;
    border: 1px solid $gray-300;
    text-align: center;
    white-space: nowrap;
  }
  
  /* 3개 합쳐진 큰 셀 */
  .merged-large {
    padding: $spacing-sm $spacing-md;
    border: 1px solid $gray-300;
    line-height: 1.5;
    color: $gray-700;
  }
  
  /* 상태 셀 */
  .status-cell {
    padding: $spacing-sm $spacing-md;
    border: 1px solid $gray-300;
    text-align: center;
    font-weight: 600;
    white-space: nowrap;
  }
  
  .status-complete {
    background: #d4edda;
    color: #155724;
  }
  
  .status-progress {
    background: #fff3cd;
    color: #856404;
  }
  
  .status-pending {
    background: #f8d7da;
    color: #721c24;
  }
  
  tbody tr {
    transition: background-color 0.2s;
    
    &:hover {
      background: rgba($primary-color, 0.05);
    }
  }
}

/* 토글 섹션 */
.toggle-section {
  @include card;
  padding: $spacing-lg;
  margin-bottom: $spacing-xl;

  @include desktop {
    padding: $spacing-2xl;
  }
}

.toggle-list {
  display: flex;
  flex-direction: column;
  gap: $spacing-sm;
}

.toggle-item {
  border: 1px solid $gray-300;
  border-radius: $border-radius-md;
  overflow: hidden;
  transition: border-color 0.2s;
  
  &.is-open {
    border-color: $primary-color;
  }
}

.toggle-header {
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: $spacing-md;
  background: $white;
  border: none;
  cursor: pointer;
  transition: background-color 0.2s;
  
  &:hover {
    background: $gray-50;
  }
  
  .is-open & {
    background: $gray-50;
  }
}

.toggle-title {
  font-size: $font-size-base;
  font-weight: 600;
  color: $gray-800;
  text-align: left;

  @include desktop {
    font-size: $font-size-lg;
  }
}

.toggle-icon {
  font-size: $font-size-xl;
  font-weight: 300;
  color: $gray-600;
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.toggle-content {
  padding: 0 $spacing-md $spacing-md $spacing-md;
  background: $white;
  
  p {
    color: $gray-700;
    line-height: 1.6;
    font-size: $font-size-sm;

    @include desktop {
      font-size: $font-size-base;
    }
  }
}

/* 토글 애니메이션 */
.toggle-enter-active,
.toggle-leave-active {
  transition: all 0.3s ease;
}

.toggle-enter-from,
.toggle-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}

/* 콜아웃 섹션 */
.callout-section {
  display: flex;
  flex-direction: column;
  gap: $spacing-lg;
}

.callout {
  border-radius: $border-radius-md;
  padding: $spacing-lg;
  border-left: 4px solid;

  @include desktop {
    padding: $spacing-xl;
  }
}

.callout--info {
  background: #e7f3ff;
  border-left-color: #2196f3;
}

.callout--warning {
  background: #fff8e1;
  border-left-color: #ff9800;
}

.callout--success {
  background: #e8f5e9;
  border-left-color: #4caf50;
}

.callout-header {
  display: flex;
  align-items: center;
  gap: $spacing-sm;
  margin-bottom: $spacing-md;
}

.callout-icon {
  font-size: $font-size-xl;
  line-height: 1;
}

.callout-title {
  font-size: $font-size-lg;
  font-weight: 600;
  color: $gray-800;
  margin: 0;
}

.callout-list {
  list-style: none;
  padding: 0;
  margin: 0;
  
  li {
    position: relative;
    padding-left: $spacing-lg;
    margin-bottom: $spacing-sm;
    color: $gray-700;
    line-height: 1.6;
    font-size: $font-size-sm;

    @include desktop {
      font-size: $font-size-base;
    }
    
    &::before {
      content: '•';
      position: absolute;
      left: $spacing-xs;
      font-weight: 700;
      font-size: $font-size-lg;
    }
    
    &:last-child {
      margin-bottom: 0;
    }
  }
  
  .callout--info & li::before {
    color: #2196f3;
  }
  
  .callout--warning & li::before {
    color: #ff9800;
  }
  
  .callout--success & li::before {
    color: #4caf50;
  }
}

/* 모바일 최적화 */
@media (max-width: 768px) {
  .table-view {
    padding: 20px;
  }
  
  .page-title {
    font-size: $font-size-xl;
    margin-bottom: $spacing-lg;
  }
  
  .section-title {
    font-size: $font-size-lg;
    margin-bottom: $spacing-md;
  }
  
  .table-section,
  .toggle-section {
    padding: $spacing-md;
  }
  
  .data-table {
    font-size: 0.75rem;
    
    .table-main-header {
      font-size: $font-size-base;
      padding: $spacing-sm;
    }
    
    .row-header,
    .merged-cell,
    .regular-cell,
    .merged-large,
    .status-cell {
      padding: $spacing-xs $spacing-sm;
    }
  }
  
  .toggle-header {
    padding: $spacing-sm;
  }
  
  .toggle-title {
    font-size: $font-size-sm;
  }
  
  .callout {
    padding: $spacing-md;
  }
  
  .callout-title {
    font-size: $font-size-base;
  }
}
</style>
