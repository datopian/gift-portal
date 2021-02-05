describe('Dataset page test', function() {
  beforeEach(() => {
    cy.visit('/dataset/presupuesto-de-uruguay')
  })

  it('contains dataset name', function (){
    cy.contains('Presupuesto de Uruguay')
  })
})