document.addEventListener("DOMContentLoaded", () => {
  // Mobile Navigation Toggle
  const hamburger = document.querySelector(".hamburger")
  const navLinks = document.querySelector(".nav-links")

  if (hamburger) {
    hamburger.addEventListener("click", function () {
      this.classList.toggle("active")
      navLinks.classList.toggle("active")
    })
  }

  // Close mobile menu when clicking on a link
  const navItems = document.querySelectorAll(".nav-links a")
  navItems.forEach((item) => {
    item.addEventListener("click", () => {
      if (hamburger.classList.contains("active")) {
        hamburger.classList.remove("active")
        navLinks.classList.remove("active")
      }
    })
  })

  // Dark Mode Toggle
  const themeToggle = document.querySelector(".theme-toggle")

  // Check for saved theme preference or use preferred color scheme
  const savedTheme = localStorage.getItem("theme")
  if (savedTheme === "dark" || (!savedTheme && window.matchMedia("(prefers-color-scheme: dark)").matches)) {
    document.body.classList.add("dark-mode")
    if (themeToggle) {
      themeToggle.innerHTML = '<i class="fas fa-sun"></i>'
    }
  }

  if (themeToggle) {
    themeToggle.addEventListener("click", function () {
      document.body.classList.toggle("dark-mode")

      if (document.body.classList.contains("dark-mode")) {
        localStorage.setItem("theme", "dark")
        this.innerHTML = '<i class="fas fa-sun"></i>'
      } else {
        localStorage.setItem("theme", "light")
        this.innerHTML = '<i class="fas fa-moon"></i>'
      }
    })
  }

  // Newsletter Form Submission
  const newsletterForm = document.getElementById("newsletter-form")
  if (newsletterForm) {
    newsletterForm.addEventListener("submit", (e) => {
      e.preventDefault()

      const email = document.getElementById("newsletter-email").value
      const messageElement = document.getElementById("newsletter-message")

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
})

// Email validation function
function validateEmail(email) {
  const re =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  return re.test(String(email).toLowerCase())
}

document.getElementById("newsletter-form").addEventListener("submit", function(e) {
  e.preventDefault();

  const email = document.getElementById("newsletter-email").value;

  emailjs.send("service_w2fqz2r", "YOUR_TEMPLATE_ID", {
    user_email: email
  }).then(function(response) {
    document.getElementById("newsletter-message").innerText =
      "You have successfully subscribed to TechBlog News. You will receive updates soon.";
  }, function(error) {
    document.getElementById("newsletter-message").innerText =
      "Oops! Something went wrong.";
  });
});
