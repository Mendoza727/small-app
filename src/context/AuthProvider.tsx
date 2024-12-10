import { createContext, PropsWithChildren, useContext, useEffect, useState } from "react";
import { useUserStore } from "@/store/user.store";
import { useNavigate } from "react-router-dom";
import { getEncryptedLocalStorage } from "@/storage/StorageServices";

const AuthContext = createContext<{
  isToken: boolean | null;
  setToken: (value: boolean | null) => void;
} | null>(null);

export const AuthProvider = ({ children }: PropsWithChildren) => {
  const { access } = useUserStore();
  const [isToken, setIsToken] = useState<boolean | null>(null);

  useEffect(() => {
    const storedToken = getEncryptedLocalStorage("data"); // Recupera los datos cifrados desde localStorage

    // Verifica si los datos existen y si el token de acceso está presente
    if (storedToken && storedToken["access"] || access) {
      setIsToken(true);
    } else {
      setIsToken(false);
    }
  }, [access]);

  return (
    <AuthContext.Provider value={{ isToken, setToken: setIsToken }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth debe ser usado dentro de un AuthProvider");
  }
  return context;
};

interface Props {
  children: React.ReactNode;
}

export const RequireAuth = ({ children }: Props) => {
  const storedToken = getEncryptedLocalStorage("data"); // Recupera los datos cifrados desde localStorage
  const navigate = useNavigate();

  useEffect(() => {
    // Verifica si los datos recuperados contienen la clave de acceso
    if (!storedToken || !storedToken["access"]) {
      navigate("/auth"); // Si no hay acceso, redirige a la página de autenticación
    }
  }, [storedToken, navigate]);

  if (!storedToken || !storedToken["access"]) {
    return <div>Cargando...</div>; // Muestra "Cargando..." mientras se verifica el acceso
  }

  return <>{children}</>; // Muestra los hijos si el acceso está presente
};
