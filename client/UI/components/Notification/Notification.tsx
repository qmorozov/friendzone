import { FC, useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

import style from './index.module.scss';

enum INotificationType {
  success = 'success',
  warning = 'warning',
  fail = 'fail',
  help = 'help',
}

type NotificationType = keyof typeof INotificationType;

interface INotification {
  text: string;
  show?: boolean;
  delay?: number;
  type: NotificationType;
  onClose?: () => void;
}

const Notification: FC<INotification> = ({
  text,
  type,
  delay = 3,
  show = false,
  onClose,
}) => {
  const [notificationVisible, setNotificationVisible] = useState(show);

  useEffect(() => {
    if (show) {
      setNotificationVisible(true);

      const timeout = setTimeout(async () => {
        await new Promise((resolve) => setTimeout(resolve, 280));
        setNotificationVisible(false);
      }, delay);

      return () => clearTimeout(timeout);
    } else {
      setNotificationVisible(false);
    }
  }, [show, delay]);

  const onAnimationComplete = () => {
    if (onClose) {
      onClose();
    }
  };

  const getNotificationTitle = (): string => {
    switch (type) {
      case INotificationType.fail:
        return 'Oh snap!';
      case INotificationType.success:
        return 'Well done!';
      case INotificationType.help:
        return 'Hi there!';
      case INotificationType.warning:
        return 'Warning!';
      default:
        return 'Hi there!';
    }
  };

  return (
    <AnimatePresence onExitComplete={onAnimationComplete}>
      {notificationVisible && (
        <motion.div
          initial={{ opacity: 0, x: '100%', filter: 'blur(4px)' }}
          animate={{ opacity: 1, x: 0, filter: 'blur(0)' }}
          exit={{
            opacity: 0,
            x: '100%',
            filter: 'blur(4px)',
            transition: { delay },
          }}
          transition={{ duration: 0.28 }}
          className={`${style[type]} ${style.notificationWrapper}`}
        >
          <span>{getNotificationTitle()}</span>
          <p>{text}</p>
          <div className={style.icon}>
            <svg fill="none" viewBox="0 0 70 78">
              <path d="M43.8055 67.6794C44.1344 67.4706 44.4934 67.3124 44.8665 67.2006C59.0118 62.9621 69.32 49.8448 69.32 34.32C69.32 15.3656 53.9544 0 35 0C16.0456 0 0.679993 15.3656 0.679993 34.32C0.679993 47.8227 8.4778 59.5042 19.8158 65.1068C19.8287 65.1132 19.8234 65.1326 19.8092 65.1315C19.8 65.1308 19.793 65.1396 19.7958 65.1483L22.9038 74.9903C23.6947 77.4949 26.6438 78.5705 28.8614 77.1631L43.8055 67.6794Z" />
            </svg>
          </div>
          <button aria-label="close notification">
            <span></span>
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Notification;
