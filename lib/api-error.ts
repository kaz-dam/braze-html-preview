class ApiError extends Error {
    statusCode: number;

    constructor(public code: number, message: string) {
        super(message);
        this.name = "ApiError";
        this.statusCode = code;
    }
}

export default ApiError;
