import { useState } from "react"
import blogService from "../services/blogs"

const Blog = ({blog}) => {

  const [showInfo, setShowInfo] = useState(false)

  const addLike = blog => {
    const updatedBlog = {
      ...blog,
      user: blog.user._id,
      likes: blog.likes + 1
    }
    blogService.update(blog.id, updatedBlog)
  }

  return (
    <div className="blog-info">
      {blog.title} <button onClick={() => setShowInfo(!showInfo)}>{showInfo ? "Hide" : "Show"}</button>
      { showInfo 
        ? <>
            <p>{blog.author}</p>
            <p>{`${blog.likes} like(s)`} <button onClick={() => addLike(blog)}>Like</button></p>
            <p>{blog.url}</p>
          </>
        : null
      }
    </div>
  )  
}

export default Blog