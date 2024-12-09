import { useState, useEffect } from 'react'
import './index.css'

import Blog from './components/Blog'
import Notification from './components/Notification'
import AddBlogForm from './components/AddBlogForm' 

import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [error, setError] = useState(null)
  const [message, setMessage] = useState(null)

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON) // parse back to javascript from JSON
      setUser(user)
      blogService.setToken(user.token)
    }
  }, []) // [] executed only when component rendered for the first time

  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const user = await loginService.login({
        username, password,
      })

      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user) // parse to JSON to save in key value database local storage
      )

      setMessage('successful login')
      setTimeout(() => {
        setMessage(null)
      }, 5000)

      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      setError('wrong username or password')
      setTimeout(() => {
        setError(null)
      }, 5000)
    }
  }

  const handleLogout = async (event) => {
    event.preventDefault()
    window.localStorage.removeItem('loggedBlogappUser')

    blogService.setToken(null)
    setUser(null)
    setUsername('')
    setPassword('')
  }

  const loginForm = () => (
    <form onSubmit={handleLogin}>
      <div>
        username
          <input
          type="text"
          value={username}
          name="Username"
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      <div>
        password
          <input
          type="password"
          value={password}
          name="Password"
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <button type="submit">login</button>
    </form>      
  )

  const createBlog = (blogObject) => {
    blogService.create(blogObject)
    .then(returnedBlog => {
      setBlogs(blogs.concat(returnedBlog))
      setMessage(`a new blog ${returnedBlog.title} by ${returnedBlog.author} added`)
      setTimeout(() => {
        setMessage(null)
      }, 5000)
    })
  }

  if (user === null) {
    return (
      <div>
          <h2>log in to application</h2>
          <Notification message={message} error={error} />
          
          {loginForm()}
      </div>
    )
  } else {
    return (
      <div>
        <h2>blogs</h2>
          <Notification message={message} error={error} />

          <p>{user.name} logged-in</p>
          
          <button type="button" onClick={handleLogout}>logout</button>
          {blogs.map(blog =>
            <Blog key={blog.id} blog={blog} />
          )}  
          
          <AddBlogForm createBlog={createBlog}/>
      </div>
    )
  }

}

export default App