import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'

test('renders content', () => {
  const blog = {
    title: 'Test title',
    author: 'Test author',
    url: 'Test url',
    likes: 18
  }

  const { container } = render(<Blog blog={blog} />)
  const div = container.querySelector('.blog')

  expect(div).toHaveTextContent('Test title Test author')
})

test('renders content after clicking view button', async () => {
  const blog = {
    title: 'Test title',
    author: 'Test author',
    url: 'Test url',
    likes: 18
  }


  const { container } = render(<Blog blog={blog} />)
  const user = userEvent.setup()
  await user.click(screen.getByText('view'))
  const div = container.querySelector('.visibleBlog')

  expect(div).toHaveTextContent('Test url')
  expect(div).toHaveTextContent('18')
})

test('clicking the like button twice calls event handler twice', async () => {
  const blog = {
    title: 'Test title',
    author: 'Test author',
    url: 'Test url',
    likes: 18
  }

  const mockHandler = vi.fn()

  render(<Blog blog={blog} addLike={mockHandler} />)

  const user = userEvent.setup()
  await user.click(screen.getByText('view'))
  const button = screen.getByText('like')
  await user.click(button)
  await user.click(button)

  expect(mockHandler.mock.calls).toHaveLength(2)
})