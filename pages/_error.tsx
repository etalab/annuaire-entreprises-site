import { ServerErrorExplanations } from '#components/error-explanations';
import Meta from '#components/meta/meta-client';
import { Exception } from '#models/exceptions';
import { logFatalErrorInSentry, logWarningInSentry } from '#utils/sentry';
import { NextPageWithLayout } from './_app';

const ServerError: NextPageWithLayout = () => {
  return (
    <>
      <Meta title="Cette page ne fonctionne pas" noIndex={true} />
      <ServerErrorExplanations />
    </>
  );
};

ServerError.getInitialProps = (...args) => {
  // log as JSON in order to be parse by Kibana
  const { res, err } = args[0];
  logFatalErrorInSentry(
    new Exception({
      name: 'ServerErrorPageDisplayed',
      cause: err,
      context: {
        page: res?.req.url,
      },
    })
  );
  try {
    console.error(JSON.stringify(args[0]));
  } catch (e) {
    console.error('Failed to parse NextPageRequest, returning 500');
    logWarningInSentry(
      new Exception({
        name: 'FailToParseNextPageRequest',
        cause: e,
        context: {},
      })
    );
  }
  return { statusCode: 500 };
};

export default ServerError;
