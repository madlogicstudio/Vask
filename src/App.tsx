import { HashRouter, Routes, Route, useNavigate } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Landing from "./pages/Landing";
import { useEffect, useState } from "react";
import { getRedirectResult } from "firebase/auth";
import { auth } from "./firebase/FirebaseConfig";

function AppWrapper() {
  const navigate = useNavigate();
  const [checkingRedirect, setCheckingRedirect] = useState(true);

  useEffect(() => {
    getRedirectResult(auth)
      .then((result) => {
        if (result?.user) {
          console.log("Google redirect login success", result.user);
          navigate("/dashboard");
        }
      })
      .catch(console.error)
      .finally(() => setCheckingRedirect(false));
  }, [navigate]);

  if (checkingRedirect) {
    return <div>Loading...</div>;
  }

  return <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/dashboard" element={<Dashboard />} />
  </Routes>;
}

function App() {
  return (
    <HashRouter>
      <AppWrapper />
    </HashRouter>
  );
}

export default App;
