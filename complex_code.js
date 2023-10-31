/*
   Filename: complex_code.js
   Description: This code demonstrates a complex web application that includes multiple modules and functionalities.
*/

// Module 1: User Management
const UserManagement = (() => {
  let users = [];

  // Private functions
  const createUser = (username) => {
    const user = {
      username,
      createdAt: new Date(),
      posts: [],
    };
    users.push(user);
    return user;
  };

  const deleteUser = (username) => {
    users = users.filter((user) => user.username !== username);
  };

  // Public API
  return {
    getUsers: () => users,
    createUser,
    deleteUser,
  };
})();

// Module 2: Post Management
const PostManagement = (() => {
  let posts = [];

  // Private functions
  const createPost = (title, content, author) => {
    const post = {
      title,
      content,
      author,
      createdAt: new Date(),
    };
    posts.push(post);
    UserManagement.getUsers().find((user) => user.username === author)?.posts.push(post);
    return post;
  };

  const deletePost = (postId) => {
    posts = posts.filter((post) => post.postId !== postId);
  };

  // Public API
  return {
    getPosts: () => posts,
    createPost,
    deletePost,
  };
})();

// Example usage of UserManagement and PostManagement modules
const user1 = UserManagement.createUser("john_doe");
const user2 = UserManagement.createUser("jane_smith");

console.log("Users:");
console.log(UserManagement.getUsers());

// Create posts
const post1 = PostManagement.createPost("JavaScript Tips", "Lorem ipsum...", user1.username);
const post2 = PostManagement.createPost("Node.js Tricks", "Dolor sit amet...", user2.username);

console.log("Posts:");
console.log(PostManagement.getPosts());

// Delete a user and associated posts
UserManagement.deleteUser(user1.username);

console.log("Users after deletion:");
console.log(UserManagement.getUsers());