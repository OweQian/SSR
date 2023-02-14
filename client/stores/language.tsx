import {createContext, FC, useEffect, useState} from 'react';
import {Language} from '@/constants/enum';

interface ILanguageContextProps {
  language: Language;
  setLanguage: (language: Language) => void;
}

interface ILanguageContextProviderProps {
  children: JSX.Element;
}

export const LanguageContext = createContext<ILanguageContextProps>({} as ILanguageContextProps);

const LanguageContextProvider: FC<ILanguageContextProviderProps> = ({children}) => {
  const [language, setLanguage] = useState<Language>(Language.ch);
  useEffect(() =>  {
    const checkLanguage = () => {
      const item = localStorage.getItem('language') as Language || Language.ch;
      setLanguage(item);
      document.getElementsByTagName('html')[0].lang = item;
    }
    // 初始化先执行一遍
    checkLanguage();
    // 监听浏览器缓存事件
    window.addEventListener('storage', checkLanguage);
    return (): void => {
      // 解绑
      window.removeEventListener('storage', checkLanguage);
    }
  }, []);
  return (
    <LanguageContext.Provider value={{
      language,
      setLanguage: (currentLanguage) => {
        setLanguage(currentLanguage);
        localStorage.setItem('language', currentLanguage);
        document.getElementsByTagName('html')[0].lang = currentLanguage;
      }
    }}>
      {children}
    </LanguageContext.Provider>
  )
}

export default LanguageContextProvider;
