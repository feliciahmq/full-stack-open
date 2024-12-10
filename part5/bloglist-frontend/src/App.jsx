import { useState, useEffect, useRef } from 'react'
import './index.css'

import Blog from './components/Blog'
import Notification from './components/Notification'
import AddBlogForm from './components/AddBlogForm' 

import blogService from './services/blogs'
import loginService from './services/login'
import Togglable from './components/Togglable'
import LoginForm from './components/LoginForm'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const [error, setError] = useState(null)
  const [message, setMessage] = useState(null)
  const [refresh, setRefresh] = useState(false)
  const addBlogFormRef = useRef()

  useEffect(() => {
    blogService.getAll().then(blogs => {
      blogs.sort((a, b) => b.likes - a.likes)
      setBlogs( blogs )
    }
    )  
  }, [refresh]) // re-render when refresh state changes

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

  const addBlog = (blogObject) => {
    addBlogFormRef.current.toggleVisibility()
    blogService.create(blogObject)
    .then(returnedBlog => {
      setBlogs(blogs.concat(returnedBlog))
      setMessage(`a new blog ${returnedBlog.title} by ${returnedBlog.author} added`)
      setRefresh(!refresh)
      setTimeout(() => {
        setMessage(null)
      }, 5000)
    })
  }
  const deleteBlog = async (id) => {
    await blogService.deleteBlog(id)
    setRefresh(!refresh)
  }

  const addLike = async (id, blogObject) => {
    await blogService.update(id, blogObject)
    setRefresh(!refresh)
  }

  if (user === null) {
    return (
      <div>
          <h2>log in to application</h2>
          <Notification message={message} error={error} />
          
          <LoginForm 
            username={username}
            password={password}
            onUsernameChange={({ target }) => setUsername(target.value)}
            onPasswordChange={({ target }) => setPassword(target.value)}
            handleLogin={handleLogin} 
          />
      </div>
    )
  } else {
    return (
      <div>
        <h2>blogs</h2>
          <Notification message={message} error={error} />

          <p>{user.name} logged-in <button type="button" onClick={handleLogout}>logout</button> </p>

          <Togglable buttonLabel='create new blog' ref={addBlogFormRef}>
            <AddBlogForm createBlog={addBlog}/>
          </Togglable>

          {blogs.map(blog =>
            <Blog key={blog.id} blog={blog} user={user} addLike={addLike} deleteBlog={deleteBlog}/>
          )}  
          
      </div>
    )
  }

}

export default App