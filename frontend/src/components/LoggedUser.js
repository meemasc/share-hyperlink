import React, { useRef } from "react";
import Blog from "./Blog";
import CreateNewBlog from "./CreateNewBlog";
import Togglable from "./Togglable";
import blogService from "../services/blogs";

const LoggedUser = ({
  user,
  setUser,
  blogs,
  setBlogs,
  setMessage,
  setMessageColor,
}) => {
  const handleLogout = () => {
    window.localStorage.removeItem("loggedBlogappUser");
    blogService.setToken(null);
    setUser(null);
  };

  const handleRemoveButton = (blog) => async () => {
    const alert = window.confirm(`Remove blog ${blog.title} by ${blog.author}`);
    if (alert) {
      await blogService.clean(blog.id);
      setBlogs(blogs.filter((thisBlog) => thisBlog !== blog));
    }
  };

  const blogFormRef = useRef();

  return (
    <div>
      <h2>blogs</h2>
      <div>
        {`${user.name} logged in `}
        <button onClick={handleLogout}>logout</button>
      </div>
      <br />
      <Togglable buttonLabel="create new blog" ref={blogFormRef}>
        <CreateNewBlog
          blogs={blogs}
          setBlogs={setBlogs}
          setMessage={setMessage}
          setMessageColor={setMessageColor}
          blogFormRef={blogFormRef}
        />
      </Togglable>
      <div>
        {blogs
          .slice()
          .sort((blog1, blog2) => blog2.likes - blog1.likes)
          .map((blog) => (
            <Blog
              className="blog"
              key={blog.id}
              blog={blog}
              user={user}
              handleRemoveButton={handleRemoveButton}
            />
          ))}
      </div>
    </div>
  );
};

export default LoggedUser;
