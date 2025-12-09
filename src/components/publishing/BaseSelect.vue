<template>
  <div class="select-wrapper">
    <label v-if="label" :for="id" class="select-label">
      {{ label }}
      <span v-if="required" class="select-required">*</span>
    </label>
    <div class="select-container">
      <select 
        :id="id"
        v-model="selectedValue"
        :disabled="disabled"
        :class="['select', { 'select--error': error }]"
        @change="handleChange"
      >
        <option value="" disabled>{{ placeholder }}</option>
        <option 
          v-for="option in options" 
          :key="option.value"
          :value="option.value"
        >
          {{ option.label }}
        </option>
      </select>
      <div class="select-icon">
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
          <path d="M5 7.5L10 12.5L15 7.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      </div>
    </div>
    <p v-if="error" class="select-error-message">{{ errorMessage }}</p>
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
    type: [String, Number],
    default: ''
  },
  label: {
    type: String,
    default: ''
  },
  placeholder: {
    type: String,
    default: '선택해주세요'
  },
  options: {
    type: Array,
    required: true,
    // options: [{ value: 'value1', label: 'Label 1' }, ...]
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

const selectedValue = ref(props.modelValue)

watch(() => props.modelValue, (newVal) => {
  selectedValue.value = newVal
})

const handleChange = (e) => {
  const value = e.target.value
  emit('update:modelValue', value)
  emit('change', value)
}
</script>

<style lang="scss" scoped>
@use '@/assets/styles/mixins' as *;

.select-wrapper {
  width: 100%;
}

.select-label {
  display: block;
  margin-bottom: $spacing-xs;
  font-size: $font-size-sm;
  font-weight: 500;
  color: $gray-700;
}

.select-required {
  color: $primary-color;
  margin-left: 2px;
}

.select-container {
  position: relative;
}

.select {
  width: 100%;
  padding: $spacing-sm $spacing-md;
  padding-right: $spacing-xl;
  font-size: $font-size-base;
  border: 1px solid $gray-300;
  border-radius: $radius-md;
  background: $white;
  color: $gray-800;
  cursor: pointer;
  appearance: none;
  transition: all $transition-fast;

  &:hover:not(:disabled) {
    border-color: $gray-500;
  }

  &:focus {
    outline: none;
    border-color: $primary-color;
    box-shadow: 0 0 0 3px rgba($primary-color, 0.1);
  }

  &:disabled {
    background: $gray-100;
    cursor: not-allowed;
    opacity: 0.6;
  }

  &--error {
    border-color: $primary-color;
    
    &:focus {
      box-shadow: 0 0 0 3px rgba($primary-color, 0.1);
    }
  }
}

.select-icon {
  position: absolute;
  right: $spacing-md;
  top: 50%;
  transform: translateY(-50%);
  pointer-events: none;
  color: $gray-500;
}

.select-error-message {
  margin-top: $spacing-xs;
  font-size: $font-size-xs;
  color: $primary-color;
}
</style>
