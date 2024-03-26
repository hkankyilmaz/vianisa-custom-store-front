import {RemixServer} from '@remix-run/react';
import isbot from 'isbot';
import {renderToReadableStream} from 'react-dom/server';
import {createContentSecurityPolicy} from '@shopify/hydrogen';

export default async function handleRequest(
  request,
  responseStatusCode,
  responseHeaders,
  remixContext,
) {
  const {nonce, header, NonceProvider} = createContentSecurityPolicy({
    styleSrc: [
      'style-src',
      "'self'",
      'nonce-e6d7c44dd77fb8617082f7d40142ecf2',
      'https://static.klaviyo.com',
      'https://cdn.shopify.com',
      'https://shopify.com',
      'https://judge.me',
      'https://api.judge.me',
    ],
    connectSrc: [
      "'self'",
      'https://cdn.judge.me',
      'https://cache.judge.me',
      'https://judge.me',
    ],
    styleSrc: [
      "default-src * 'unsafe-inline' 'unsafe-eval' data: blob:; ",
      "script-src * data: blob: 'unsafe-inline' 'unsafe-eval';",
      // "connect-src * data: blob: 'unsafe-inline';",
      "img-src * data: blob: 'unsafe-inline';",
      'frame-src * data: blob: ;',
      // "style-src * data: blob: 'unsafe-inline';",
      "font-src * data: blob: 'unsafe-inline';",
    ],
  });
  const body = await renderToReadableStream(
    <NonceProvider>
      <RemixServer context={remixContext} url={request.url} />
    </NonceProvider>,
    {
      nonce,
      signal: request.signal,
      onError(error) {
        // eslint-disable-next-line no-console
        console.error(error);
        responseStatusCode = 500;
      },
    },
  );

  if (isbot(request.headers.get('user-agent'))) {
    await body.allReady;
  }
  responseHeaders.set('Content-Type', 'text/html');
  responseHeaders.set('Content-Security-Policy', header);

  return new Response(body, {
    headers: responseHeaders,
    status: responseStatusCode,
  });
}
