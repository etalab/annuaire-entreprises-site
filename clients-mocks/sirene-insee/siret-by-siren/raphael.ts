/**
 * This company is used in test for its status
 * (Entreprise individuelle diffusible)
 */
export default {
  match: 'https://api.insee.fr/entreprises/sirene/V3/siret/?q=siren:883010316',
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
        siren: '883010316',
        nic: '00015',
        siret: '88301031600015',
        statutDiffusionEtablissement: 'O',
        dateCreationEtablissement: '2018-05-06',
        trancheEffectifsEtablissement: null,
        anneeEffectifsEtablissement: null,
        activitePrincipaleRegistreMetiersEtablissement: null,
        dateDernierTraitementEtablissement: '2022-10-31T09:00:33',
        etablissementSiege: true,
        nombrePeriodesEtablissement: 2,
        uniteLegale: {
          etatAdministratifUniteLegale: 'C',
          statutDiffusionUniteLegale: 'O',
          dateCreationUniteLegale: '2018-05-06',
          categorieJuridiqueUniteLegale: '1000',
          denominationUniteLegale: null,
          sigleUniteLegale: null,
          denominationUsuelle1UniteLegale: null,
          denominationUsuelle2UniteLegale: null,
          denominationUsuelle3UniteLegale: null,
          sexeUniteLegale: 'M',
          nomUniteLegale: 'DUBIGNY',
          nomUsageUniteLegale: null,
          prenom1UniteLegale: 'RAPHAEL',
          prenom2UniteLegale: null,
          prenom3UniteLegale: null,
          prenom4UniteLegale: null,
          prenomUsuelUniteLegale: 'RAPHAEL',
          pseudonymeUniteLegale: null,
          activitePrincipaleUniteLegale: '70.22Z',
          nomenclatureActivitePrincipaleUniteLegale: 'NAFRev2',
          identifiantAssociationUniteLegale: null,
          economieSocialeSolidaireUniteLegale: null,
          societeMissionUniteLegale: null,
          caractereEmployeurUniteLegale: 'N',
          trancheEffectifsUniteLegale: null,
          anneeEffectifsUniteLegale: null,
          nicSiegeUniteLegale: '00015',
          dateDernierTraitementUniteLegale: '2022-10-31T09:00:33',
          categorieEntreprise: 'PME',
          anneeCategorieEntreprise: '2020',
        },
        adresseEtablissement: {
          complementAdresseEtablissement: 'RED NEEDLES',
          numeroVoieEtablissement: '17',
          indiceRepetitionEtablissement: null,
          typeVoieEtablissement: 'RUE',
          libelleVoieEtablissement: 'DE FRANCEVILLE',
          codePostalEtablissement: '93220',
          libelleCommuneEtablissement: 'GAGNY',
          libelleCommuneEtrangerEtablissement: null,
          distributionSpecialeEtablissement: null,
          codeCommuneEtablissement: '93032',
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
            dateDebut: '2020-09-01',
            etatAdministratifEtablissement: 'F',
            changementEtatAdministratifEtablissement: true,
            enseigne1Etablissement: null,
            enseigne2Etablissement: null,
            enseigne3Etablissement: null,
            changementEnseigneEtablissement: false,
            denominationUsuelleEtablissement: null,
            changementDenominationUsuelleEtablissement: false,
            activitePrincipaleEtablissement: '70.22Z',
            nomenclatureActivitePrincipaleEtablissement: 'NAFRev2',
            changementActivitePrincipaleEtablissement: false,
            caractereEmployeurEtablissement: 'N',
            changementCaractereEmployeurEtablissement: false,
          },
          {
            dateFin: '2020-08-31',
            dateDebut: '2018-05-06',
            etatAdministratifEtablissement: 'A',
            changementEtatAdministratifEtablissement: false,
            enseigne1Etablissement: null,
            enseigne2Etablissement: null,
            enseigne3Etablissement: null,
            changementEnseigneEtablissement: false,
            denominationUsuelleEtablissement: null,
            changementDenominationUsuelleEtablissement: false,
            activitePrincipaleEtablissement: '70.22Z',
            nomenclatureActivitePrincipaleEtablissement: 'NAFRev2',
            changementActivitePrincipaleEtablissement: false,
            caractereEmployeurEtablissement: 'N',
            changementCaractereEmployeurEtablissement: false,
          },
        ],
      },
    ],
  },
};
