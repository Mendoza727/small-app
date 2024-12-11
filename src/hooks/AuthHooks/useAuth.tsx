import { useState } from "react";
import { LoginResponse, Register } from "@/Infrastructure/Interfaces/AuthInterfaces";
import * as UseCase from "@/core/UseCases";
import { SmallTubeFetcher } from "@/config/adapters/SmallTube-adapters";
import { useUserStore } from "@/store/user.store";
import { setEncryptedLocalStorage } from "@/storage/StorageServices";

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
    } catch (error) {
      console.error("Error en useLogin (login):", error);
      throw error;
    } finally {
      setTimeout(() => {
        setIsLoading(false);
      }, 3000);
    }
  };

  const RegisterUser = async (data: Register) => {
    setIsLoading(true);
    try {
      await UseCase.RegisterAuthCase(
        SmallTubeFetcher,
        data
      );
    } catch (error) {
      throw error;
    }
  }

  return { isLoading, login, RegisterUser, loginDetails };
};
