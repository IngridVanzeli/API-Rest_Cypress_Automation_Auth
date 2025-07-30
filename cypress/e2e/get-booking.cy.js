/// <reference types="cypress"/> 
describe("Get Booking", () => {

    const payload_create = require('../fixtures/create_booking.json')

    var idbooking = ""

    beforeEach('Create Booking', () => {
        cy.createBooking(payload_create).then((response_post) => {
            expect(response_post.status).to.eq(200)
            idbooking = response_post.body.bookingid
        })

    })

    function validarErro(response, statusEsperado, mensagemEsperada) {
        expect(response.status).to.eq(statusEsperado)
        expect(response.body).to.eq(mensagemEsperada)
    }

    it('Get Bookings by Ids', () => {
        cy.getBookingId(idbooking)
            .then((response) => {
                expect(response.status).to.eq(200)
                expect(response.body.firstname).equal(payload_create.firstname)
                expect(response.body.lastname).equal(payload_create.lastname)
                expect(response.body.totalprice).not.string
                expect(response.body.depositpaid).not.string
                expect(response.body.bookingdates.checkin).equal(payload_create.bookingdates.checkin)
                expect(response.body.bookingdates.checkout).equal(payload_create.bookingdates.checkout)
                expect(response.body.additionalneeds).equal(payload_create.additionalneeds)
            })
    })

    it('Get Bookings by firstname', () => {
        const payload = { payload_create, firstname: { ...payload_create.firstname } }
        cy.getBooking(`?firstname=${payload}`)
            .then((response) => {
                expect(response.status).to.eq(200)
            })
    })

    it('Get Bookings by lastname', () => {
        const payload = { payload_create, lastname: { ...payload_create.lastname } }
        cy.getBooking(`?lastname=${payload}`)
            .then((response) => {
                expect(response.status).to.eq(200)
            })

    })

    it('Get Bookings by checkin', () => {
        const payload = payload_create.bookingdates.checkin
        cy.getBooking(`?checkin=${payload}`)
            .then((response) => {
                expect(response.status).to.eq(200)
            })
    })

    it('Get Bookings by checkout', () => {
        const payload = payload_create.bookingdates.checkout
        cy.getBooking(`?checkout=${payload}`)
            .then((response) => {
                expect(response.status).to.eq(200)
            })
    })

    it('Get Bookings by Ids inexistents', () => {
        cy.getBookingId("teste")
            .then((response) => {
                validarErro(response, 404, 'Not Found')
            })
    })

    it('Get Bookings by firstname inexistents', () => {
        cy.getBooking(`?firstname=111`)
            .then((response) => {
                expect(response.status).to.eq(200)
                expect(response.body).to.deep.equal([]);
            })
    })

    it('Get Bookings by lastname inexistents', () => {
        cy.getBooking(`?lastname=111`)
            .then((response) => {
                expect(response.status).to.eq(200)
                expect(response.body).to.deep.equal([]);
            })
    })

    it('Get Bookings by checkin inexistents', () => {
        cy.getBooking(`?checkin=teste`)
            .then((response) => {
                validarErro(response, 500, 'Internal Server Error')
            })
    })

    it('Get Bookings by checkout inexistents', () => {
        cy.getBooking(`?checkout=teste`)
            .then((response) => {
                validarErro(response, 500, 'Internal Server Error')
            })
    })
})