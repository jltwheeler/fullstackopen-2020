import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { render, fireEvent } from "@testing-library/react";
import { prettyDOM } from "@testing-library/dom";
import Blog from "./Blog";

describe("Blog tests", () => {
  let component, blog, mockHandler;
  beforeEach(() => {
    blog = {
      likes: 9,
      title: "Test blog",
      author: "Tester",
      url: "hey.com.au",
      user: {
        username: "testuser",
        name: "Test Testingotn",
        id: "5f6767665hfdec08f6ac018a",
      },
    };

    mockHandler = jest.fn();

    const user = {
      username: "testuser",
      name: "Test Testingotn",
      id: "5f6767665hfdec08f6ac018a",
    };

    component = render(<Blog blog={blog} user={user} addLike={mockHandler} />);
  });

  test("renders blog's title and author", () => {
    const info = component.container.querySelector(".blog__info");

    expect(info).toHaveTextContent(`${blog.title} ${blog.author}`);
  });

  test("no likes or url rendered by default", () => {
    const likes = component.container.querySelector(".blog__likes");
    const url = component.container.querySelector(".blog__url");
    expect(likes).toBe(null);
    expect(url).toBe(null);
  });

  test("likes and url are shown when button has been clicked", () => {
    const button = component.container.querySelector(".btn-visible");
    fireEvent.click(button);

    const likes = component.container.querySelector(".blog__likes");
    const url = component.container.querySelector(".blog__url");

    expect(likes).toHaveTextContent(`${blog.likes}`);
    expect(url).toHaveTextContent(blog.url);
  });

  test("handles a like button getting clicked twice", async () => {
    const button = component.container.querySelector(".btn-visible");
    fireEvent.click(button);

    const likeButton = component.container.querySelector(".btn-like");
    fireEvent.click(likeButton);
    fireEvent.click(likeButton);

    expect(mockHandler.mock.calls).toHaveLength(2);
  });
});
