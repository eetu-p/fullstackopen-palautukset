import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import Blog from './Blog'
import userEvent from '@testing-library/user-event'

test("only blog title is rendered by default", () => {

  const blog = {
    title: "Blog title",
    author: "Blog author",
    url: "Blog URL",
    likes: 1,
    user: {
      username: "Test user",
      name: "Matti Meikäläinen",
      id: "1234"
    },
    id: "ABCD"
  }

  const user = 	{
		username: "Test user",
		name: "Matti Meikäläinen",
		blogs: [],
		id: "1234"
	}

  render(<Blog blog={blog} user={user} />)

  const titleElement = screen.getByText("Blog title")
  const authorElement = screen.queryByText("Blog author")
  const urlElement = screen.queryByText("Blog URL")
  const likesElement = screen.queryByText("1 like(s)")

  expect(titleElement).toBeDefined()
  expect(authorElement).toBeNull()
  expect(urlElement).toBeNull()
  expect(likesElement).toBeNull()
})

test("all blog info is shown when the show button is pressed", async () => {

  const blog = {
    title: "Blog title",
    author: "Blog author",
    url: "Blog URL",
    likes: 1,
    user: {
      username: "Test user",
      name: "Matti Meikäläinen",
      id: "1234"
    },
    id: "ABCD"
  }

  const userInfo = 	{
		username: "Test user",
		name: "Matti Meikäläinen",
		blogs: [],
		id: "1234"
	}

  render(<Blog blog={blog} user={userInfo} />)

  const user = userEvent.setup()
  const button = screen.getByText("Show")
  await user.click(button)

  const titleElement = screen.getByText("Blog title")
  const authorElement = screen.getByText("Blog author")
  const urlElement = screen.getByText("Blog URL")
  const likesElement = screen.getByText("1 like(s)")

  expect(titleElement).toBeDefined()
  expect(authorElement).toBeDefined()
  expect(urlElement).toBeDefined()
  expect(likesElement).toBeDefined()
})