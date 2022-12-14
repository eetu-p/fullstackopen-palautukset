import { useState } from "react"

export const AddNewBlog = ({ addNewBlog }) => {

  const [title, setTitle] = useState("")
  const [author, setAuthor] = useState("")
  const [url, setUrl] = useState("")

  const handleAddBlog = async event => {
    event.preventDefault()
    await addNewBlog({ title, author, url })
    setTitle("")
    setAuthor("")
    setUrl("")
  }

  return (
    <form onSubmit={event => handleAddBlog(event)}>
      <h3>Create new blog</h3>
      <div>
        <label>Title </label>
        <input type="text" value={title} onChange={({ target }) => setTitle(target.value)} />
      </div>
      <div>
        <label>Author </label>
        <input type="text" value={author} onChange={({ target })=> setAuthor(target.value)} />
      </div>
      <div>
        <label>URL </label>
        <input type="text" value={url} onChange={({ target }) => setUrl(target.value)} />
      </div>
      <button type="submit">Create</button>
    </form>
  )
}