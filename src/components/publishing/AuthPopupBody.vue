<template>
  <div class="auth-body">
    <div class="tabs" role="tablist">
      <button v-for="(t, i) in tabs" :key="i" :class="['tab', { 'is-active': activeTab === i } ]" @click="activeTab = i">{{ t }}</button>
    </div>

    <div class="tab-panel">
      <form @submit.prevent="onConfirm">
        <div class="form-row">
          <label>이름</label>
          <input v-model="form.name" type="text" placeholder="이름을 입력하세요" />
        </div>

        <div class="form-row">
          <label>이메일</label>
          <input v-model="form.email" type="email" placeholder="example@email.com" />
        </div>

        <div class="form-row select-row">
          <label>직접입력</label>
          <select v-model="form.option">
            <option value="">선택하세요</option>
            <option value="phone">휴대폰</option>
            <option value="pass">PASS</option>
            <option value="direct">직접입력</option>
          </select>
          <button type="button" class="send-code" @click="sendCode">인증번호 발송</button>
        </div>

        <div class="form-row code-row">
          <label>인증번호</label>
          <div class="code-input">
            <input v-model="form.code" type="text" placeholder="인증번호 입력" />
            <button type="button" class="code-confirm" @click="confirmCode">확인</button>
          </div>
          <p v-if="codeSent" class="hint">인증번호가 발송되었습니다.</p>
        </div>

      </form>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'
const emit = defineEmits(['confirm'])
const tabs = ['일반 인증', '간편 인증', '기타']
const activeTab = ref(0)
const form = reactive({ name: '', email: '', option: '', code: '' })
const codeSent = ref(false)
const sendCode = () => { codeSent.value = true }
const confirmCode = () => { if(!form.code){ alert('인증번호를 입력하세요'); return } alert('인증번호 확인: '+form.code) }
const onConfirm = () => { emit('confirm', { tab: activeTab.value, data: { ...form } }) }
</script>

<style scoped lang="scss">
@use '@/assets/styles/mixins' as *;

.auth-body { display:flex; flex-direction:column; gap:$spacing-md }
.tabs { display:flex; gap:$spacing-xs }
.tab { @include button-reset; padding:$spacing-xs $spacing-md; border-radius:$radius-lg; background:$gray-100 }
.tab.is-active { background:$white; box-shadow:$shadow-sm }
.tab-panel { max-height:420px; overflow-y:auto; padding-right:$spacing-sm }
.form-row { display:flex; flex-direction:column; gap:$spacing-xs; margin-bottom:$spacing-md }
.select-row { display:flex; gap:$spacing-sm; align-items:center }
.send-code { @include button-reset; background:$primary-color; color:$white; padding:$spacing-xs $spacing-sm; border-radius:$radius-sm }
.code-input { position:relative }
.code-input input { width:100%; padding-right:80px }
.code-confirm { position:absolute; right:6px; top:50%; transform:translateY(-50%); @include button-reset; background:$secondary-color; color:$white; padding:$spacing-xs $spacing-sm; border-radius:$radius-sm }
.hint { font-size:$font-size-xs; color:$gray-600 }

@include mobile {
  .auth-body { gap:$spacing-sm }
  .tab-panel { max-height:360px }
}
</style>
