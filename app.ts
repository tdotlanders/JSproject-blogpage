let posts;

async function fetchData() {
  const postsResponse = await fetch("posts.json");
  const postsData = await postsResponse.json();
  posts = postsData;
  const usersResponse = await fetch("users.json");
  const usersData = await usersResponse.json();

  getPostDetails(postsData, usersData);
}

interface Post {
  userId: number;
  id: number;
  title: string;
  body: string;
  likes: string;
  createdAt: string;
}

interface User {
  id: number;
  name: string;
}

function getPostDetails(postsData: Post[], usersData: User[]) {
  const postsContainer = document.getElementById("container");

  if (!postsContainer) {
    console.error("Posts container not found");
    return;
  }

  const postsList = document.createElement("ul");
  postsList.classList.add("posts-list");

  postsData.forEach((post) => {
    /*  const user = usersData.find((user) => user.id === post.userId); */
    console.log(post);
    const postItem = createPostListItem(post);
    postsList.appendChild(postItem);
  });
  console.log(postsList);
  postsContainer.appendChild(postsList);
}

function createPostListItem(post: Post): HTMLElement {
  const postItem = document.createElement("li");
  postItem.classList.add("post-item");

  const titleElement = document.createElement("h2");
  titleElement.textContent = post.title;

  const bodyElement = document.createElement("p");
  bodyElement.textContent = post.body;

  const likesElement = document.createElement("span");
  likesElement.textContent = post.likes.length;

  const dateElement = document.createElement("span");
  dateElement.textContent = new Date(post.createdAt).toLocaleString("pt");

  postItem.appendChild(titleElement);
  postItem.appendChild(bodyElement);
  postItem.appendChild(likesElement);
  postItem.appendChild(dateElement);

  return postItem;
}

// Example usage:
// getPostDetails(postsData, usersData);

fetchData();
console.log("Running");
