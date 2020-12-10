describe('Dataset page test', function() {
  beforeEach(() => {
    cy.visit('/dataset/AT33.Tirol%202007-2013%20ERDF');
  });

  it('contains dataset name', function (){
    cy.contains("AT33.Tirol 2007-2013 ERDF");
  })
})