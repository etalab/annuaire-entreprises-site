import { getIronSession } from 'iron-session';
import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';
import { sessionOptions, setVisitTimestamp } from '#utils/session';
import { extractSirenOrSiretSlugFromUrl } from '#utils/helpers';

// This function can be marked `async` if using `await` inside
export async function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;
  const sirenOrSiretSlug = extractSirenOrSiretSlugFromUrl(pathname);

  const isEntreprisePage = pathname.startsWith('/entreprise/');

  if (isEntreprisePage && sirenOrSiretSlug.length === 14) {
    return NextResponse.redirect(
      new URL(`/etablissement/${sirenOrSiretSlug}`, request.url)
    );
  }

  const isEtablissementPage = pathname.startsWith('/etablissement/');

  if (isEtablissementPage && sirenOrSiretSlug.length === 9) {
    return NextResponse.redirect(
      new URL(`/entreprise/${sirenOrSiretSlug}`, request.url)
    );
  }

  // https://github.com/vercel/next.js/issues/43704#issuecomment-1411186664

  // Store current request url in a custom header, which you can read later
  const requestHeaders = new Headers(request.headers);
  requestHeaders.set('x-pathname', request.nextUrl.pathname);

  const response = NextResponse.next({
    request: {
      // Apply new request headers
      headers: requestHeaders,
    },
  });
  const session = await getIronSession(request, response, sessionOptions);
  await setVisitTimestamp(session);
  return response;
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: ['/entreprise/:path*', '/etablissement/:path*'],
};
