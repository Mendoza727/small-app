import { HttpAdpater } from "../../../config/adapters/HttpAdapter/Http.adapters"
import { LoginResponse } from "../../../Infrastructure/Interfaces/AuthInterfaces"

export const AuthLoginCase = async(
    fetcher: HttpAdpater,
    email: string
): Promise<LoginResponse> => {
    try {
        const login = await fetcher.get<LoginResponse>(`/login/?email=${email}`)

        return login;
    } catch (err) {
        throw new Error("Error trying to login: "+ err);
    }
}

export const RegisterAuthCase = async (
    fetcher: HttpAdpater,
    data: any
): Promise<any> => {
    try {
        const register = await fetcher.post<any>('/register/', data);
        return register;
    } catch (err) {
        throw new Error("Error trying to register: " + (err instanceof Error ? err.message : err));
    }
};