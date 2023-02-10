import {FC, useContext} from 'react';
import {ThemeContext} from '@/stores/theme';
import {Themes} from '@/constants/enum';
import styles from './index.module.scss';

export interface INavBarProps {}

const NavBar: FC<INavBarProps> = ({}) => {
  const { setTheme } = useContext(ThemeContext);
  return (
    <div className={styles.navBar}>
      <a href="http://localhost:3000/">
        <div className={styles.logoIcon} />
      </a>
      <div className={styles.themeIcon} onClick={(): void => {
        setTheme(localStorage.getItem('theme') === Themes.light ? Themes.dark : Themes.light);
      }}/>
    </div>
  )
}

export default NavBar;
