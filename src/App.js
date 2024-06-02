import React from 'react';
import Chat from './components/Chat';
import Login from './components/Login';
import { auth } from './firebase'; // Doğru dosya yolu

const App = () => {
    const [user, setUser] = React.useState(null);

    React.useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((user) => {
            setUser(user);
        });
        return unsubscribe;
    }, []);

    return (
        <div>
            {user ? <Chat /> : <Login setUser={setUser} />}
        </div>
    );
};

export default App;
