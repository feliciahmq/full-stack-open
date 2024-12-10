import { test, expect } from '@playwright/test'
import { createBlog, loginWith } from './helper'

test.describe('Blog app', () => {
  test.beforeEach(async ({ page, request }) => {
    await request.post('/api/testing/reset') // reset database and only one user and no blogs in database
    await request.post('/api/users', {
      data: {
        name: 'playwright',
        username: 'playwrighter',
        password: 'playwrightpw'
      }
    })

    await page.goto('/')
  })

  test('Login form is shown', async ({ page }) => {
    const locator = page.getByText('log in to application')
    await expect(locator).toBeVisible()

    await expect(page.getByText('username')).toBeVisible()
    await expect(page.getByText('password')).toBeVisible()
  })

  test.describe('Login', () => {
    test('succeeds with correct credentials', async ({ page }) => {
      await loginWith(page, 'playwrighter', 'playwrightpw')

      await expect(page.getByText('successful login')).toBeVisible()
      await expect(page.getByText('playwright logged-in')).toBeVisible()
    })

    test('fails with wrong credentials', async ({ page }) => {
      await page.getByTestId('username').fill('playwrighter')
      await page.getByTestId('password').fill('wrongpw')
      await page.getByRole('button', { name: 'login' }).click()

      await expect(page.getByText('playwrighter logged-in')).not.toBeVisible()
      await expect(page.getByText('wrong username or password')).toBeVisible()
    })
  })

  test.describe('When logged in', () => {
    test.beforeEach(async ({ page }) => {
      await loginWith(page, 'playwrighter', 'playwrightpw')
    })
  
    test('a new blog can be created', async ({ page }) => {
      await createBlog(page, 'a blog created by playwright', 'playwright', 'playwrighturl')
      await expect(page.getByText('a new blog a blog created by playwright by playwright added')).toBeVisible()      
    })

    test.describe('and several blogs exists', () => {
      test.beforeEach(async ({ page }) => {
        await createBlog(page, 'blog1', 'playwright', 'playwrighturl')
        await createBlog(page, 'blog2', 'playwright', 'playwrighturl')
        await createBlog(page, 'blog3', 'playwright', 'playwrighturl')
      })

      test('each blog can be liked', async ({ page }) => {
        const blogParent = page.locator('.blog', { hasText: 'blog2' })

        await blogParent.getByRole('button', { name: 'view' }).click()
        await blogParent.getByRole('button', { name: 'like' }).click()
        await expect(blogParent.getByText('1')).toBeVisible()
      })
  
      test('user who added the blog can delete it', async ({ page }) => {
        await createBlog(page, 'tobedeleted', 'playwright', 'playwrighturl')

        const blogParent = page.locator('.blog', { hasText: 'tobedeleted' })
        
        // window.confirm dialog, event listerner before remove button is clicked and dialog is shown
        page.on('dialog', async (dialog) => {
          expect(dialog.message()).toBe('Remove blog tobedeleted by playwright')
          await dialog.accept()
        })   

        await blogParent.getByRole('button', { name: 'view' }).click()
        await blogParent.getByRole('button', { name: 'remove' }).click()
        
        await expect(blogParent).not.toBeVisible()
      })
  
      test('user who added the blog sees the delete button', async ({ page, request }) => {
        await request.post('/api/users', {
          data: {
            name: 'test',
            username: 'tester',
            password: 'testpw'
          }
        })

        await page.getByRole('button', { name: 'logout' }).click()
        await loginWith(page, 'tester', 'testpw')

        const blogParent = page.locator('.blog', { hasText: 'blog1' })
        await blogParent.getByRole('button', { name: 'view' }).click()
        
        await expect(blogParent.getByRole('button', { name: 'remove' })).not.toBeVisible()
      })
  
      test('blogs are arranged in order to decreasing likes', async ({ page }) => {
        const blog1 = page.locator('.blog', { hasText: 'blog1' })
        const blog2 = page.locator('.blog', { hasText: 'blog2' })
        const blog3 = page.locator('.blog', { hasText: 'blog3' })

        await blog2.getByRole('button', { name: 'view' }).click()
        await blog2.getByRole('button', { name: 'like' }).click()
        await blog2.getByRole('button', { name: 'like' }).click()

        await blog1.getByRole('button', { name: 'view' }).click()
        await blog1.getByRole('button', { name: 'like' }).click()

        const sortedBlogs = page.locator('.blog')
        await expect(sortedBlogs.nth(0)).toContainText('blog2') // 2 likes
        await expect(sortedBlogs.nth(1)).toContainText('blog1') // 1 likes
        await expect(sortedBlogs.nth(2)).toContainText('blog3') // 0 likes
      })
    })

  })
})