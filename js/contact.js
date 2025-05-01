document.addEventListener("DOMContentLoaded", () => {
  const contactForm = document.getElementById("contact-form")
  const subjectSelect = document.getElementById("subject")
  const otherSubjectDiv = document.getElementById("other-subject")
  const otherSubjectInput = document.getElementById("other-subject-input")

  // Handle subject dropdown change
  if (subjectSelect) {
    subjectSelect.addEventListener("change", function () {
      if (this.value === "Other") {
        otherSubjectDiv.classList.add("active")
        otherSubjectInput.setAttribute("required", "required")
      } else {
        otherSubjectDiv.classList.remove("active")
        otherSubjectInput.removeAttribute("required")
      }
    })
  }

  if (contactForm) {
    contactForm.addEventListener("submit", (e) => {
      // Always prevent default to handle form submission locally
      e.preventDefault()

      // Get form values
      const name = document.getElementById("name").value
      const email = document.getElementById("email").value
      const subject = document.getElementById("subject").value
      const message = document.getElementById("message").value

      // Reset previous error messages
      document.querySelectorAll(".error-message").forEach((el) => {
        el.textContent = ""
      })

      // Validate form
      let isValid = true

      if (name.trim() === "") {
        document.getElementById("name-error").textContent = "Please enter your name"
        isValid = false
      }

      if (email.trim() === "") {
        document.getElementById("email-error").textContent = "Please enter your email"
        isValid = false
      } else if (!validateEmail(email)) {
        document.getElementById("email-error").textContent = "Please enter a valid email address"
        isValid = false
      }

      if (subject.trim() === "") {
        document.getElementById("subject-error").textContent = "Please select a subject"
        isValid = false
      }

      if (subject === "Other" && otherSubjectInput.value.trim() === "") {
        document.getElementById("subject-error").textContent = "Please specify the subject"
        isValid = false
      }

      if (message.trim() === "") {
        document.getElementById("message-error").textContent = "Please enter your message"
        isValid = false
      }

      if (!isValid) {
        return
      }

      // Show success message
      const formMessage = document.getElementById("form-message")
      if (formMessage) {
        formMessage.textContent = "Thank you for your message! We'll get back to you soon."
        formMessage.className = "success"
      }

      // Reset the form
      contactForm.reset()

      // Redirect to thank you page after a short delay
      setTimeout(() => {
        window.location.href = "thank_you.html"
      }, 2000)
    })
  }

  // Input validation on blur
  const formInputs = document.querySelectorAll("#contact-form input, #contact-form textarea, #contact-form select")

  formInputs.forEach((input) => {
    input.addEventListener("blur", function () {
      validateInput(this)
    })

    input.addEventListener("input", function () {
      // Clear error message when user starts typing
      const errorElement = document.getElementById(`${this.id}-error`)
      if (errorElement) {
        errorElement.textContent = ""
      }
    })
  })

  function validateInput(input) {
    const errorElement = document.getElementById(`${input.id}-error`)

    if (!errorElement) return

    if (input.value.trim() === "") {
      if (input.id === "subject") {
        errorElement.textContent = "Please select a subject"
      } else {
        errorElement.textContent = `Please enter your ${input.id}`
      }
    } else if (input.id === "email" && !validateEmail(input.value)) {
      errorElement.textContent = "Please enter a valid email address"
    } else {
      errorElement.textContent = ""
    }
  }
})

// Email validation function
function validateEmail(email) {
  const re =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  return re.test(String(email).toLowerCase())
}
