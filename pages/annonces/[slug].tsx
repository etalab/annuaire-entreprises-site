import { GetServerSideProps } from 'next';
import React, { ReactElement } from 'react';
import AnnoncesAssociationSection from '#components/annonces-section/annonces-association';
import AnnoncesBodaccSection from '#components/annonces-section/bodacc';
import { ComptesAssociationSection } from '#components/annonces-section/comptes-association';
import { Layout } from '#components/layout';
import Meta from '#components/meta';
import Title, { FICHE } from '#components/title-section';
import {
  IAnnoncesBodacc,
  IAnnoncesAssociation,
  IComptesAssociation,
} from '#models/annonces';
import { getAnnoncesFromSlug } from '#models/annonces';
import { IAPINotRespondingError } from '#models/api-not-responding';
import { isAssociation, IUniteLegale } from '#models/index';
import extractParamsFromContext from '#utils/server-side-props-helper/extract-params-from-context';
import {
  IPropsWithMetadata,
  postServerSideProps,
} from '#utils/server-side-props-helper/post-server-side-props';
import { NextPageWithLayout } from 'pages/_app';

interface IProps extends IPropsWithMetadata {
  annoncesAssociation: IAnnoncesAssociation | IAPINotRespondingError | null;
  bodacc: IAnnoncesBodacc | IAPINotRespondingError;
  comptesAssociation: IComptesAssociation | IAPINotRespondingError | null;
  uniteLegale: IUniteLegale;
}

const Annonces: NextPageWithLayout<IProps> = ({
  annoncesAssociation,
  bodacc,
  comptesAssociation,
  metadata,
  uniteLegale,
}) => {
  return (
    <>
      <Meta
        title={`Annonces légales (BODACC) - ${uniteLegale.nomComplet}`}
        noIndex={true}
      />
      <div className="content-container">
        <Title ficheType={FICHE.ANNONCES} uniteLegale={uniteLegale} />
        <AnnoncesBodaccSection uniteLegale={uniteLegale} bodacc={bodacc} />
        {isAssociation(uniteLegale) && (
          <>
            {annoncesAssociation && (
              <AnnoncesAssociationSection
                association={uniteLegale}
                annoncesAssociation={annoncesAssociation}
              />
            )}
            {comptesAssociation && (
              <ComptesAssociationSection
                association={uniteLegale}
                comptesAssociation={comptesAssociation}
              />
            )}
          </>
        )}
      </div>
    </>
  );
};

export const getServerSideProps: GetServerSideProps = postServerSideProps(
  async (context) => {
    const { slug } = extractParamsFromContext(context);
    const { uniteLegale, bodacc, comptesAssociation, annoncesAssociation } =
      await getAnnoncesFromSlug(slug);
    return {
      props: {
        annoncesAssociation,
        bodacc,
        comptesAssociation,
        uniteLegale,
      },
    };
  }
);

Annonces.getLayout = function getLayout(page: ReactElement, isBrowserOutdated) {
  return <Layout isBrowserOutdated={isBrowserOutdated}>{page}</Layout>;
};

export default Annonces;
