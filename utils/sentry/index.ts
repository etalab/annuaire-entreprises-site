import * as Sentry from '@sentry/nextjs';
import { SeverityLevel } from '@sentry/nextjs';
import env from '#env';

export interface IScope {
  page?: string;
  siret?: string;
  siren?: string;
  details?: string;
  referrer?: string;
  browser?: string;
}

// scope allows to log stuff in tags in sentry
const getScope = (extra: IScope) => {
  const scope = new Sentry.Scope();
  Object.keys(extra).forEach((key) => {
    scope.setTag(key, extra[key as keyof typeof extra] || 'N/A');
  });
  if (env.INSTANCE_NUMBER) {
    scope.setTag('instance_number', env.INSTANCE_NUMBER);
  }
  return scope;
};

let _isInitialized = false;

const init = () => {
  if (_isInitialized) {
    return;
  }

  Sentry.init({
    dsn: env.SENTRY_DSN,
    tracesSampleRate: 0.1,
  });
  _isInitialized = true;
};

const logInSentryFactory =
  (severity = 'error' as SeverityLevel) =>
  (errorMsg: any, extra?: IScope) => {
    if (process.env.NODE_ENV === 'development' || !env.SENTRY_DSN) {
      console.error(errorMsg, JSON.stringify(extra));
    }
    if (process.env.NODE_ENV === 'production' && env.SENTRY_DSN) {
      init();
      const scope = getScope(extra || {});
      scope.setLevel(severity);

      if (typeof errorMsg === 'string') {
        Sentry.captureMessage(errorMsg, scope);
      } else {
        Sentry.captureException(errorMsg, scope);
      }
    }
  };

export const logWarningInSentry = logInSentryFactory('info' as SeverityLevel);

export const logErrorInSentry = logInSentryFactory('error' as SeverityLevel);

export default logErrorInSentry;
