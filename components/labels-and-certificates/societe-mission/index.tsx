import FAQLink from '#components-ui/faq-link';
import { Section } from '#components/section';
import { EAdministration } from '#models/administrations/EAdministration';

export const CertificationSocieteMission = () => (
  <Section
    title="Société à mission"
    sources={[EAdministration.INSEE]}
    id="societe-a-mission"
  >
    Cette structure est une{' '}
    <FAQLink tooltipLabel="société à mission" to="/faq/societe-a-mission">
      Une <strong>société à mission</strong> est une entreprise avec une{' '}
      <strong>raison d’être</strong> intégrant des objectifs sociaux et
      environnementaux.
    </FAQLink>
    .
  </Section>
);
