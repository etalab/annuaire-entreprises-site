import { Metadata } from 'next';
import TextWrapper from '#components-ui/text-wrapper';
import { NextPageWithLayout } from '../../../pages/_app';

export const metadata: Metadata = {
  title: 'Mentions légales',
  robots: 'noindex, nofollow',
  alternates: {
    canonical: 'https://annuaire-entreprises.data.gouv.fr/mentions-legales',
  },
};

const Mentions: NextPageWithLayout = () => (
  <TextWrapper>
    <h1>Mentions légales</h1>
    <h2>Éditeur</h2>
    <p>
      Ce site est édité par l’incubateur des services numériques, Direction
      interministérielle du numérique (DINUM), Services du Premier ministre.
    </p>
    <h2>Conception et gestion du site</h2>
    <p>
      Ce site est développé en mode agile, selon un principe d’amélioration
      continue. De nouvelles fonctionnalités seront ajoutées prochainement.
    </p>
    <h2>Code source du site</h2>
    <p>Le code source du site est disponible sur Github.</p>
    <h2>Hébergement</h2>
    <p>
      OVH 2 rue Kellermann - 59100 Roubaix - France Tel. 09 72 10 10 07 (prix
      d’un appel vers un poste fixe en France)
    </p>
  </TextWrapper>
);

export default Mentions;
