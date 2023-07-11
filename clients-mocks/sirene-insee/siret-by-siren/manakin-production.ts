export default {
  match: 'https://api.insee.fr/entreprises/sirene/V3/siret/q=siren:842019051',
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
        siren: '842019051',
        nic: '00015',
        siret: '84201905100015',
        statutDiffusionEtablissement: 'O',
        dateCreationEtablissement: '2018-08-02',
        trancheEffectifsEtablissement: '01',
        anneeEffectifsEtablissement: '2020',
        activitePrincipaleRegistreMetiersEtablissement: null,
        dateDernierTraitementEtablissement: '2022-08-29T10:29:06',
        etablissementSiege: true,
        nombrePeriodesEtablissement: 2,
        uniteLegale: {
          etatAdministratifUniteLegale: 'A',
          statutDiffusionUniteLegale: 'O',
          dateCreationUniteLegale: '2018-08-02',
          categorieJuridiqueUniteLegale: '9220',
          denominationUniteLegale: 'MANAKIN PRODUCTION',
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
          activitePrincipaleUniteLegale: '90.01Z',
          nomenclatureActivitePrincipaleUniteLegale: 'NAFRev2',
          identifiantAssociationUniteLegale: 'W751245606',
          economieSocialeSolidaireUniteLegale: 'O',
          societeMissionUniteLegale: null,
          caractereEmployeurUniteLegale: 'O',
          trancheEffectifsUniteLegale: '01',
          anneeEffectifsUniteLegale: '2020',
          nicSiegeUniteLegale: '00015',
          dateDernierTraitementUniteLegale: '2022-08-29T10:29:06',
          categorieEntreprise: 'PME',
          anneeCategorieEntreprise: '2020',
        },
        adresseEtablissement: {
          complementAdresseEtablissement: 'MANAKIN PRODUCTION',
          numeroVoieEtablissement: '129',
          indiceRepetitionEtablissement: null,
          typeVoieEtablissement: 'RUE',
          libelleVoieEtablissement: 'LAMARCK',
          codePostalEtablissement: '75018',
          libelleCommuneEtablissement: 'PARIS 18',
          libelleCommuneEtrangerEtablissement: null,
          distributionSpecialeEtablissement: null,
          codeCommuneEtablissement: '75118',
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
            dateDebut: '2018-12-26',
            etatAdministratifEtablissement: 'A',
            changementEtatAdministratifEtablissement: false,
            enseigne1Etablissement: null,
            enseigne2Etablissement: null,
            enseigne3Etablissement: null,
            changementEnseigneEtablissement: false,
            denominationUsuelleEtablissement: null,
            changementDenominationUsuelleEtablissement: false,
            activitePrincipaleEtablissement: '90.01Z',
            nomenclatureActivitePrincipaleEtablissement: 'NAFRev2',
            changementActivitePrincipaleEtablissement: false,
            caractereEmployeurEtablissement: 'O',
            changementCaractereEmployeurEtablissement: true,
          },
          {
            dateFin: '2018-12-25',
            dateDebut: '2018-08-02',
            etatAdministratifEtablissement: 'A',
            changementEtatAdministratifEtablissement: false,
            enseigne1Etablissement: null,
            enseigne2Etablissement: null,
            enseigne3Etablissement: null,
            changementEnseigneEtablissement: false,
            denominationUsuelleEtablissement: null,
            changementDenominationUsuelleEtablissement: false,
            activitePrincipaleEtablissement: '90.01Z',
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