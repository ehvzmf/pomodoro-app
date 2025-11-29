<template>
  <div class="stepper">
    <div 
      v-for="(step, index) in steps" 
      :key="index"
      class="stepper__item"
    >
      <div :class="['stepper__step', getStepClass(index)]">
        <span v-if="index < currentStep" class="stepper__check">✓</span>
        <span v-else-if="index > currentStep" class="stepper__number">{{ index + 1 }}</span>
      </div>
      <div class="stepper__label">{{ step }}</div>
      <div v-if="index < steps.length - 1" class="stepper__line" :class="{ 'stepper__line--active': index < currentStep }"></div>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  steps: {
    type: Array,
    required: true,
    // steps: ['Step 1', 'Step 2', 'Step 3']
  },
  currentStep: {
    type: Number,
    default: 0,
    // 0-based index
  }
})

const getStepClass = (index) => {
  if (index < props.currentStep) {
    return 'stepper__step--completed'
  } else if (index === props.currentStep) {
    return 'stepper__step--active'
  }
  return 'stepper__step--pending'
}
</script>

<style lang="scss" scoped>
@import '@/assets/styles/variables';
@import '@/assets/styles/mixins';

.stepper {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  width: 100%;
  padding: $spacing-lg 0;

  @include mobile {
    padding: $spacing-md 0;
  }
}

.stepper__item {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
}

.stepper__step {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  @include flex-center;
  font-weight: 600;
  font-size: $font-size-base;
  transition: all $transition-base;
  z-index: 1;
  background: $white;

  @include mobile {
    width: 32px;
    height: 32px;
    font-size: $font-size-sm;
  }

  &--pending {
    border: 2px solid $gray-300;
    color: $gray-500;
  }

  &--active {
    border: 2px solid $secondary-color;
    background: $secondary-color;
    color: $white;
    box-shadow: 0 0 0 4px rgba($secondary-color, 0.1);
  }

  &--completed {
    border: 2px solid $secondary-color;
    background: $secondary-color;
    color: $white;
  }
}

.stepper__check {
  font-size: $font-size-lg;
}

.stepper__number {
  line-height: 1;
}

.stepper__label {
  margin-top: $spacing-xs;
  font-size: $font-size-sm;
  color: $gray-700;
  text-align: center;
  font-weight: 500;

  @include mobile {
    font-size: $font-size-xs;
  }
}

.stepper__line {
  position: absolute;
  top: 20px;
  left: 50%;
  width: 100%;
  height: 2px;
  background: $gray-300;
  transition: background $transition-base;
  z-index: 0;

  @include mobile {
    top: 16px;
  }

  &--active {
    background: $secondary-color;
  }
}
</style>
