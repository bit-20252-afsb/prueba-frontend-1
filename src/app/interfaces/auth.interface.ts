export interface APIResponse {
    detail: string,
    jwt?: string
}

export interface User {
    email: string,
    password: string
}