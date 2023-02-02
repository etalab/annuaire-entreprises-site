import { withIronSessionApiRoute } from 'iron-session/next';
import { NextApiRequest, NextApiResponse } from 'next';
import { monCompteProLogoutUrl } from '#clients/auth/mon-compte-pro/strategy';
import logErrorInSentry from '#utils/sentry';
import { sessionOptions } from '#utils/session';

export default withIronSessionApiRoute(loginRoute, sessionOptions);

async function loginRoute(_req: NextApiRequest, res: NextApiResponse) {
  try {
    const url = await monCompteProLogoutUrl();
    res.redirect(url);
  } catch (e: any) {
    logErrorInSentry('Logout failed', { details: e.toString() });
    res.redirect('/connexion/au-revoir');
  }
}