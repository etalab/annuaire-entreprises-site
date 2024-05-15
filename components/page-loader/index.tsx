'use client';

import { Info } from '#components-ui/alerts';
import FadeIn from '#components-ui/animation/fade-in';
import { HeightTransition } from '#components-ui/animation/height-transition';
import { Loader } from '#components-ui/loader';
import { useTimeout } from 'hooks';
import style from './style.module.css';

export function PageLoader() {
  const after5s = useTimeout(5000);
  return (
    <>
      {after5s && (
        <HeightTransition>
          <FadeIn>
            <Info>
              Le téléservice qui renvoie la donnée semble occupé en ce moment.
              Le téléchargement des informations peut prendre du temps (10s à
              20s).
            </Info>
          </FadeIn>
        </HeightTransition>
      )}
      <div className={style.loader}>
        Chargement des données en cours <Loader />
      </div>
    </>
  );
}
