const dummy = (blogs) => {
  return 1;
};

const totalLikes = (blogs) => {
  return blogs.reduce((sum, item) => sum + item.likes, 0);
};

const favoriteBlog = (blogs) => {
  const maxBlog = blogs.reduce(
    (prev, current) => (prev.likes > current.likes ? prev : current),
    0
  );

  return blogs.length === 0
    ? 0
    : { title: maxBlog.title, author: maxBlog.author, likes: maxBlog.likes };
};

const mostBlogs = (blogs) => {
  const sumBlogs = blogs.reduce((prev, current) => {
    if (!Object.keys(prev).includes(current.author)) {
      prev[current.author] = 1;
      return prev;
    } else {
      prev[current.author] += 1;
      return prev;
    }
  }, {});

  const sumBlogsList = Object.entries(sumBlogs).map((value) => {
    return { author: value[0], blogs: value[1] };
  });

  const maxSumBlog = sumBlogsList.reduce(
    (prev, current) => (prev.blogs > current.blogs ? prev : current),
    0
  );

  return blogs.length === 0
    ? 0
    : { author: maxSumBlog.author, blogs: maxSumBlog.blogs };
};

const mostLikes = (blogs) => {
  const sumLikes = blogs.reduce((prev, current) => {
    if (!Object.keys(prev).includes(current.author)) {
      prev[current.author] = current.likes;
      return prev;
    } else {
      prev[current.author] += current.likes;
      return prev;
    }
  }, {});

  const sumLikesList = Object.entries(sumLikes).map((value) => {
    return { author: value[0], likes: value[1] };
  });

  const maxSumLikes = sumLikesList.reduce(
    (prev, current) => (prev.likes > current.likes ? prev : current),
    0
  );

  return blogs.length === 0
    ? 0
    : { author: maxSumLikes.author, likes: maxSumLikes.likes };
};

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes,
};
