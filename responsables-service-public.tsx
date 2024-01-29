import { DILA } from '#components/administrations';
import { DataSection } from '#components/section/data-section';
import { FullTable } from '#components/table/full';
import { EAdministration } from '#models/administrations/EAdministration';
import { IAPINotRespondingError } from '#models/api-not-responding';
import { IServicePublic } from '#models/service-public';

type IProps = { servicePublic: IServicePublic | IAPINotRespondingError };
export default function ResponsableSection({ servicePublic }: IProps) {
  return (
    <DataSection
      id="responsables-service-public"
      title={`Responsables`}
      sources={[EAdministration.DILA]}
      notFoundInfo={<NotFoundInfo />}
      data={servicePublic}
    >
      {(servicePublic) =>
        !servicePublic.affectationPersonne ? (
          <p>
            Ce service public n’a pas de responsable enregistré auprès de la{' '}
            <DILA />.
          </p>
        ) : (
          <FullTable
            head={['Role', 'Nom', 'Nomination']}
            body={servicePublic.affectationPersonne.map((personne) => [
              personne.fonction,
              personne.nom,
              <a
                href={personne.lienTexteAffectation.valeur}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${personne.lienTexteAffectation.libelle}, nouvelle fenêtre`}
              >
                {personne.lienTexteAffectation.libelle}
              </a>,
            ])}
          />
        )
      }
    </DataSection>
  );
}

const NotFoundInfo = () => (
  <p>
    Ce service public n’est pas enregistré auprès de la <DILA />.
  </p>
);
