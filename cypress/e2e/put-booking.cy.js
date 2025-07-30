/// <reference types="cypress"/>

describe("Update Booking", () => {

  const payload_create = require('../fixtures/create_booking.json')
  const payload_update = require('../fixtures/update_booking.json')

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

  function validarUpdateValido(response, expected) {
    expect(response.status).to.eq(200)
    expect(response.body.firstname).to.equal(expected.firstname)
    expect(response.body.lastname).to.equal(expected.lastname)
    expect(response.body.totalprice).to.equal(expected.totalprice)
    expect(response.body.depositpaid).to.equal(expected.depositpaid)
    expect(response.body.bookingdates.checkin).to.equal(expected.bookingdates.checkin)
    expect(response.body.bookingdates.checkout).to.equal(expected.bookingdates.checkout)
    expect(response.body.additionalneeds).to.equal(expected.additionalneeds)
  }

  it('Update booking with all valid fields', () => {
    cy.updateBooking(payload_update, idbooking, token).then((response) => {
      validarUpdateValido(response, payload_update)
    })
  })

  it('Update booking without a firtname', () => {
    const payload = { payload_update }
    delete payload.firstname
    
    cy.updateBooking(payload, idbooking, token).then((response) => {
      validarErro(response, 400, 'Bad Request')
    })
  })

  it('Update booking with an invalid a firtname', () => {
    const payload = { payload_update, firstname: null }
  
    cy.updateBooking(payload, idbooking, token).then((response) => {
      validarErro(response, 400, 'Bad Request')
    })
  })

  it('Update booking without a lastname', () => {
    const payload = { payload_update }
    delete payload.lastname
    
    cy.updateBooking(payload, idbooking, token).then((response) => {
      validarErro(response, 400, 'Bad Request')
    })
  })

  it('Update booking with an invalid a lastname', () => {
    const payload = { payload_update, lastnam: null }
    
    cy.updateBooking(payload, idbooking, token).then((response) => {
      validarErro(response,  400, 'Bad Request')
    })
  })


  it('Update booking without a totalprice', () => {
    const payload = { payload_update }
    delete payload.totalprice
    
    cy.updateBooking(payload, idbooking, token).then((response) => {
      validarErro(response, 400, 'Bad Request')
    })
  })

  it('Update booking with an invalid a totalprice', () => {
    const payload = { payload_update, totalprice: "free" }
    
    cy.updateBooking(payload, idbooking, token).then((response) => {
      validarErro(response, 400, 'Bad Request')
    })
  })

  it('Update booking without a depositpaid', () => {
    const payload = { payload_update }
    delete payload.depositpaid
    
    cy.updateBooking(payload, idbooking, token).then((response) => {
      validarErro(response, 400, 'Bad Request')
    })
  })

  it('Update booking with an invalid a depositpaid', () => {
    const payload = { payload_update, depositpaid: null }

    cy.updateBooking(payload, idbooking, token).then((response) => {
      validarErro(response, 400,'Bad Request')
    })
  })

  it('Update booking without a checkin', () => {
    const payload = { payload_update, bookingdates: { ...payload_update.bookingdates } }
    delete payload.bookingdates.checkin

    cy.updateBooking(payload, idbooking, token).then((response) => {
      validarErro(response, 400, 'Bad Request')
    })
  })

  it('Update booking with an invalid a checkin', () => {
    const payload = { payload_update, bookingdates: { ...payload_update.bookingdates } }
    payload.bookingdates.checkin = "123";
    
    cy.updateBooking(payload, idbooking, token).then((response) => {
      validarErro(response, 400,'Bad Request')
    })
  })
  it('Update booking without a checkout', () => {
    const payload = { payload_update, bookingdates: { ...payload_update.bookingdates } }
    delete payload.bookingdates.checkout
    
    cy.updateBooking(payload, idbooking, token).then((response) => {
      validarErro(response, 400, 'Bad Request')
    })
  })

  it('Update booking with an invalid a checkout', () => {
    const payload = { payload_update, bookingdates: { ...payload_update.bookingdates } }
    payload.bookingdates.checkout = "123";
    
    cy.updateBooking(payload_update.update_invalid_checkout, idbooking, token).then((response) => {
      validarErro(response, 400,'Bad Request')
    })
  })

  it('Update Reservation with checkout date greater than checkin date', () => {
    const payload = { payload_update, bookingdates: { ...payload_update.bookingdates } }
    payload.bookingdates.checkint = "2025-02-20";
    payload.bookingdates.checkout = "2025-02-01";
    
    cy.updateBooking(payload, idbooking, token).then((response) => {
      validarErro(response, 400,'Bad Request')
    })
  })
})