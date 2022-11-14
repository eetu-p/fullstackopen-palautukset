const cors = require('cors')
const config = require("../utils/config")
const Blog = require("../models/blog")
const mongoose = require('mongoose')
require("dotenv/config")
const express = require("express")
const blogsRouter = express.Router()

const mongoUrl = config.MONGODB_URI
mongoose.connect(mongoUrl)

blogsRouter.use(cors())
blogsRouter.use(express.json())

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({})
  response.json(blogs)
})

blogsRouter.post('/', async (request, response) => {
  const blog = new Blog(request.body)
  if (!blog.title && !blog.url) {
    response.status(400).send({ error: "missing fields"})
  } else {
    const savedBlog = await blog.save()
    response.status(201).json(savedBlog)
  }
})

blogsRouter.delete("/:id", async (request, response) => {
  const id = request.params.id
  await Blog.findByIdAndDelete(id)
  response.status(204).end()
})

blogsRouter.put("/:id", async (request, response) => {
  const id = request.params.id
  const updatedBlog = await Blog.findByIdAndUpdate(id, request.body, { new: true })
  response.status(201).json(updatedBlog)
})

module.exports = blogsRouter