describe('Dataset page test', function() {
  beforeEach(() => {
    cy.visit('/dataset/Demo-Repo')
  })

  it('contains dataset name', function (){
    cy.contains('Demo-Repo')
  })
})