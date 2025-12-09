<template>
  <div class="input-wrapper">
    <label v-if="label" :for="id" class="input-label">
      {{ label }}
      <span v-if="required" class="input-required">*</span>
    </label>
    <div class="input-container">
      <input 
        :id="id"
        v-model="inputValue"
        :type="type"
        :placeholder="placeholder"
        :disabled="disabled"
        :readonly="readonly"
        :maxlength="maxlength"
        :class="['input', { 'input--error': error }]"
        @input="handleInput"
        @blur="handleBlur"
        @focus="handleFocus"
      />
      <span v-if="maxlength && showCounter" class="input-counter">
        {{ inputValue.length }} / {{ maxlength }}
      </span>
    </div>
    <p v-if="error" class="input-error-message">{{ errorMessage }}</p>
    <p v-else-if="helperText" class="input-helper-text">{{ helperText }}</p>
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
  type: {
    type: String,
    default: 'text'
  },
  label: {
    type: String,
    default: ''
  },
  placeholder: {
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
  readonly: {
    type: Boolean,
    default: false
  },
  maxlength: {
    type: Number,
    default: null
  },
  showCounter: {
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
  },
  helperText: {
    type: String,
    default: ''
  }
})

const emit = defineEmits(['update:modelValue', 'input', 'blur', 'focus'])

const inputValue = ref(props.modelValue)

watch(() => props.modelValue, (newVal) => {
  inputValue.value = newVal
})

const handleInput = (e) => {
  const value = e.target.value
  emit('update:modelValue', value)
  emit('input', value)
}

const handleBlur = (e) => {
  emit('blur', e)
}

const handleFocus = (e) => {
  emit('focus', e)
}
</script>

<style lang="scss" scoped>
@use '@/assets/styles/mixins' as *;

.input-wrapper {
  width: 100%;
}

.input-label {
  display: block;
  margin-bottom: $spacing-xs;
  font-size: $font-size-sm;
  font-weight: 500;
  color: $gray-700;
}

.input-required {
  color: $primary-color;
  margin-left: 2px;
}

.input-container {
  position: relative;
}

.input {
  @include input-reset;
  width: 100%;
  padding: $spacing-sm $spacing-md;
  font-size: $font-size-base;
  border: 1px solid $gray-300;
  border-radius: $radius-md;
  background: $white;
  color: $gray-800;
  transition: all $transition-fast;

  &::placeholder {
    color: $gray-500;
  }

  &:hover:not(:disabled):not(:readonly) {
    border-color: $gray-500;
  }

  &:focus {
    border-color: $primary-color;
    box-shadow: 0 0 0 3px rgba($primary-color, 0.1);
  }

  &:disabled {
    background: $gray-100;
    cursor: not-allowed;
    opacity: 0.6;
  }

  &:readonly {
    background: $gray-50;
    cursor: default;
  }

  &--error {
    border-color: $primary-color;
    
    &:focus {
      box-shadow: 0 0 0 3px rgba($primary-color, 0.1);
    }
  }
}

.input-counter {
  position: absolute;
  right: $spacing-md;
  top: 50%;
  transform: translateY(-50%);
  font-size: $font-size-xs;
  color: $gray-500;
  pointer-events: none;
}

.input-error-message {
  margin-top: $spacing-xs;
  font-size: $font-size-xs;
  color: $primary-color;
}

.input-helper-text {
  margin-top: $spacing-xs;
  font-size: $font-size-xs;
  color: $gray-500;
}
</style>
