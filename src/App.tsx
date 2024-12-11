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
import { CreateVideoScreen } from "./screen/Videos/CreateVIdeo/CreateVideoScreen";
import { ViewVideoScreen } from "./screen/Videos/ViewVideo/ViewVideoScreen";
import EditVideoScreen from "./screen/Videos/EditVideo/EditVideoScreen";

export const URL_MEDIA = "http://www.localhost:8000/";

function App() {
  const { changeUser } = useUserStore();


  useEffect(() => {
    const decryptData = getEncryptedLocalStorage("data");
    if (decryptData) {
      changeUser(
        decryptData["id"],
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
              <HomeScreen />
            }
          />
          <Route path="create-video" element={<RequireAuth><CreateVideoScreen /></RequireAuth>} />
          <Route path="video/:id" element={<RequireAuth><ViewVideoScreen /></RequireAuth>} />
          <Route path="edit-video/:id" element={<RequireAuth><EditVideoScreen /></RequireAuth>} />
          <Route path="videos" element={<RequireAuth><CreateVideoScreen /></RequireAuth>} />
          <Route path="auth" element={<AuthScreen />} />
          <Route path="*" element={<Navigate to="home" />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
