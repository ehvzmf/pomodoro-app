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

      <!-- 체크박스 섹션 -->
      <section class="showcase-section">
        <h2 class="section-title">Checkboxes</h2>
        
        <div class="checkbox-demo">
          <h3 class="demo-subtitle">단일 체크박스</h3>
          <BaseCheckbox
            id="terms"
            v-model="formData.agreeTerms"
            label="이용약관에 동의합니다"
            :required="true"
          />
          <BaseCheckbox
            id="marketing"
            v-model="formData.agreeMarketing"
            label="마케팅 정보 수신에 동의합니다"
          />
          <BaseCheckbox
            id="disabled-check"
            v-model="formData.disabledCheck"
            label="비활성화된 체크박스"
            :disabled="true"
          />
        </div>

        <div class="checkbox-demo">
          <h3 class="demo-subtitle">체크박스 그룹</h3>
          <div class="checkbox-group">
            <BaseCheckbox
              id="hobby-1"
              v-model="formData.hobbies"
              value="reading"
              label="독서"
            />
            <BaseCheckbox
              id="hobby-2"
              v-model="formData.hobbies"
              value="music"
              label="음악 감상"
            />
            <BaseCheckbox
              id="hobby-3"
              v-model="formData.hobbies"
              value="sports"
              label="운동"
            />
            <BaseCheckbox
              id="hobby-4"
              v-model="formData.hobbies"
              value="travel"
              label="여행"
            />
          </div>
        </div>
      </section>

      <!-- 라디오 버튼 섹션 -->
      <section class="showcase-section">
        <h2 class="section-title">Radio Buttons</h2>
        
        <div class="radio-demo">
          <h3 class="demo-subtitle">세로 배치</h3>
          <div class="radio-group">
            <BaseRadio
              id="gender-male"
              v-model="formData.gender"
              name="gender"
              value="male"
              label="남성"
              :required="true"
            />
            <BaseRadio
              id="gender-female"
              v-model="formData.gender"
              name="gender"
              value="female"
              label="여성"
            />
            <BaseRadio
              id="gender-other"
              v-model="formData.gender"
              name="gender"
              value="other"
              label="기타"
            />
          </div>
        </div>

        <div class="radio-demo">
          <h3 class="demo-subtitle">가로 배치</h3>
          <div class="radio-group radio-group--horizontal">
            <BaseRadio
              id="size-small"
              v-model="formData.size"
              name="size"
              value="small"
              label="Small"
            />
            <BaseRadio
              id="size-medium"
              v-model="formData.size"
              name="size"
              value="medium"
              label="Medium"
            />
            <BaseRadio
              id="size-large"
              v-model="formData.size"
              name="size"
              value="large"
              label="Large"
            />
          </div>
        </div>

        <div class="radio-demo">
          <h3 class="demo-subtitle">비활성화</h3>
          <div class="radio-group">
            <BaseRadio
              id="disabled-radio-1"
              v-model="formData.disabledRadio"
              name="disabled-radio"
              value="option1"
              label="옵션 1 (비활성화)"
              :disabled="true"
            />
            <BaseRadio
              id="disabled-radio-2"
              v-model="formData.disabledRadio"
              name="disabled-radio"
              value="option2"
              label="옵션 2"
            />
          </div>
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
import BaseCheckbox from './BaseCheckbox.vue'
import BaseRadio from './BaseRadio.vue'
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
  disabledSelect: 'korea',
  agreeTerms: false,
  agreeMarketing: false,
  disabledCheck: true,
  hobbies: [],
  gender: '',
  size: 'medium',
  disabledRadio: 'option2'
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
  padding: $spacing-md;
  padding-bottom: 100px; // 하단 네비게이션 공간

  @include desktop {
    padding: $spacing-2xl;
  }
}

.container {
  max-width: 100%;
  margin: 0 auto;

  @include desktop {
    max-width: 1200px;
  }
}

.showcase-header {
  text-align: center;
  margin-bottom: $spacing-lg;

  @include desktop {
    margin-bottom: $spacing-2xl;
  }
}

.showcase-title {
  font-size: $font-size-xl;
  font-weight: 700;
  color: $gray-800;
  margin-bottom: $spacing-sm;

  @include desktop {
    font-size: $font-size-2xl;
  }
}

.showcase-description {
  font-size: $font-size-sm;
  color: $gray-600;

  @include desktop {
    font-size: $font-size-base;
  }
}

.showcase-section {
  @include card;
  margin-bottom: $spacing-md;
  padding: $spacing-md;

  @include desktop {
    margin-bottom: $spacing-xl;
    padding: $spacing-lg;
  }
}

.section-title {
  font-size: $font-size-lg;
  font-weight: 600;
  color: $gray-800;
  margin-bottom: $spacing-md;
  padding-bottom: $spacing-sm;
  border-bottom: 2px solid $gray-200;

  @include desktop {
    font-size: $font-size-xl;
    margin-bottom: $spacing-lg;
    padding-bottom: $spacing-md;
  }
}

.button-grid {
  display: flex;
  flex-wrap: wrap;
  gap: $spacing-sm;
  margin-bottom: $spacing-sm;

  @include desktop {
    gap: $spacing-md;
    margin-bottom: $spacing-md;
  }

  &:last-child {
    margin-bottom: 0;
  }
}

.demo-subtitle {
  font-size: 0.875rem;
  color: $gray-600;
  margin-bottom: $spacing-xs;
  font-weight: 600;

  @include desktop {
    font-size: 0.95rem;
    margin-bottom: $spacing-sm;
  }
}

.checkbox-demo,
.radio-demo {
  display: flex;
  flex-direction: column;
  gap: $spacing-md;

  @include desktop {
    gap: $spacing-lg;
  }

  .checkbox-group,
  .radio-group {
    display: grid;
    gap: $spacing-sm;

    @include desktop {
      grid-template-columns: repeat(2, 1fr);
      gap: $spacing-md;
    }
  }
}

.form-grid {
  display: grid;
  gap: $spacing-md;

  @include desktop {
    gap: $spacing-lg;
    grid-template-columns: repeat(2, 1fr);
  }
}

.button-group {
  display: flex;
  gap: $spacing-sm;
  margin-top: $spacing-md;
  justify-content: center;
  flex-wrap: wrap;

  @include desktop {
    gap: $spacing-md;
    margin-top: $spacing-lg;
    flex-wrap: nowrap;
  }
}

.demo-form {
  @include card;
  padding: $spacing-md;
  background: $gray-50;

  @include desktop {
    padding: $spacing-xl;
  }
}

.form-step {
  display: grid;
  gap: $spacing-md;
  margin: $spacing-md 0;
  min-height: 250px;

  @include desktop {
    gap: $spacing-lg;
    margin: $spacing-xl 0;
    min-height: 300px;
  }
}

.form-complete {
  @include flex-center;
  flex-direction: column;
  text-align: center;
  gap: $spacing-md;
}

.complete-icon {
  width: 60px;
  height: 60px;
  @include flex-center;
  background: $secondary-color;
  color: $white;
  border-radius: 50%;
  font-size: 2rem;
  margin-bottom: $spacing-sm;

  @include desktop {
    width: 80px;
    height: 80px;
    font-size: 3rem;
    margin-bottom: $spacing-md;
  }
}

.form-actions {
  display: flex;
  gap: $spacing-sm;
  justify-content: center;
  margin-top: $spacing-md;
  padding-top: $spacing-md;
  border-top: 1px solid $gray-200;
  flex-wrap: wrap;

  @include desktop {
    gap: $spacing-md;
    margin-top: $spacing-xl;
    padding-top: $spacing-xl;
    flex-wrap: nowrap;
  }
}
</style>
