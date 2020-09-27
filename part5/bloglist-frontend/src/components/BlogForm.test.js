import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { render, fireEvent } from "@testing-library/react";
import BlogForm from "./BlogForm";

describe("blog form tests", () => {
  let component, mockCreateBlog;
  beforeEach(() => {
    mockCreateBlog = jest.fn();
    component = render(<BlogForm createBlog={mockCreateBlog} />);
  });
  test("adding a new form results in correct details", () => {
    const inputTitle = component.container.querySelector(".blog-form__title");
    const inputAuthor = component.container.querySelector(".blog-form__author");
    const inputUrl = component.container.querySelector(".blog-form__url");

    const form = component.container.querySelector("form");

    const inputs = {
      title: "test title",
      author: "test author",
      url: "test url",
    };

    fireEvent.change(inputTitle, {
      target: { value: inputs.title },
    });
    fireEvent.change(inputAuthor, {
      target: { value: inputs.author },
    });
    fireEvent.change(inputUrl, {
      target: { value: inputs.url },
    });

    fireEvent.submit(form);

    expect(mockCreateBlog.mock.calls).toHaveLength(1);
    expect(mockCreateBlog.mock.calls[0][0]).toEqual(inputs);
  });
});
