import { useEffect, useState } from 'react'
import blogService from '../services/blogs'
import PropTypes from 'prop-types'

const Blog = ({ blog, user, addLike }) => {

  const [showInfo, setShowInfo] = useState(false)
  const [isOwner, setIsOwner] = useState(false)

  const handleRemove = blog => {
    if (window.confirm(`Are you sure you want to remove "${blog.title}" by ${blog.author}?`)) {
      blogService.remove(blog.id)
    }
  }

  useEffect(() => {
    if (blog.user && user.username === blog.user.username) setIsOwner(true)
  }, [])

  return (
    <div className="blog-info">
      {blog.title} <button onClick={() => setShowInfo(!showInfo)}>{showInfo ? 'Hide' : 'Show'}</button>
      { showInfo
        ? <>
          <p>{blog.author}</p>
          <p>{`${blog.likes} like(s)`} <button onClick={() => addLike(blog)}>Like</button></p>
          <p>{blog.url}</p>
          { isOwner
            ? <button onClick={() => handleRemove(blog)}>Remove</button>
            : null
          }
        </>
        : null
      }
    </div>
  )
}

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired
}

export default Blog