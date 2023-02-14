import Document, {Html, Head, Main, NextScript, DocumentContext} from 'next/document'
import Script from 'next/script';
import {Language} from '@/constants/enum';

const MyDocument = () => {
  return (
    <Html>
      <Head />
      <body>
      <Main />
      <NextScript />
      <Script id="theme-script" strategy="beforeInteractive">
        {
          `const theme = localStorage.getItem('theme') || 'light';
           localStorage.setItem('theme', theme);
           document.getElementsByTagName('html')[0].dataset.theme = theme;
           const language = localStorage.getItem('language') || 'zh-CN';
           localStorage.setItem('language', language);
           document.getElementsByTagName('html')[0].lang = language;
           `
        }
      </Script>
      </body>
    </Html>
  )
}

export const getServerSideProps = async (context: DocumentContext & {locale: string}) => {
  const initialProps = await Document.getInitialProps(context);
  return { ...initialProps, locale: context?.locale || Language.ch };
}
export default MyDocument;
