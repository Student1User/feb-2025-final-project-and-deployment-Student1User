document.addEventListener("DOMContentLoaded", () => {
    // Handle newsletter form on about page
    const newsletterForm = document.getElementById("newsletter-form-about")
    
    if (newsletterForm) {
      newsletterForm.addEventListener("submit", (e) => {
        e.preventDefault()
  
        const email = document.getElementById("newsletter-email-about").value
        const messageElement = document.getElementById("newsletter-message-about")
  
        // Simple email validation
        if (!validateEmail(email)) {
          messageElement.textContent = "Please enter a valid email address."
          messageElement.style.color = "var(--error-color)"
          return
        }
  
        // Simulate form submission
        messageElement.textContent = "Subscribing..."
        messageElement.style.color = "var(--text-color)"
  
        setTimeout(() => {
          messageElement.textContent = "Thank you for subscribing!"
          messageElement.style.color = "var(--success-color)"
          newsletterForm.reset()
        }, 1500)
      })
    }
  
    // Testimonials slider functionality
    const testimonials = document.querySelectorAll('.testimonial')
    let currentTestimonial = 0
  
    function showTestimonial(index) {
      testimonials.forEach((testimonial, i) => {
        testimonial.style.display = i === index ? 'block' : 'none'
      })
    }
  
    // Initialize testimonials
    if (testimonials.length > 0) {
      showTestimonial(currentTestimonial)
  
      // Auto-rotate testimonials
      setInterval(() => {
        currentTestimonial = (currentTestimonial + 1) % testimonials.length
        showTestimonial(currentTestimonial)
      }, 5000)
    }
  
    // Animate stats on scroll
    const stats = document.querySelectorAll('.stat-number')
    
    function animateStats() {
      stats.forEach(stat => {
        const target = parseInt(stat.textContent.replace(/\D/g, ''))
        const duration = 2000 // ms
        const step = target / (duration / 16) // 60fps
        let current = 0
        
        const animate = () => {
          current += step
          if (current < target) {
            stat.textContent = Math.floor(current) + (stat.textContent.includes('+') ? '+' : '')
            requestAnimationFrame(animate)
          } else {
            stat.textContent = target + (stat.textContent.includes('+') ? '+' : '')
          }
        }
        
        animate()
      })
    }
  
    // Check if element is in viewport
    function isInViewport(element) {
      const rect = element.getBoundingClientRect()
      return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
      )
    }
  
    // Animate stats when they come into view
    let statsAnimated = false
    window.addEventListener('scroll', () => {
      if (!statsAnimated && stats.length > 0 && isInViewport(stats[0])) {
        animateStats()
        statsAnimated = true
      }
    })
  
    // Check on load as well
    if (stats.length > 0 && isInViewport(stats[0])) {
      animateStats()
      statsAnimated = true
    }
  })
  
  // Email validation function
  function validateEmail(email) {
    const re =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    return re.test(String(email).toLowerCase())
  }
  