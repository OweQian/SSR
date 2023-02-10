import {createContext, FC, useEffect, useState} from 'react';
import {Themes} from '@/constants/enum';

interface IThemeContextProps {
  theme: Themes;
  setTheme: (theme: Themes) => void;
}

interface IThemeContextProviderProps {
  children: JSX.Element;
}

export const ThemeContext = createContext<IThemeContextProps>({} as IThemeContextProps);

const ThemeContextProvider: FC<IThemeContextProviderProps> = ({children}) => {
  const [theme, setTheme] = useState<Themes>(Themes.light);
  useEffect(() =>  {
    const checkTheme = () => {
      const item = localStorage.getItem('theme') as Themes || Themes.light;
      setTheme(item);
      document.getElementsByTagName('html')[0].dataset.theme = item;
    }
    // 初始化先执行一遍
    checkTheme();
    // 监听浏览器缓存事件
    window.addEventListener('storage', checkTheme);
    return (): void => {
      // 解绑
      window.removeEventListener('storage', checkTheme);
    }
  }, []);
  return (
    <ThemeContext.Provider value={{
      theme,
      setTheme: (currentTheme) => {
        setTheme(currentTheme);
        localStorage.setItem('theme', currentTheme);
        document.getElementsByTagName('html')[0].dataset.theme = currentTheme;
      }
    }}>
      {children}
    </ThemeContext.Provider>
  )
}

export default ThemeContextProvider;
