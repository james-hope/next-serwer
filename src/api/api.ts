export const fetchAllPosts = () =>
  fetch("https://jsonplaceholder.typicode.com/comments").then((response) =>
    response.json()
  );

export const fetchPost = (postId: string) =>
  fetch(`https://jsonplaceholder.typicode.com/posts/${postId}/comments`).then(
    (response) => response.json()
  );
