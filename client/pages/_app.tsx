import type { AppProps, AppContext } from 'next/app';
import App from 'next/app';
import Head from 'next/head';
import axios from 'axios';
import { LOCALDOMAIN } from '@/utils';
import type { ILayoutProps } from '@/components/layout';
import Layout from '@/components/layout';
import '@/styles/globals.css'

const MyApp = (data: AppProps & ILayoutProps) => {
  const {
    Component, pageProps, navbarData, footerData
  } = data;
  return (
    <div>
      <Head>
        <title>A Demo for 官网开发实战</title>
        <meta
          name="description"
          content="A Demo for 官网开发实战"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout navbarData={navbarData} footerData={footerData}>
        <Component {...pageProps} />
      </Layout>
    </div>

  )
}

MyApp.getInitialProps = async (context: AppContext) => {
  const pageProps = await App.getInitialProps(context);
  const { data = {} } = await axios.get(`${LOCALDOMAIN}/api/layout`)
  return {
    ...pageProps,
    ...data,
  }
}
export default MyApp;
