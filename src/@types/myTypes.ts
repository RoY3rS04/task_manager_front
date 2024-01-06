export type ApiResponse = {
    ok: boolean,
    msg: string
}

export type UserState = {
    user?: UserResponse,
    loading?: boolean
}

export type Alert = {
    msg: string,
    type: boolean,
    visible: boolean
}

export type ApiAuthResponse = ApiResponse & { token?: string };

export interface ApiUserResponse extends ApiResponse {
    user?: UserResponse
}

export interface ApiTeamResponse<T extends number|UserResponse> extends ApiResponse {
    team?: TeamUsersResponse<T>
}

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

export interface TeamUsersResponse<T extends number|UserResponse> extends TeamResponse<T> {
    members: T extends number ? T : T[]
}