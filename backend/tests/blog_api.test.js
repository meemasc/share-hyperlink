const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app");
const Blog = require("../models/blog");
const helper = require("./test_helper");
const User = require("../models/user");
const bcrypt = require("bcrypt");

const api = supertest(app);

describe("blog api tests", () => {
  beforeEach(async () => {
    await User.deleteMany({});
    const initialBlogs = helper.initialBlogs;

    const passwordHash = await bcrypt.hash("sekret", 10);
    const userObject = {
      username: "root",
      passwordHash,
      blogs: [],
    };
    const user = new User(userObject);
    await user.save();

    await Blog.deleteMany({});
    initialBlogs.forEach((blog) => (blog.user = user._id));
    await Blog.insertMany(initialBlogs);

    const savedBlogs = await Blog.find({});
    const savedBlogIds = savedBlogs.map((blog) => blog._id);
    userObject.blogs = savedBlogIds;

    await User.findByIdAndUpdate(user._id, userObject);
  });

  describe("HTTP GET request tests for blogs", () => {
    test("blogs are returned as json", async () => {
      await api
        .get("/api/blogs")
        .expect(200)
        .expect("Content-Type", /application\/json/);
    });

    test("all blogs are returned", async () => {
      const response = await api.get("/api/blogs");
      expect(response.body).toHaveLength(helper.initialBlogs.length);
    });

    test("a specific blog is within the returned blogs", async () => {
      const response = await api.get("/api/blogs");
      const contents = response.body.map((r) => r.title);
      expect(contents).toContain("Canonical string reduction");
      expect(contents).toContain("Type wars");
    });

    test("populate blogs test", async () => {
      const response = await api.get("/api/blogs");
      const contents = response.body.map((r) => r.user.username);

      expect(contents).toContain("root");
    });
  });

  describe("viewing a specific blog", () => {
    test("fails with statuscode 404 if note does not exist", async () => {
      const validNonexistingId = await helper.nonExistingId();

      await api.get(`/api/blogs/${validNonexistingId}`).expect(404);
    });

    test("fails with statuscode 400 id is invalid", async () => {
      const invalidId = "5a3d5da59070081a82a3445";

      await api.get(`/api/blogs/${invalidId}`).expect(400);
    });

    test("populate specific blog test", async () => {
      const blogsAtStart = await Blog.find({}).populate("user", {
        username: 1,
        name: 1,
      });
      const blogToView = blogsAtStart[0].toJSON();

      const resultBlog = await api
        .get(`/api/blogs/${blogToView.id}`)
        .expect(200)
        .expect("Content-Type", /application\/json/);

      const processedNoteToView = JSON.parse(JSON.stringify(blogToView));

      expect(resultBlog.body).toEqual(processedNoteToView);
    });
  });

  describe("addition of a new blog", () => {
    test("succeeds with valid blog", async () => {
      const user = {
        username: "root",
        password: "sekret",
      };
      const loggedUser = await api.post("/api/login").send(user);

      const newBlog = {
        _id: "5a422a851b54a676234d17f7",
        title: "React patterns",
        author: "Michael Chan",
        url: "https://reactpatterns.com/",
        likes: 7,
        __v: 0,
      };

      await api
        .post("/api/blogs")
        .send(newBlog)
        .set("Authorization", `bearer ${loggedUser.body.token}`)
        .expect(200)
        .expect("Content-Type", /application\/json/);

      const notesAtEnd = await Blog.find({});
      expect(notesAtEnd).toHaveLength(helper.initialBlogs.length + 1);

      const contents = notesAtEnd.map((n) => n.title);
      expect(contents).toContain("React patterns");
    });

    test("fails with status code 400 if data invaild", async () => {
      const user = {
        username: "root",
        password: "sekret",
      };
      const loggedUser = await api.post("/api/login").send(user);

      const newBlog = {
        likes: "asd",
      };

      await api
        .post("/api/blogs")
        .send(newBlog)
        .set("Authorization", `bearer ${loggedUser.body.token}`)
        .expect(400);

      const notesAtEnd = await Blog.find({});

      expect(notesAtEnd).toHaveLength(helper.initialBlogs.length);
    });

    test("fails with 401 if token is not provided", async () => {
      const newBlog = {
        _id: "5a422a851b54a676234d17f7",
        title: "React patterns",
        author: "Michael Chan",
        url: "https://reactpatterns.com/",
        likes: 7,
        __v: 0,
      };

      await api.post("/api/blogs").send(newBlog).expect(401);
    });
  });

  describe("schema tests", () => {
    test("blogs ids are defined", async () => {
      const response = await api.get("/api/blogs");
      expect(response.body[0].id).toBeDefined();
    });

    test("when likes is missing it defautls to 0", async () => {
      const user = {
        username: "root",
        password: "sekret",
      };
      const loggedUser = await api.post("/api/login").send(user);

      const newBlog = {
        _id: "5a422a851b54a676234d17f7",
        title: "React patterns",
        author: "Michael Chan",
        url: "https://reactpatterns.com/",
        __v: 0,
      };

      await api
        .post("/api/blogs")
        .send(newBlog)
        .set("Authorization", `bearer ${loggedUser.body.token}`)
        .expect(200);

      const result = await Blog.findOne({ title: "React patterns" });
      expect(result.likes).toBe(0);
    });

    test("when title is missing it returns 400", async () => {
      const user = {
        username: "root",
        password: "sekret",
      };
      const loggedUser = await api.post("/api/login").send(user);

      const newBlog = {
        _id: "5a422a851b54a676234d17f7",
        author: "Michael Chan",
        url: "https://reactpatterns.com/",
        __v: 0,
      };

      await api
        .post("/api/blogs")
        .send(newBlog)
        .set("Authorization", `bearer ${loggedUser.body.token}`)
        .expect(400);
    });

    test("when url is missing it returns 400", async () => {
      const user = {
        username: "root",
        password: "sekret",
      };
      const loggedUser = await api.post("/api/login").send(user);

      const newBlog = {
        _id: "5a422a851b54a676234d17f7",
        title: "React patterns",
        author: "Michael Chan",
        __v: 0,
      };

      await api
        .post("/api/blogs")
        .send(newBlog)
        .set("Authorization", `bearer ${loggedUser.body.token}`)
        .expect(400);
    });
  });

  describe("deleting a blog", () => {
    test("deleting a specific blog", async () => {
      const user = {
        username: "root",
        password: "sekret",
      };
      const loggedUser = await api.post("/api/login").send(user);

      const blogToDelete = helper.initialBlogs[0];

      await api
        .delete(`/api/blogs/${blogToDelete._id}`)
        .set("Authorization", `bearer ${loggedUser.body.token}`)
        .expect(204);

      const blogsAtEnd = await Blog.find({});
      expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length - 1);

      const contents = blogsAtEnd.map((n) => n.title);
      expect(contents).not.toContain(blogToDelete.title);
    });

    test("deleting with non existing id", async () => {
      const user = {
        username: "root",
        password: "sekret",
      };
      const loggedUser = await api.post("/api/login").send(user);

      const nonExistID = await helper.nonExistingId();
      await api
        .delete(`/api/blogs/${nonExistID}`)
        .set("Authorization", `bearer ${loggedUser.body.token}`)
        .expect(204);
    });
  });

  describe("updating a blog", () => {
    test("updating like information", async () => {
      const user = {
        username: "root",
        password: "sekret",
      };
      const loggedUser = await api.post("/api/login").send(user);

      const blogToUpdate = helper.initialBlogs[0];
      blogToUpdate.likes += 1;

      await api
        .put(`/api/blogs/${blogToUpdate._id}`)
        .set("Authorization", `bearer ${loggedUser.body.token}`)
        .expect(200)
        .send(blogToUpdate);

      const result = await Blog.findById(blogToUpdate._id);
      expect(result.likes).toBe(blogToUpdate.likes);
    });
  });

  describe("commenting on a blog", () => {
    test("commenting works", async () => {
      const user = {
        username: "root",
        password: "sekret",
      };
      const loggedUser = await api.post("/api/login").send(user);
      const blogToUpdate = helper.initialBlogs[0];
      const comment = 'this is a comment' 
      await api
        .post(`/api/blogs/${blogToUpdate._id}/comment`)
        .set("Authorization", `bearer ${loggedUser.body.token}`)
        .expect(200)
        .send({ comment });

      const result = await Blog.findById(blogToUpdate._id);
      expect(result.comments[0]).toBe(comment);
    })
  })

});

describe("user api tests", () => {
  beforeEach(async () => {
    await User.deleteMany({});
    await Blog.deleteMany({});

    const initialUsers = helper.initialUsers;

    let userObject1 = initialUsers[0];
    const passwordHash1 = await bcrypt.hash("test_password1", 10);
    userObject1.blogs = [];
    userObject1.passwordHash = passwordHash1;
    delete userObject1.password;
    const user1 = User(userObject1);
    await user1.save();

    const userObject2 = initialUsers[1];
    const passwordHash2 = await bcrypt.hash("test_password2", 10);
    userObject2.blogs = [];
    userObject2.passwordHash = passwordHash2;
    delete userObject2.password;
    const user2 = User(userObject2);
    await user2.save();

    const userObject3 = initialUsers[2];
    const passwordHash3 = await bcrypt.hash("test_password3", 10);
    userObject3.blogs = [];
    userObject3.passwordHash = passwordHash3;
    delete userObject3.password;
    const user3 = User(userObject3);
    await user3.save();

    const newBlog = {
      _id: "5a422a851b54a676234d17f7",
      title: "React patterns",
      author: "Michael Chan",
      url: "https://reactpatterns.com/",
      likes: 7,
      user: user1._id,
      __v: 0,
    };
    const blog = Blog(newBlog);
    blog.save();
    const userObjectNew = initialUsers[0];
    userObjectNew.blogs = [blog._id];
    userObjectNew.passwordHash = passwordHash1;
    await User.findByIdAndUpdate(user1.id, userObjectNew);
  }, 100000);

  describe("addition of a new user", () => {
    test("creation succeeds with a fresh username", async () => {
      const usersAtStart = await helper.usersInDb();

      const newUser = {
        username: "mluukkai",
        name: "Matti Luukkainen",
        password: "salainen",
      };

      await api
        .post("/api/users")
        .send(newUser)
        .expect(200)
        .expect("Content-Type", /application\/json/);

      const usersAtEnd = await helper.usersInDb();
      expect(usersAtEnd).toHaveLength(usersAtStart.length + 1);

      const usernames = usersAtEnd.map((u) => u.username);
      expect(usernames).toContain(newUser.username);
    });

    test("creation fails with proper statuscode and message if username already taken", async () => {
      const usersAtStart = await helper.usersInDb();

      const newUser = {
        username: "test_username1",
        name: "Superuser",
        password: "salainen",
      };

      const result = await api
        .post("/api/users")
        .send(newUser)
        .expect(400)
        .expect("Content-Type", /application\/json/);

      expect(result.body.error).toContain("`username` to be unique");

      const usersAtEnd = await helper.usersInDb();

      expect(usersAtEnd).toHaveLength(usersAtStart.length);
    });

    test("username must be 3 characters long", async () => {
      const usersAtStart = await helper.usersInDb();

      const newUser = {
        username: "ml",
        name: "Matti Luukkainen",
        password: "salainen",
      };

      const result = await api.post("/api/users").send(newUser).expect(400);

      expect(result.body.error).toBe(
        "username and password must be at least 3 characters long"
      );

      const usersAtEnd = await helper.usersInDb();

      expect(usersAtEnd).toHaveLength(usersAtStart.length);
    });

    test("password must be 3 characters long", async () => {
      const usersAtStart = await helper.usersInDb();

      const newUser = {
        username: "mlak",
        name: "Matti Luukkainen",
        password: "sa",
      };

      const result = await api.post("/api/users").send(newUser).expect(400);

      expect(result.body.error).toBe(
        "username and password must be at least 3 characters long"
      );

      const usersAtEnd = await helper.usersInDb();

      expect(usersAtEnd).toHaveLength(usersAtStart.length);
    });
  });

  describe("HTTP get request for users", () => {
    test("users are returned as json", async () => {
      await api
        .get("/api/users")
        .expect(200)
        .expect("Content-Type", /application\/json/);
    });

    test("all users are returned", async () => {
      const response = await api.get("/api/users");
      expect(response.body).toHaveLength(helper.initialUsers.length);
    });

    test("a specific user is within the returned blogs", async () => {
      const response = await api.get("/api/users");
      const contents = response.body.map((r) => r.username);
      expect(contents).toContain("test_username1");
      expect(contents).toContain("test_username3");
    });

    test("users are returned in right form", async () => {
      const response = await api.get("/api/users");
      expect(response.body[0].passwordHash).toBeUndefined();
      expect(response.body[0].id).toBeDefined();
    });

    test("populate test", async () => {
      const response = await api.get("/api/users");
      const contents = response.body
        .map((user) => user.blogs)
        .reduce((previousValue, currentValue) => {
          return previousValue.concat(currentValue);
        }, [])
        .map((blog) => blog.title);

      expect(contents).toContain("React patterns");
    });
  });

  describe("viewing a specific user", () => {
    test("fails with statuscode 404 if note does not exist", async () => {
      const validNonexistingId = await helper.nonExistingUserId();

      await api.get(`/api/users/${validNonexistingId}`).expect(404);
    });

    test("fails with statuscode 400 id is invalid", async () => {
      const invalidId = "5a3d5da59070081a82a3445";

      await api.get(`/api/users/${invalidId}`).expect(400);
    });

    test("populate specific user test", async () => {
      const user = await User.find({ username: "test_username1" });
      const response = await api.get(`/api/users/${user[0].id}`);
      const titleCOntent = response.body.blogs.map((blog) => blog.title);
      expect(titleCOntent).toContain("React patterns");
    });
  });
});

describe("login api tests", () => {
  beforeEach(async () => {
    await User.deleteMany({});

    const initialUsers = helper.initialUsers;

    let userObject1 = initialUsers[0];
    const passwordHash1 = await bcrypt.hash("test_password1", 10);
    userObject1.blogs = [];
    userObject1.passwordHash = passwordHash1;
    delete userObject1.password;
    const user1 = User(userObject1);
    await user1.save();
  });

  test("login successful", async () => {
    const loginUser = {
      username: "test_username1",
      password: "test_password1",
    };

    await api.post("/api/login").send(loginUser).expect(200);
  });

  test("login fails with wrong password", async () => {
    const loginUser = {
      username: "test_username1",
      password: "test_password2",
    };

    await api.post("/api/login").send(loginUser).expect(401);
  });

  test("login fails with non existing username", async () => {
    const loginUser = {
      username: "test_username2",
      password: "test_password1",
    };

    await api.post("/api/login").send(loginUser).expect(401);
  });
});

afterAll(async () => {
  await mongoose.connection.close();
});
