export interface ApiError {
  status?: number;
  statusText?: string;
  name?: string;
  message: string;
  ok: boolean;
  error?: {
    message: string;
    error?: string;
    errors?: {
      [propName: string]: string[];
    }
  };
};
