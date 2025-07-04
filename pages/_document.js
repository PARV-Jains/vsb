import Document , { Html, Head, Main, NextScript } from 'next/document'

class MyDocument extends Document{
  render(){
  return (
    <Html className='overflow-x-hidden'>
       <link rel="manifest" href="/pwa/manifest.json" />
          <link rel="apple-touch-icon" href="/icon.png"></link>
          <meta name="theme-color" content="#fff" />
      <Head />
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
}
export default MyDocument;