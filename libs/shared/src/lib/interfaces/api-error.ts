export interface ApiError {
  // general message
  message: string;
  // specific error
  error?: string;
  // errors collection
  errors?: {
    [propName: string]: string[];
  }
};
