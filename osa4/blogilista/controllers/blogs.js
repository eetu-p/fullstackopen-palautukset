const cors = require('cors')
const config = require("../utils/config")
const Blog = require("../models/blog")
const mongoose = require('mongoose')
require("dotenv/config")
const express = require("express")
const blogsRouter = express.Router()
const jwt = require('jsonwebtoken')
const middleware = require('../utils/middleware')

const mongoUrl = config.MONGODB_URI
mongoose.connect(mongoUrl)

blogsRouter.use(cors())
blogsRouter.use(express.json())

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog
    .find({})
    .populate("user", { username: 1, name: 1, id: 1 })

  response.json(blogs)
})

blogsRouter.post('/', middleware.userExtractor, async (request, response) => {

  if (!request.body.title && !request.body.url) {
    return response.status(400).json({ error: "missing fields" })
  }

  const decodedToken = jwt.verify(request.token, process.env.SECRET)
  if (!request.token || !decodedToken.id) {
    return response.status(401).json({ error: 'token missing or invalid' })
  }
  const user = request.user
  
  const blog = new Blog({
    title: request.body.title,
    author: request.body.author,
    url: request.body.url,
    likes: request.body.likes ? request.body.likes : 0,
    user: user._id
  })

  const savedBlog = await blog.save()
  user.blogs = user.blogs.concat(savedBlog._id)
  await user.save()

  response.status(201).json(savedBlog)
})

blogsRouter.delete("/:id", middleware.userExtractor, async (request, response) => {
  const id = request.params.id

  const decodedToken = jwt.verify(request.token, process.env.SECRET)
  if (!request.token || !decodedToken.id) {
    return response.status(401).json({ error: 'token missing or invalid' })
  }

  const user = request.user
  const blog = await Blog.findById(id)
  console.log("user: " + user)
  console.log("blog: " + blog)

  if (!blog) {
    return response.status(404).json({ error: "blog not found" })
  } else if (user.id.toString() !== blog.user.toString()) {
    return response.status(400).json({ error: 'can\'t delete someone else\'s blog' })
  }

  await Blog.findByIdAndDelete(id)
  response.status(204).end()
})

blogsRouter.put("/:id", async (request, response) => {
  const id = request.params.id
  const updatedBlog = await Blog.findByIdAndUpdate(id, request.body, { new: true })
  response.status(201).json(updatedBlog)
})

module.exports = blogsRouter