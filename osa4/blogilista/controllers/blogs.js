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

blogsRouter.post('/', (request, response) => {
  const blog = new Blog(request.body)

  blog
    .save()
    .then(result => {
      response.status(201).json(result)
    })
})

module.exports = blogsRouter