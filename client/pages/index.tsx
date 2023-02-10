import {useRef, useContext, useEffect} from 'react';
import type { NextPage } from 'next';
import classNames from 'classnames';
import { ThemeContext } from '@/stores/theme';
import styles from '@/styles/Home.module.scss';

interface IHomeProps {
  title: string;
  description: string;
  list: {
    label: string;
    info: string;
    link: string;
  }[];
}

const Home: NextPage<IHomeProps> = ({
  title, description, list
}) => {
  const mainRef = useRef<HTMLDivElement>(null);
  const { theme } = useContext(ThemeContext);
  useEffect(() => {
    mainRef.current?.classList.remove(styles.withAnimation);
    window.requestAnimationFrame(() => {
      mainRef.current?.classList.add(styles.withAnimation);
    });
  }, [theme]);

  return (
    <div className={styles.container}>
      <main className={classNames([styles.main, styles.withAnimation])} ref={mainRef}>
        <h1 className={styles.title}>{title}</h1>
        <p className={styles.description}>{description}</p>
        <div className={styles.grid}>
          {
            list?.map((item, index) => {
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
      </main>
    </div>
  )
}

Home.getInitialProps = (context) => {
  return {
    title: "Hello SSR!",
    description: "A Demo for 官网开发实战",
    list: [
      {
        label: "文章1",
        info: "A test for article1",
        link: "http://localhost:3000/article/1",
      },
      {
        label: "文章2",
        info: "A test for article2",
        link: "http://localhost:3000/article/2",
      },
      {
        label: "文章3",
        info: "A test for article3",
        link: "http://localhost:3000/article/3",
      },
      {
        label: "文章4",
        info: "A test for article4",
        link: "http://localhost:3000/article/4",
      },
      {
        label: "文章5",
        info: "A test for article5",
        link: "http://localhost:3000/article/5",
      },
      {
        label: "文章6",
        info: "A test for article6",
        link: "http://localhost:3000/article/6",
      },
    ],
  };

}

export default Home;
