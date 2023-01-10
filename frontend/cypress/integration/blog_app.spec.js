/* eslint-disable no-undef */
describe('Blog app', function () {
  beforeEach(function () {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    const user = {
      name: 'test_name1',
      username: 'test_username1',
      password: 'test_password1',
    }
    cy.request('POST', 'http://localhost:3003/api/users/', user)

    cy.visit('http://localhost:3003')
  })

  it('Login form is shown', function () {
    cy.contains('log in to application')
    cy.contains('login')
  })

  describe('Login', function () {
    it('succeeds with correct credentials', function () {
      cy.contains('username:').find('input').type('test_username1')
      cy.contains('password:').find('input').type('test_password1')
      cy.contains('login').click()

      cy.contains('blogs')
    })

    it('fails with wrong credentials', function () {
      cy.contains('username:').find('input').type('asdfg')
      cy.contains('password:').find('input').type('asdfg')
      cy.contains('login').click()

      cy.contains('wrong username or password')
    })
  })

  describe('When logged in', function () {
    beforeEach(function () {
      cy.login({ username: 'test_username1', password: 'test_password1' })
    })

    it('A blog can be created', function () {
      cy.contains('create new blog').click()

      cy.contains('title:').find('input').type('title1')
      cy.contains('author:').find('input').type('author1')
      cy.contains('url:').find('input').type('url1')

      cy.get('#create-button').click()
      cy.contains('a new blog title1 by author1 added')
    })

    describe('and several blogs exist', function () {
      beforeEach(function () {
        cy.createBlog({
          title: 'title1',
          author: 'author1',
          url: 'url1',
        })
        cy.createBlog({
          title: 'title2',
          author: 'author2',
          url: 'url2',
        })
        cy.createBlog({
          title: 'title3',
          author: 'author3',
          url: 'url3',
        })
      })

      it('users can like a blog', function () {
        cy.contains('title2 author2').find('button').click()
        cy.contains('likes 0').find('button').click()
        cy.contains('likes 1')
      })

      it('users can like a delete a blog', function () {
        cy.contains('title2 author2').find('button').click()
        cy.contains('remove').click()
      })

      describe('existing blogs are liked', function () {
        beforeEach(function () {
          cy.contains('title2 author2').find('button').click()
          cy.contains('likes 0').find('button').click()
          cy.contains('likes 1', { timeout: 4000 }).find('button').click()
          cy.contains('title2 author2').find('button').click()

          cy.contains('title3 author3').find('button').click()
          cy.contains('likes 0').find('button').click()
          cy.contains('title3 author3').find('button').click()

          cy.visit('http://localhost:3003')
        })

        it.only('blogs are sorted in the order of likes', function () {
          cy.get('.hiddenBlog').then((blogs) => {
            cy.wrap(blogs[0]).should('contain', 'title2 author2')
            cy.wrap(blogs[1]).should('contain', 'title3 author3')
            cy.wrap(blogs[2]).should('contain', 'title1 author1')
          })
        })
      })
    })
  })
})
