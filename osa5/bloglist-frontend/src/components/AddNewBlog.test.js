import React from 'react'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import { AddNewBlog } from './AddNewBlog'
import userEvent from '@testing-library/user-event'

test('<AddNewBlog /> callback function has right information', async () => {
  const user = userEvent.setup()
  const addNewBlog = jest.fn()

  const { container } = render(<AddNewBlog addNewBlog={addNewBlog} />)

  const titleInput = container.querySelector('#title')
  const authorInput = container.querySelector('#author')
  const urlInput = container.querySelector('#url')
  const createButton = screen.getByText('Create')

  await user.type(titleInput, 'Blog title')
  await user.type(authorInput, 'Blog author')
  await user.type(urlInput, 'Blog URL')
  await user.click(createButton)

  expect(addNewBlog.mock.calls).toHaveLength(1)
  expect(addNewBlog.mock.calls[0][0]).toStrictEqual({ title: 'Blog title', author: 'Blog author', url: 'Blog URL' })
})