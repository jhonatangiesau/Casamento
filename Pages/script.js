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

  // Estado inicial
  let isPlaying = false

  // Configurar ícone inicial
  playPauseIcon.src = "/Style/assents/icons/player.png" // Ícone de play

  // Autoplay no Android
  if (isAndroid) {
    audio
      .play()
      .then(() => {
        playPauseIcon.src = "/Style/assents/icons/pause.png" // Ícone de pause
        isPlaying = true
      })
      .catch((err) => {
        console.warn("Erro ao tentar autoplay no Android:", err)
      })
  }

  // Clique no botão de reprodução/pausa
  playPauseButton.addEventListener("click", () => {
    if (isPlaying) {
      audio.pause()
      playPauseIcon.src = "/Style/assents/icons/player.png" // Ícone de play
    } else {
      audio
        .play()
        .then(() => {
          playPauseIcon.src = "/Style/assents/icons/pause.png" // Ícone de pause
        })
        .catch((err) => {
          console.error("Erro ao tentar reproduzir áudio:", err)
          alert(
            "Não foi possível iniciar o áudio. Certifique-se de que o arquivo é compatível e que o dispositivo suporta o formato."
          )
        })
    }
    isPlaying = !isPlaying
  })

  // Atualizar barra de progresso e tempo
  audio.addEventListener("timeupdate", () => {
    if (audio.duration) {
      const progress = (audio.currentTime / audio.duration) * 100
      progressBar.value = progress
      currentTimeDisplay.textContent = formatTime(audio.currentTime)

      // Atualizar cor da barra de progresso
      progressBar.style.background = `linear-gradient(to right, #ffffff ${progress}%, #777777 ${progress}%)`
    }
  })

  // Exibir duração quando metadados são carregados
  audio.addEventListener("loadedmetadata", () => {
    durationDisplay.textContent = formatTime(audio.duration)
  })

  // Permitir busca no áudio
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
