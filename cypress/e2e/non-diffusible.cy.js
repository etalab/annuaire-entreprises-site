import resultGanymede from '../../clients-mocks/recherche-entreprise/ganymede';
import resultSauvage from '../../clients-mocks/recherche-entreprise/sauvage';

describe('Non-diffusible', () => {
  it('Should be non diffusible', () => {
    cy.visit(`/entreprise/${resultSauvage.results[0].siren}`);
    cy.contains('ne sont pas publiquement').should('have.length', 1);
  });

  it('Should be diffusible', () => {
    cy.visit(`/entreprise/${resultGanymede.results[0].siren}`);
    cy.contains('ne sont pas publiquement').should('have.length', 0);
  });

  it('No dirigeant in partial diffusible (protected)', () => {
    cy.visit(`/dirigeants/${resultSevernaya.results[0].siren}`);
    cy.contains('Données privées').should('have.length', 1);
  });
});
