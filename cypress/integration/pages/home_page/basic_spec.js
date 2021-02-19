describe('index page test', function() {
  beforeEach(() => {
    cy.visit('/')
  })

  it('renders portal', function (){
    cy.contains('Datasets')
    cy.contains('GIFT\'s website')
  })
})
