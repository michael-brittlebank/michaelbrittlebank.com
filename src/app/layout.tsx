import React, { ReactNode } from 'react';
import '@/styles/app.scss';

export default function RootLayout({
                                     children,
                                   }: {
  children: ReactNode
}) {
  return (
    <html lang='en'>
    <head>
      <title>Michael Brittlebank</title>
      <meta
        name='viewport'
        content='width=device-width, initial-scale=1, shrink-to-fit=no'
      />
      <link rel='icon' href='/favicon.ico' />
      <meta charSet='utf-8' />
      <meta name='theme-color' content='#000000' />
      <meta httpEquiv='Content-Language' content='en' />
      <meta
        name='description'
        content='Personal website and portfolio for Michael (Brittlebank) Brittlebank'
      />
      {/* Global Site Tag (gtag.js) - Google Analytics */}
      <script
        async
        src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NX_GOOGLE_ANALYTICS}`}
      />
      <script
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${process.env.NX_GOOGLE_ANALYTICS}', {
              page_path: window.location.pathname,
            });
          `,
        }}
      />
    </head>
    <body>
    {children}
    </body>
    </html>
  );
}
