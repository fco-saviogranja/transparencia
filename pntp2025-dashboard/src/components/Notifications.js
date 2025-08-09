import React, { useEffect, useState } from 'react';
import { getNotifications } from '../services/api';

const Notifications = () => {
    const [notifications, setNotifications] = useState([]);

    useEffect(() => {
        const fetchNotifications = async () => {
            try {
                const data = await getNotifications();
                setNotifications(data);
            } catch (error) {
                console.error('Error fetching notifications:', error);
            }
        };

        fetchNotifications();
    }, []);

    return (
        <div className="notifications">
            <h2>Notifications</h2>
            {notifications.length > 0 ? (
                <ul>
                    {notifications.map((notification, index) => (
                        <li key={index}>
                            <strong>{notification.title}</strong>: {notification.message}
                        </li>
                    ))}
                </ul>
            ) : (
                <p>No notifications at this time.</p>
            )}
        </div>
    );
};

export default Notifications;