const axios = require('axios');
const fs = require('fs');

require('dotenv').config();

console.info('=== INPI PDF proxy checker ===');

const sleep = async (seconds) => {
  return new Promise((resolve) => {
    setTimeout(() => resolve(), seconds * 1000);
  });
};

const downloadAuthenticatedPdf = async (siren) => {
  let retry = 0;
  const create = await axios(
    `https://staging.rncs-proxy.api.gouv.fr/document/justificatif/job/${siren}`,
    {
      timeout: 90 * 1000,
      method: 'GET',
      headers: {
        'X-APIKey': process.env.PROXY_API_KEY,
      },
    }
  );
  const slug = create.data.slug;

  if (!slug) {
    throw new Error('Job was not created properly');
  }

  console.log(slug);

  while (retry <= 3) {
    await sleep(15);
    try {
      const file = await axios(
        `https://staging.rncs-proxy.api.gouv.fr/downloads/${slug}.pdf`,
        {
          headers: {
            'X-APIkey': process.env.PROXY_API_KEY,
          },
        }
      );
      return file;
    } catch (e) {
      console.log(`Attempt n°${retry} failed. Retrying in 15 seconds...`);
    }
    retry += 1;
  }
};

const checkINPIpdfProxy = async () => {
  try {
    // let's test Danone Siren
    const siren = '552032534';

    // let's download the regular pdf
    const [unauthentifiedPdf, authentifiedPdf] = await Promise.all([
      axios(
        `https://data.inpi.fr/export/companies?format=pdf&ids=["${siren}"]`,
        {
          timeout: 90 * 1000,
          method: 'GET',
          headers: {
            Accept: '*/*',
            Host: 'data.inpi.fr',
            'User-Agent':
              'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:100.0) Gecko/20100101 Firefox/100.0',
          },
        }
      ),
      // and the authenticated one
      downloadAuthenticatedPdf(siren),
    ]);

    // we compare size
    const unauthentifiedPdfSize = unauthentifiedPdf.data.length;
    const authentifiedPdfSize = authentifiedPdf.data.length;
    const ratio = unauthentifiedPdfSize / authentifiedPdfSize;

    // pdf should be bigger than 100ko
    if (unauthentifiedPdfSize <= 100000 || authentifiedPdfSize <= 100000) {
      console.info(
        '=> ❌ at least one PDF is too small and might be corrupted'
      );
      process.exit(1);
    }

    if (
      unauthentifiedPdfSize === authentifiedPdfSize ||
      ratio < 0.5 ||
      ratio > 2
    ) {
      console.info(
        `=> ❌ size ratio is suspect. unauthenticated PDF is ${
          ratio * 100
        }% of authenticated (${authentifiedPdfSize})`
      );
      process.exit(1);
    }
    console.info('=> ✅ yaaay ! pdf proxy worked like a charm 🧙‍♂️');
  } catch (e) {
    console.log(e);
    console.info('=> ❌ download failed');
    process.exit(1);
  }
};
checkINPIpdfProxy();
