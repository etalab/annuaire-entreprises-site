export enum ISTATUTDIFFUSION {
  PARTIAL = 'partiellement diffusible',
  NONDIFF = 'non-diffusible',
  DIFFUSIBLE = 'diffusible',
}

/**
 * Only diffusible. Exclude partially diffusible and non-diffusible
 * @param uniteLegaleOrEtablissement
 * @returns
 */
export const estDiffusible = (uniteLegaleOrEtablissement: {
  statutDiffusion: ISTATUTDIFFUSION;
}) => {
  return (
    uniteLegaleOrEtablissement.statutDiffusion === ISTATUTDIFFUSION.DIFFUSIBLE
  );
};

/**
 * Only partially diffusible. Exclude diffusible and non-diffusible
 * @param uniteLegaleOrEtablissement
 * @returns
 */
export const estPartialDiffusible = (uniteLegaleOrEtablissement: {
  statutDiffusion: ISTATUTDIFFUSION;
}) => {
  return (
    uniteLegaleOrEtablissement.statutDiffusion === ISTATUTDIFFUSION.PARTIAL
  );
};

/**
 * Only strict non-diffusible. Exclude partially diffusible and diffusible
 * @param uniteLegaleOrEtablissement
 * @returns
 */
export const estNonDiffusible = (uniteLegaleOrEtablissement: {
  statutDiffusion: ISTATUTDIFFUSION;
}) => {
  return (
    uniteLegaleOrEtablissement.statutDiffusion === ISTATUTDIFFUSION.NONDIFF
  );
};
