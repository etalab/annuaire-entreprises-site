/**
 * This uniteLegale has the characteristics
 * (non diffusible)
 */
export default {
  match: 'https://api.insee.fr/entreprises/sirene/V3/siret/q=siren:300025764',
  response: {
    header: {
      statut: 200,
      message: 'OK',
      total: 2,
      debut: 0,
      nombre: 2,
    },
    etablissements: [
      {
        siren: '300025764',
        nic: '00022',
        siret: '30002576400022',
        statutDiffusionEtablissement: 'P',
        dateCreationEtablissement: '1981-10-01',
        trancheEffectifsEtablissement: 'NN',
        anneeEffectifsEtablissement: null,
        activitePrincipaleRegistreMetiersEtablissement: null,
        dateDernierTraitementEtablissement: '2020-04-08T14:55:23',
        etablissementSiege: false,
        nombrePeriodesEtablissement: 4,
        uniteLegale: {
          etatAdministratifUniteLegale: 'A',
          statutDiffusionUniteLegale: 'P',
          dateCreationUniteLegale: '1981-10-01',
          categorieJuridiqueUniteLegale: '1000',
          denominationUniteLegale: null,
          sigleUniteLegale: null,
          denominationUsuelle1UniteLegale: null,
          denominationUsuelle2UniteLegale: null,
          denominationUsuelle3UniteLegale: null,
          sexeUniteLegale: 'M',
          nomUniteLegale: 'SAUVAGE',
          nomUsageUniteLegale: null,
          prenom1UniteLegale: 'MICHEL',
          prenom2UniteLegale: null,
          prenom3UniteLegale: null,
          prenom4UniteLegale: null,
          prenomUsuelUniteLegale: 'MICHEL',
          pseudonymeUniteLegale: null,
          activitePrincipaleUniteLegale: '68.20A',
          nomenclatureActivitePrincipaleUniteLegale: 'NAFRev2',
          identifiantAssociationUniteLegale: null,
          economieSocialeSolidaireUniteLegale: null,
          societeMissionUniteLegale: null,
          caractereEmployeurUniteLegale: 'N',
          trancheEffectifsUniteLegale: 'NN',
          anneeEffectifsUniteLegale: null,
          nicSiegeUniteLegale: '00048',
          dateDernierTraitementUniteLegale: '2020-04-08T15:04:45',
          categorieEntreprise: 'PME',
          anneeCategorieEntreprise: '2020',
        },
        adresseEtablissement: {
          complementAdresseEtablissement: 'ZONE ARTISANALE',
          numeroVoieEtablissement: null,
          indiceRepetitionEtablissement: null,
          typeVoieEtablissement: 'AV',
          libelleVoieEtablissement: 'DES FONTENELLES',
          codePostalEtablissement: '35310',
          libelleCommuneEtablissement: 'CHAVAGNE',
          libelleCommuneEtrangerEtablissement: null,
          distributionSpecialeEtablissement: null,
          codeCommuneEtablissement: '35076',
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
            dateDebut: '2019-12-31',
            etatAdministratifEtablissement: 'F',
            changementEtatAdministratifEtablissement: true,
            enseigne1Etablissement: null,
            enseigne2Etablissement: null,
            enseigne3Etablissement: null,
            changementEnseigneEtablissement: false,
            denominationUsuelleEtablissement: null,
            changementDenominationUsuelleEtablissement: false,
            activitePrincipaleEtablissement: '69.20Z',
            nomenclatureActivitePrincipaleEtablissement: 'NAFRev2',
            changementActivitePrincipaleEtablissement: false,
            caractereEmployeurEtablissement: 'N',
            changementCaractereEmployeurEtablissement: false,
          },
          {
            dateFin: '2019-12-30',
            dateDebut: '2008-01-01',
            etatAdministratifEtablissement: 'A',
            changementEtatAdministratifEtablissement: false,
            enseigne1Etablissement: null,
            enseigne2Etablissement: null,
            enseigne3Etablissement: null,
            changementEnseigneEtablissement: false,
            denominationUsuelleEtablissement: null,
            changementDenominationUsuelleEtablissement: false,
            activitePrincipaleEtablissement: '69.20Z',
            nomenclatureActivitePrincipaleEtablissement: 'NAFRev2',
            changementActivitePrincipaleEtablissement: true,
            caractereEmployeurEtablissement: 'N',
            changementCaractereEmployeurEtablissement: false,
          },
          {
            dateFin: '2007-12-31',
            dateDebut: '1981-12-25',
            etatAdministratifEtablissement: 'A',
            changementEtatAdministratifEtablissement: false,
            enseigne1Etablissement: null,
            enseigne2Etablissement: null,
            enseigne3Etablissement: null,
            changementEnseigneEtablissement: false,
            denominationUsuelleEtablissement: null,
            changementDenominationUsuelleEtablissement: false,
            activitePrincipaleEtablissement: '74.1C',
            nomenclatureActivitePrincipaleEtablissement: 'NAF1993',
            changementActivitePrincipaleEtablissement: true,
            caractereEmployeurEtablissement: 'N',
            changementCaractereEmployeurEtablissement: false,
          },
          {
            dateFin: '1981-12-24',
            dateDebut: '1981-10-01',
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
      {
        siren: '300025764',
        nic: '00048',
        siret: '30002576400048',
        statutDiffusionEtablissement: 'P',
        dateCreationEtablissement: '2019-12-23',
        trancheEffectifsEtablissement: null,
        anneeEffectifsEtablissement: null,
        activitePrincipaleRegistreMetiersEtablissement: null,
        dateDernierTraitementEtablissement: '2020-04-08T15:04:45',
        etablissementSiege: true,
        nombrePeriodesEtablissement: 1,
        uniteLegale: {
          etatAdministratifUniteLegale: 'A',
          statutDiffusionUniteLegale: 'P',
          dateCreationUniteLegale: '1981-10-01',
          categorieJuridiqueUniteLegale: '1000',
          denominationUniteLegale: null,
          sigleUniteLegale: null,
          denominationUsuelle1UniteLegale: null,
          denominationUsuelle2UniteLegale: null,
          denominationUsuelle3UniteLegale: null,
          sexeUniteLegale: 'M',
          nomUniteLegale: 'SAUVAGE',
          nomUsageUniteLegale: null,
          prenom1UniteLegale: 'MICHEL',
          prenom2UniteLegale: null,
          prenom3UniteLegale: null,
          prenom4UniteLegale: null,
          prenomUsuelUniteLegale: 'MICHEL',
          pseudonymeUniteLegale: null,
          activitePrincipaleUniteLegale: '68.20A',
          nomenclatureActivitePrincipaleUniteLegale: 'NAFRev2',
          identifiantAssociationUniteLegale: null,
          economieSocialeSolidaireUniteLegale: null,
          societeMissionUniteLegale: null,
          caractereEmployeurUniteLegale: 'N',
          trancheEffectifsUniteLegale: 'NN',
          anneeEffectifsUniteLegale: null,
          nicSiegeUniteLegale: '00048',
          dateDernierTraitementUniteLegale: '2020-04-08T15:04:45',
          categorieEntreprise: 'PME',
          anneeCategorieEntreprise: '2020',
        },
        adresseEtablissement: {
          complementAdresseEtablissement: 'APPT B407 - 4EME ETAGE',
          numeroVoieEtablissement: '51',
          indiceRepetitionEtablissement: null,
          typeVoieEtablissement: 'BD',
          libelleVoieEtablissement: 'DE VERDUN',
          codePostalEtablissement: '35000',
          libelleCommuneEtablissement: 'RENNES',
          libelleCommuneEtrangerEtablissement: null,
          distributionSpecialeEtablissement: null,
          codeCommuneEtablissement: '35238',
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
            dateDebut: '2019-12-23',
            etatAdministratifEtablissement: 'A',
            changementEtatAdministratifEtablissement: false,
            enseigne1Etablissement: null,
            enseigne2Etablissement: null,
            enseigne3Etablissement: null,
            changementEnseigneEtablissement: false,
            denominationUsuelleEtablissement: null,
            changementDenominationUsuelleEtablissement: false,
            activitePrincipaleEtablissement: '68.20A',
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
