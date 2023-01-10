const listHelper = require("../utils/list_helper");

const blogs = [
  {
    _id: "5a422a851b54a676234d17f7",
    title: "React patterns",
    author: "Michael Chan",
    url: "https://reactpatterns.com/",
    likes: 7,
    __v: 0,
  },
  {
    _id: "5a422aa71b54a676234d17f8",
    title: "Go To Statement Considered Harmful",
    author: "Edsger W. Dijkstra",
    url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
    likes: 5,
    __v: 0,
  },
  {
    _id: "5a422b3a1b54a676234d17f9",
    title: "Canonical string reduction",
    author: "Edsger W. Dijkstra",
    url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
    likes: 12,
    __v: 0,
  },
  {
    _id: "5a422b891b54a676234d17fa",
    title: "First class tests",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll",
    likes: 10,
    __v: 0,
  },
  {
    _id: "5a422ba71b54a676234d17fb",
    title: "TDD harms architecture",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html",
    likes: 0,
    __v: 0,
  },
  {
    _id: "5a422bc61b54a676234d17fc",
    title: "Type wars",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
    likes: 2,
    __v: 0,
  },
];

test("dummy returns one", () => {
  const blogs = [];

  const result = listHelper.dummy(blogs);
  expect(result).toBe(1);
});

describe("total likes", () => {
  test("emply list is 0", () => {
    expect(listHelper.totalLikes([])).toBe(0);
  });

  test("1 elemet list is that element", () => {
    expect(listHelper.totalLikes([blogs[0]])).toBe(7);
  });

  test("5 length list test", () => {
    expect(listHelper.totalLikes(blogs)).toBe(36);
  });
});

describe("favorite blog", () => {
  const blog = {
    _id: "5a422a851b54a676234d17f7",
    title: "React patterns",
    author: "Michael Chan",
    url: "https://reactpatterns.com/",
    likes: 7,
    __v: 0,
  };

  test("empty list", () => {
    expect(listHelper.favoriteBlog([])).toEqual(null);
  });

  test("one element list", () => {
    expect(listHelper.favoriteBlog([blogs[0]])).toEqual(blog);
  });

  test("in a big list", () => {
    expect(listHelper.favoriteBlog(blogs)).toEqual(blogs[2]);
  });
});

describe("most blogs", () => {
  const test1 = {
    author: "Michael Chan",
    blogs: 1,
  };

  const test2 = {
    author: "Robert C. Martin",
    blogs: 3,
  };

  test("emplt list", () => {
    expect(listHelper.mostBlogs([])).toEqual(null);
  });

  test("one element list", () => {
    expect(listHelper.mostBlogs([blogs[0]])).toEqual(test1);
  });

  test("big list", () => {
    expect(listHelper.mostBlogs(blogs)).toEqual(test2);
  });
});

describe("most likes", () => {
  const test1 = {
    author: "Michael Chan",
    likes: 7,
  };

  const test2 = {
    author: "Edsger W. Dijkstra",
    likes: 17,
  };

  test("emplt list", () => {
    expect(listHelper.mostLikes([])).toEqual(null);
  });

  test("one element list", () => {
    expect(listHelper.mostLikes([blogs[0]])).toEqual(test1);
  });

  test("big list", () => {
    expect(listHelper.mostLikes(blogs)).toEqual(test2);
  });
});
