describe('Dashboard Page', ()=> {
  
  it('should return a message if user not logged', ()=> {
    cy.visit('/dashboard')
    cy.contains('Please log in to see the dashboard.')
  })

  it('should return a list of dashboards if the user is logged', ()=> {
    cy.intercept({
      method: 'GET',
      url: '/api/auth/session'
    }, {fixture: 'user.json'})
    
    cy.visit('/dashboard')

    cy.get('#dashboard-list')
  })
})