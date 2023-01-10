const blogsRouter = require("express").Router();
const Blog = require("../models/blog");
const User = require("../models/user");
require("express-async-errors");

blogsRouter.get("/", async (request, response) => {
  const blogs = await Blog.find({}).populate("user", {
    username: 1,
    name: 1,
  });
  response.json(blogs);
});

blogsRouter.get("/:id", async (request, response) => {
  const blog = await Blog.findById(request.params.id).populate("user", {
    username: 1,
    name: 1
  });
  if (blog) {
    response.json(blog);
  } else {
    response.status(404).end();
  }
});

blogsRouter.post("/", async (request, response) => {
  const tokenUser = request.user;
  if (tokenUser === null) {
    return response.status(401).json({ error: "token missing or invalid" });
  }
  const user = await User.findById(tokenUser.id);

  const blog = new Blog({
    ...request.body,
    user: user.id
  });

  const savedBlog = await blog.save()
  user.blogs = user.blogs.concat(savedBlog.id);
  await User.findByIdAndUpdate(user.id, user);

  const responseBlog = await savedBlog.populate("user", {
    username: 1,
    name: 1
  });

  response.json(responseBlog);
});

blogsRouter.delete("/:id", async (request, response) => {
  const tokenUser = request.user;
  if (tokenUser === null) {
    return response.status(401).json({ error: "token missing or invalid" });
  }
  const requestID = request.params.id;
  const blog = await Blog.findById(requestID);
  if (!blog) {
    return response.status(204).end();
  }
  const user = await User.findById(tokenUser.id);

  if (blog.user.toString() === user.id.toString()) {
    user.blogs.splice(user.blogs.indexOf(blog.id));
    await blog.delete();
    await User.findByIdAndUpdate(user.id, user);
    response.status(204).end();
  } else {
    return response
      .status(401)
      .json({
        error: "this user does not have permission to delete this blog",
      });
  }
});

blogsRouter.put("/:id", async (request, response) => {
  const tokenUser = request.user;
  if (tokenUser === null) {
    return response.status(401).json({ error: "token missing or invalid" });
  }

  const blog = await Blog.findById(request.params.id);

  if (blog.user.toString() === tokenUser.id.toString()) {
    const blog = await Blog.findByIdAndUpdate(request.params.id, request.body, {
      new: true,
    });
    response.status(200).json(blog);
  } else {
    return response
      .status(401)
      .json({
        error: "this user does not have permission to update this blog",
      });
  }
});

blogsRouter.put("/like/:id", async (request, response) => {
  const tokenUser = request.user;
  if (tokenUser === null) {
    return response.status(401).json({ error: "token missing or invalid" });
  }

  const blog = await Blog.findById(request.params.id);
  blog.likes += 1
  const newBlog = await blog.save()

  response.status(200).json(newBlog);
});

module.exports = blogsRouter;
