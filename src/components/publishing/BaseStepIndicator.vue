<template>
  <div class="step-indicator">
    <template v-for="(tab, idx) in tabItems" :key="idx">
      <div 
        class="step-indicator__item"
        @click="handleTabClick(idx)"
      >
        <div :class="['step-indicator__step', getStepClass(idx)]">
          <img 
            :src="getIconSrc(tab.icon, idx)" 
            :alt="tab.tabTitle"
            class="step-indicator__icon"
          />
        </div>
        <div :class="['step-indicator__label', getLabelClass(idx)]">
          {{ tab.tabTitle }}
        </div>
      </div>
      <div 
        v-if="idx < tabItems.length - 1" 
        :class="['step-indicator__line', getLineClass(idx)]"
      ></div>
    </template>
  </div>
</template>

<script>
export default {
  name: 'BaseStepIndicator',
  props: {
    tabItems: {
      type: Array,
      required: true,
      describe: 
        "tabTitle: 탭 제목,\n" +
        "checked: 탭 체크 상태,\n" +
        "component: 탭 컨텐츠 컴포넌트,\n" +
        "icon: 아이콘 코드명 (system-select, agree, form, auth-request, complete)"
    },
    defaultTabIndex: {
      type: Number,
      default: -1,
      describe: '최초 선택된 탭 인덱스 번호 (default: -1 미선택)'
    },
    setCurrentTabComponent: {
      type: Function,
      default: null,
      describe: 
        "현재 선택될 component를 설정하는 함수\n" +
        "(slot 내부에 접근이 불가하기 때문에 외부에서 넘겨줘야 함)"
    }
  },
  data() {
    return {
      currentStep: this.defaultTabIndex,
      iconPathMap: {
        'system-select': '/assets/images/system_select.svg',
        'agree': '/assets/images/agree.svg',
        'form': '/assets/images/form.svg',
        'auth-request': '/assets/images/request.svg',
        'complete': '/assets/images/complete.svg'
      }
    }
  },
  watch: {
    defaultTabIndex(newVal) {
      this.currentStep = newVal
    }
  },
  methods: {
    getIconSrc(iconCode, idx) {
      const basePath = this.iconPathMap[iconCode]
      if (!basePath) return ''
      
      if (idx > this.currentStep) {
        return basePath.replace('.svg', '_gray.svg')
      }
      return basePath
    },
    getStepClass(idx) {
      if (idx < this.currentStep) {
        return 'step-indicator__step--completed'
      } else if (idx === this.currentStep) {
        return 'step-indicator__step--active'
      }
      return 'step-indicator__step--pending'
    },
    getLabelClass(idx) {
      if (idx < this.currentStep) {
        return 'step-indicator__label--completed'
      } else if (idx === this.currentStep) {
        return 'step-indicator__label--active'
      }
      return 'step-indicator__label--pending'
    },
    getLineClass(idx) {
      const nextIdx = idx + 1
      
      if (nextIdx === this.currentStep) {
        return 'step-indicator__line--active'
      } else if (nextIdx < this.currentStep) {
        return 'step-indicator__line--completed'
      }
      return 'step-indicator__line--pending'
    },
    handleTabClick(idx) {
      this.currentStep = idx
      
      if (this.setCurrentTabComponent) {
        this.setCurrentTabComponent(this.tabItems[idx].component)
      }
      
      this.$emit('change-tab-idx', idx)
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/styles/variables';
@import '@/assets/styles/mixins';

.step-indicator {
  display: flex;
  align-items: flex-start;
  width: 100%;
}

.step-indicator__item {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 87px;
  flex-shrink: 0;
  cursor: pointer;
}

.step-indicator__step {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  @include flex-center;
  transition: all $transition-base;
  z-index: 2;

  &--pending {
    background: $gray-300;
  }

  &--active {
    background: $primary-color;
  }

  &--completed {
    background: $secondary-color;
  }
}

.step-indicator__icon {
  width: 40px;
  height: 40px;
  object-fit: contain;
}

.step-indicator__label {
  margin-top: 7px;
  font-size: 18px;
  text-align: center;
  transition: all $transition-base;

  &--completed {
    font-weight: 400;
    color: $gray-900;
  }

  &--active {
    font-weight: 700;
    color: $primary-color;
  }

  &--pending {
    font-weight: 400;
    color: $gray-500;
  }
}

.step-indicator__line {
  flex: 1;
  height: 3px;
  margin-top: 40px;
  transition: background $transition-base;
  flex-shrink: 1;
  min-width: 0;
  /* compensate the half-difference between item width (87px) and step size (80px)
      so the line visually reaches the circle edge without gap */
  margin-left: -3.5px;
  margin-right: -3.5px;

  &--completed {
    background: $gray-500;
  }

  &--active {
    background: $primary-color;
  }

  &--pending {
    background: $gray-300;
  }
}

/* move responsive rules here (previously in mixin) */
@include mobile {
  .step-indicator__label {
    display: none !important;
  }

  .step-indicator__step {
    width: 48px !important;
    height: 48px !important;
  }

  .step-indicator__icon {
    width: 20px !important;
    height: 20px !important;
  }

  .step-indicator__item {
    width: 56px !important;
    min-height: 0 !important;
    padding-bottom: 8px;
  }

  .step-indicator__line {
    height: 2px !important;
  }
}
</style>