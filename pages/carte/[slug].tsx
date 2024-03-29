import { GetServerSideProps } from 'next';
import { Info } from '#components-ui/alerts';
import HiddenH1 from '#components/a11y-components/hidden-h1';
import MapEtablissement from '#components/map/map-etablissement';
import Meta from '#components/meta/meta-client';
import { MapTitleEtablissement } from '#components/title-section/etablissement/map-title';
import { getEtablissementWithLatLongFromSlug } from '#models/core/etablissement';
import {
  estDiffusible,
  getAdresseEtablissement,
} from '#models/core/statut-diffusion';
import { IEtablissement } from '#models/core/types';
import extractParamsPageRouter from '#utils/server-side-helper/page/extract-params';
import {
  IPropsWithMetadata,
  postServerSideProps,
} from '#utils/server-side-helper/page/post-server-side-props';
import { NextPageWithLayout } from 'pages/_app';

interface IProps extends IPropsWithMetadata {
  etablissement: IEtablissement;
}

const EtablissementMapPage: NextPageWithLayout<IProps> = ({
  etablissement,
  metadata: { session },
}) => (
  <>
    <Meta
      noIndex={true}
      title="Carte"
      canonical={`https://annuaire-entreprises.data.gouv.fr/carte/${etablissement.siret}`}
    />
    <div className="fr-container">
      <br />
      <a href={`/entreprise/${etablissement.siren}`}>
        ⇠ Retourner à la fiche de la structure
      </a>
      <br />
      <br />
      <a href={`/etablissement/${etablissement.siret}`}>
        ⇠ Retourner à la fiche de l’établissement
      </a>
      <HiddenH1 title="Localisation de l’etablissement" />
      <>
        <MapTitleEtablissement
          etablissement={etablissement}
          title={`Géolocalisation de l’établissement - ${getAdresseEtablissement(
            etablissement,
            session
          )}`}
        />
        {!estDiffusible(etablissement) ? (
          <Info>
            Cette structure est non-diffusible. <br />
            Son adresse complète n’est pas publique, mais sa commune de
            domiciliation est :{' '}
            {getAdresseEtablissement(etablissement, session)}.
          </Info>
        ) : (
          <>
            <br />
            {etablissement.latitude && etablissement.longitude ? (
              <div className="map-container">
                <MapEtablissement etablissement={etablissement} />
              </div>
            ) : (
              <i>
                Nous n’avons pas réussi à déterminer la géolocalisation de cet
                établissement.
              </i>
            )}
            <br />
          </>
        )}
      </>
    </div>
    <style jsx>
      {`
        .map-container {
          display: flex;
          flex-direction: row-reverse;
          height: 600px;
        }
      `}
    </style>
  </>
);

export const getServerSideProps: GetServerSideProps = postServerSideProps(
  async (context) => {
    const { slug } = extractParamsPageRouter(context);

    const etablissement = await getEtablissementWithLatLongFromSlug(slug);

    return {
      props: {
        etablissement,
      },
    };
  }
);

export default EtablissementMapPage;
