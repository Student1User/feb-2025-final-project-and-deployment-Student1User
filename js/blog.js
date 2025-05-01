document.addEventListener("DOMContentLoaded", () => {
  // Blog posts data (in a real application, this would come from a database or API)
  const blogPosts = [
    {
      id: 1,
      title: "Top Web Development Trends in 2025",
      excerpt: "Explore the cutting-edge technologies shaping the future of web development.",
      content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit...",
      image:
        "https://images.unsplash.com/photo-1571171637578-41bc2dd41cd2?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
      category: "Web Development",
      date: "May 1, 2025",
      comments: 24,
    },
    {
      id: 2,
      title: "How AI is Transforming Everyday Life",
      excerpt: "From smart homes to healthcare, AI is revolutionizing how we live and work.",
      content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit...",
      image:
        "https://images.unsplash.com/photo-1535378917042-10a22c95931a?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
      category: "Artificial Intelligence",
      date: "April 28, 2025",
      comments: 18,
    },
    {
      id: 3,
      title: "Essential Cybersecurity Practices for 2025",
      excerpt: "Protect yourself and your business with these updated security measures.",
      content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit...",
      image:
        "https://images.unsplash.com/photo-1563013544-824ae1b704d3?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
      category: "Cybersecurity",
      date: "April 25, 2025",
      comments: 12,
    },
    {
      id: 4,
      title: "The Future of Mobile App Development",
      excerpt: "New frameworks and technologies that are changing how we build mobile apps.",
      content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit...",
      image:
        "https://images.unsplash.com/photo-1555774698-0b77e0d5fac6?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
      category: "Mobile Development",
      date: "April 22, 2025",
      comments: 9,
    },
    {
      id: 5,
      title: "Data Science: From Big Data to Smart Insights",
      excerpt: "How businesses are leveraging data science to make better decisions.",
      content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit...",
      image:
        "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
      category: "Data Science",
      date: "April 19, 2025",
      comments: 15,
    },
    {
      id: 6,
      title: "The Rise of Progressive Web Apps",
      excerpt: "Why PWAs are becoming the standard for web application development.",
      content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit...",
      image:
        "https://images.unsplash.com/photo-1558655146-d09347e92766?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
      category: "Web Development",
      date: "April 16, 2025",
      comments: 7,
    },
  ]

  const postsGrid = document.querySelector(".posts-grid")
  const loadMoreBtn = document.getElementById("load-more")
  const categoryLinks = document.querySelectorAll(".categories a")
  const searchForm = document.getElementById("search-form")

  let currentPosts = 3 // Number of posts initially displayed
  let currentCategory = "all"
  let filteredPosts = [...blogPosts]

  // Initial load of posts
  renderPosts()

  // Load more posts
  if (loadMoreBtn) {
    loadMoreBtn.addEventListener("click", function () {
      currentPosts += 3
      renderPosts()

      // Hide button if all posts are loaded
      if (currentPosts >= filteredPosts.length) {
        this.style.display = "none"
      }
    })
  }

  // Filter posts by category
  if (categoryLinks) {
    categoryLinks.forEach((link) => {
      link.addEventListener("click", function (e) {
        e.preventDefault()

        // Remove active class from all links
        categoryLinks.forEach((l) => l.classList.remove("active"))

        // Add active class to clicked link
        this.classList.add("active")

        currentCategory = this.getAttribute("data-category")

        // Filter posts
        if (currentCategory === "all") {
          filteredPosts = [...blogPosts]
        } else {
          filteredPosts = blogPosts.filter((post) => post.category === currentCategory)
        }

        // Reset current posts count and render
        currentPosts = Math.min(3, filteredPosts.length)
        renderPosts()

        // Show/hide load more button
        if (loadMoreBtn) {
          loadMoreBtn.style.display = currentPosts < filteredPosts.length ? "inline-block" : "none"
        }
      })
    })
  }

  // Search functionality
  if (searchForm) {
    searchForm.addEventListener("submit", (e) => {
      e.preventDefault()

      const searchInput = document.getElementById("search-input")
      const searchTerm = searchInput.value.toLowerCase().trim()

      if (searchTerm === "") {
        // If search is empty, reset to current category
        if (currentCategory === "all") {
          filteredPosts = [...blogPosts]
        } else {
          filteredPosts = blogPosts.filter((post) => post.category === currentCategory)
        }
      } else {
        // Filter by search term within current category
        if (currentCategory === "all") {
          filteredPosts = blogPosts.filter(
            (post) => post.title.toLowerCase().includes(searchTerm) || post.excerpt.toLowerCase().includes(searchTerm),
          )
        } else {
          filteredPosts = blogPosts.filter(
            (post) =>
              post.category === currentCategory &&
              (post.title.toLowerCase().includes(searchTerm) || post.excerpt.toLowerCase().includes(searchTerm)),
          )
        }
      }

      // Reset current posts count and render
      currentPosts = Math.min(3, filteredPosts.length)
      renderPosts()

      // Show/hide load more button
      if (loadMoreBtn) {
        loadMoreBtn.style.display = currentPosts < filteredPosts.length ? "inline-block" : "none"
      }
    })
  }

  // Function to render posts
  function renderPosts() {
    if (!postsGrid) return

    postsGrid.innerHTML = ""

    const postsToShow = filteredPosts.slice(0, currentPosts)

    if (postsToShow.length === 0) {
      postsGrid.innerHTML = '<div class="no-posts">No posts found matching your criteria.</div>'
      return
    }

    postsToShow.forEach((post) => {
      const postElement = document.createElement("article")
      postElement.className = "post-card"

      postElement.innerHTML = `
                <div class="post-image">
                    <img src="${post.image}" alt="${post.title}">
                </div>
                <div class="post-content">
                    <span class="post-category">${post.category}</span>
                    <h3><a href="post.html?id=${post.id}">${post.title}</a></h3>
                    <p>${post.excerpt}</p>
                    <div class="post-meta">
                        <span><i class="far fa-calendar"></i> ${post.date}</span>
                        <span><i class="far fa-comment"></i> ${post.comments} Comments</span>
                    </div>
                </div>
            `

      postsGrid.appendChild(postElement)
    })
  }
})
