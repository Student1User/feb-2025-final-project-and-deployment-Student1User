document.addEventListener("DOMContentLoaded", () => {
  // Create particles container
  const particlesContainer = document.createElement("div")
  particlesContainer.className = "particles-container"
  document.body.appendChild(particlesContainer)

  // Create particles
  const particleCount = 15
  const colors = ["#6d28d9", "#8b5cf6", "#f97316", "#fb923c"]

  for (let i = 0; i < particleCount; i++) {
    createParticle(particlesContainer, colors)
  }

  // Create new particles periodically
  setInterval(() => {
    if (document.querySelectorAll(".particle").length < 30) {
      createParticle(particlesContainer, colors)
    }
  }, 3000)
})

function createParticle(container, colors) {
  const particle = document.createElement("div")
  particle.className = "particle"

  // Random properties
  const size = Math.random() * 50 + 10 // 10-60px
  const color = colors[Math.floor(Math.random() * colors.length)]
  const left = Math.random() * 100 // 0-100%
  const duration = Math.random() * 15 + 10 // 10-25s
  const delay = Math.random() * 5 // 0-5s

  // Apply styles
  particle.style.width = `${size}px`
  particle.style.height = `${size}px`
  particle.style.backgroundColor = color
  particle.style.left = `${left}%`
  particle.style.top = `${Math.random() * 20 + 100}%` // Start below the viewport
  particle.style.animationDuration = `${duration}s`
  particle.style.animationDelay = `${delay}s`
  particle.style.opacity = `${Math.random() * 0.3}` // 0-0.3 opacity

  // Add to container
  container.appendChild(particle)

  // Remove particle after animation completes
  setTimeout(
    () => {
      if (particle.parentNode === container) {
        container.removeChild(particle)
      }
    },
    (duration + delay) * 1000,
  )
}
