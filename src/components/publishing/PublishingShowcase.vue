<template>
  <div class="publishing-showcase">
    <div class="container">
      <!-- 헤더 -->
      <header class="showcase-header">
        <h1 class="showcase-title">퍼블리싱 컴포넌트 쇼케이스</h1>
        <p class="showcase-description">SCSS로 구현된 재사용 가능한 UI 컴포넌트들</p>
      </header>

      <!-- 버튼 섹션 -->
      <section class="showcase-section">
        <h2 class="section-title">Buttons</h2>
        <div class="button-grid">
          <BaseButton variant="primary">Primary</BaseButton>
          <BaseButton variant="secondary">Secondary</BaseButton>
          <BaseButton variant="outline">Outline</BaseButton>
          <BaseButton variant="ghost">Ghost</BaseButton>
          <BaseButton variant="danger">Danger</BaseButton>
        </div>
        
        <div class="button-grid">
          <BaseButton size="sm">Small</BaseButton>
          <BaseButton size="md">Medium</BaseButton>
          <BaseButton size="lg">Large</BaseButton>
        </div>

        <div class="button-grid">
          <BaseButton :loading="true">Loading</BaseButton>
          <BaseButton :disabled="true">Disabled</BaseButton>
        </div>
      </section>

      <!-- 입력 필드 섹션 -->
      <section class="showcase-section">
        <h2 class="section-title">Input Fields</h2>
        <div class="form-grid">
          <BaseInput
            id="name"
            v-model="formData.name"
            label="이름"
            placeholder="이름을 입력하세요"
            :required="true"
          />
          
          <BaseInput
            id="email"
            v-model="formData.email"
            type="email"
            label="이메일"
            placeholder="example@email.com"
            :required="true"
            :error="emailError"
            error-message="올바른 이메일 형식이 아닙니다"
          />

          <BaseInput
            id="bio"
            v-model="formData.bio"
            label="자기소개"
            placeholder="자기소개를 입력하세요"
            :maxlength="100"
            :show-counter="true"
            helper-text="최대 100자까지 입력 가능합니다"
          />

          <BaseInput
            id="readonly"
            v-model="formData.readonly"
            label="읽기 전용"
            :readonly="true"
          />
        </div>
      </section>

      <!-- 셀렉트 박스 섹션 -->
      <section class="showcase-section">
        <h2 class="section-title">Select Boxes</h2>
        <div class="form-grid">
          <BaseSelect
            id="country"
            v-model="formData.country"
            label="국가"
            :options="countryOptions"
            :required="true"
          />

          <BaseSelect
            id="city"
            v-model="formData.city"
            label="도시"
            placeholder="도시를 선택하세요"
            :options="cityOptions"
          />

          <BaseSelect
            id="disabled-select"
            v-model="formData.disabledSelect"
            label="비활성화"
            :options="countryOptions"
            :disabled="true"
          />
        </div>
      </section>

      <!-- 스테퍼 섹션 -->
      <section class="showcase-section">
        <h2 class="section-title">Stepper</h2>
        
        <BaseStepper 
          :steps="['정보 입력', '인증', '완료']"
          :current-step="currentStep"
        />

        <div class="button-group">
          <BaseButton 
            variant="outline" 
            @click="prevStep"
            :disabled="currentStep === 0"
          >
            이전
          </BaseButton>
          <BaseButton 
            @click="nextStep"
            :disabled="currentStep === 2"
          >
            다음
          </BaseButton>
        </div>
      </section>

      <!-- 팝업 섹션 -->
      <section class="showcase-section">
        <h2 class="section-title">Modal & Auth Grid</h2>
        <BaseButton @click="openAuthModal">간편인증 팝업 열기</BaseButton>
      </section>

      <!-- 완성된 폼 예시 -->
      <section class="showcase-section">
        <h2 class="section-title">Complete Form Example</h2>
        <form class="demo-form" @submit.prevent="handleSubmit">
          <BaseStepper 
            :steps="['기본정보', '추가정보', '완료']"
            :current-step="formStep"
          />

          <!-- Step 1 -->
          <div v-if="formStep === 0" class="form-step">
            <BaseInput
              id="form-name"
              v-model="demoForm.name"
              label="이름"
              placeholder="홍길동"
              :required="true"
            />
            <BaseInput
              id="form-email"
              v-model="demoForm.email"
              type="email"
              label="이메일"
              placeholder="example@email.com"
              :required="true"
            />
            <BaseSelect
              id="form-gender"
              v-model="demoForm.gender"
              label="성별"
              :options="[
                { value: 'male', label: '남성' },
                { value: 'female', label: '여성' },
                { value: 'other', label: '기타' }
              ]"
              :required="true"
            />
          </div>

          <!-- Step 2 -->
          <div v-if="formStep === 1" class="form-step">
            <BaseInput
              id="form-phone"
              v-model="demoForm.phone"
              label="전화번호"
              placeholder="010-1234-5678"
              :required="true"
            />
            <BaseSelect
              id="form-city"
              v-model="demoForm.city"
              label="거주지"
              :options="cityOptions"
              :required="true"
            />
            <BaseInput
              id="form-message"
              v-model="demoForm.message"
              label="메시지"
              placeholder="메시지를 입력하세요"
              :maxlength="200"
              :show-counter="true"
            />
          </div>

          <!-- Step 3 -->
          <div v-if="formStep === 2" class="form-step form-complete">
            <div class="complete-icon">✓</div>
            <h3>등록이 완료되었습니다!</h3>
            <p>입력하신 정보가 성공적으로 저장되었습니다.</p>
          </div>

          <div class="form-actions">
            <BaseButton 
              v-if="formStep > 0"
              type="button"
              variant="outline" 
              @click="prevFormStep"
            >
              이전
            </BaseButton>
            <BaseButton 
              v-if="formStep < 2"
              type="button"
              @click="nextFormStep"
            >
              다음
            </BaseButton>
            <BaseButton 
              v-if="formStep === 2"
              type="button"
              variant="secondary"
              @click="resetForm"
            >
              처음으로
            </BaseButton>
          </div>
        </form>
      </section>
    </div>

    <!-- 인증 팝업 -->
    <AuthModal 
      :is-open="isAuthModalOpen" 
      @close="closeAuthModal"
      @select="handleAuthSelect"
    />
  </div>
</template>

<script setup>
import { ref } from 'vue'
import BaseButton from './BaseButton.vue'
import BaseInput from './BaseInput.vue'
import BaseSelect from './BaseSelect.vue'
import BaseStepper from './BaseStepper.vue'
import AuthModal from './AuthModal.vue'

// 폼 데이터
const formData = ref({
  name: '',
  email: 'test@example.com',
  bio: '',
  readonly: '읽기 전용 텍스트',
  country: '',
  city: '',
  disabledSelect: 'korea'
})

const emailError = ref(false)

// 옵션 데이터
const countryOptions = [
  { value: 'korea', label: '대한민국' },
  { value: 'usa', label: '미국' },
  { value: 'japan', label: '일본' },
  { value: 'china', label: '중국' }
]

const cityOptions = [
  { value: 'seoul', label: '서울' },
  { value: 'busan', label: '부산' },
  { value: 'incheon', label: '인천' },
  { value: 'daegu', label: '대구' },
  { value: 'daejeon', label: '대전' }
]

// 스테퍼
const currentStep = ref(1)

const nextStep = () => {
  if (currentStep.value < 2) {
    currentStep.value++
  }
}

const prevStep = () => {
  if (currentStep.value > 0) {
    currentStep.value--
  }
}

// 팝업
const isAuthModalOpen = ref(false)

const openAuthModal = () => {
  isAuthModalOpen.value = true
}

const closeAuthModal = () => {
  isAuthModalOpen.value = false
}

const handleAuthSelect = (methodId) => {
  console.log('선택된 인증 방법:', methodId)
  closeAuthModal()
  alert(`${methodId} 인증이 선택되었습니다.`)
}

// 완성 폼 예시
const formStep = ref(0)

const demoForm = ref({
  name: '',
  email: '',
  gender: '',
  phone: '',
  city: '',
  message: ''
})

const nextFormStep = () => {
  if (formStep.value < 2) {
    formStep.value++
  }
}

const prevFormStep = () => {
  if (formStep.value > 0) {
    formStep.value--
  }
}

const resetForm = () => {
  formStep.value = 0
  demoForm.value = {
    name: '',
    email: '',
    gender: '',
    phone: '',
    city: '',
    message: ''
  }
}

const handleSubmit = () => {
  console.log('Form submitted:', demoForm.value)
}
</script>

<style lang="scss" scoped>
@import '@/assets/styles/variables';
@import '@/assets/styles/mixins';

.publishing-showcase {
  min-height: 100vh;
  background: $gray-50;
  padding: $spacing-2xl $spacing-md;
  padding-bottom: 100px; // 하단 네비게이션 공간
}

.container {
  max-width: 800px;
  margin: 0 auto;
}

.showcase-header {
  text-align: center;
  margin-bottom: $spacing-2xl;
}

.showcase-title {
  font-size: $font-size-2xl;
  font-weight: 700;
  color: $gray-800;
  margin-bottom: $spacing-sm;
}

.showcase-description {
  font-size: $font-size-base;
  color: $gray-600;
}

.showcase-section {
  @include card;
  margin-bottom: $spacing-xl;
}

.section-title {
  font-size: $font-size-xl;
  font-weight: 600;
  color: $gray-800;
  margin-bottom: $spacing-lg;
  padding-bottom: $spacing-md;
  border-bottom: 2px solid $gray-200;
}

.button-grid {
  display: flex;
  flex-wrap: wrap;
  gap: $spacing-md;
  margin-bottom: $spacing-md;

  &:last-child {
    margin-bottom: 0;
  }
}

.form-grid {
  display: grid;
  gap: $spacing-lg;
}

.button-group {
  display: flex;
  gap: $spacing-md;
  margin-top: $spacing-lg;
  justify-content: center;
}

.demo-form {
  @include card;
  padding: $spacing-xl;
  background: $gray-50;
}

.form-step {
  display: grid;
  gap: $spacing-lg;
  margin: $spacing-xl 0;
  min-height: 300px;
}

.form-complete {
  @include flex-center;
  flex-direction: column;
  text-align: center;
  gap: $spacing-md;
}

.complete-icon {
  width: 80px;
  height: 80px;
  @include flex-center;
  background: $secondary-color;
  color: $white;
  border-radius: 50%;
  font-size: 3rem;
  margin-bottom: $spacing-md;
}

.form-actions {
  display: flex;
  gap: $spacing-md;
  justify-content: center;
  margin-top: $spacing-xl;
  padding-top: $spacing-xl;
  border-top: 1px solid $gray-200;
}
</style>
