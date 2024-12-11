import { useState } from "react";
import { LoginResponse } from "@/Infrastructure/Interfaces/AuthInterfaces";
import * as UseCase from "@/core/UseCases";
import { SmallTubeFetcher } from "@/config/adapters/SmallTube-adapters";
import { useUserStore } from "@/store/user.store";
import { setEncryptedLocalStorage } from "@/storage/StorageServices";
import { AxiosError } from "axios";

export const useLogin = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [loginDetails, setLoginDetails] = useState<LoginResponse | undefined>();

  const { changeUser } = useUserStore();

  const login = async (email: string) => {
    setIsLoading(true);
    try {
      const loginDetailsResult = await UseCase.AuthLoginCase(
        SmallTubeFetcher,
        email
      );

      setLoginDetails(loginDetailsResult);

      changeUser(
        loginDetailsResult.id,
        loginDetailsResult.name,
        loginDetailsResult.last_name,
        loginDetailsResult.email,
        loginDetailsResult.avatar,
        loginDetailsResult.access,
        loginDetailsResult.role
      );

      setEncryptedLocalStorage('data', loginDetailsResult)

        return loginDetailsResult;
    } catch (err) {
      // Asegurándonos de que el error es un AxiosError
      if (err instanceof AxiosError) {
        if (err.response && err.response.data && err.response.data.message) {
          throw new Error(err.response.data.message);  // Aquí accedes al mensaje
        }
        // Si no hay un mensaje personalizado, puedes lanzar otro error genérico
        throw new Error("An unknown error occurred");
      }
      // Si el error no es un AxiosError, manejamos el error genérico
      if (err instanceof Error) {
        throw new Error("Error trying to login: " + err.message);
      }
    }  finally {
      setTimeout(() => {
        setIsLoading(false);
      }, 3000);
    }
  };

  const RegisterUser = async (data: FormData) => {
    setIsLoading(true);
    try {
      await UseCase.RegisterAuthCase(
        SmallTubeFetcher,
        data
      );
    } catch (error) {
      console.error(error as any);
      throw error;
    } finally {
      setIsLoading(false);
    }
  }

  return { isLoading, login, RegisterUser, loginDetails };
};
