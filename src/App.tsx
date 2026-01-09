import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Landing from "./pages/Landing";
import { useEffect, useState } from "react";
import { getRedirectResult, onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase/FirebaseConfig";

function AppWrapper() {
    const navigate = useNavigate();
    const [checkingRedirect, setCheckingRedirect] = useState(true);
    const [user, setUser] = useState<any>(null);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            if (currentUser) {
                setUser(currentUser);
            }
        });

        getRedirectResult(auth)
            .then((result) => {
                if (result?.user) {
                    console.log("Google redirect login success", result.user);
                    setUser(result.user);
                }
            })
            .catch(console.error)
            .finally(() => setCheckingRedirect(false));

        return unsubscribe;
    }, []);

    useEffect(() => {
        if (!checkingRedirect && user) {
            navigate("/dashboard");
        }
    }, [user, checkingRedirect, navigate]);

    if (checkingRedirect) return <div>Loading...</div>;
    if (user) return <div>Redirecting to dashboard...</div>;
    return <Landing />;
}

function App() {
    return (
        <BrowserRouter basename="/Vask">
            <Routes>
                <Route path="/" element={<AppWrapper />} />
                <Route path="/dashboard" element={<Dashboard />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
