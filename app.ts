let posts;

async function fetchData() {
  const postsResponse = await fetch(
    "https://jmrfrosa.github.io/edit-jsts-dec2023.github.io/data/posts.json"
  );
  const postsData = await postsResponse.json();
  posts = postsData;
  const usersResponse = await fetch(
    "https://jmrfrosa.github.io/edit-jsts-dec2023.github.io/data/users.json"
  );
  const usersData = await usersResponse.json();

  getPostDetails(postsData, usersData);
}

interface Post {
  userId: number;
  id: number;
  title: string;
  body: string;
  likes: number[];
  createdAt: string;
  comments: Comment[];
}

interface User {
  id: number;
  name: string;
}
interface Comment {
  userId: number;
  body: string;
  createdAt: string;
}
function getPostDetails(
  postsData: Post[],
  usersData: User[],
  commentsData: Comment[]
) {
  console.log(posts);

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
  likesElement.textContent = post.likes.length.toString(); // Convert number to string

  const dateElement = document.createElement("span");
  dateElement.textContent = new Date(post.createdAt).toLocaleString("pt");

  const commentsContainer = document.createElement("div");
  commentsContainer.classList.add("comments-container");

  post.comments.forEach((comment: Comment) => {
    const commentElement = document.createElement("div");
    commentElement.classList.add("comment");

    /*  const commentUser = userIdData.find((user) => user.id === comment.userId); */
    console.log(comment);
    const commentUserElement = document.createElement("span");
    commentUserElement.textContent = comment.userId + ": ";
    commentElement.appendChild(commentUserElement);

    const commentBodyElement = document.createElement("span");
    commentBodyElement.textContent = comment.body;
    commentElement.appendChild(commentBodyElement);

    const commentDateElement = document.createElement("span");
    commentDateElement.textContent = new Date(comment.createdAt).toLocaleString(
      "pt"
    );
    commentElement.appendChild(commentDateElement);

    commentsContainer.appendChild(commentElement);
  });

  postItem.appendChild(titleElement);
  postItem.appendChild(bodyElement);
  postItem.appendChild(likesElement);
  postItem.appendChild(dateElement);
  postItem.appendChild(commentsContainer);

  return postItem;
}

// Example usage:
// getPostDetails(postsData, usersData);

fetchData();
console.log("Running");
