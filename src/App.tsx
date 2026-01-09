import { HashRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Landing from "./pages/Landing";
import { useState, useEffect } from "react";
import { getRedirectResult, onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase/FirebaseConfig";


function AppWrapper() {
    const [checkingRedirect, setCheckingRedirect] = useState(true);
    const [user, setUser] = useState<any>(null);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            if (currentUser) setUser(currentUser);
        });
    
        getRedirectResult(auth)
            .then((result) => {
                if (result?.user) setUser(result.user);
            })
            .catch(console.error)
            .finally(() => setCheckingRedirect(false));
    
        return unsubscribe;
    }, []);
    

    if (checkingRedirect) return <div>Loading...</div>;
    if (user) return <Dashboard />; 
    return <Landing />;
}

export default function App() {
    return (
        <HashRouter>
            <AppWrapper />
            <Routes>
                <Route path="/dashboard" element={<Dashboard />} />
            </Routes>
        </HashRouter>
    );
}
