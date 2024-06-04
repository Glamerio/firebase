import React, { useState, useEffect } from 'react';
import Chat from './components/Chat';
import Login from './components/Login';
import Register from './components/Register';
import { auth } from './firebase';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

const App = () => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((user) => {
            setUser(user);
        });
        return unsubscribe;
    }, []);

    return (
        <Router>
            <Switch>
                <Route exact path="/">
                    {user ? <Chat /> : <Login setUser={setUser} />}
                </Route>
                <Route path="/register" component={Register} />
            </Switch>
        </Router>
    );
};

export default App;
