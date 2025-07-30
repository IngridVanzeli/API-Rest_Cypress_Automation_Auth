/// <reference types="cypress"/> 
describe("Update Booking", () => {

  const payload_create = require('../fixtures/create_booking.json')

  var token = ""
  var idbooking = ""

  beforeEach('Create Token', () => {
    cy.createToken('admin', 'password123').then((response) => {
      token = response

      cy.createBooking(payload_create).then((response_post) => {
        expect(response_post.status).to.eq(200)
        idbooking = response_post.body.bookingid
      })
    })
  })

  function validarErro(response, statusEsperado, mensagemEsperada) {
    expect(response.status).to.eq(statusEsperado)
    expect(response.body).to.eq(mensagemEsperada)
  }

  it('Deleting booking with a valid token', () => {
    cy.deleteBooking(idbooking, token).then((response) => {
      expect(response.status).to.eq(201)
      expect(response.body).to.eq("Created")
    })
  })

  it('Deleting bookling without authentication', () => {
    cy.deleteBooking("", token).then((response) => {
      validarErro(response,404,'Not Found')
    })
  })

  it('Deleting booking with an invalid token', () => {
    cy.deleteBooking(idbooking, "").then((response) => {
      validarErro(response,403,'Forbidden')
    })

  })

})