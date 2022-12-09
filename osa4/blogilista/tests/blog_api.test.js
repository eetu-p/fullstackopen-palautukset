const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const Blog = require('../models/blog')

const initialBlogs = [
  {
    title: "Test blog 1",
    author: "Matti Meikäläinen",
    url: "https://fullstackopen.com",
    likes: 13
  },
  {
    title: "Test blog 2",
    author: "Matti Meikäläinen",
    url: "",
  },
  {
    title: "Test blog 3",
    author: "Maija Meikäläinen",
    url: "https://fullstackopen.com"
  }
]

beforeEach(async () => {
  await Blog.deleteMany({})
  let blogObject = new Blog(initialBlogs[0])
  await blogObject.save()
  blogObject = new Blog(initialBlogs[1])
  await blogObject.save()
})

test('return blogs JSON', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

test("identifying field is called id", async () => {
  const response = await api.get("/api/blogs")

  for (let i = 0; i < response.body.length; i++) {
    expect(response.body[i].id).toBeDefined()
  }
})

test("blog likes are always defined", async () => {
  const body = {
    "title": "Test blog",
    "author": "Test author",
    "url": "https://test",
  }

  const response = await api
    .post("/api/blogs")
    .set("Content-Type", "application/json")
    .send(body)

  expect(response.body.likes).toBe(0)
})

test("post a blog", async () => {
  const numberOfBlogs = (await api.get("/api/blogs")).body.length
  
  const body = {
    "title": "Test blog",
    "author": "Test author",
    "url": "https://test",
    "likes": 1
  }

  const response = await api
    .post("/api/blogs")
    .set('Content-Type', "application/json")
    .send(body)

  expect(response.body.title).toBe("Test blog")
  expect(response.body.author).toBe("Test author")
  expect(response.body.url).toBe("https://test")
  expect(response.body.likes).toBe(1)
  expect(response.body.id).toBeDefined()

  const blogs = await api.get('/api/blogs')
  expect(blogs.body.length).toBe(numberOfBlogs + 1)
})

test("get 400 response if title and url aren't defined", async () => {
  const newBlog = {
    author: "Test author",
    likes: 43
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(400)
})

test("delete blog", async () => {
  let blogs = await api.get("/api/blogs")
  const idToDelete = blogs.body[0].id
  const numberOfBlogs = blogs.body.length

  await api
    .delete(`/api/blogs/${idToDelete}`)
    .expect(204)

  blogs = await api.get("/api/blogs")
  expect(blogs.body.length).toBe(numberOfBlogs - 1)
})

test("update blog", async () => {
  let blogs = await api.get("/api/blogs")
  const idToUpdate = blogs.body[0].id

  const updatedBlog = {
    title: "Updated blog",
    author: "Updated author",
    url: "Updated URL",
    likes: 1
  }

  await api
    .put(`/api/blogs/${idToUpdate}`)
    .set("Content-Type", "application/json")
    .send(updatedBlog)

  blogs = await api.get("/api/blogs")

  expect(blogs.body[0].title).toBe("Updated blog")
  expect(blogs.body[0].author).toBe("Updated author")
  expect(blogs.body[0].url).toBe("Updated URL")
  expect(blogs.body[0].likes).toBe(1)
  expect(blogs.body[0].id).toBe(idToUpdate)
})

afterAll(() => {
  mongoose.connection.close()
})