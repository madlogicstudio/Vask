import { HashRouter, Routes, Route, useNavigate } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Landing from "./pages/Landing";
import { useState, useEffect } from "react";
import { getRedirectResult, onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase/FirebaseConfig";

function AppWrapper() {
    const navigate = useNavigate();
    const [checkingRedirect, setCheckingRedirect] = useState(true);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                navigate("/dashboard"); 
            }
        });

        getRedirectResult(auth)
            .then((result) => {
                if (result?.user) {
                    console.log("Redirect login success", result.user);
                    navigate("/dashboard"); //
                }
            })
            .catch(console.error)
            .finally(() => setCheckingRedirect(false));

        return unsubscribe;
    }, [navigate]);

    if (checkingRedirect) return <div>Loading...</div>;

    return <Landing />; 
}

export default function App() {
    return (
        <HashRouter>
            <Routes>
                <Route path="/" element={<AppWrapper />} />
                <Route path="/dashboard" element={<Dashboard />} />
            </Routes>
        </HashRouter>
    );
}
