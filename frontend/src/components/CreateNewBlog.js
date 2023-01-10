import React, { useState } from "react";
import blogService from "../services/blogs";

const CreateNewBlog = ({
  blogs,
  setBlogs,
  setMessage,
  setMessageColor,
  blogFormRef,
  handleBlogCreationTest,
}) => {
  const [blogTitle, setBlogTitle] = useState("");
  const [blogAuthor, setBlogAuthor] = useState("");
  const [blogUrl, setBlogUrl] = useState("");

  //handleForTesting is used for testing
  //other than that it is useless
  const handleForTesting = () => {
    const blog = {
      title: blogTitle,
      author: blogAuthor,
      url: blogUrl,
    };
    handleBlogCreationTest(blog);
  };

  const handleForCreation = async (event) => {
    event.preventDefault();

    const blog = {
      title: blogTitle,
      author: blogAuthor,
      url: blogUrl,
    };

    blogFormRef.current.toggleVisibility();
    const newBlog = await blogService.create(blog);

    setBlogs(blogs.concat(newBlog));
    setBlogTitle("");
    setBlogAuthor("");
    setBlogUrl("");
    setMessageColor("green");
    setMessage(`a new blog ${newBlog.title} by ${newBlog.author} added`);
    setTimeout(() => {
      setMessage(null);
    }, 5000);
  };

  const handleBlogCreation = handleBlogCreationTest
    ? handleForTesting
    : handleForCreation;

  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={handleBlogCreation}>
        <div>
          title:
          <input
            id="title"
            type="text"
            value={blogTitle}
            name="Title"
            onChange={({ target }) => setBlogTitle(target.value)}
          />
        </div>
        <div>
          author:
          <input
            id="author"
            type="text"
            value={blogAuthor}
            name="Author"
            onChange={({ target }) => setBlogAuthor(target.value)}
          />
        </div>
        <div>
          url:
          <input
            id="url"
            type="text"
            value={blogUrl}
            name="Url"
            onChange={({ target }) => setBlogUrl(target.value)}
          />
        </div>
        <button id="create-button" type="submit">
          create
        </button>
      </form>
    </div>
  );
};

export default CreateNewBlog;
