export abstract class HttpAdpater {
    abstract get<T>(url: string, options?: Record<any, unknown>): Promise<T>;
    abstract post<T>(url: string, body: unknown, options?: Record<any, unknown>): Promise<T>;
    abstract put<T>(url: string, body: unknown, options?: Record<any, unknown>): Promise<T>;
    abstract delete<T>(url: string, options?: Record<any, unknown>): Promise<T>;
}
