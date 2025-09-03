import './style.css'
import topicsData from './topics.json'

class ThemeRoulette {
  constructor() {
    this.themes = topicsData.themes
    this.isRunning = false
    this.rouletteInterval = null
    this.currentThemeIndex = 0
    this.finalTheme = ''
    
    this.initElements()
    this.bindEvents()
  }
  
  initElements() {
    this.themeText = document.getElementById('theme-text')
    this.startBtn = document.getElementById('start-btn')
    this.stopBtn = document.getElementById('stop-btn')
  }
  
  bindEvents() {
    this.startBtn.addEventListener('click', () => this.startRoulette())
    this.stopBtn.addEventListener('click', () => this.stopRoulette())
  }
  
  startRoulette() {
    if (this.isRunning) return
    
    this.isRunning = true
    this.updateButtonStates()
    
    // ルーレット演出開始
    this.themeText.classList.add('roulette-animation')
    
    // ランダムにテーマを高速で切り替え
    this.rouletteInterval = setInterval(() => {
      this.showRandomTheme()
    }, 150) // 150msごとに切り替え
  }
  
  stopRoulette() {
    if (!this.isRunning) return
    
    this.isRunning = false
    
    // ルーレット停止
    clearInterval(this.rouletteInterval)
    this.themeText.classList.remove('roulette-animation')
    
    // 最終テーマを決定して表示
    this.finalTheme = this.themes[Math.floor(Math.random() * this.themes.length)]
    this.showFinalTheme()
    
    this.updateButtonStates()
  }
  
  showRandomTheme() {
    const randomIndex = Math.floor(Math.random() * this.themes.length)
    this.themeText.innerHTML = `
      <p class="text-xl font-bold text-gray-800">${this.themes[randomIndex]}</p>
    `
  }
  
  showFinalTheme() {
    this.themeText.innerHTML = `
      <div class="text-center">
        <p class="text-xl font-bold text-gray-800">${this.finalTheme}</p>
      </div>
    `
    
    // 決定時のエフェクト
    this.themeText.classList.add('animate-pulse')
    setTimeout(() => {
      this.themeText.classList.remove('animate-pulse')
    }, 1000)
  }
  

  
  updateButtonStates() {
    if (this.isRunning) {
      // ルーレット実行中
      this.startBtn.disabled = true
      this.startBtn.classList.add('opacity-50', 'cursor-not-allowed')
      
      this.stopBtn.disabled = false
      this.stopBtn.classList.remove('opacity-50', 'cursor-not-allowed')
      this.stopBtn.classList.add('animate-bounce')
    } else {
      // ルーレット停止中
      this.startBtn.disabled = false
      this.startBtn.classList.remove('opacity-50', 'cursor-not-allowed')
      
      this.stopBtn.disabled = true
      this.stopBtn.classList.add('opacity-50', 'cursor-not-allowed')
      this.stopBtn.classList.remove('animate-bounce')
    }
  }
}

// アプリケーション初期化
document.addEventListener('DOMContentLoaded', () => {
  new ThemeRoulette()
  
  // iPhone SE対応のビューポート調整
  const setVh = () => {
    const vh = window.innerHeight * 0.01
    document.documentElement.style.setProperty('--vh', `${vh}px`)
  }
  
  setVh()
  window.addEventListener('resize', setVh)
  window.addEventListener('orientationchange', setVh)
})
