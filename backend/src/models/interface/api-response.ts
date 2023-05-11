export interface ApiResponse<T> {
    statusCode: number;
    body: T;
	errorMessage?: string;
}