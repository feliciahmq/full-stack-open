const supertest = require('supertest')
const bcrypt = require('bcrypt')
const mongoose = require('mongoose')
const helper = require('./test_helper')
const app = require('../app') // express app not listening to any ports
const api = supertest(app)

const Blog = require('../models/blog')
const User = require('../models/user')

jest.setTimeout(30000); 

beforeEach(async () => {
  await User.deleteMany({})
  await Blog.deleteMany({})

  const passwordHash = await bcrypt.hash("blogtestpw", 10)
  const user = new User({
    username: "blogtest",
    name: "blogtester",
    blogs: [],
    passwordHash
  })

  const savedUser = await user.save()
  const blogObjects = helper.initialBlogs
    .map(b => new Blog({
      title: b.title,
      author: b.author,
      url: b.url,
      user: savedUser._id, // mock user
      likes: b.likes ? b.likes : 0
    }))

  const promiseArray = blogObjects.map(b => {
    b.save()
    savedUser.blogs = savedUser.blogs.concat(b._id) // add blog to user
  })
  await Promise.all(promiseArray) // waits until every promise for saving a blog is finished (database has been initialised)
  await savedUser.save()
})

describe('when there is initially some blogs saved', () => {

  test('blogs are returned as json', async () => {
    await api
      .get('/api/blogs')
      .expect(200) // status code
      .expect('Content-Type', /application\/json/)
  })

  test('all blogs are returned', async () => {
    const response = await api.get('/api/blogs')
    
    expect(response.body).toHaveLength(helper.initialBlogs.length)
  })

  test('unique identifier property of blog posts is named id', async () => {
    const blogsAtStart = await helper.blogsInDb()
    const blogToView = blogsAtStart[0]

    const result = await api
      .get(`/api/blogs/${blogToView.id}`)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    expect(result).toBeDefined()
  })

})

describe('viewing a specific blog', () => {

  test('fails with statuscode 404 if blog does not exist', async () => {
    const validNonexistingId = await helper.nonExistingId()

    await api
      .get(`/api/blogs/${validNonexistingId}`)
      .expect(404)
  })

  test('fails with statuscode 400 if id is invalid', async () => {
    const invalidId = '5a3d5da59070081a82a3445'

    await api 
      .get(`/api/blogs/${invalidId}`)
      .expect(400)
  })
})

describe('addition of a new blog', () => {

  test('succeeds with valid data by authorized user', async () => {
    const user = {
      username: "blogtest",
      password: "blogtestpw"
    }

    const loginUser = await api
      .post('/api/login')
      .send(user)
    
    const newBlog = {
      title: 'Go To Statement Considered Good',
      author: 'Edsger W. Dijkstra',
      url: 'https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf',
      likes: 8
    }

    await api
      .post('/api/blogs')
      .send(newBlog)
      .set('Authorization', `Bearer ${loginUser.body.token}`)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1)

    const contents = blogsAtEnd.map(r => r.title) // by title
    expect(contents).toContain('Go To Statement Considered Good')
  })

  test('fails by unauthorized user', async () => {
    const newBlog = {
      title: 'Go To Statement Considered Good',
      author: 'Edsger W. Dijkstra',
      url: 'https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf',
      likes: 8
    }

    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(401)
      .expect('Content-Type', /application\/json/)
    
    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length)

    const contents = blogsAtEnd.map(r => r.title) // by title
    expect(contents).not.toContain('Go To Statement Considered Good')
  })

  test('without likes will default to 0', async () => {
    const user = {
      username: "blogtest",
      password: "blogtestpw"
    }

    const loginUser = await api
      .post('/api/login')
      .send(user)

    const newBlog = {
      title: 'Go To Statement Considered Good',
      author: 'Edsger W. Dijkstra',
      url: 'https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf'
    }

    await api 
      .post('/api/blogs')
      .send(newBlog)
      .expect(201)
      .set('Authorization', `Bearer ${loginUser.body.token}`)
      .expect('Content-Type', /application\/json/)
    
      const blogsAtEnd = await helper.blogsInDb()
      const createdBlog = blogsAtEnd.find(b => b.title === newBlog.title)
      
      expect(createdBlog.likes).toEqual(0)
  })

  test('title missing returns 400 Bad Request', async () => {
    const user = {
      username: "blogtest",
      password: "blogtestpw"
    }

    const loginUser = await api
      .post('/api/login')
      .send(user)

    const newBlog = {
      author: 'Edsger W. Dijkstra',
      url: 'https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf',
      likes: 8
    }

    await api 
      .post('/api/blogs')
      .send(newBlog)
      .expect(400)
      .set('Authorization', `Bearer ${loginUser.body.token}`)

    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length)
  })

  test('url missing returns 400 Bad Request', async () => {
    const user = {
      username: "blogtest",
      password: "blogtestpw"
    }

    const loginUser = await api
      .post('/api/login')
      .send(user)

    const newBlog = {
      title: 'Go To Statement Considered Good',
      author: 'Edsger W. Dijkstra',
      likes: 8
    }

    await api 
      .post('/api/blogs')
      .send(newBlog)
      .expect(400)
      .set('Authorization', `Bearer ${loginUser.body.token}`)

    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length)
  })
})

describe('blog post', () => {
  test('delete a post succeeds with statuscode 204 if id is valid', async () => {
    const user = {
      username: "blogtest",
      password: "blogtestpw"
    }

    const loginUser = await api
      .post('/api/login')
      .send(user)

    const blogsAtStart = await helper.blogsInDb()
    const blogToDelete = blogsAtStart[0]

    await api 
      .delete(`/api/blogs/${blogToDelete.id}`)
      .expect(204)
      .set('Authorization', `Bearer ${loginUser.body.token}`)

    const blogsAtEnd = await helper.blogsInDb()

    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length - 1)

    const contents = blogsAtEnd.map(r => r.title)
    expect(contents).not.toContain(blogToDelete.title)
  })

  test('update likes succeeds with statuscode 200 if id is valid', async () => {
    const user = {
      username: "blogtest",
      password: "blogtestpw"
    }

    const loginUser = await api
      .post('/api/login')
      .send(user)

    const blogsAtStart = await helper.blogsInDb()
    const blogToUpdate = blogsAtStart[0]

    const newBlog = {
      title: blogToUpdate.title,
      author: blogToUpdate.author,
      url: blogToUpdate.url,
      likes: 200
    }

    await api 
      .put(`/api/blogs/${blogToUpdate.id}`)
      .send(newBlog)
      .expect(200)
      .set('Authorization', `Bearer ${loginUser.body.token}`)
      .expect('Content-Type', /application\/json/)

    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtStart).toHaveLength(blogsAtEnd.length)
    
    const updatedBlog = blogsAtEnd.find(b => b.id === blogToUpdate.id)
    expect(updatedBlog.likes).toEqual(200)
  })
})

afterAll(async () => {
  await mongoose.connection.close()
})