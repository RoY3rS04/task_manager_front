export type ApiResponse = {
    ok: boolean,
    msg: string
}

export type ApiAuthResponse = ApiResponse & { token?: string };

export interface UserResponse {
    id: number
    name: string,
    gmail: string,
    state: boolean,
    image_url: string,
    created_at: Date,
    updated_at: Date
}

export interface TeamResponse<T extends number|UserResponse> {
    id: number
    name: string,
    state: boolean,
    image_url: string,
    created_by: T,
    created_at: Date,
    updated_at: Date,
}

export interface TeamUsersResponse extends TeamResponse<UserResponse> {
    members: UserResponse[] 
}