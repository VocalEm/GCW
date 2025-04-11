document.getElementById("postForm").addEventListener("submit", async (e) => {
  e.preventDefault();

  const pageId = "607712042429205"; // Replace with your Facebook Page ID
  const accessToken =
    "EAA6Rd8QZCET8BOZCLXHZAGDuGFvlAUciEb1mLvVqhY0wz32LBdA27s8nobQvmfK5FHANBx7CvZCJt5ZCY1sdZBKRWxUhpYlztMBPf1fv73AW0vFSyogoOcVgk0CDaeKBvYH0tSuQNoVqQAMwKlZBYAnz4DZBCbNrTvWG0pW8SExfPZCNcfsDhYZAKSnxa2kLjgQZCyu"; // Replace with your Facebook Access Token
  const postContent = document.getElementById("postContent").value;

  try {
    const response = await fetch(
      `https://graph.facebook.com/v12.0/${pageId}/feed`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: postContent,
          access_token: accessToken,
        }),
      }
    );

    const data = await response.json();

    if (data.error) {
      console.error("Error creating post:", data.error.message);
      alert("Failed to create post: " + data.error.message);
    } else {
      alert("Post created successfully!");
      document.getElementById("postForm").reset();
    }
  } catch (error) {
    console.error("Error creating post:", error);
    alert("An error occurred while creating the post.");
  }
});
