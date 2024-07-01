export class DtoBaseResponse {
    success: boolean = true;
    message: string;
    statusCode: number = 200;
}