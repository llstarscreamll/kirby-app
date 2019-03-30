import { ApiError } from '../interfaces/api-error';

export const INVALID_DATA_API_ERROR: ApiError = {
    message: "The given data was invalid.",
    ok: false,
    error: {
        message: "The given data was invalid.",
        errors: {
            field: ["The field is required."],
        }
    }
};
