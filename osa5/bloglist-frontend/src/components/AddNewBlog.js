import { useState } from 'react'
import PropTypes from 'prop-types'

export const AddNewBlog = ({ addNewBlog }) => {

  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const handleAddBlog = async event => {
    event.preventDefault()
    await addNewBlog({ title, author, url })
    setTitle('')
    setAuthor('')
    setUrl('')
  }

  return (
    <form onSubmit={event => handleAddBlog(event)}>
      <h3>Create new blog</h3>
      <div>
        <label>Title </label>
        <input id="title" type="text" value={title} onChange={({ target }) => setTitle(target.value)} />
      </div>
      <div>
        <label>Author </label>
        <input id="author" type="text" value={author} onChange={({ target }) => setAuthor(target.value)} />
      </div>
      <div>
        <label>URL </label>
        <input id="url" type="text" value={url} onChange={({ target }) => setUrl(target.value)} />
      </div>
      <button id="create-button" type="submit">Create</button>
    </form>
  )
}

AddNewBlog.propTypes = {
  addNewBlog: PropTypes.func.isRequired
}