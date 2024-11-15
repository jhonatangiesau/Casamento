document.addEventListener("DOMContentLoaded", function () {
  const audio = document.getElementById("audio")
  const playPauseButton = document.getElementById("playPauseButton")
  const playPauseIcon = document.getElementById("playPauseIcon")
  const progressBar = document.getElementById("progress")
  const currentTimeDisplay = document.getElementById("current-time")
  const durationDisplay = document.getElementById("duration")

  // Detectar sistema operacional
  const isAndroid = /android/i.test(navigator.userAgent)
  const isiPhone = /iphone|ipad|ipod/i.test(navigator.userAgent)

  // Configurar autoplay apenas para Android
  if (isAndroid) {
    audio.play().catch((err) => {
      console.warn("Erro ao tentar autoplay no Android:", err)
    })
    playPauseIcon.src = "/Style/assents/icons/pause.png" // Ícone de pause
  } else if (isiPhone) {
    playPauseIcon.src = "/Style/assents/icons/player.png" // Ícone de play
  }

  // Configurar estado inicial
  let isPlaying = isAndroid 

  // Alternar reprodução ao clicar no botão
  playPauseButton.addEventListener("click", () => {
    if (isPlaying) {
      audio.pause()
      playPauseIcon.src = "/Style/assents/icons/player.png" 
    } else {
      audio.play().catch((err) => {
        console.error("Erro ao reproduzir áudio:", err)
      })
      playPauseIcon.src = "/Style/assents/icons/pause.png"
    }
    isPlaying = !isPlaying
  })

  // Atualizar barra de progresso e tempo
  audio.addEventListener("timeupdate", () => {
    const progress = (audio.currentTime / audio.duration) * 100
    progressBar.value = progress
    currentTimeDisplay.textContent = formatTime(audio.currentTime)

    progressBar.style.background = `linear-gradient(to right, #ffffff ${progress}%, #777777 ${progress}%)`
  })

  // Exibir duração quando metadados são carregados
  audio.addEventListener("loadedmetadata", () => {
    durationDisplay.textContent = formatTime(audio.duration)
  })

  // Permitir buscar no áudio
  progressBar.addEventListener("input", () => {
    const seekTime = (progressBar.value / 100) * audio.duration
    audio.currentTime = seekTime
  })

  // Formatar tempo em mm:ss
  function formatTime(time) {
    const minutes = Math.floor(time / 60)
    const seconds = Math.floor(time % 60)
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`
  }
})
