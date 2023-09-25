import path from 'path';
import { clientAllEtablissementsInsee } from '..';

describe('clientAllEtablissementsInsee', () => {
  // We use the commented lines to generate snapshots for
  // E2E testing.
  // Hovewer, we don't test them for regression because the result
  // of the pagination changes systematically between API calls.

  [
    // '200054781',
    // '300025764',
    '351556394',
    // '528163777',
    '839517323',
    '842019051',
    '880878145',
    '908595879',
  ].forEach((siren) => expectClientToMatchSnapshotWithSiren(siren));

  // expectClientToMatchSnapshotWithSiren('356000000', 1);
  // expectClientToMatchSnapshotWithSiren('356000000', 3);
  // expectClientToMatchSnapshotWithSiren('356000000', 6);
  // expectClientToMatchSnapshotWithSiren('356000000', 7);
});

function expectClientToMatchSnapshotWithSiren(siren: string, page = 1) {
  it(`Should match snapshot with siren ${siren}${
    page !== 1 ? ' and page ' + page : ''
  }`, async () => {
    const args = [
      siren,
      page,
      {
        useFallback: false,
        useCache: false,
      },
    ] as const;
    const result = await clientAllEtablissementsInsee(...args);

    expect(
      JSON.stringify(
        {
          args: {
            siren,
            page,
          },
          result,
        },
        null,
        2
      )
    ).toMatchFile(
      path.join(
        __dirname,
        `./siren-${siren}${page !== 1 ? '-page-' + page : ''}.json`
      )
    );
  });
}
