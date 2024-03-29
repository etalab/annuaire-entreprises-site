import { getIronSession } from 'iron-session';
import { cookies } from 'next/headers';
import { ISession, sessionOptions } from '#utils/session';

export default async function getSession(): Promise<ISession | null> {
  return await getIronSession<ISession>(cookies(), sessionOptions);
}
