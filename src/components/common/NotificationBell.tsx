import React, { useState } from 'react';
import { IconButton, Badge, Popover } from '@mui/material';
import { Notifications as NotificationsIcon } from '@mui/icons-material';
import { useStore } from '../../store';
import NotificationPanel from './NotificationPanel';

const NotificationBell: React.FC = () => {
  const notifications = useStore((state) => state.notifications);
  const markNotificationsAsRead = useStore((state) => state.markNotificationsAsRead);
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);

  // Calculate the number of unread notifications
  const unreadCount = notifications.filter(n => !n.read).length;

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
    // When the user opens the panel, mark all notifications as read
    if (unreadCount > 0) {
      markNotificationsAsRead();
    }
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'notification-popover' : undefined;

  return (
    <>
      <IconButton color="inherit" aria-describedby={id} onClick={handleClick}>
        <Badge badgeContent={unreadCount} color="error">
          <NotificationsIcon />
        </Badge>
      </IconButton>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
      >
        <NotificationPanel notifications={notifications} onClose={handleClose} />
      </Popover>
    </>
  );
};

export default NotificationBell;

