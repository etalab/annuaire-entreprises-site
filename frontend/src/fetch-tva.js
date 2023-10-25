/**
 * ASYNC CLIENT UPDATE FUNCTIONS
 *
 *
 */
import * as Sentry from '@sentry/browser';
import FrontStateMachineFactory from './front-state-machine';
import { isViteSentryActivated } from './sentry';
import { extractSirenSlugFromUrl, formatIntFr } from './utils';

(function TVA() {
  const tvaContainer = FrontStateMachineFactory('tva-cell-wrapper');
  if (tvaContainer.exists) {
    tvaContainer.setStarted();

    const siren = extractSirenSlugFromUrl(window.location.pathname || '');

    fetch(`/api/data-fetching/verify-tva/${siren}`)
      .then((e) => {
        if (!e.ok) {
          throw new Error("Error in API TVA :" + e.status);
        }
        return e.json();
      })
      .then((response) => {
        const resultCell = document.getElementById('tva-cell-result');
        const tva = response.tva;
        if (tva) {
          resultCell.innerHTML = formatIntFr(tva);
          tvaContainer.setSuccess();
        } else {
          tvaContainer.setDefault();
        }
      })
      .catch((e) => {
        if (isViteSentryActivated) {
          Sentry.captureException(e);
        } else {
          console.error(e)
        }
        tvaContainer.setError();
      });
  }
})();
