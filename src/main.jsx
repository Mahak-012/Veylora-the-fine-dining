import { StrictMode, useEffect } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

// Scroll reveal observer
function initReveal() {
  const obs = new IntersectionObserver(
    entries => entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible') }),
    { threshold: 0.1 }
  )
  document.querySelectorAll('.reveal, .reveal-left, .reveal-right').forEach(el => obs.observe(el))
}

document.addEventListener('DOMContentLoaded', initReveal)
setTimeout(initReveal, 500)

createRoot(document.getElementById('root')).render(
  <StrictMode><App /></StrictMode>
)