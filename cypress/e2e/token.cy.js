/// <reference types="cypress"/> 

describe("Update Booking", () => {

  function validarErro(response, statusEsperado, mensagemEsperada) {
    expect(response.status).to.eq(statusEsperado)
    expect(response.body).to.eq(mensagemEsperada)
  }


  it('Create token with incorrect password', () => {
    cy.createToken("admin", "123").then((response) => {
      expect(response).to.not.be.a('string')
      expect(response).to.be.undefined
    })
  })

  it('Create token with non-existent user', () => {
    cy.createToken("aaaa", "password123").then((response) => {
      expect(response).to.not.be.a('string')
      expect(response).to.be.undefined
    })
  })

  it('Create token with empty password', () => {
    cy.createToken("admin", "").then((response) => {
      expect(response).to.not.be.a('string')
      expect(response).to.be.undefined
    })

  })

  it('Create token with empty username', () => {
    cy.createToken("", "password123").then((response) => {
      expect(response).to.not.be.a('string')
      expect(response).to.be.undefined
    })

  })

})