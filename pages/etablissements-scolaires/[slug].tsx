import { GetServerSideProps } from 'next';
import React from 'react';
import { EtablissementsScolairesSection } from '#components/education-nationale';
import Meta from '#components/meta';
import Title, { FICHE } from '#components/title-section';
import { IAPINotRespondingError } from '#models/api-not-responding';
import {
  getEtablissementsScolairesFromSlug,
  IEtablissementsScolaires,
} from '#models/etablissements-scolaires';
import { IUniteLegale } from '#models/index';
import { parseIntWithDefaultValue } from '#utils/helpers';
import extractParamsFromContext from '#utils/server-side-props-helper/extract-params-from-context';
import {
  IPropsWithMetadata,
  postServerSideProps,
} from '#utils/server-side-props-helper/post-server-side-props';
import { NextPageWithLayout } from 'pages/_app';

interface IProps extends IPropsWithMetadata {
  uniteLegale: IUniteLegale;
  etablissementsScolaires: IEtablissementsScolaires | IAPINotRespondingError;
}

const EtablissementScolaire: NextPageWithLayout<IProps> = ({
  uniteLegale,
  etablissementsScolaires,
}) => {
  return (
    <>
      <Meta title={'Établissements scolaires'} noIndex={true} />
      <div className="content-container">
        <Title
          ficheType={FICHE.ETABLISSEMENTS_SCOLAIRES}
          uniteLegale={uniteLegale}
        />
        <EtablissementsScolairesSection
          etablissements={etablissementsScolaires}
        />
      </div>
    </>
  );
};

export const getServerSideProps: GetServerSideProps = postServerSideProps(
  async (context) => {
    const pageParam = (context.query.page || '') as string;
    const page = parseIntWithDefaultValue(pageParam, 1);
    const { slug } = extractParamsFromContext(context);
    const { uniteLegale, etablissementsScolaires } =
      await getEtablissementsScolairesFromSlug(slug, page);

    return {
      props: {
        uniteLegale,
        etablissementsScolaires: etablissementsScolaires,
      },
    };
  }
);

export default EtablissementScolaire;
