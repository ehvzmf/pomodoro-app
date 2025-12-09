<template>
  <teleport to="body">
    <transition name="modal-fade">
      <div v-if="isOpen" class="modal-overlay" @click="closeModal">
        <div class="modal-container" @click.stop :style="containerStyle">
          <div class="modal-header">
            <h2 class="modal-title">{{ title }}</h2>
            <button class="modal-close" @click="closeModal" aria-label="닫기">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>
          </div>

          <div class="modal-content">
            <slot></slot>
          </div>
        </div>
      </div>
    </transition>
  </teleport>
</template>

<script setup>
import { watch, computed } from 'vue'
import { modalSizes } from './modalConfig'

const props = defineProps({
  isOpen: {
    type: Boolean,
    required: true
  },
  title: {
    type: String,
    default: '팝업'
  },
  sizeKey: {
    type: String,
    default: 'medium'
  }
})

const emit = defineEmits(['close'])

// apply CSS vars based on sizeKey
const containerStyle = computed(() => {
  const config = modalSizes[props.sizeKey] || modalSizes.medium
  return {
    width: config.width,
    maxWidth: config.maxWidth,
    height: config.height,
    maxHeight: config.maxHeight
  }
})

const closeModal = () => {
  emit('close')
}

// ESC 키로 닫기
watch(() => props.isOpen, (newVal) => {
  if (newVal) {
    document.addEventListener('keydown', handleEscape)
  } else {
    document.removeEventListener('keydown', handleEscape)
  }
})

const handleEscape = (e) => {
  if (e.key === 'Escape') {
    closeModal()
  }
}
</script>

<style lang="scss" scoped>
@use '@/assets/styles/mixins' as *;

.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  @include flex-center;
  z-index: 9999;
  padding: $spacing-md;
}

.modal-container {
  background: $white;
  border-radius: $radius-xl;
  box-shadow: $shadow-lg;
  width: 100%;
  max-width: 300px;
  max-height: 90vh;
  overflow: hidden;
  display: flex;
  flex-direction: column;

  @include tablet {
    max-width: 800px;
    max-height: 1000px;
  }

  /* allow inline style overrides from containerStyle */
}

.modal-header {
  @include flex-between;
  padding: $spacing-lg;
  border-bottom: 1px solid $gray-200;
}

.modal-title {
  font-size: $font-size-xl;
  font-weight: 700;
  color: $gray-800;
  margin: 0;
}

.modal-close {
  @include button-reset;
  width: 32px;
  height: 32px;
  @include flex-center;
  color: $gray-500;
  transition: color $transition-fast;
  border-radius: $radius-md;

  &:hover {
    color: $gray-800;
    background: $gray-100;
  }
}

.modal-content {
  padding: $spacing-lg;
  overflow-y: auto;
  flex: 1;
}

// 애니메이션
.modal-fade-enter-active,
.modal-fade-leave-active {
  transition: opacity $transition-base;

  .modal-container {
    transition: transform $transition-base;
  }
}

.modal-fade-enter-from,
.modal-fade-leave-to {
  opacity: 0;

  .modal-container {
    transform: scale(0.9);
  }
}
</style>
