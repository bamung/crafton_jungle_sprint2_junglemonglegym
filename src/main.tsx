import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App'  // .tsx 확장자는 확장자 생략 가능
import './index.css'; // 또는 실제 CSS 파일명

const container = document.getElementById('root')

if (!container) {
  throw new Error('Root container missing in index.html')
}

createRoot(container).render(
  <StrictMode>
    <App />
  </StrictMode>
)