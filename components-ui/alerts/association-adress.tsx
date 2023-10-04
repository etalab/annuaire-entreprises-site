import { INSEE, MI } from '#components/administrations';
import { isAPINotResponding } from '#models/api-not-responding';
import { IAssociation } from '#models/index';
import { getAdresseUniteLegale } from '#models/statut-diffusion';
import { ISession } from '#utils/session';
import Warning from './warning';

const AssociationAdressAlert: React.FC<{
  uniteLegale: IAssociation;
  session: ISession | null;
}> = ({ uniteLegale, session }) => {
  if (
    !uniteLegale.association.data ||
    isAPINotResponding(uniteLegale.association.data)
  ) {
    return null;
  }

  const adresseInconsistency =
    uniteLegale.association?.data?.adresseInconsistency;

  const associationAdresse = uniteLegale.association?.data?.adresseSiege;

  return (
    <>
      {adresseInconsistency && (
        <Warning full>
          Cette association possède deux adresses différentes.
          <br />
          L’une est déclarée au <MI /> (en préfecture) :{' '}
          <b>{associationAdresse || 'Non renseignée'}</b>, l’autre est déclarée
          à l’
          <INSEE /> : <b>{getAdresseUniteLegale(uniteLegale, session)}</b>.
          <br />
          Si vous êtes membre de cette association. Contactez l’administration
          concernée pour corriger l’erreur.
          <br />
          <b>NB :</b> si vous avez déjà effectué la correction auprès du <MI />,
          sachez qu’elle peut prendre quelques semaines avant d’être prise en
          compte dans les bases de données.
        </Warning>
      )}
    </>
  );
};
export default AssociationAdressAlert;
