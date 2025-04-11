async function fetchFacebookPosts(pageId, accessToken) {
  try {
    const response = await fetch(
      `https://graph.facebook.com/v12.0/${pageId}/posts?access_token=${accessToken}`
    );
    const data = await response.json();

    if (data.error) {
      console.error("Error fetching Facebook posts:", data.error.message);
      return [];
    }

    return data.data; // Array of posts
  } catch (error) {
    console.error("Error fetching Facebook posts:", error);
    return [];
  }
}

function renderFacebookPosts(posts) {
  const facebookSlider = document.getElementById("facebook-slider");
  facebookSlider.innerHTML = ""; // Clear existing content

  posts.forEach((post) => {
    const postElement = document.createElement("div");
    postElement.className = "facebook-post";

    // Add a click event to redirect to the Facebook post
    postElement.addEventListener("click", () => {
      const postUrl = `https://www.facebook.com/${post.id}`;
      window.open(postUrl, "_blank"); // Open in a new tab
    });

    postElement.innerHTML = `
      <div class="post-header">
        <div class="post-img">
          <img src="../assets/facebookporfile.jpg" alt="Profile Image" />
        </div>
        <h3>Night Hunt</h3>
      </div>
      <p>${post.message || "No description available"}</p>
    `;

    facebookSlider.appendChild(postElement);
  });
}

async function loadFacebookPosts() {
  const pageId = "607712042429205"; // Replace with your Facebook Page ID
  const accessToken =
    "EAA6Rd8QZCET8BOZCLXHZAGDuGFvlAUciEb1mLvVqhY0wz32LBdA27s8nobQvmfK5FHANBx7CvZCJt5ZCY1sdZBKRWxUhpYlztMBPf1fv73AW0vFSyogoOcVgk0CDaeKBvYH0tSuQNoVqQAMwKlZBYAnz4DZBCbNrTvWG0pW8SExfPZCNcfsDhYZAKSnxa2kLjgQZCyu"; // Replace with your Facebook Access Token

  const posts = await fetchFacebookPosts(pageId, accessToken);
  renderFacebookPosts(posts);
}

// Call the function to load posts when the page loads
document.addEventListener("DOMContentLoaded", () => {
  const facebookSlider = document.getElementById("facebook-slider");
  const leftArrow = document.getElementById("left-arrow");
  const rightArrow = document.getElementById("right-arrow");

  leftArrow.addEventListener("click", () => {
    facebookSlider.scrollBy({ left: -300, behavior: "smooth" });
  });

  rightArrow.addEventListener("click", () => {
    facebookSlider.scrollBy({ left: 300, behavior: "smooth" });
  });

  loadFacebookPosts(); // Load posts dynamically
});
