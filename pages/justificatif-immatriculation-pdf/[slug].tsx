import { GetServerSideProps } from 'next';
import React from 'react';
import routes from '#clients/routes';
import Info from '#components-ui/alerts/info';
import { Loader } from '#components-ui/loader';
import { Tag } from '#components-ui/tag';
import { INPI } from '#components/administrations';
import FrontStateMachine from '#components/front-state-machine';
import Meta from '#components/meta';
import { Section } from '#components/section';
import { TwoColumnTable } from '#components/table/simple';
import { EAdministration } from '#models/administrations';
import constants from '#models/constants';
import { formatIntFr } from '#utils/helpers';
import extractParamsFromContext from '#utils/server-side-props-helper/extract-params-from-context';
import { postServerSideProps } from '#utils/server-side-props-helper/post-server-side-props';
import { NextPageWithLayout } from 'pages/_app';

const Retry: React.FC<{}> = () => (
  <>
    <div
      dangerouslySetInnerHTML={{
        __html: `
            <div class="button-link small">
                <button onclick="window.downloadInpiPDF();">
                <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                >
                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                    <polyline points="7 10 12 15 17 10"></polyline>
                    <line x1="12" y1="15" x2="12" y2="3"></line>
                </svg>
                <span>&nbsp;Relancer le téléchargement</span>
                </button>
            </div>
        `,
      }}
    />
  </>
);

const InpiPDF: NextPageWithLayout<{ siren: string }> = ({ siren }) => {
  const downloadLink = `${routes.rne.portail.pdf}?format=pdf&ids=[%22${siren}%22]`;
  return (
    <>
      <Meta
        title="Télécharger le justificatif d’immatriculation"
        noIndex={true}
      />
      <br />
      <a href={`/justificatif/${siren}`}>
        ← Retour à la page justificatif d’immatriculation
      </a>
      <div className="content-container">
        <h1>Téléchargement du justificatif d’immatriculation</h1>

        <Section
          title="Justificatif d’immatriculation au RNE"
          sources={[EAdministration.INPI]}
        >
          <Info full>
            Le téléservice de l’
            <INPI /> peut malheureusement être victime de son succés et avoir{' '}
            <b>du mal à répondre à toutes les demandes</b> de document.
            <br />
            Un téléchargement normal prend <b>entre 10 et 20 secondes</b>.{' '}
            <br />
            Mais quand le service est surchargé, le téléchargement peut
            atteindre plusieurs minutes <b>voire même échouer</b>.
          </Info>
          <p>
            Le téléchargement de l’extrait d’immatriculation au Répertoire
            National des Entreprises (RNE) a commencé pour le siren{' '}
            <a href={`/entreprise/${siren}`}>{formatIntFr(siren)}</a>.
          </p>
          <TwoColumnTable
            body={[
              [
                'Statut du téléchargement',
                <FrontStateMachine
                  id="immatriculation-pdf-status-wrapper"
                  states={[
                    <i>
                      le téléchargement va commencer... (si il ne démarre pas,{' '}
                      <a
                        target="_blank"
                        rel="noreferrer noopener"
                        href={downloadLink}
                      >
                        cliquez ici
                      </a>
                      )
                    </i>,
                    <>
                      <Tag>
                        <Loader /> téléchargement en cours
                      </Tag>
                      <span style={{ color: '#777', fontWeight: 'bold' }}>
                        (temps estimé entre 10 secondes et 2 minute)
                      </span>
                    </>,
                    <>
                      <Tag color="success">succés</Tag>
                    </>,
                    <>
                      <Tag color="error">échec</Tag>
                      <p>
                        Le téléchargement a échoué car le téléservice de l’
                        <INPI /> ne fonctionne pas actuellement.{' '}
                        <b>Nous sommes désolé pour ce désagrément</b>.
                      </p>
                      <a
                        target="_blank"
                        rel="noreferrer noopener"
                        href={downloadLink}
                      >
                        Cliquez ici pour ré-essayer de télécharger le document
                      </a>
                    </>,
                    <>
                      <Tag color="error">introuvable</Tag>
                      <p>
                        Le document que vous recherchez n’a pas été retrouvé par
                        le téléservice de l’
                        <INPI />.
                      </p>
                      <p>
                        Il arrive que certaines structures soient correctement
                        immatriculées mais que le document justificatif soit{' '}
                        <b>introuvable</b>.
                      </p>
                      <p>
                        Quand c’est le cas,{' '}
                        <a href={constants.links.mailtoInpi}>
                          écrivez à l’INPI pour leur demander le document.
                        </a>{' '}
                        L’
                        <INPI /> étant à la fois l’opérateur du Registre
                        National des Entreprises (RNE) et du téléservice qui
                        produit les justificatifs, eux seuls sont en mesure de
                        résoudre le problème.
                      </p>
                    </>,
                  ]}
                />,
              ],
            ]}
          />
        </Section>
      </div>
    </>
  );
};

export const getServerSideProps: GetServerSideProps = postServerSideProps(
  async (context) => {
    const { slug } = extractParamsFromContext(context);
    return {
      props: { siren: slug },
    };
  }
);

export default InpiPDF;
