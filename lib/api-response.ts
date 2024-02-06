import type { NextApiResponse } from "next";
import { NextResponse } from "next/server";

type SuccessResponse = {
  success: true;
  message: string;
  data: any;
}

type ErrorResponse = {
  success: false;
  message: string;
}

class ApiResponse {
    constructor() {}

    static success<T>(
        req: Request,
        data: T,
        message: string = "Success",
        statusCode: number = 200
    ): Response {
        const response: SuccessResponse = {
            success: true,
            message,
            data
        };

        return Response.json(response);
    }

    static error(
        req: Request,
        message: string = "Error",
        statusCode: number = 400
    ): Response {
        const response: ErrorResponse = {
            success: false,
            message
        };

        return Response.json(response);
    }
}

export default ApiResponse;
