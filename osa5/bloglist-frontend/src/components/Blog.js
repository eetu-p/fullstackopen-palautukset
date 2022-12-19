import { useEffect, useState } from 'react'
import PropTypes from 'prop-types'

const Blog = ({ blog, user, addLike, removeBlog }) => {

  const [showInfo, setShowInfo] = useState(false)
  const [isOwner, setIsOwner] = useState(false)

  useEffect(() => setIsOwner(blog.user && blog.user.username === user.username), [])

  return (
    <div className="blog-info">
      {blog.title} <button className="toggle-blog" onClick={() => setShowInfo(!showInfo)}>{showInfo ? 'Hide' : 'Show'}</button>
      { showInfo
        ? <>
          <p>{blog.author}</p>
          <p>{`${blog.likes} like(s)`} <button className="like" onClick={() => addLike(blog)}>Like</button></p>
          <p>{blog.url}</p>
          { isOwner
            ? <button className="remove" onClick={() => removeBlog(blog)}>Remove</button>
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
  user: PropTypes.object.isRequired,
  addLike: PropTypes.func.isRequired
}

export default Blog