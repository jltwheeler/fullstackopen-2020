const initialBlogs = [
  {
    title: "test blog 1",
    author: "Jeff Winger",
    url: "https://www.blog.com/jeffwinger",
    likes: 27,
    user: "",
  },
  {
    title: "test blog 2",
    author: "Donald Glover",
    url: "https://www.blog.com/iamdonald",
    likes: 58,
    user: "",
  },
];

const newBlog = {
  title: "test blog 3",
  author: "Creator, Tyler",
  url: "https://www.blog.com/ofwgkta",
  likes: 10,
};

const newBlogNoLike = {
  title: "test blog 4",
  author: "No Likes",
  url: "https://www.blog.com/noonelikesme",
};

const newBlogInvalid = {
  author: "Creator, Tyler",
  likes: 10,
};

module.exports = {
  initialBlogs,
  newBlog,
  newBlogNoLike,
  newBlogInvalid,
};
