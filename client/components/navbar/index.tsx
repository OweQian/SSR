import {FC, useContext} from 'react';
import {ThemeContext} from '@/stores/theme';
import {UserAgentContext} from '@/stores/userAgent';
import {Environment, Themes} from '@/constants/enum';
import styles from './index.module.scss';

export interface INavBarProps {}

const NavBar: FC<INavBarProps> = ({}) => {
  const { setTheme } = useContext(ThemeContext);
  const { userAgent } = useContext(UserAgentContext);
  return (
    <div className={styles.navBar}>
      <a href="http://localhost:3000/">
        <div className={styles.logoIcon} />
      </a>
      <div className={styles.themeArea}>
        {userAgent === Environment.pc && (
          <span className={styles.text}>当前是pc端样式</span>
        )}
        {userAgent === Environment.ipad && (
          <span className={styles.text}>当前是Ipad端样式</span>
        )}
        {userAgent === Environment.mobile && (
          <span className={styles.text}>当前是移动端样式</span>
        )}
      </div>
      <div className={styles.themeIcon} onClick={(): void => {
        setTheme(localStorage.getItem('theme') === Themes.light ? Themes.dark : Themes.light);
      }}/>
    </div>
  )
}

export default NavBar;
