import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Home from './pages/Home';
import Alerts from './pages/Alerts';
import Profile from './pages/Profile';
import Login from './components/Login';
import Register from './components/Register';
import Dashboard from './components/Dashboard';
import Notifications from './components/Notifications';
import AdminPanel from './components/AdminPanel';
import './styles/prefeitura-jardim.css';

function App() {
    return (
        <Router>
            <Switch>
                <Route path="/" exact component={Home} />
                <Route path="/alerts" component={Alerts} />
                <Route path="/profile" component={Profile} />
                <Route path="/login" component={Login} />
                <Route path="/register" component={Register} />
                <Route path="/dashboard" component={Dashboard} />
                <Route path="/notifications" component={Notifications} />
                <Route path="/admin" component={AdminPanel} />
            </Switch>
        </Router>
    );
}

export default App;