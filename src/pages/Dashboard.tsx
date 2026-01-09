import { useEffect, useState } from "react";
import { onAuthStateChanged, type User } from "firebase/auth";
import { auth } from "../firebase/FirebaseConfig";

function Dashboard() {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);
  
    useEffect(() => {
      const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
        setUser(currentUser);
        setLoading(false);
      });
  
      return () => unsubscribe();
    }, []);
  
    if (loading) {
      return <div>Loading...</div>;
    }
  
    if (!user) {
      return <div>Not logged in</div>;
    }
  
    return (
        <div className="h-screen w-screen flex flex-col items-center justify-center gap-4 p-6">
            {user.photoURL ? (
            <img src={user.photoURL} alt="Profile" className="h-24 w-24 rounded-full" />
            ) : (
            <div className="h-24 w-24 rounded-full bg-gray-300 flex items-center justify-center">
                👤
            </div>
            )}
            <h2 className="text-lg font-semibold">
                {user.email}
            </h2>
            <span className="text-lg font-semibold mt-12">Ano ilalagay ko sa dashboard??</span>
        </div>
    );
  }
  
  export default Dashboard;
  