import { NovuProvider, PopoverNotificationCenter, NotificationBell } from '@novu/notification-center';

function Header() {
  function onNotificationClick(notification = IMessage) {
    navigate(notification.cta.data.url);
  }
  
  return (
    <NovuProvider subscriberId={'USER_ID'} applicationIdentifier={'O2nOEWpUxvir'}>
      <PopoverNotificationCenter onNotificationClick={onNotificationClick}>
        {({ unseenCount }) => <NotificationBell unseenCount={unseenCount} />}
      </PopoverNotificationCenter>
    </NovuProvider>
  );
}
export default Header