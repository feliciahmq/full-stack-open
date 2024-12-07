const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const jwt = require('jsonwebtoken')

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog
    .find({}).populate('user', { username: 1, name: 1 })
    // when we define schema with the ref
  response.json(blogs)
})

// login first, then can post blog with token
blogsRouter.post('/', async (request, response) => {
  const body = request.body
  const user = request.user // alr extracted from token via userExtractor
  if (!user) {
    return response.status(401).json({ error: 'token invalid' })
  }
  
	const blog = new Blog({
		title: body.title,
		author: body.author,
		url: body.url,
		likes: body.likes? body.likes : 0,
    user: user.id
	})

	if(!body.title || !body.url){
		response.status(400).json({ error: 'title and url are required' })
	} else{
		const savedBlog = await blog.save()
    user.blogs = user.blogs.concat(savedBlog._id)
    await user.save() 
		
		response.status(201).json(savedBlog)
	}  
})

blogsRouter.get('/:id', async (request, response) => {
  const blog = await Blog.findById(request.params.id)
  if (blog) {
    response.json(blog)
  } else {
    response.status(404).end()
  }
})

blogsRouter.delete('/:id', async (request, response) => {
  const user = request.user // alr extracted from token via userExtractor
  if (!user) {
    return response.status(404).json({ error: 'token invalid' })
  }

  const blog = await Blog.findById(request.params.id) // to be deleted
  if (!blog) {
    return response.status(404).json({ error: 'blog not found' })
  }

  if (blog.user.toString() !== request.user.id.toString()) {
    return response.status(401).json({ error: 'unauthorized to delete the blog'})
  } else {
    await Blog.findByIdAndDelete(request.params.id)
    response.status(204).end()
  }
})

blogsRouter.put('/:id', async (request, response) => {
  const { likes } = request.body

  const updatedBlog = await Blog.findByIdAndUpdate(
    request.params.id,
    { likes },
    { new: true, runValidators: true }
  )

  if (updatedBlog) {
    response.status(200).json(updatedBlog)
  } else {
    response.status(404).end()
  }
})

module.exports = blogsRouter