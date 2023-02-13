import { HttpNotFound, HttpServerError } from '#clients/exceptions';
import {
  ISireneOuverteEtablissement,
  mapSireneOuverteEtablissementToDomainObject,
} from '#clients/sirene-ouverte/siret';
import { IComplements } from '#models/complements';
import { createEtablissementsList } from '#models/etablissements-list';
import { estActif, IETATADMINSTRATIF } from '#models/etat-administratif';
import { createDefaultUniteLegale, IUniteLegale } from '#models/index';
import { ISTATUTDIFFUSION } from '#models/statut-diffusion';
import {
  isEntrepreneurIndividuelFromNatureJuridique,
  Siren,
} from '#utils/helpers';
import {
  libelleFromCategoriesJuridiques,
  libelleFromCodeEffectif,
  libelleFromCodeNAF,
  libelleFromeCodeCategorie,
} from '#utils/labels';
import clientSearchSireneOuverte from '.';

/**
 * GET UNITE LEGALE
 */
interface ISireneOuverteUniteLegale {
  etablissement_siege: ISireneOuverteEtablissement[];
  etablissements: ISireneOuverteEtablissement[];
  date_creation: string;
  date_creation_entreprise: string;
  date_mise_a_jour: string;
  numero_tva_intra: string;
  date_debut_activite: string;
  tranche_effectif_salarie_entreprise: string;
  categorie_entreprise: string;
  nature_juridique_entreprise: string;
  nombre_etablissements: number;
  nom_complet: string;
  nom_url: string;
  numero_voie: string;
  indice_repetition: string;
  type_voie: string;
  libelle_commune: string;
  code_postal: string;
  libelle_voie: string;
  activite_principale_entreprise: string;
  identifiantAssociationUniteLegale: string;
  economieSocialeSolidaireUniteLegale: string;
}

export const clientComplementsSireneOuverte = async (
  siren: Siren
): Promise<IComplements> => {
  const { results } = await clientSearchSireneOuverte(siren, 1);

  if (results.length > 0) {
    const { complements, colter } = results[0];
    return { complements, colter };
  }
  throw new HttpNotFound(siren);
};

const clientUniteLegaleSireneOuverte = async (
  siren: Siren
): Promise<IUniteLegale> => {
  const { results } = await clientSearchSireneOuverte(siren, 1);
  const result = results[0];
};

const mapToDomainObject = (
  siren: Siren,
  uniteLegale: ISireneOuverteUniteLegale,
  page: number
): IUniteLegale => {
  const siege = mapSireneOuverteEtablissementToDomainObject(
    uniteLegale.etablissement_siege[0],
    uniteLegale.etablissement_siege[0].siret
  );

  const listOfEtablissements = uniteLegale.etablissements.map((etab) =>
    mapSireneOuverteEtablissementToDomainObject(etab, etab.siret)
  );

  if (!listOfEtablissements || listOfEtablissements.length === 0) {
    throw new HttpServerError(`No etablissements found`);
  }

  const {
    date_creation_entreprise,
    date_mise_a_jour,
    date_debut_activite,
    nom_complet,
    nom_url,
    categorie_entreprise,
    nombre_etablissements,
    nature_juridique_entreprise,
    tranche_effectif_salarie_entreprise,
    identifiantAssociationUniteLegale,
    economieSocialeSolidaireUniteLegale,
    activite_principale_entreprise,
  } = uniteLegale;

  const defaultUniteLegale = createDefaultUniteLegale(siren);
  return {
    ...defaultUniteLegale,
    siren,
    siege,
    activitePrincipale: activite_principale_entreprise,
    libelleActivitePrincipale: libelleFromCodeNAF(
      activite_principale_entreprise
    ),
    libelleCategorieEntreprise: libelleFromeCodeCategorie(categorie_entreprise),
    natureJuridique: nature_juridique_entreprise || '',
    libelleNatureJuridique: libelleFromCategoriesJuridiques(
      nature_juridique_entreprise
    ),
    trancheEffectif: tranche_effectif_salarie_entreprise,
    libelleTrancheEffectif: libelleFromCodeEffectif(
      tranche_effectif_salarie_entreprise
    ),
    etablissements: createEtablissementsList(
      listOfEtablissements,
      page,
      nombre_etablissements
    ),
    statutDiffusion: ISTATUTDIFFUSION.DIFFUSIBLE,
    etatAdministratif:
      siege && estActif(siege)
        ? IETATADMINSTRATIF.ACTIF
        : IETATADMINSTRATIF.CESSEE,
    nomComplet: nom_complet || 'Nom inconnu',
    chemin: nom_url,
    dateCreation: date_creation_entreprise,
    dateDebutActivite: date_debut_activite,
    dateDerniereMiseAJour: date_mise_a_jour,
    dirigeant: null,
    complements: {
      ...defaultUniteLegale.complements,
      estEntrepreneurIndividuel: isEntrepreneurIndividuelFromNatureJuridique(
        nature_juridique_entreprise
      ),
      estEss: economieSocialeSolidaireUniteLegale === 'O',
    },
    association: {
      idAssociation: identifiantAssociationUniteLegale || null,
    },
  };
};
