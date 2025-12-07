<template>
  <div class="base-tab">
    <div class="base-tab__container">
      <button
        v-for="(tab, index) in state.tabs"
        :key="index"
        :class="['base-tab__button', { 'is-active': state.activeIndex === index }]"
        @click="handleTabClick(index)"
      >
        <!-- 아이콘 자리 -->
        <i v-if="tab.icon" :class="tab.icon" class="base-tab__icon"></i>
        <span class="base-tab__text">{{ tab.label }}</span>
      </button>
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
      // tabs: [{ label: '아이디 찾기', icon: 'icon-class' }, { label: '비밀번호 찾기', icon: 'icon-class' }]
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
.base-tab {
  width: 100%;
}

.base-tab__container {
  display: flex;
  width: 100%;
  height: 50px;
  background-color: #f3f4f6;
  border-radius: 14px;
  padding: 4px;
  gap: 4px;
}

.base-tab__button {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  border: none;
  background-color: transparent;
  border-radius: 10px;
  cursor: pointer;
  font-size: 14px;
  font-weight: 500;
  color: #6b7280;
  transition: all 0.3s ease;
}

.base-tab__button.is-active {
  background-color: #ffffff;
  color: #111827;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  font-weight: 600;
}

.base-tab__icon {
  font-size: 16px;
}

.base-tab__text {
  line-height: 1;
}
</style>