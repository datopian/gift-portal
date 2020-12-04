describe('Dataset page test', function() {
  beforeEach(() => {
    cy.visit('/dataset/paraguay');
  });

  it('contains dataset name', function (){
    cy.contains("Presupuesto de Gastos de la Nación - Paraguay");
  })
})