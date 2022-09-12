import React from 'react';

import { GetServerSideProps } from 'next';
import Page from '../../layouts';

import {
  administrationsMetaData,
  EAdministration,
} from '../../models/administration';
import {
  redirectPageNotFound,
  redirectServerError,
} from '../../utils/redirects';
import { HttpNotFound } from '../../clients/exceptions';
import AdministrationDescription from '../../components/administrations/administration-description';

const AdministrationPage: React.FC<{
  long: string;
  slug: string;
}> = ({ long, slug }) => (
  <Page
    small={true}
    title={long}
    canonical={`https://annuaire-entreprises.data.gouv.fr/sources-de-donnees/${slug}`}
  >
    <div className="content-container">
      <br />
      <a href="/administration">← Toutes les administrations partenaires</a>
      <AdministrationDescription slug={slug} />
    </div>
    <style jsx>{`
      .content-container {
        margin: 20px auto 40px;
      }
    `}</style>
  </Page>
);

export const getServerSideProps: GetServerSideProps = async (context) => {
  //@ts-ignore
  const administrationEnum = context.params.slug as EAdministration;

  try {
    const administration = Object.values(administrationsMetaData).find(
      //@ts-ignore
      (admin) => admin.slug === administrationEnum
    );
    if (administration === undefined) {
      throw new HttpNotFound(`${administrationEnum}`);
    }

    return {
      props: {
        ...administration,
      },
    };
  } catch (e: any) {
    if (e instanceof HttpNotFound) {
      return redirectPageNotFound(
        `Administration ${administrationEnum} page does not exist`,
        {
          page: context.req.url,
        }
      );
    } else {
      return redirectServerError(e.toString());
    }
  }
};

export default AdministrationPage;
