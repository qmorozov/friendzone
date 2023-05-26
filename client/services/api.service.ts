import axios, { AxiosResponse } from 'axios';

export abstract class ApiService {
  protected static readonly baseUrl =
    'https://friendzone-server-production.up.railway.app/api/v1';

  protected static async get<T>(endpoint: string): Promise<T> {
    const url = this.buildUrl(endpoint);
    const response = await axios.get<T>(url);
    return this.handleResponse<T>(response);
  }

  protected static async post<T>(endpoint: string, data: any): Promise<T> {
    const url = this.buildUrl(endpoint);
    const response = await axios.post<T>(url, data);
    return this.handleResponse<T>(response);
  }

  protected static async put<T>(endpoint: string, data: any): Promise<T> {
    const url = this.buildUrl(endpoint);
    const response = await axios.put<T>(url, data);
    return this.handleResponse<T>(response);
  }

  protected static async delete<T>(endpoint: string): Promise<T> {
    const url = this.buildUrl(endpoint);
    const response = await axios.delete<T>(url);
    return this.handleResponse<T>(response);
  }

  private static buildUrl(endpoint: string): string {
    return `${this.baseUrl}/${endpoint}`;
  }

  private static handleResponse<T>(response: AxiosResponse<T>): T {
    return response.data;
  }
}
