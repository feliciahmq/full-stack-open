import { useState } from 'react'
import PropTypes from 'prop-types'

const Blog = ({ blog, user, addLike, deleteBlog }) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const [visible, setVisible] = useState(false)
  const text = visible ? 'hide' : 'view'
  const toggleVisibility = () => {
    setVisible(!visible)
  }

  const handleLike = () => {
    const updatedBlog = {
      title: blog.title,
      author: blog.author,
      url: blog.url,
      likes: blog.likes + 1
    }
    addLike(blog.id, updatedBlog)
  }

  const handleDelete = () => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}`)) {
      deleteBlog(blog.id)
    }
  }

  return (
    <div style={blogStyle}>
      <div className='blog'>
        {blog.title} {blog.author} <button onClick={toggleVisibility}>{text}</button>
        {visible &&
          <div className='visibleBlog'>
            <p>{blog.url}</p>
            <p>likes {blog.likes} <button onClick={handleLike}>like</button></p>
            <p>{blog.author}</p>
            {blog.user.username === user.username && (
              <button onClick={handleDelete}>remove</button>
            )}
          </div>
        }
      </div>
    </div>
  )
}

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
  addLike: PropTypes.func.isRequired,
  deleteBlog: PropTypes.func.isRequired
}

export default Blog