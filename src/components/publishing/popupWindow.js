import { popupConfigs } from './popupConfig'

const authMethods = [
  { id: 'kakao', label: '카카오', icon: '💬' },
  { id: 'naver', label: '네이버', icon: '🟢' },
  { id: 'google', label: '구글', icon: '🔵' },
  { id: 'apple', label: 'Apple', icon: '🍎' },
  { id: 'phone', label: '휴대폰', icon: '📱' },
  { id: 'pass', label: 'PASS', icon: '🔐' },
  { id: 'kb', label: 'KB모바일', icon: '🏦' },
  { id: 'shinhan', label: '신한인증', icon: '💳' },
  { id: 'toss', label: '토스', icon: '💙' },
  { id: 'payco', label: 'PAYCO', icon: '🅿️' },
  { id: 'samsung', label: '삼성패스', icon: '📲' },
  { id: 'biometric', label: '생체인증', icon: '👆' },
  { id: 'pin', label: 'PIN', icon: '🔢' },
  { id: 'email', label: '이메일', icon: '✉️' },
  { id: 'sms', label: 'SMS', icon: '💬' },
  { id: 'more', label: '더보기', icon: '⋯' }
]

const sizeMap = {
  small: { w: 360, h: 480 },
  medium: { w: 720, h: 700 },
  large: { w: 1000, h: 800 },
  auth: { w: 420, h: 720 }
}

export function openPopupWindow(key = 'auth') {
  const config = popupConfigs[key] || popupConfigs.demoMedium
  const size = sizeMap[config.size] || sizeMap.medium
  const left = Math.max(0, Math.floor((screen.width - size.w) / 2))
  const top = Math.max(0, Math.floor((screen.height - size.h) / 2))
  const features = `width=${size.w},height=${size.h},left=${left},top=${top},resizable=yes,scrollbars=yes`
  const win = window.open('', `_popup_${key}`, features)

  if (!win) {
    alert('팝업 차단을 해제해 주세요.')
    return null
  }

  const authHtml = () => {
    return `
      <div class="auth-grid">
        ${authMethods.map(m => `
          <button class="auth-button" onclick="window.opener && window.opener.postMessage({ type: 'popup-select', id: '${m.id}' }, '*')">
            <div class="auth-icon">${m.icon}</div>
            <div class="auth-label">${m.label}</div>
          </button>
        `).join('')}
      </div>
    `
  }

  const html = `<!doctype html>
<html>
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>${config.title}</title>
<style>
  body{font-family:system-ui, -apple-system, 'Segoe UI', Roboto, 'Noto Sans KR', 'Apple SD Gothic Neo', 'Malgun Gothic', sans-serif;margin:0;background:#f7f7f8}
  .wrap{max-width:900px;margin:20px auto;padding:16px}
  .card{background:#fff;border-radius:10px;padding:16px;box-shadow:0 6px 18px rgba(0,0,0,0.08)}
  h1{margin:0 0 12px;font-size:18px}
  .auth-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:12px}
  .auth-button{display:flex;flex-direction:column;align-items:center;justify-content:center;padding:12px;border-radius:8px;border:1px solid #e6e6e6;background:#fafafa;font-size:14px}
  .auth-icon{font-size:24px;margin-bottom:8px}
  .auth-label{font-size:13px}
</style>
</head>
<body>
  <div class="wrap">
    <div class="card">
      <h1>${config.title}</h1>
      ${config.size === 'auth' ? authHtml() : '<p>샘플 팝업 컨텐츠입니다.</p>'}
    </div>
  </div>
  <script>
    // send select events back to opener
    window.addEventListener('click', function(e){
      const btn = e.target.closest && e.target.closest('.auth-button')
      if(btn){
        // find label text as id not available here
      }
    })
  </script>
</body>
</html>`

  win.document.open()
  win.document.write(html)
  win.document.close()

  return win
}
