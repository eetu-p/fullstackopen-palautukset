describe('Blog app', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    const user = {
      username: "Test user 1",
      name: "Maija Meikäläinen",
      password: "1234"
    }
    cy.request('POST', 'http://localhost:3003/api/users/', user) 
    cy.visit('http://localhost:3000')
  })

  it('Login form is shown', function() {
    cy.contains("Log in to application")
  })

  describe('Login', function() {
    it('succeeds with correct credentials', function() {
      cy.get("#username").type("Test user 1")
      cy.get("#password").type("1234")
      cy.contains("Login").click()
      cy.contains("Logged in as Test user 1.")
    })

    it('fails with wrong credentials', function() {
      cy.get("#username").type("Test user 1")
      cy.get("#password").type("Wrong password")
      cy.contains("Login").click()
      cy.get("#notification")
        .should("contain", "wrong credentials")
        .and("have.css", "background-color", "rgb(255, 182, 193)")
      cy.get("html").should("not.contain", "Logged in as Test user 1.")
    })
  })
})