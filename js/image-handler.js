document.addEventListener("DOMContentLoaded", () => {
  // Function to handle image uploads and ensure they auto-fit
  function setupImageUploadPreview(inputId, previewId) {
    const input = document.getElementById(inputId)
    const preview = document.getElementById(previewId)

    if (!input || !preview) return

    input.addEventListener("change", function () {
      const file = this.files[0]

      if (file) {
        const reader = new FileReader()

        reader.addEventListener("load", function () {
          preview.src = this.result
          preview.classList.add("active")

          // Ensure image fits properly
          preview.onload = function () {
            this.classList.add("responsive-img")
          }
        })

        reader.readAsDataURL(file)
      }
    })
  }

  // Example usage for a comment form with image upload
  setupImageUploadPreview("comment-image-upload", "comment-image-preview")

  // Function to ensure all images on the page are responsive
  function makeImagesResponsive() {
    const images = document.querySelectorAll("img:not(.responsive-img):not(.author-image):not([class*='icon'])")

    images.forEach((img) => {
      img.classList.add("responsive-img")
    })
  }

  // Call this function when the page loads
  makeImagesResponsive()

  // Also call it when new content is loaded dynamically
  // For example, after loading blog posts or comments
  document.addEventListener("contentLoaded", makeImagesResponsive)
})
