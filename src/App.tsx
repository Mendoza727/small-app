import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import { HomeScreen } from "./screen";
import { AuthScreen } from "./screen/Auth/AuthScreen";
import { AuthProvider, RequireAuth } from "./context/AuthProvider";
import { getEncryptedLocalStorage } from "./storage/StorageServices";
import { useUserStore } from "./store/user.store";
import { useEffect } from "react";

function App() {
  const { changeUser } = useUserStore();

  useEffect(() => {
    const decryptData = getEncryptedLocalStorage("data");
    if (decryptData) {
      changeUser(
        decryptData["name"], 
        decryptData["last_name"],
        decryptData["email"],
        decryptData["avatar"],
        decryptData["access"],
        decryptData["role"]
      );
    }
  }, [changeUser]);

  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route
            path="home"
            element={
              <RequireAuth>
                <HomeScreen />
              </RequireAuth>
            }
          />
          <Route path="auth" element={<AuthScreen />} />
          <Route path="*" element={<Navigate to="home" />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
