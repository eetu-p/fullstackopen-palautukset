describe('Blog app', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    const user1 = {
      username: 'Test user 1',
      name: 'Maija Meikäläinen',
      password: '1234'
    }
    const user2 = {
      username: 'Test user 2',
      name: 'Matti Meikäläinen',
      password: '1234'
    }
    cy.request('POST', 'http://localhost:3003/api/users', user1)
    cy.request('POST', 'http://localhost:3003/api/users', user2)
    cy.visit('http://localhost:3000')
  })

  it('Login form is shown', function() {
    cy.contains('Log in to application')
  })

  describe('Login', function() {
    it('succeeds with correct credentials', function() {
      cy.get('#username').type('Test user 1')
      cy.get('#password').type('1234')
      cy.contains('Login').click()
      cy.contains('Logged in as Test user 1.')
    })

    it('fails with wrong credentials', function() {
      cy.get('#username').type('Test user 1')
      cy.get('#password').type('Wrong password')
      cy.contains('Login').click()
      cy.get('#notification')
        .should('contain', 'wrong credentials')
        .and('have.css', 'background-color', 'rgb(255, 182, 193)')
      cy.get('html').should('not.contain', 'Logged in as Test user 1.')
    })
  })

  describe('When logged in', function() {
    beforeEach(function() {
      cy.get('#username').type('Test user 1')
      cy.get('#password').type('1234')
      cy.contains('Login').click()
    })

    it('A blog can be created', function() {
      cy.contains('New blog').click()
      cy.get('#title').type('Test title')
      cy.get('#author').type('Test author')
      cy.get('#url').type('Test URL')
      cy.get('#create-button').click()
      cy.contains('Test title')
      cy.contains('Show').click()
      cy.contains('Test author')
      cy.contains('0 like(s)')
      cy.contains('Test URL')
    })

    it('A blog can be liked', function() {
      cy.contains('New blog').click()
      cy.get('#title').type('Test title')
      cy.get('#author').type('Test author')
      cy.get('#url').type('Test URL')
      cy.get('#create-button').click()
      cy.contains('Show').click()
      cy.contains('0 like(s)')
      cy.contains('Like').click()
      cy.contains('1 like(s)')
    })

    it('A blog can be removed', function() {
      cy.contains('New blog').click()
      cy.get('#title').type('Test title')
      cy.get('#author').type('Test author')
      cy.get('#url').type('Test URL')
      cy.get('#create-button').click()
      cy.get('#logout').click()

      cy.get('#username').type('Test user 2')
      cy.get('#password').type('1234')
      cy.contains('Login').click()
      cy.contains('Test title')
      cy.contains('Show').click()
      cy.get('html').should('not.contain', 'Remove')
      cy.get('#logout').click()

      cy.get('#username').type('Test user 1')
      cy.get('#password').type('1234')
      cy.contains('Login').click()
      cy.contains('Test title')
      cy.contains('Show').click()
      cy.contains('Remove').click()
      cy.get('html').should('not.contain', 'Test title')
    })

    it('Blogs are ordered by likes', function () {
      cy.contains('New blog').click()
      cy.get('#title').type('Blog with 0 likes')
      cy.get('#author').type('Test author')
      cy.get('#url').type('Test URL')
      cy.get('#create-button').click()
      cy.wait(100)

      cy.contains('New blog').click()
      cy.get('#title').type('Blog with 1 like')
      cy.get('#author').type('Test author')
      cy.get('#url').type('Test URL')
      cy.get('#create-button').click()
      cy.get('.toggle-blog').eq(1).click()
      cy.get('.like').eq(0).click()

      cy.contains('New blog').click()
      cy.get('#title').type('Blog with 2 likes')
      cy.get('#author').type('Test author')
      cy.get('#url').type('Test URL')
      cy.get('#create-button').click()
      cy.get('.toggle-blog').eq(2).click()
      cy.get('.like').eq(1).click()
      cy.wait(100)
      cy.get('.like').eq(1).click()

      cy.get('.blog-info').eq(0).should('contain', 'Blog with 2 likes')
      cy.get('.blog-info').eq(1).should('contain', 'Blog with 1 like')
      cy.get('.blog-info').eq(2).should('contain', 'Blog with 0 likes')
    })
  })
})