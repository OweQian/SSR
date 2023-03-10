import {FC, useContext, useEffect, useRef} from 'react';
import Link from "next/link";
import Popup from '@/components/popup';
import { IPopupRef } from '@/components/popup';
import {useTranslation} from 'next-i18next';
import {ThemeContext} from '@/stores/theme';
import {UserAgentContext} from '@/stores/userAgent';
import {Environment, Language, Themes} from '@/constants/enum';
import styles from './index.module.scss';
import {LanguageContext} from "@/stores/language";
import {useRouter} from "next/router";

export interface INavBarProps {}

const NavBar: FC<INavBarProps> = ({}) => {
  const { t } = useTranslation('main');
  const router = useRouter();
  const popupRef = useRef<IPopupRef>(null);
  const { locales, locale: activeLocale } = router;
  const otherLocales = locales?.filter(
    (locale) => locale !== activeLocale && locale !== "default"
  );
  const { setTheme } = useContext(ThemeContext);
  const { setLanguage } = useContext(LanguageContext);
  const { userAgent } = useContext(UserAgentContext);
  useEffect(() => {
    setLanguage(router.locale as Language);
  }, [router.locale]);
  return (
    <div className={styles.navBar}>
      <a href="http://localhost:3000/">
        <div className={styles.logoIcon} />
      </a>
      <div className={styles.themeArea}>
        {userAgent === Environment.pc && (
          <span className={styles.text}>{t('PCStyle')}</span>
        )}
        {userAgent === Environment.ipad && (
          <span className={styles.text}>{t('IpadStyle')}</span>
        )}
        {userAgent === Environment.mobile && (
          <span className={styles.text}>{t('MobileStyle')}</span>
        )}
        <div className={styles.popupText} onClick={(): void => popupRef.current?.open()}>弹窗示范</div>
        <div className={styles.language}>
          {otherLocales?.map((locale) => {
            const { pathname, query, asPath } = router;
            return (
              <span key={locale}>
            <Link href={{ pathname, query }} as={asPath} locale={locale}>
              {locale}
            </Link>
          </span>
            );
          })}
        </div>
        <div className={styles.themeIcon} onClick={(): void => {
          setTheme(localStorage.getItem('theme') === Themes.light ? Themes.dark : Themes.light);
        }}/>
      </div>
      <Popup ref={popupRef}>
        <div>这是一个弹窗</div>
      </Popup>
    </div>
  )
}

export default NavBar;
