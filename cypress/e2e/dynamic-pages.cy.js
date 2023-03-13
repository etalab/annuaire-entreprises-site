const { laPosteMock, searchlaPosteMock } = require('../mocks/company');
const { tokenMock } = require('../mocks/insee');

const companies = [
  {
    siret: '35600000000048',
    mockApi: { siren: laPosteMock, search: searchlaPosteMock },
  }, // La poste
  // '88087814500015', // SASU
  // '88301031600015', // EI
  // '55203253400646', // cac-40
  // '13002526500013', // administration
  // '20005478100022', // collectivité
];

// companies.forEach((company) => {
describe(`Siret ${companies[0].siret}`, () => {
  it('/etablissement page loads', () => {
    cy.task('msw:set:handlers', [
      {
        url: 'https://api.insee.fr/token',
        payload: tokenMock,
        type: 'post',
      },
      {
        url: 'https://api.insee.fr/entreprises/sirene/V3/siret',
        payload: companies[0].mockApi.siren,
      },
      {
        url: 'https://api.insee.fr/entreprises/sirene/V3/siren',
        payload: companies[0].mockApi.siren,
      },
    ]);
    cy.request(`/etablissement/${companies[0].siret}`).then((resp) => {
      expect(resp.status).to.eq(200);
    });
  });
  ['annonces', 'entreprise', 'justificatif', 'divers'].map((pagePrefix) => {
    const path = `/${pagePrefix}/${companies[0].siret.slice(0, 9)}`;

    xit(`/${pagePrefix} page loads`, () => {
      cy.request(path).then((resp) => {
        expect(resp.status).to.eq(200);
      });
    });
  });
});
// });

// describe(`Dirigeants and élus pages`, () => {
//   xit('Dirigeant page loads', () => {
//     cy.visit(`/dirigeants/552032534`);
//     cy.contains('Antoine BERNARD DE SAINT AFFRIQUE').should('be.visible');
//   });

//   xit('Elus page loads', () => {
//     cy.visit(`/elus/200054781`);
//     cy.contains('Anne HIDALGO').should('be.visible');
//   });
// });

// describe(`Labels and certificates`, () => {
//   it('RGE', () => {
//     cy.visit(`/entreprise/518286976`);
//     cy.contains('Labels et certificats').should('be.visible');
//     cy.contains('RGE - Reconnu Garant de l’Environnement').should('be.visible');
//   });

//   it('ESS et Spectacle vivant', () => {
//     cy.visit(`/entreprise/842019051`);
//     cy.contains('Labels et certificats').should('be.visible');
//     cy.contains('ESS - Entreprise Sociale et Solidaire').should('be.visible');
//     cy.contains('Entrepreneur de spectacles vivants').should('be.visible');
//   });

//   it('No certificates', () => {
//     cy.visit(`/entreprise/880878145`);
//     cy.contains('Label(s) et certificat(s)').should('have.length', 0);
//   });
// });
