import axios, { AxiosInstance, AxiosRequestConfig } from "axios";
import { HttpAdpater } from "@/config/adapters/HttpAdapter/Http.adapters";

interface Options {
  baseUrl: string;
  paramas?: Record<string, string>;
}

export class AxiosAdapter implements HttpAdpater {
  private axiosInstance: AxiosInstance;

  constructor(options: Options) {
    this.axiosInstance = axios.create({
      baseURL: options.baseUrl,
      params: options.paramas,
    });
  }

  async get<T>(url: string, options?: AxiosRequestConfig): Promise<T> {
    try {
      const response = await this.axiosInstance.get<T>(url, options);
      return response.data;
    } catch (error) {
      console.error(`Error fetching get url: ${url}`, error);
      throw new Error(`Error fetching get url: ${url}`);
    }
  }

  async post<T>(
    url: string,
    data: unknown,
    options?: AxiosRequestConfig
  ): Promise<T> {
    try {
      const response = await this.axiosInstance.post<T>(url, data, options);
      return response.data;
    } catch (error) {
      throw new Error(`Error posting data to url: ${url}`);
    }
  }

  async put<T>(
    url: string,
    data: unknown,
    options?: AxiosRequestConfig
  ): Promise<T> {
    try {
      const response = await this.axiosInstance.put<T>(url, data, options);
      return response.data;
    } catch (error) {
      throw new Error(`Error updating data at url: ${url}`);
    }
  }

  async patch<T>(
    url: string,
    data: unknown,
    options?: AxiosRequestConfig
  ): Promise<T> {
    try {
      const response = await this.axiosInstance.patch<T>(url, data, options);
      return response.data;
    } catch (error) {
      throw new Error(`Error editing data at url: ${url}`);
    }
  }

  async delete<T>(url: string, options?: AxiosRequestConfig): Promise<T> {
    try {
      const response = await this.axiosInstance.delete<T>(url, options);
      return response.data;
    } catch (error) {
      throw new Error(`Error deleting data at url: ${url}`);
    }
  }
}
