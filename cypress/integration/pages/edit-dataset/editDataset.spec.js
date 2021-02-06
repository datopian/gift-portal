import 'cypress-file-upload';

describe('Create dataset workflow using a csv file', ()=> {
  it('should create a dataset', ()=> {
    cy.intercept({
      method: 'GET',
      url: '/api/auth/session'
    }, {fixture: 'user.json'})
    
    cy.log('Acess the dashboard Page and see 2 items on the list')
    cy.visit('/dashboard')

    cy.log('Select the item with the label: Edit Fiscal Data Schema')
    cy.get('#dashboard-list').find('.edit-schema').first().click()

    cy.log('Select Chose a file to upload')
    cy.get('.upload-choose').find('.choose-btn').first().click()
    
    cy.log('Attach a csv file')
    cy.get('.upload-area__drop__input')
      .attachFile('neighbourhoods.csv', { subjectType: 'drag-n-drop'})

    cy.log('Mock the response from Giftless server')
    cy.intercept({
      method: 'POST', 
      // eslint-disable-next-line max-len
      url: 'https://giftless-gift.herokuapp.com/gift-data/MDEwOlJlcG9zaXRvcnkzMzMwNzgyMDM=/objects/batch'
    }, {
      transfers:["multipart-basic","basic"],
      operation:'upload',
      objects:[
        {
          oid:"fb0710c22d13ec34fb33b7bddc294bdc9cb0a1e95a84df1f9f",
          size:2020
        }
      ],
      ref:{
        name:"refs/heads/master"
      }
    })

    cy.log('Display a Preview of dataset information and a next button')
    cy.get('.resource-edit-actions').find('.btn').click()

    //TODO: update datapackage that match with the example
    // cy.log('Describe the dataset Rich Type fields')
    // cy.get('.table-schema-info_table')
    //   .find('tr').eq(5)
    //   .find('td').eq(0)
    //   .click()
    // // eslint-disable-next-line max-len
    //   .type('activity:generic:contract:code')
    //   .type('{enter}')

    // cy.get('.table-schema-info_table')
    //   .find('tr').eq(5)
    //   .find('td').eq(1)
    //   .click()
    // // eslint-disable-next-line max-len
    //   .type('activity:generic:contract:code')
    //   .type('{enter}')

    // cy.log('Click next button if fiealds are ok')
    // cy.get('.resource-edit-actions')
    //   .find('.btn').click()

    // cy.log('Add description')
    // cy.get('.metadata-input__textarea').type('Cypress description test')

    // cy.log('Upload datapackage.json')
    // cy.intercept({
    //   method: 'POST',
    //   url: 'http://localhost:3000/api/dataset/Dashboard-demo'
    // },{})
    
    // cy.get('.resource-edit-actions').find('button').eq(0).click()

  })
})