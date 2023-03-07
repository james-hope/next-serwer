export const fetchAllPosts = () =>
  fetch("https://jsonplaceholder.typicode.com/comments").then((response) =>
    response.json()
  );
