const _ = require('lodash');

const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
  return blogs.reduce((sum, blog) => sum + blog.likes, 0)
}

const favouriteBlog = (blogs) => {
  const blogsLikes = blogs.map(b => b.likes)
  const favIndex = blogsLikes.indexOf(Math.max(...blogsLikes))
  const favBlog = blogs[favIndex]

  return {
    title: favBlog.title,
    author: favBlog.author,
    likes: favBlog.likes
  }
}

const mostBlogs = (blogs) => {
  const authorBlogCounts = _.countBy(blogs, 'author') // blogs per author

  const maxAuthor = _.maxBy(Object.entries(authorBlogCounts), ([, count]) => count)

  return {
    author: maxAuthor[0],
    blogs: maxAuthor[1]
  };
}

const mostLikes = (blogs) => {
  const likesByAuthor = _.chain(blogs)
    .groupBy('author') // group blogs by author
    .map((blogs, author) => ({
      author,
      likes: _.sumBy(blogs, 'likes'), // sum of likes for each authors blogs
    }))
    .maxBy('likes')
    .value()

  return likesByAuthor
}

module.exports = {
  dummy,
  totalLikes,
  favouriteBlog,
  mostBlogs,
  mostLikes
}