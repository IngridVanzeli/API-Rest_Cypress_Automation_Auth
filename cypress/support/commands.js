/// <reference types="cypress"/> 

Cypress.Commands.add('createToken', (user, password) => {
  cy.request({
    method: 'POST',
    url: '/auth',
    body: {
      username: user,
      password: password
    },
    headers: { 'Content-Type': 'application/json' }
  }).then((response) => {
    expect(response.status).to.eq(200)
    return cy.wrap(response.body.token)
  })
})


Cypress.Commands.add('createBooking', (body) => {
    cy.request({
            method: 'POST',
            url:"/booking",
            body: body,
            failOnStatusCode: false,
            headers: {'Content-Type': 'application/json'}
        }).then((response) =>{
            return response
        })  
});

Cypress.Commands.add('updateBooking', (body, id, token) => {
    cy.request({
    method: 'PUT',
    url: `/booking/${id}`,
    body: body,
    failOnStatusCode: false,
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Cookie': `token=${token}`
    },
    withCredentials: true
  }).then((response)=>{
            return response
    })
});

Cypress.Commands.add('getBookingId', (id) => {
    cy.request({
            method: 'GET',
            url: `/booking/${id}`,
            failOnStatusCode: false,
            headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        }
        }).then((response)=>{
            return response
        })
 });

 Cypress.Commands.add('getBooking', (param) => {
    cy.request({
            method: 'GET',
            url: `/booking${param}`,
            failOnStatusCode: false,
            headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        }
        }).then((response)=>{
            return response
        })
 });

Cypress.Commands.add('deleteBooking', (id,token) => {
    cy.request({
        method: 'DELETE',
        url: `/booking/${id}`,
        failOnStatusCode: false,
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Cookie': `token=${token}`
        }
        }).then((response) =>{
            return response
        })  
})

