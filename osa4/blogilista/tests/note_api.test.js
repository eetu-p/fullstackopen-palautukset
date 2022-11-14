const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')

const api = supertest(app)

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

test("post a blog", async () => {
  const numberOfBlogs = (await api.get("/api/blogs")).body.length
  
  console.log("numberOfBlogs is " + numberOfBlogs)

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

afterAll(() => {
  mongoose.connection.close()
})