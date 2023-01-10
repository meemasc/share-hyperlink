import React, { useState, useEffect } from "react";
import LoginForm from "./components/LoginForm";
import blogService from "./services/blogs";
import Notification from "./components/Notification";
import LoggedUser from "./components/LoggedUser";

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [user, setUser] = useState(null);
  const [message, setMessage] = useState(null);
  const [messageColor, setMessageColor] = useState(null);

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs));
  }, []);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedBlogappUser");
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
      blogService.setToken(user.token);
    }
  }, []);

  const loginForm = () => (
    <LoginForm
      setUser={setUser}
      setMessage={setMessage}
      setMessageColor={setMessageColor}
    />
  );

  const loggedUser = () => (
    <LoggedUser
      user={user}
      setUser={setUser}
      blogs={blogs}
      setBlogs={setBlogs}
      setMessage={setMessage}
      setMessageColor={setMessageColor}
    />
  );

  return (
    <div>
      <Notification message={message} messageColor={messageColor} />
      {user === null && loginForm()}
      {user !== null && loggedUser()}
    </div>
  );
};

export default App;
