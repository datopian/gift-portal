describe('index page test', function() {
  beforeEach(() => {
    cy.visit('/');
  });

  it('renders portal', function (){
    cy.contains("DataSet");
    cy.contains("search datasets");
    cy.contains("GIFT's website");
  })
})