import React, { useEffect, useState } from 'react';
import { fetchAlerts } from '../services/api';
import './Alerts.css';

const Alerts = () => {
    const [alerts, setAlerts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const getAlerts = async () => {
            try {
                const data = await fetchAlerts();
                setAlerts(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        getAlerts();
    }, []);

    if (loading) {
        return <div>Loading alerts...</div>;
    }

    if (error) {
        return <div>Error fetching alerts: {error}</div>;
    }

    return (
        <div className="alerts-container">
            <h1>Transparency Alerts</h1>
            {alerts.length === 0 ? (
                <p>No alerts at the moment.</p>
            ) : (
                <ul>
                    {alerts.map((alert) => (
                        <li key={alert.id}>
                            <strong>{alert.title}</strong>: {alert.message} <em>Due by {alert.dueDate}</em>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default Alerts;