/**
 * This uniteLegale has the characteristics
 * (EN SOMMEIL OU PRÉSUMÉE INACTIVE)
 */
export default {
  match: 'https://api.insee.fr/entreprises/sirene/V3/siret/?q=siren:351556394',
  response: {
    header: {
      statut: 200,
      message: 'OK',
      total: 1,
      debut: 0,
      nombre: 1,
    },
    etablissements: [
      {
        siren: '351556394',
        nic: '00010',
        siret: '35155639400010',
        statutDiffusionEtablissement: 'O',
        dateCreationEtablissement: '1989-08-01',
        trancheEffectifsEtablissement: 'NN',
        anneeEffectifsEtablissement: null,
        activitePrincipaleRegistreMetiersEtablissement: null,
        dateDernierTraitementEtablissement: '2009-03-30T20:21:50',
        etablissementSiege: true,
        nombrePeriodesEtablissement: 4,
        uniteLegale: {
          etatAdministratifUniteLegale: 'A',
          statutDiffusionUniteLegale: 'O',
          dateCreationUniteLegale: '1989-08-01',
          categorieJuridiqueUniteLegale: '5499',
          denominationUniteLegale: 'FINASSUR',
          sigleUniteLegale: null,
          denominationUsuelle1UniteLegale: null,
          denominationUsuelle2UniteLegale: null,
          denominationUsuelle3UniteLegale: null,
          sexeUniteLegale: null,
          nomUniteLegale: null,
          nomUsageUniteLegale: null,
          prenom1UniteLegale: null,
          prenom2UniteLegale: null,
          prenom3UniteLegale: null,
          prenom4UniteLegale: null,
          prenomUsuelUniteLegale: null,
          pseudonymeUniteLegale: null,
          activitePrincipaleUniteLegale: '66.22Z',
          nomenclatureActivitePrincipaleUniteLegale: 'NAFRev2',
          identifiantAssociationUniteLegale: null,
          economieSocialeSolidaireUniteLegale: null,
          societeMissionUniteLegale: null,
          caractereEmployeurUniteLegale: 'N',
          trancheEffectifsUniteLegale: 'NN',
          anneeEffectifsUniteLegale: null,
          nicSiegeUniteLegale: '00010',
          dateDernierTraitementUniteLegale: '2011-04-16T04:06:21',
          categorieEntreprise: null,
          anneeCategorieEntreprise: null,
        },
        adresseEtablissement: {
          complementAdresseEtablissement: 'RUELLE ALBERT CAMUS',
          numeroVoieEtablissement: '1',
          indiceRepetitionEtablissement: null,
          typeVoieEtablissement: 'IMP',
          libelleVoieEtablissement: 'DES CAMISARDS',
          codePostalEtablissement: '97420',
          libelleCommuneEtablissement: 'LE PORT',
          libelleCommuneEtrangerEtablissement: null,
          distributionSpecialeEtablissement: null,
          codeCommuneEtablissement: '97407',
          codeCedexEtablissement: null,
          libelleCedexEtablissement: null,
          codePaysEtrangerEtablissement: null,
          libellePaysEtrangerEtablissement: null,
        },
        adresse2Etablissement: {
          complementAdresse2Etablissement: null,
          numeroVoie2Etablissement: null,
          indiceRepetition2Etablissement: null,
          typeVoie2Etablissement: null,
          libelleVoie2Etablissement: null,
          codePostal2Etablissement: null,
          libelleCommune2Etablissement: null,
          libelleCommuneEtranger2Etablissement: null,
          distributionSpeciale2Etablissement: null,
          codeCommune2Etablissement: null,
          codeCedex2Etablissement: null,
          libelleCedex2Etablissement: null,
          codePaysEtranger2Etablissement: null,
          libellePaysEtranger2Etablissement: null,
        },
        periodesEtablissement: [
          {
            dateFin: null,
            dateDebut: '2009-01-05',
            etatAdministratifEtablissement: 'F',
            changementEtatAdministratifEtablissement: true,
            enseigne1Etablissement: null,
            enseigne2Etablissement: null,
            enseigne3Etablissement: null,
            changementEnseigneEtablissement: false,
            denominationUsuelleEtablissement: null,
            changementDenominationUsuelleEtablissement: false,
            activitePrincipaleEtablissement: '66.22Z',
            nomenclatureActivitePrincipaleEtablissement: 'NAFRev2',
            changementActivitePrincipaleEtablissement: false,
            caractereEmployeurEtablissement: 'N',
            changementCaractereEmployeurEtablissement: false,
          },
          {
            dateFin: '2009-01-04',
            dateDebut: '2008-01-01',
            etatAdministratifEtablissement: 'A',
            changementEtatAdministratifEtablissement: false,
            enseigne1Etablissement: null,
            enseigne2Etablissement: null,
            enseigne3Etablissement: null,
            changementEnseigneEtablissement: false,
            denominationUsuelleEtablissement: null,
            changementDenominationUsuelleEtablissement: false,
            activitePrincipaleEtablissement: '66.22Z',
            nomenclatureActivitePrincipaleEtablissement: 'NAFRev2',
            changementActivitePrincipaleEtablissement: true,
            caractereEmployeurEtablissement: 'N',
            changementCaractereEmployeurEtablissement: false,
          },
          {
            dateFin: '2007-12-31',
            dateDebut: '1989-12-25',
            etatAdministratifEtablissement: 'A',
            changementEtatAdministratifEtablissement: false,
            enseigne1Etablissement: null,
            enseigne2Etablissement: null,
            enseigne3Etablissement: null,
            changementEnseigneEtablissement: false,
            denominationUsuelleEtablissement: null,
            changementDenominationUsuelleEtablissement: false,
            activitePrincipaleEtablissement: '67.2Z',
            nomenclatureActivitePrincipaleEtablissement: 'NAF1993',
            changementActivitePrincipaleEtablissement: true,
            caractereEmployeurEtablissement: 'N',
            changementCaractereEmployeurEtablissement: false,
          },
          {
            dateFin: '1989-12-24',
            dateDebut: '1989-08-01',
            etatAdministratifEtablissement: 'A',
            changementEtatAdministratifEtablissement: false,
            enseigne1Etablissement: null,
            enseigne2Etablissement: null,
            enseigne3Etablissement: null,
            changementEnseigneEtablissement: false,
            denominationUsuelleEtablissement: null,
            changementDenominationUsuelleEtablissement: false,
            activitePrincipaleEtablissement: null,
            nomenclatureActivitePrincipaleEtablissement: null,
            changementActivitePrincipaleEtablissement: false,
            caractereEmployeurEtablissement: 'N',
            changementCaractereEmployeurEtablissement: false,
          },
        ],
      },
    ],
  },
};
