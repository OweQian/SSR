import type { AppProps, AppContext } from 'next/app';
import App from 'next/app';
import Head from 'next/head';
import axios from 'axios';
import ThemeContextProvider from '@/stores/theme';
import UserAgentProvider from '@/stores/userAgent';
import LanguageContextProvider from '@/stores/language';
import { LOCALDOMAIN, getIsMobile, getIsSupportWebp } from '@/utils';
import type { ILayoutProps } from '@/components/layout';
import { appWithTranslation } from 'next-i18next';
import Layout from '@/components/layout';
import '@/styles/globals.css'

export interface IDeviceInfoProps {
  isMobile: boolean;
  isSupportWebp: boolean;
}

const MyApp = (data: AppProps & ILayoutProps & IDeviceInfoProps) => {
  const {
    Component, pageProps, navbarData, footerData, isMobile, isSupportWebp
  } = data;
  return (
    <div>
      <Head>
        <title>{`A Demo for 官网开发实战 (${
          isMobile ? "移动端" : "pc端"
        })`}</title>
        <meta
          name="description"
          content="A Demo for 官网开发实战"
        />
        <link rel="icon" href="/favicon.ico" />
        <meta name="viewport" content="user-scalable=no" />
        <meta name="viewport" content="initial-scale=1,maximum-scale=1" />
        <meta name="viewport" content="width=device-width" />
      </Head>
      <LanguageContextProvider>
        <ThemeContextProvider>
          <UserAgentProvider>
            <Layout navbarData={navbarData} footerData={footerData}>
              <Component {...pageProps} isMobile={isMobile} isSupportWebp={isSupportWebp} />
            </Layout>
          </UserAgentProvider>
        </ThemeContextProvider>
      </LanguageContextProvider>
    </div>
  )
}

MyApp.getInitialProps = async (context: AppContext) => {
  const pageProps = await App.getInitialProps(context);
  const { data = {} } = await axios.get(`${LOCALDOMAIN}/api/layout`)
  return {
    ...pageProps,
    ...data,
    isMobile: getIsMobile(context),
    isSupportWebp: getIsSupportWebp(context),
  }
}
export default appWithTranslation(MyApp);
