import blogService from "../services/blogs";

export const initBlogs = () => {
  return async (dispatch) => {
    const blogs = await blogService.getAll();
    dispatch({
      type: "INIT_STATE",
      data: blogs,
    });
  };
};

export const createBlog = (newBlog) => {
  return async (dispatch) => {
    const blog = await blogService.create(newBlog);

    dispatch({
      type: "CREATE_BLOG",
      data: blog,
    });
  };
};

export const likeBlog = (blog) => {
  return async (dispatch) => {
    const newBlog = await blogService.update({
      ...blog,
      likes: blog.likes + 1,
    });

    dispatch({
      type: "LIKE_BLOG",
      data: newBlog,
    });
  };
};

export const removeBlog = (blog) => {
  return async (dispatch) => {
    await blogService.deleteBlog(blog.id);

    dispatch({
      type: "REMOVE_BLOG",
      data: blog,
    });
  };
};

const blogReducer = (state = [], action) => {
  switch (action.type) {
    case "INIT_STATE":
      return action.data;
    case "CREATE_BLOG":
      return state.concat(action.data);
    case "LIKE_BLOG":
      const blog = state.find((item) => item.id === action.data.id);
      const newIdx = state.indexOf(blog);
      blog.likes += 1;

      return [...state.slice(0, newIdx), blog, ...state.slice(newIdx + 1)];
    case "REMOVE_BLOG":
      const idx = state.indexOf(action.data);

      return [...state.slice(0, idx), ...state.slice(idx + 1)];
    default:
      return state;
  }
};

export default blogReducer;
