import Document, { Html, Head, Main, NextScript } from 'next/document'

class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx)
    return { ...initialProps }
  }

  render() {
    return (
      <Html lang="en">
        <Head>
          <link rel="icon" href="/favicon.ico"/>
          <meta charSet="utf-8"/>
          <meta name="theme-color" content="#000000"/>
          <meta http-equiv="Content-Language" content="en"/>
          <meta name="description" content="Personal website and portfolio for Mike Stumpf"/>
        </Head>
        <body>
        <Main />
        <NextScript />
        </body>
      </Html>
    )
  }
}

export default MyDocument