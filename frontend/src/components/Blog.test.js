import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { render, fireEvent } from "@testing-library/react";
import Blog from "./Blog";
import CreateNewBlog from "./CreateNewBlog";

describe("<Blog />", () => {
  let component;

  beforeEach(() => {
    const user = {
      username: "test username",
      name: "test name",
    };

    const blog = {
      title: "test title",
      author: "test author",
      url: "test url",
      likes: 4,
      user,
    };
    const handleRemoveButton = () => () => {};
    const mockHandler = jest.fn();

    component = render(
      <Blog
        blog={blog}
        user={user}
        handleRemoveButton={handleRemoveButton}
        handleLikeButtonTest={mockHandler}
      />
    );
  });

  test("renders right when not toggled", () => {
    expect(component.container.querySelector(".hiddenBlog")).toBeDefined();

    expect(component.container.querySelector(".shownBlog")).toBeNull();
  });

  test("renders right when toggled", () => {
    const button = component.getByText("view");
    fireEvent.click(button);

    expect(component.container.querySelector(".hiddenBlog")).toBeNull();

    expect(component.container.querySelector(".shownBlog")).toBeDefined();
  });
});

test("like button works correctly", () => {
  let component;
  const user = {
    username: "test username",
    name: "test name",
  };

  const blog = {
    title: "test title",
    author: "test author",
    url: "test url",
    likes: 4,
    user,
  };

  const mockHandler = jest.fn();
  const handleRemoveButton = () => () => {};

  component = render(
    <Blog
      blog={blog}
      user={user}
      handleRemoveButton={handleRemoveButton}
      handleLikeButtonTest={mockHandler}
    />
  );
  const viewButton = component.getByText("view");
  fireEvent.click(viewButton);

  const likeButton = component.getByText("like");
  fireEvent.click(likeButton);
  fireEvent.click(likeButton);

  expect(mockHandler.mock.calls).toHaveLength(2);
});

test("<CreateNewBlog /> updates parent state and calls onSubmit", () => {
  const handleSubmit = jest.fn();

  const component = render(
    <CreateNewBlog handleBlogCreationTest={handleSubmit} />
  );

  const title = component.container.querySelector("#title");
  const author = component.container.querySelector("#author");
  const url = component.container.querySelector("#url");

  const form = component.container.querySelector("form");

  fireEvent.change(title, {
    target: { value: "testing title" },
  });
  fireEvent.change(author, {
    target: { value: "testing author" },
  });
  fireEvent.change(url, {
    target: { value: "testing url" },
  });
  fireEvent.submit(form);

  expect(handleSubmit.mock.calls[0][0].title).toBe("testing title");
  expect(handleSubmit.mock.calls[0][0].title).toBe("testing title");
  expect(handleSubmit.mock.calls[0][0].title).toBe("testing title");
});
