import styles from './styles.module.scss';
type IProps = {
  title: string;
  width: number;
  height: number;
  slug: string;
  className?: string;
};

/**
 * Logo renderer
 * uses a slug to render any logo from /public/images/logos/...
 *
 * @param param0
 * @returns
 */
const Logo: React.FC<IProps> = ({
  title = 'Annuaire des Entreprises',
  width,
  height,
  slug = 'marianne',
  className = '',
}) => (
  <div
    className={styles['logo-wrapper']}
    style={{
      width: `${width}px`,
      height: `${height}px`,
    }}
  >
    <img
      className={className}
      src={`/images/logos/${slug || 'marianne'}.svg`}
      alt={title}
      title={title}
      width="100%"
      height="100%"
    />
  </div>
);

export default Logo;
