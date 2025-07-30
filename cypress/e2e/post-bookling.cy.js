/// <reference types="cypress"/> 

describe("Insert Booking", () => {

    const payload_create = require('../fixtures/create_booking.json')

    function validarErro(response, statusEsperado, mensagemEsperada) {
        expect(response.status).to.eq(statusEsperado)
        expect(response.body).to.eq(mensagemEsperada)
    }

    it('Create booking with all valid fields', () => {
        cy.createBooking(payload_create).then(response => {
            expect(response.status).to.eq(200)
            expect(response.body).to.have.property('bookingid')
        })
    })

    it('Create booking without a firstname', () => {
        const payload = { payload_create }
        delete payload.firstname

        cy.createBooking(payload).then(response => {
            validarErro(response, 500, 'Internal Server Error')
        })
    })

    it('Create booking with an invalid firstname', () => {
        const payload = { payload_create, firstname: 123 }

        cy.createBooking(payload).then(response => {
            validarErro(response, 500, 'Internal Server Error')
        })
    })

    it('Create booking without a lastname', () => {
        const payload = { payload_create }
        delete payload.lastname

        cy.createBooking(payload).then(response => {
            validarErro(response, 500, 'Internal Server Error')
        })
    })

    it('Create booking with an invalid lastname', () => {
        const payload = { payload_create, lastname: null }

        cy.createBooking(payload).then(response => {
            validarErro(response, 500, 'Internal Server Error')
        })
    })

    it('Create booking without totalprice', () => {
        const payload = { payload_create }
        delete payload.totalprice

        cy.createBooking(payload).then(response => {
            validarErro(response, 500, 'Internal Server Error')
        })
    })

    it('Create booking with invalid totalprice', () => {
        const payload = { payload_create, totalprice: "free" }

        cy.createBooking(payload).then(response => {
            validarErro(response, 500, 'Internal Server Error')
        })
    })

    it('Create booking without depositpaid', () => {
        const payload = { payload_create }
        delete payload.depositpaid

        cy.createBooking(payload).then(response => {
            validarErro(response, 500, 'Internal Server Error')
        })
    })

    it('Create booking with invalid depositpaid', () => {
        const payload = { payload_create, depositpaid: "yes" }

        cy.createBooking(payload).then(response => {
            validarErro(response, 500, 'Internal Server Error')
        })
    })

    it('Create booking without checkin date', () => {
        const payload = { payload_create, bookingdates: { ...payload_create.bookingdates } }
        delete payload.bookingdates.checkin

        cy.createBooking(payload).then(response => {
            validarErro(response, 500, 'Internal Server Error')
        })
    })

    it('Create booking with invalid checkin', () => {
        const payload = { payload_create, bookingdates: { ...payload_create.bookingdates } }
        payload.bookingdates.checkin = "123"

        cy.createBooking(payload).then(response => {
            validarErro(response, 500, 'Internal Server Error')
        })
    })

    it('Create booking without checkout date', () => {
        const payload = { payload_create, bookingdates: { ...payload_create.bookingdates } }
        delete payload.bookingdates.checkout

        cy.createBooking(payload).then(response => {
            validarErro(response, 500, 'Internal Server Error')
        })
    })

    it('Create booking with invalid checkout', () => {
        const payload = { payload_create, bookingdates: { ...payload_create.bookingdates } }
        payload.bookingdates.checkin = "20230110"

        cy.createBooking(payload).then(response => {
            validarErro(response, 500, 'Internal Server Error')
        })
    })

    it('Create booking with checkout date earlier than checkin date', () => {
        const payload = { payload_create, bookingdates: { ...payload_create.bookingdates } }
        payload.bookingdates.checkin = "2023-01-10"
        payload.bookingdates.checkout = "2023-01-01"

        cy.createBooking(payload).then(response => {
            validarErro(response, 500, 'Internal Server Error')
        })
    })
})