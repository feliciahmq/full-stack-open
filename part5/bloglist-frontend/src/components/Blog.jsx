import { useState } from "react"
import PropTypes from 'prop-types'

const Blog = ({ blog, addLike, deleteBlog }) => {
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
      <div>
        {blog.title} {blog.author} <button onClick={toggleVisibility}>{text}</button>
        {visible &&
          <div>
            {blog.url} <br/>
            likes {blog.likes} <button onClick={handleLike}>like</button> <br/>
            {blog.author} <br />
            <button onClick={handleDelete}>remove</button>
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