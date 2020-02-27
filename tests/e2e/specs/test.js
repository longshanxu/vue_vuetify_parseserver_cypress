/*
 * @Author: Json.Xu
 * @Date: 2019-12-21 14:51:06
 * @LastEditTime: 2020-02-27 17:06:45
 * @LastEditors: Json.Xu
 * @Description: 
 * @FilePath: \vue_vuetify_parseserver\tests\e2e\specs\test.js
 */
// https://docs.cypress.io/api/introduction/api.html

/// <reference types="Cypress" />

describe('足球小伙', () => {
  it('Visits the app root url', () => {
    cy.visit('http://localhost/')
    cy.get('.v-btn--depressed').click()
    cy.get(':nth-child(1) > :nth-child(1) > .v-form > :nth-child(1) > .v-input__control > .v-input__slot').type("6666");
    
  })
})