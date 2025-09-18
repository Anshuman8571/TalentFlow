import React from 'react';
import { Box, Typography, List, ListItem, ListItemText, Divider } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { formatDistanceToNow } from 'date-fns';
import { AppNotification } from '../../store';

interface NotificationPanelProps {
  notifications: AppNotification[];
  onClose: () => void;
}

const NotificationPanel: React.FC<NotificationPanelProps> = ({ notifications, onClose }) => {
  const navigate = useNavigate();

  const handleItemClick = (linkTo?: string) => {
    if (linkTo) {
      navigate(linkTo);
    }
    onClose();
  };

  return (
    <Box sx={{ width: 360, maxWidth: '100%' }}>
      <Box sx={{ p: 2 }}>
        <Typography variant="h6" component="div">Notifications</Typography>
      </Box>
      <Divider />
      <List sx={{ p: 0 }}>
        {notifications.length > 0 ? (
          notifications.slice(0, 10).map((notification) => ( // Show latest 10
            <ListItem
              key={notification.id}
              button
              onClick={() => handleItemClick(notification.linkTo)}
              sx={{ borderBottom: 1, borderColor: 'divider' }}
            >
              <ListItemText
                primary={notification.message}
                secondary={`${formatDistanceToNow(new Date(notification.timestamp))} ago`}
              />
            </ListItem>
          ))
        ) : (
          <ListItem>
            <ListItemText primary="You're all caught up!" />
          </ListItem>
        )}
      </List>
    </Box>
  );
};

export default NotificationPanel;
