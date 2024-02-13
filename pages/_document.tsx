import Document, { Head, Html, Main, NextScript } from 'next/document';
import { isAgent, isSuperAgent } from '#utils/session';

const manifest = (
  process.env.NODE_ENV === 'production'
    ? require('../public/.vite/manifest.json')
    : {}
) as { [key: string]: any };

const LinksAndScripts = ({
  dev = false,
  useReact,
}: {
  dev: boolean;
  useReact: boolean;
}) => (
  <>
    {/* Standard Meta */}
    {/* https://gouvfr.atlassian.net/wiki/spaces/DB/pages/223019574/D+veloppeurs */}
    <link rel="apple-touch-icon" href="/favicons/apple-touch-icon.png" />
    <link rel="icon" href="/favicons/favicon.svg" type="image/svg+xml" />
    <link
      rel="shortcut icon"
      href="/favicons/favicon.ico"
      type="image/x-icon"
    />
    <link
      rel="manifest"
      href="/favicons/manifest.webmanifest"
      cross-origin="use-credentials"
    />
    {dev ? (
      <>
        <link
          rel="stylesheet"
          type="text/css"
          href="http://localhost:3001/frontend/style/dsfr.min.css"
        />
        <link
          rel="stylesheet"
          type="text/css"
          href="http://localhost:3001/frontend//globals.css"
        />
        <script
          defer
          type="module"
          src="http://localhost:3001/@vite/client"
        ></script>
        {!useReact && (
          <script
            defer
            type="module"
            src="http://localhost:3001/frontend/src/index.js"
          ></script>
        )}
      </>
    ) : (
      <>
        <link
          rel="preload"
          href={`/${manifest['style/fonts/Marianne-Bold.woff2'].file}`}
          as="font"
          type="font/woff2"
          crossOrigin=""
        />
        <link
          rel="preload"
          href={`/${manifest['style/fonts/Marianne-Regular.woff2'].file}`}
          as="font"
          type="font/woff2"
          crossOrigin=""
        />
        <link
          rel="preload"
          href={`/${manifest['style/fonts/Marianne-Regular_Italic.woff2'].file}`}
          as="font"
          type="font/woff2"
          crossOrigin=""
        />
        <link
          rel="preload"
          href={`/${manifest['style/fonts/Marianne-Medium.woff2'].file}`}
          as="font"
          type="font/woff2"
          crossOrigin=""
        />
        <link
          rel="stylesheet"
          type="text/css"
          href={`/${manifest['style/dsfr.min.css'].file}`}
        />
        <link
          rel="stylesheet"
          type="text/css"
          href={`/${manifest['style/globals.css'].file}`}
        />
        {!useReact && (
          <script
            defer
            type="module"
            src={`/${manifest['src/index.js'].file}`}
          ></script>
        )}
      </>
    )}
  </>
);

class CustomHead extends Head {
  render() {
    const { head, styles } = this.context;
    const children = this.props.children;
    this.context.docComponentsRendered.Head = true;
    this.context.docComponentsRendered.NextScript = true;
    return (
      //eslint-disable-next-line react/jsx-props-no-spreading
      <head {...this.props}>
        {children}
        {head}
        {styles}
      </head>
    );
  }
}

class CustomDocument extends Document {
  render() {
    const isProd = process.env.NODE_ENV === 'production';
    const useReact =
      this.props['__NEXT_DATA__']?.props?.pageProps?.metadata?.useReact;
    const session =
      this.props['__NEXT_DATA__']?.props?.pageProps?.metadata?.session;
    const HeadToUse = useReact ? Head : CustomHead;
    return (
      <Html lang="fr">
        <HeadToUse>
          <LinksAndScripts dev={!isProd} useReact={useReact} />
        </HeadToUse>
        <body>
          <Main />
          {isProd && process.env.MATOMO_SITE_ID && (
            <script
              dangerouslySetInnerHTML={{
                __html: `
              var _paq = window._paq || [];
              ${
                isSuperAgent(session)
                  ? `_paq.push(['setCustomDimension', '1', 'Super-agent connecté']);`
                  : isAgent(session)
                  ? `_paq.push(['setCustomDimension', '1', 'Agent connecté']);`
                  : ''
              }
              _paq.push(['trackPageView']);
              _paq.push(['enableLinkTracking']);
              (function () {
                var u = 'https://stats.data.gouv.fr/';
                _paq.push(['setTrackerUrl', u + 'piwik.php']);
                _paq.push(['setSiteId', ${process.env.MATOMO_SITE_ID}]);
                var d = document,
                  g = d.createElement('script'),
                  s = d.getElementsByTagName('script')[0];
                g.type = 'text/javascript';
                g.async = true;
                g.defer = true;
                g.src = u + 'piwik.js';
                s.parentNode.insertBefore(g, s);
              })();
              `,
              }}
            ></script>
          )}
          {useReact && <NextScript />}
        </body>
      </Html>
    );
  }
}

export default CustomDocument;
