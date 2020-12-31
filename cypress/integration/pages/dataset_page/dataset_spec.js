describe('Dataset page test', function() {
  beforeEach(() => {
    cy.visit('/dataset/presupuesto-mexico-2008-2019');
  });

  it('contains dataset name', function (){
    cy.contains('Presupuesto México 2008-2019');
  });
});