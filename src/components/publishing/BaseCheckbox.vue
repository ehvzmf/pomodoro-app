<template>
  <div class="checkbox-wrapper">
    <label :for="id" class="checkbox-label">
      <input
        :id="id"
        v-model="checked"
        type="checkbox"
        :value="value"
        :disabled="disabled"
        class="checkbox-input"
        @change="handleChange"
      />
      <span class="checkbox-custom">
        <svg v-if="checked" class="checkbox-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
          <polyline points="20 6 9 17 4 12" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      </span>
      <span v-if="label" class="checkbox-text">
        {{ label }}
        <span v-if="required" class="checkbox-required">*</span>
      </span>
    </label>
    <p v-if="error" class="checkbox-error-message">{{ errorMessage }}</p>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue'

const props = defineProps({
  id: {
    type: String,
    required: true
  },
  modelValue: {
    type: [Boolean, Array],
    default: false
  },
  value: {
    type: [String, Number, Boolean],
    default: null
  },
  label: {
    type: String,
    default: ''
  },
  required: {
    type: Boolean,
    default: false
  },
  disabled: {
    type: Boolean,
    default: false
  },
  error: {
    type: Boolean,
    default: false
  },
  errorMessage: {
    type: String,
    default: ''
  }
})

const emit = defineEmits(['update:modelValue', 'change'])

const checked = ref(props.modelValue)

watch(() => props.modelValue, (newVal) => {
  checked.value = newVal
})

const handleChange = (e) => {
  const value = e.target.checked
  emit('update:modelValue', value)
  emit('change', value)
}
</script>

<style lang="scss" scoped>
@use '@/assets/styles/mixins' as *;

.checkbox-wrapper {
  display: inline-block;
}

.checkbox-label {
  display: inline-flex;
  align-items: center;
  cursor: pointer;
  user-select: none;
  position: relative;
  gap: $spacing-sm;
}

.checkbox-input {
  position: absolute;
  opacity: 0;
  width: 0;
  height: 0;

  &:disabled ~ .checkbox-custom {
    background: $gray-100;
    border-color: $gray-300;
    cursor: not-allowed;
    opacity: 0.6;
  }

  &:disabled ~ .checkbox-text {
    color: $gray-500;
    cursor: not-allowed;
  }

  &:focus ~ .checkbox-custom {
    box-shadow: 0 0 0 3px rgba($primary-color, 0.1);
  }
}

.checkbox-custom {
  position: relative;
  width: 20px;
  height: 20px;
  border: 2px solid $gray-300;
  border-radius: $radius-sm;
  background: $white;
  transition: all $transition-fast;
  @include flex-center;
  flex-shrink: 0;

  .checkbox-input:checked ~ & {
    background: $primary-color;
    border-color: $primary-color;
  }

  .checkbox-input:hover:not(:disabled) ~ & {
    border-color: $primary-color;
  }
}

.checkbox-icon {
  width: 14px;
  height: 14px;
  color: $white;
  stroke-width: 3;
}

.checkbox-text {
  font-size: $font-size-base;
  color: $gray-800;
  line-height: 1.5;
}

.checkbox-required {
  color: $primary-color;
  margin-left: 2px;
}

.checkbox-error-message {
  margin-top: $spacing-xs;
  margin-left: 28px;
  font-size: $font-size-xs;
  color: $primary-color;
}

// 체크박스 그룹용 스타일
.checkbox-group {
  display: flex;
  flex-direction: column;
  gap: $spacing-sm;
}
</style>
