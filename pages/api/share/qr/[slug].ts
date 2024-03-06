import { createCanvas, loadImage } from 'canvas';
import { NextApiRequest, NextApiResponse } from 'next';
import QRCode from 'qrcode';
import { Exception } from '#models/exceptions';
import { hasSirenFormat } from '#utils/helpers';
import logErrorInSentry from '#utils/sentry';

const getUrl = (slug: string) => {
  if (hasSirenFormat(slug)) {
    return `https://annuaire-entreprises.data.gouv.fr/entreprise/${slug}?mtm_campaign=qr-code`;
  }
  return `https://annuaire-entreprises.data.gouv.fr/etablissement/${slug}?mtm_campaign=qr-code`;
};

async function createQRCode(dataForQRcode: string) {
  const image =
    ' data:image/png;base64,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';

  const width = 300;
  const cWidth = 100;
  const canvas = createCanvas(width, width);
  QRCode.toCanvas(canvas, dataForQRcode, {
    errorCorrectionLevel: 'H',
    margin: 1,
    width,
    color: {
      dark: '#000091',
      light: '#ffffff',
    },
  });

  const ctx = canvas.getContext('2d');
  const img = await loadImage(image);
  const center = (width - cWidth) / 2;
  ctx.drawImage(img, center, center, cWidth, cWidth);
  return canvas.toDataURL('image/png');
}

const qrCode = async (
  { query: { slug } }: NextApiRequest,
  res: NextApiResponse
) => {
  const url = getUrl(slug as string);

  try {
    const urlAsImg = await createQRCode(url);

    const base64Data = urlAsImg.replace(/^data:image\/png;base64,/, '');
    var img = Buffer.from(base64Data, 'base64');
    res.writeHead(200, {
      'Content-Type': 'image/png',
      'Content-Length': img.length,
    });
    res.end(img);
  } catch (e: any) {
    logErrorInSentry(
      new Exception({
        name: 'QRCodeGenerationException',
        cause: e,
        context: {
          slug: slug as string,
        },
      })
    );

    res.status(500).json({ message: e });
  }
};

export default qrCode;
