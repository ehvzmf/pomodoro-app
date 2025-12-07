<template>
  <div class="tab">
    <div class="tab__header">
      <button
        v-for="(tab, index) in state.tabs"
        :key="index"
        :class="['tab__button', { 'is-active': state.activeIndex === index }]"
        @click="handleTabClick(index)"
      >
        <i v-if="tab.icon" :class="tab.icon" class="tab__icon"></i>
        <span class="tab__text">{{ tab.label }}</span>
      </button>
    </div>
    <div class="tab__content">
      <slot :name="`tab-${state.activeIndex}`">
        <slot></slot>
      </slot>
    </div>
  </div>
</template>

<script>
import { reactive, watch } from 'vue';

export default {
  name: 'BaseTab',
  props: {
    tabs: {
      type: Array,
      required: true,
      // tabs: [{ label: '탭1', icon: 'icon-class' }, { label: '탭2', icon: 'icon-class' }]
    },
    modelValue: {
      type: Number,
      default: 0,
    },
  },
  emits: ['update:modelValue', 'tab-change'],
  setup(props, { emit }) {
    const state = reactive({
      tabs: props.tabs,
      activeIndex: props.modelValue,
    });

    const handleTabClick = (index) => {
      state.activeIndex = index;
      emit('update:modelValue', index);
      emit('tab-change', index);
    };

    watch(
      () => props.modelValue,
      (newValue) => {
        state.activeIndex = newValue;
      }
    );

    watch(
      () => props.tabs,
      (newValue) => {
        state.tabs = newValue;
      },
      { deep: true }
    );

    return {
      state,
      handleTabClick,
    };
  },
};
</script>

<style scoped>
.tab {
  width: 100%;
}

.tab__header {
  display: flex;
  border-bottom: 2px solid #e5e7eb;
  gap: 4px;
}

.tab__button {
  flex: 1;
  padding: 12px 20px;
  background-color: #f9fafb;
  border: 1px solid #e5e7eb;
  border-bottom: none;
  border-radius: 8px 8px 0 0;
  cursor: pointer;
  font-size: 14px;
  font-weight: 500;
  color: #6b7280;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
}

.sui-tab__button:hover {
  background-color: #f3f4f6;
  color: #374151;
}

.tab__button.is-active {
  background-color: #ffffff;
  color: #2563eb;
  border-color: #2563eb;
  border-bottom: 2px solid #ffffff;
  margin-bottom: -2px;
  font-weight: 600;
}

.tab__icon {
  font-size: 16px;
}

.tab__text {
  line-height: 1;
}

.tab__content {
  padding: 20px;
  background-color: #ffffff;
  border: 1px solid #e5e7eb;
  border-top: none;
  border-radius: 0 0 8px 8px;
  min-height: 200px;
}
</style>