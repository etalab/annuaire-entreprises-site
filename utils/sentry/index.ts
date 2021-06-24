import * as Sentry from '@sentry/node';

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
    //@ts-ignore
    scope.setTag(key, extra[key]);
  });
  return scope;
};

let _isInitialized = false;

const init = () => {
  if (_isInitialized) {
    return;
  }

  Sentry.init({
    dsn: process.env.SENTRY_DSN,

    // Set tracesSampleRate to 1.0 to capture 100%
    // of transactions for performance monitoring.
    // We recommend adjusting this value in production
    tracesSampleRate: 1.0,
  });
  _isInitialized = true;
};

const logInSentryCurry =
  (info: Sentry.Severity) => (errorMsg: any, extra?: IScope) => {
    if (process.env.NODE_ENV === 'development') {
      console.log(errorMsg, JSON.stringify(extra));
    }
    if (process.env.NODE_ENV === 'production' && process.env.SENTRY_DSN) {
      init();
      const scope = getScope(extra || {});
      Sentry.captureException(errorMsg, scope);
    }
  };

export const logWarningInSentry = logInSentryCurry(Sentry.Severity.Warning);

export const logErrorInSentry = logInSentryCurry(Sentry.Severity.Error);

export default logErrorInSentry;
