import React, {createContext, FC, useEffect, useState} from 'react';
import {Environment} from '@/constants/enum';

interface IUserAgentContextProps {
  userAgent: Environment;
}

interface IUserAgentProps {
  children: JSX.Element;
}

export const UserAgentContext = createContext<IUserAgentContextProps>({} as IUserAgentContextProps);

const UserAgentProvider: FC<IUserAgentProps> = ({ children }) => {
  const [userAgent, setUserAgent] = useState<Environment>(Environment.none);
  // 监听本地缓存来同步不同页面间的主题（当前页面无法监听到，直接在顶部栏进行了类的切换)
  useEffect(() => {
    const checkUserAgent = (): void => {
      const width = document.body.offsetWidth;
      switch (true) {
        case width < 768:
          setUserAgent(Environment.mobile);
          break;
        case width >= 768 && width < 1200:
          setUserAgent(Environment.ipad);
          break;
        case width >= 1200:
          setUserAgent(Environment.pc);
          break;
        default:
          setUserAgent(Environment.none);
          break;
      }
    }
    checkUserAgent();
    window.addEventListener('resize', checkUserAgent);
    return (): void => {
      window.removeEventListener('resize', checkUserAgent);
    }
  }, [typeof document !== 'undefined' && document.body.offsetWidth]);

  return (
    <UserAgentContext.Provider value={{ userAgent }}>
      {children}
    </UserAgentContext.Provider>
  )
}

export default UserAgentProvider;
