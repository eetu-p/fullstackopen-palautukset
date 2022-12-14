import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import Notification from './components/Notification'
import { AddNewBlog } from './components/AddNewBlog'
import Togglable from './components/Togglable'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [notification, setNotification] = useState(null)

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )
  }, [])

  const blogFormRef = useRef()

  const blogForm = () => (
    <Togglable buttonLabel="New blog" ref={blogFormRef}>
      <AddNewBlog addNewBlog={addNewBlog} />
    </Togglable>
  )

  const addNewBlog = async blogObject => {
    blogFormRef.current.toggleVisibility()
    await blogService.create(blogObject)
    blogService.getAll().then(blogs => setBlogs( blogs ))
    setNotification({ message: 'blog added successfully', isError: false })
  }

  const removeBlog = blog => {
    if (window.confirm(`Are you sure you want to remove "${blog.title}" by ${blog.author}?`)) {
      blogService.remove(blog.id)
        .then(() => setBlogs(blogs.filter(oldBlog => oldBlog.id !== blog.id)))
    }
  }

  const addLike = blog => {
    const updatedBlog = {
      ...blog,
      user: blog.user._id,
      likes: blog.likes + 1
    }
    blogService.update(blog.id, updatedBlog)
      .then(blogService.getAll().then(blogs => setBlogs( blogs )))
  }

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  useEffect(() => {
    setTimeout(() => setNotification(null), 5000)
  }, [notification])

  const handleLogin = async event => {
    event.preventDefault()

    try {
      const user = await loginService.login({
        username, password,
      })
      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      )
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
      setNotification({ message: 'login successful', isError: false })
    } catch (exception) {
      console.log(exception)
      setNotification({ message: 'wrong credentials', isError: true })
    }
  }

  const handleLogout = () => {
    window.localStorage.removeItem('loggedBlogappUser')
    setUser(null)
  }


  if (user === null) {
    return (
      <div>
        <Notification notification={notification} />
        <h2>Log in to application</h2>
        <form onSubmit={event => handleLogin(event)}>
          <div>
            <label>Username </label>
            <input id="username" type="text" onChange={({ target }) => setUsername(target.value)} />
          </div>
          <div>
            <label>Password </label>
            <input id="password" type="password" onChange={({ target }) => setPassword(target.value)} />
          </div>
          <button type="submit">Login</button>
        </form>
      </div>
    )
  }

  return (
    <div>
      <Notification notification={notification} />
      <h2>blogs</h2>
      Logged in as {user.username}. <button id="logout" onClick={handleLogout}>Logout</button>

      {blogForm()}

      <div className="blog-container">
        {blogs
          .sort((a, b) => {
            if (a.likes > b.likes) return -1
            if (a.likes < b.likes) return 1
            return 0
          })
          .map(blog => <Blog key={blog.id} blog={blog} user={user} addLike={addLike} removeBlog={removeBlog} />)
        }
      </div>
    </div>
  )
}

export default App
