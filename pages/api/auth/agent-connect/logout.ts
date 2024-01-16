import { withIronSessionApiRoute } from 'iron-session/next';
import { NextApiRequest, NextApiResponse } from 'next';
import { agentConnectLogoutUrl } from '#clients/auth/agent-connect/strategy';
import { Exception } from '#models/exceptions';
import logErrorInSentry from '#utils/sentry';
import { cleanAgentSession, sessionOptions } from '#utils/session';

export default withIronSessionApiRoute(logoutRoute, sessionOptions);

async function logoutRoute(req: NextApiRequest, res: NextApiResponse) {
  try {
    const url = await agentConnectLogoutUrl(req);
    await cleanAgentSession(req.session);
    res.redirect(url);
  } catch (e: any) {
    logErrorInSentry(new LogoutFailedException({ cause: e }));
    res.redirect('/connexion/au-revoir');
  }
}

export class LogoutFailedException extends Exception {
  constructor(args: { cause?: any }) {
    super({
      ...args,
      name: 'LogoutFailedException',
    });
  }
}
