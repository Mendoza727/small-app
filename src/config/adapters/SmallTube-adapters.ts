import { AxiosAdapter } from "@/config/adapters/HttpAdapter/Axios.adapters";

export const SmallTubeFetcher = new AxiosAdapter({
    baseUrl: 'http://localhost:8000/api',
});