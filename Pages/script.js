document.addEventListener("DOMContentLoaded", function () {
  const audio = document.getElementById("audio")
  const playPauseButton = document.getElementById("playPauseButton")
  const playPauseIcon = document.getElementById("playPauseIcon")
  const progressBar = document.getElementById("progress")
  const currentTimeDisplay = document.getElementById("current-time")
  const durationDisplay = document.getElementById("duration")

  // Iniciar música automaticamente e configurar repetição
  audio.play()
  audio.loop = true

  // Definir ícone de pause no início, pois o áudio já está tocando
  playPauseIcon.src = "/Style/assents/icons/pause.png"

  // Toggle play/pause ao clicar no botão e alterar o ícone
  playPauseButton.addEventListener("click", () => {
    if (audio.paused) {
      audio.play()
      playPauseIcon.src = "/Style/assents/icons/pause.png" // Ícone de pause
    } else {
      audio.pause()
      playPauseIcon.src = "/Style/assents/icons/player.png" // Ícone de play
    }
  })

  // Atualizar a barra de progresso e exibição de tempo
  audio.addEventListener("timeupdate", () => {
    const progress = (audio.currentTime / audio.duration) * 100
    progressBar.value = progress
    currentTimeDisplay.textContent = formatTime(audio.currentTime)
  })

  // Exibir a duração do áudio quando os metadados são carregados
  audio.addEventListener("loadedmetadata", () => {
    durationDisplay.textContent = formatTime(audio.duration)
  })

  // Permitir busca no áudio ao mover a barra de progresso
  progressBar.addEventListener("input", () => {
    const seekTime = (progressBar.value / 100) * audio.duration
    audio.currentTime = seekTime
  })

  // Formatar o tempo em mm:ss
  function formatTime(time) {
    const minutes = Math.floor(time / 60)
    const seconds = Math.floor(time % 60)
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`
  }
})
