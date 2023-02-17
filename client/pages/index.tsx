import {useContext, useEffect, useRef, useState} from 'react';
import axios from 'axios';
import type {NextPage} from 'next';
import {Pagination} from '@douyinfe/semi-ui';
import classNames from 'classnames';
import {ThemeContext} from '@/stores/theme';
import {useTranslation} from 'next-i18next';
import {serverSideTranslations} from 'next-i18next/serverSideTranslations';
import styles from '@/styles/Home.module.scss';
import {LOCALDOMAIN} from "@/utils";
import {IDeviceInfoProps} from "@/pages/_app";
import {IArticleIntroduction} from "@/pages/api/articleIntroduction";
import {LanguageContext} from "@/stores/language";
import {useRouter} from "next/router";

interface IHomeProps {
  title: string;
  description: string;
  articles: {
    total: number;
    list: {
      label: string;
      info: string;
      link: string;
    }[];
  };
}

const Home: NextPage<IHomeProps & IDeviceInfoProps> = ({
  title, description, articles, isSupportWebp
}) => {
  const { i18n } = useTranslation();
  const router = useRouter();
  const { locale } = router;
  const [content, setContent] = useState(articles);
  const mainRef = useRef<HTMLDivElement>(null);
  const { theme } = useContext(ThemeContext);
  const { language } = useContext(LanguageContext);
  useEffect(() => {
    mainRef.current?.classList.remove(styles.withAnimation);
    window.requestAnimationFrame(() => {
      mainRef.current?.classList.add(styles.withAnimation);
    });
  }, [theme]);

  useEffect(() => {
    i18n?.changeLanguage(locale);
    console.warn(locale)
  }, [language, locale])
  return (
    <div className={styles.container}>
      <main className={classNames([styles.main, styles.withAnimation])} ref={mainRef}>
        <div className={classNames({
          [styles.header]: true,
          [styles.headerWebp]: isSupportWebp,
        })} />
        <h1 className={styles.title}>{title}</h1>
        <p className={styles.description}>{description}</p>
        <div className={styles.grid}>
          {
            content?.list?.map((item, index) => {
              return (
                <div key={index} className={styles.card} onClick={(): void => {
                  window.open(
                    item?.link,
                    "blank",
                    "noopener=yes,noreferrer=yes"
                  );
                }}>
                  <h2>{item?.label}</h2>
                  <p>{item?.info}</p>
                </div>
              )
            })
          }
        </div>
        <div className={styles.paginationArea}>
          <Pagination total={content?.total} pageSize={6} onPageChange={pageNo => {
            axios.post(`${LOCALDOMAIN}/api/articleIntroduction`, {
              pageNo,
              pageSize: 6,
            }).then(({ data: {
              total,
              list: listData,
            }}) => {
              setContent({
                list: listData?.map((item: IArticleIntroduction) => ({
                  label: item.label,
                  info: item.info,
                  link: `${LOCALDOMAIN}/article/${item.articleId}`,
                })),
                total,
              })
            })
          }} />
        </div>
      </main>
    </div>
  )
}

export const getServerSideProps = async ({ locale }: { locale: string }) => {
  const {
    data: {
      title, description,
    }
  } = await axios.get(`${LOCALDOMAIN}/api/home`);
  const {
    data: {
      list: listData, total,
    }} = await axios.post(`${LOCALDOMAIN}/api/articleIntroduction`, {
      pageNo: 1,
      pageSize: 6,
    })
  return {
    props: {
      ...(await serverSideTranslations(locale, ['common', 'footer', 'header', 'main'])),
      title,
      description,
      articles: {
        total,
        list: listData?.map((item: IArticleIntroduction) => ({
          label: item.label,
          info: item.info,
          link: `${LOCALDOMAIN}/article/${item.articleId}`,
        }))
      },
    }

  };
}

export default Home;
