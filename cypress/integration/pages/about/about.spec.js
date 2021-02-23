describe('Dataset page test', function() {
  
  it('contains about property 1', function (){
    cy.visit('/about/gift2')
    cy.contains('Title: Gift v2.0 dataset')
    cy.contains('author: Nicky Vibes')
  })
  it('contains about property 2', function (){
    cy.visit('/about/gift1')
    cy.contains('Title: Gift dataset')
    cy.contains('date: Dec 3 2020')
  })
})