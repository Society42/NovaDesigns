const forumPosts = [

    {
        title: "Sold Emergency Navigator",
        content: "We're excited to announce that Emergency Navigator has been successfully sold to a new owner. As a development studio, we'll continue to support the project, collaborating closely with the new owner to ensure its success. Stay tuned for more updates!",
        username: "Society",
        role: "Chief Executive Officer",
        date: "June 23, 2024 at 14:12pm",
        isNew: true
    },
    

    {
        title: "Welcome to the Forums",
        content: "Welcome to our community forum! This is the hub where we share exciting updates, announce new releases, and discuss important developments. As the exclusive poster, I'll keep you informed on all the latest news, events, and opportunities to engage.",
        username: "Society",
        role: "Chief Executive Officer",
        date: "June 23, 2024 at 14:12pm",
        isNew: false
    }
    
  
];

function createForumPostElement(post) {
const postElement = document.createElement("div");
postElement.className = "forum-post";

const titleElement = document.createElement("h3");
titleElement.className = "post-title";
titleElement.textContent = post.title;

if (post.isNew) {
const newLabel = document.createElement("span");
newLabel.className = "new-post-label";
newLabel.textContent = "New";
titleElement.appendChild(newLabel);
}

const contentElement = document.createElement("p");
contentElement.className = "post-description";
contentElement.textContent = post.content;

const userInfoElement = document.createElement("div");
userInfoElement.className = "user-info";

// Check if there is a role to include in user info
if (post.role) {
userInfoElement.innerHTML = `
  <span class="username">Created by: ${post.username}</span> | <span class="user-role">${post.role}</span> | <span class="post-date">Posted on: ${post.date}</span>
`;
} else {
userInfoElement.innerHTML = `
  <span class="username">Created by: ${post.username}</span> | <span class="post-date">Posted on: ${post.date}</span>
`;
}

postElement.appendChild(titleElement);
postElement.appendChild(contentElement);
postElement.appendChild(userInfoElement);

return postElement;
}


// Function to display forum posts in the HTML
function displayForumPosts(posts) {
const forumPostsContainer = document.getElementById("forum-posts");

posts.forEach((post) => {
const postElement = createForumPostElement(post);
forumPostsContainer.appendChild(postElement);
});
}

// Call the function to display the forum posts
displayForumPosts(forumPosts);
