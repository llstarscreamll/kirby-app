export interface ApiError {
  status?: number;
  statusText?: string;
  name?: string;
  message: string;
  ok: boolean;
  error?: ErrorResponse;
};

interface ErrorResponse {
  message: string;
  error?: string;
  errors?: { [propName: string]: string[]; } | JsonApiError[]
}

interface JsonApiError {
  code: number;
  title: string;
  detail: string;
  meta: any;
}
