'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { Bell, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { getNotificationsForUser, markNotificationAsRead } from '@/lib/school-mis-data';

interface NotificationBellProps {
  userId: string;
  userType: 'student' | 'teacher' | 'parent';
}

export function NotificationBell({ userId, userType }: NotificationBellProps) {
  const params = useParams();
  const subdomain = params.subdomain as string;
  const [notifications, setNotifications] = useState<any[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [unreadCount, setUnreadCount] = useState(0);

  useEffect(() => {
    const loadNotifications = async () => {
      try {
        const userNotifications = await getNotificationsForUser(subdomain, userId, userType);
        setNotifications(userNotifications);
        setUnreadCount(userNotifications.filter(n => !n.read).length);
      } catch (error) {
        console.error('Error loading notifications:', error);
      }
    };

    loadNotifications();

    // Refresh notifications every 30 seconds
    const interval = setInterval(loadNotifications, 30000);
    return () => clearInterval(interval);
  }, [subdomain, userId, userType]);

  const handleMarkAsRead = async (notificationId: string) => {
    try {
      await markNotificationAsRead(subdomain, notificationId);
      setNotifications(prev =>
        prev.map(n => n.id === notificationId ? { ...n, read: true } : n)
      );
      setUnreadCount(prev => Math.max(0, prev - 1));
    } catch (error) {
      console.error('Error marking notification as read:', error);
    }
  };

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'result': return '📊';
      case 'attendance': return '✅';
      case 'announcement': return '📢';
      case 'payment': return '💰';
      default: return '🔔';
    }
  };

  return (
    <div className="relative">
      <Button
        variant="ghost"
        size="icon"
        className="text-neutral-400 hover:text-white relative"
        onClick={() => setIsOpen(!isOpen)}
      >
        <Bell className="h-5 w-5" />
        {unreadCount > 0 && (
          <span className="absolute -top-1 -right-1 h-5 w-5 bg-primary text-white text-xs rounded-full flex items-center justify-center">
            {unreadCount > 9 ? '9+' : unreadCount}
          </span>
        )}
      </Button>

      {isOpen && (
        <Card className="absolute right-0 top-12 w-80 bg-neutral-900 border-neutral-800 z-50">
          <CardContent className="p-0">
            <div className="p-4 border-b border-neutral-800">
              <h3 className="text-white font-medium">Notifications</h3>
              <p className="text-sm text-neutral-400">
                {unreadCount} unread notification{unreadCount !== 1 ? 's' : ''}
              </p>
            </div>

            <div className="max-h-96 overflow-y-auto">
              {notifications.length === 0 ? (
                <div className="p-4 text-center text-neutral-400">
                  No notifications yet
                </div>
              ) : (
                notifications.slice(0, 10).map((notification: any) => (
                  <div
                    key={notification.id}
                    className={`p-4 border-b border-neutral-800 hover:bg-neutral-800/50 ${
                      !notification.read ? 'bg-primary/5' : ''
                    }`}
                  >
                    <div className="flex items-start space-x-3">
                      <span className="text-lg">{getNotificationIcon(notification.type)}</span>
                      <div className="flex-1 min-w-0">
                        <p className="text-white text-sm font-medium">{notification.title}</p>
                        <p className="text-neutral-400 text-sm">{notification.message}</p>
                        <p className="text-neutral-500 text-xs mt-1">
                          {new Date(notification.date).toLocaleDateString()}
                        </p>
                      </div>
                      {!notification.read && (
                        <Button
                          variant="ghost"
                          size="sm"
                          className="text-neutral-400 hover:text-white p-1 h-auto"
                          onClick={() => handleMarkAsRead(notification.id)}
                        >
                          <Check className="h-3 w-3" />
                        </Button>
                      )}
                    </div>
                  </div>
                ))
              )}
            </div>

            {notifications.length > 10 && (
              <div className="p-4 border-t border-neutral-800 text-center">
                <Button variant="ghost" className="text-primary hover:text-primary/80">
                  View All Notifications
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  );
}