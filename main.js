document.addEventListener("DOMContentLoaded", async () => {
    const courseList = document.getElementById("courseList");
    const response = await fetch("http://localhost:5000/api/courses");
    const courses = await response.json();

    courses.forEach(course => {
        const courseCard = `
            <div class="col-md-4">
                <div class="card">
                    <img src="${course.image}" class="card-img-top" alt="${course.title}">
                    <div class="card-body">
                        <h5 class="card-title">${course.title}</h5>
                        <p class="card-text">${course.description}</p>
                        <a href="#" class="btn btn-primary">View Details</a>
                    </div>
                </div>
            </div>
        `;
        courseList.innerHTML += courseCard;
    });
});

document.addEventListener('click', (event) => {
    const target = event.target;
    if (target.tagName === 'A' && target.href.startsWith(window.location.origin)) { 
      event.preventDefault(); 
      const page = target.href.split('/').pop(); // Get the page name (e.g., "dashboard.html")
      loadPage(page); // Function to load the page content
    }
  });
  
  async function loadPage(page) {
    try {
      const response = await fetch(page);
      const html = await response.text();
      document.querySelector('main').innerHTML = html; // Update the main content area
      // ... (Optional) Update the active link in the navbar
    } catch (error) {
      console.error('Error loading page:', error);
      // Handle the error (e.g., display an error message)
    }
  }