<template>
  <button 
    :class="['btn', `btn--${variant}`, `btn--${size}`, { 'btn--disabled': disabled, 'btn--loading': loading }]"
    :disabled="disabled || loading"
    @click="handleClick"
  >
    <span v-if="loading" class="btn__spinner"></span>
    <slot v-else></slot>
  </button>
</template>

<script setup>
const props = defineProps({
  variant: {
    type: String,
    default: 'primary', // primary, secondary, outline, ghost, danger
    validator: (value) => ['primary', 'secondary', 'outline', 'ghost', 'danger'].includes(value)
  },
  size: {
    type: String,
    default: 'md', // sm, md, lg
    validator: (value) => ['sm', 'md', 'lg'].includes(value)
  },
  disabled: {
    type: Boolean,
    default: false
  },
  loading: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['click'])

const handleClick = (e) => {
  if (!props.disabled && !props.loading) {
    emit('click', e)
  }
}
</script>

<style lang="scss" scoped>
@use '@/assets/styles/mixins' as *;

.btn {
  @include button-reset;
  @include flex-center;
  gap: $spacing-xs;
  font-weight: 500;
  border-radius: $radius-md;
  transition: all $transition-fast;
  position: relative;
  
  &:disabled {
    cursor: not-allowed;
    opacity: 0.5;
  }

  // Variants
  &--primary {
    background: $primary-color;
    color: $white;
    
    &:hover:not(:disabled) {
      background: darken($primary-color, 10%);
      box-shadow: $shadow-md;
    }
  }

  &--secondary {
    background: $secondary-color;
    color: $white;
    
    &:hover:not(:disabled) {
      background: darken($secondary-color, 10%);
      box-shadow: $shadow-md;
    }
  }

  &--outline {
    background: transparent;
    border: 2px solid $primary-color;
    color: $primary-color;
    
    &:hover:not(:disabled) {
      background: $primary-color;
      color: $white;
    }
  }

  &--ghost {
    background: transparent;
    color: $gray-700;
    
    &:hover:not(:disabled) {
      background: $gray-100;
    }
  }

  &--danger {
    background: #dc2626;
    color: $white;
    
    &:hover:not(:disabled) {
      background: darken(#dc2626, 10%);
    }
  }

  // Sizes
  &--sm {
    padding: $spacing-xs $spacing-md;
    font-size: $font-size-sm;
  }

  &--md {
    padding: $spacing-sm $spacing-lg;
    font-size: $font-size-base;
  }

  &--lg {
    padding: $spacing-md $spacing-xl;
    font-size: $font-size-lg;
  }

  // Loading
  &--loading {
    pointer-events: none;
  }

  &__spinner {
    display: inline-block;
    width: 16px;
    height: 16px;
    border: 2px solid rgba(255, 255, 255, 0.3);
    border-top-color: $white;
    border-radius: 50%;
    animation: spinner 0.6s linear infinite;
  }
}

@keyframes spinner {
  to {
    transform: rotate(360deg);
  }
}
</style>
