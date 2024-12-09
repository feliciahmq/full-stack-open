import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import AddBlogForm from './AddBlogForm'

test('<AddBlogForm /> calls createBlog props with the right details', async () => {
  const mockHandler = vi.fn()
  const user = userEvent.setup()

  render(<AddBlogForm createBlog={mockHandler} />)

  const title = screen.getByPlaceholderText('write title here')
  const author = screen.getByPlaceholderText('write author here')
  const url = screen.getByPlaceholderText('write url here')

  await user.type(title, 'titletest')
  await user.type(author, 'authortest')
  await user.type(url, 'urltest')
  await user.click(screen.getByText('create'))

  expect(mockHandler.mock.calls).toHaveLength(1)

  console.log(mockHandler.mock.calls)
  expect(mockHandler.mock.calls[0][0].title).toBe('titletest')
  expect(mockHandler.mock.calls[0][0].author).toBe('authortest')
  expect(mockHandler.mock.calls[0][0].url).toBe('urltest')
})