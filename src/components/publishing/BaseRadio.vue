<template>
  <div class="radio-wrapper">
    <label :for="id" class="radio-label">
      <input
        :id="id"
        v-model="selected"
        type="radio"
        :name="name"
        :value="value"
        :disabled="disabled"
        class="radio-input"
        @change="handleChange"
      />
      <span class="radio-custom">
        <span v-if="isChecked" class="radio-dot"></span>
      </span>
      <span v-if="label" class="radio-text">
        {{ label }}
        <span v-if="required" class="radio-required">*</span>
      </span>
    </label>
    <p v-if="error" class="radio-error-message">{{ errorMessage }}</p>
  </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue'

const props = defineProps({
  id: {
    type: String,
    required: true
  },
  modelValue: {
    type: [String, Number, Boolean],
    default: null
  },
  value: {
    type: [String, Number, Boolean],
    required: true
  },
  name: {
    type: String,
    required: true
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

const selected = ref(props.modelValue)

const isChecked = computed(() => selected.value === props.value)

watch(() => props.modelValue, (newVal) => {
  selected.value = newVal
})

const handleChange = (e) => {
  const value = e.target.value
  emit('update:modelValue', value)
  emit('change', value)
}
</script>

<style lang="scss" scoped>
@import '@/assets/styles/variables';
@import '@/assets/styles/mixins';

.radio-wrapper {
  display: inline-block;
}

.radio-label {
  display: inline-flex;
  align-items: center;
  cursor: pointer;
  user-select: none;
  position: relative;
  gap: $spacing-sm;
}

.radio-input {
  position: absolute;
  opacity: 0;
  width: 0;
  height: 0;

  &:disabled ~ .radio-custom {
    background: $gray-100;
    border-color: $gray-300;
    cursor: not-allowed;
    opacity: 0.6;
  }

  &:disabled ~ .radio-text {
    color: $gray-500;
    cursor: not-allowed;
  }

  &:focus ~ .radio-custom {
    box-shadow: 0 0 0 3px rgba($primary-color, 0.1);
  }
}

.radio-custom {
  position: relative;
  width: 20px;
  height: 20px;
  border: 2px solid $gray-300;
  border-radius: 50%;
  background: $white;
  transition: all $transition-fast;
  @include flex-center;
  flex-shrink: 0;

  .radio-input:checked ~ & {
    border-color: $primary-color;
  }

  .radio-input:hover:not(:disabled) ~ & {
    border-color: $primary-color;
  }
}

.radio-dot {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: $primary-color;
  animation: radio-pop 0.2s ease-out;
}

@keyframes radio-pop {
  0% {
    transform: scale(0);
  }
  50% {
    transform: scale(1.2);
  }
  100% {
    transform: scale(1);
  }
}

.radio-text {
  font-size: $font-size-base;
  color: $gray-800;
  line-height: 1.5;
}

.radio-required {
  color: $primary-color;
  margin-left: 2px;
}

.radio-error-message {
  margin-top: $spacing-xs;
  margin-left: 28px;
  font-size: $font-size-xs;
  color: $primary-color;
}

// 라디오 그룹용 스타일
.radio-group {
  display: flex;
  flex-direction: column;
  gap: $spacing-sm;

  &--horizontal {
    flex-direction: row;
    gap: $spacing-lg;
  }
}
</style>
