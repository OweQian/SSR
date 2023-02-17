import React, {forwardRef, useContext, useEffect, useImperativeHandle, useMemo, useState,} from 'react';
import {UserAgentContext} from '@/stores/userAgent';
import {createPortal} from 'react-dom';
import styles from './index.module.scss';
import classNames from 'classnames';
import {Environment} from "@/constants/enum";

export interface IPopupRef {
  open: () => void;
}

interface IPopupProps {
  children: JSX.Element;
}

const Popup = forwardRef<IPopupRef, IPopupProps>(({children}, ref) => {
  const [visible, setVisible] = useState<boolean>(false);
  const [enter, setEnter] = useState<boolean>(false);
  const [leave, setLeave] = useState<boolean>(false);
  const { userAgent } = useContext(UserAgentContext);
  const maskClass = useMemo(() => {
    return userAgent === Environment.mobile ? 'forbidScroll' : 'pcForbidScroll'
  }, [userAgent]);
  useImperativeHandle(ref, () => ({
    open: (): void => {
      setEnter(true);
      setTimeout((): void => {
        setEnter(false);
      }, 300);
      setVisible(true);
    }
  }));
  useEffect(() => {
    document.body.className = visible ? maskClass : '';
    let timer = null;
    if (visible) {
      setEnter(true);
      timer = setTimeout((): void => {
        setEnter(false);
      }, 300);
    } else {
      setLeave(true);
      timer = setTimeout((): void => {
        setLeave(false);
      }, 300);
    }
    return (): void => {
      timer = null;
    };
  }, [visible]);
  return visible ? (
    createPortal((<div className={classNames({
      [styles.popup]: true,
      [styles.enter]: enter,
      [styles.leave]: leave,
    })}>
     <div className={styles.mask} />
     <div className={styles.popupContent}>
       <div className={styles.closeBtn} onClick={(): void => {
         setLeave(true);
         setTimeout((): void => {
           setLeave(false);
         }, 300);
         setVisible(false);
       }} />
       {children}
     </div>
    </div>), document.body)
  ) : null;
});

Popup.displayName = 'Popup'
export default Popup;
