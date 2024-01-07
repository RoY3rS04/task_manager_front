export type ApiResponse = {
    ok: boolean,
    msg: string
}

type BasicResponse = {
    id: string,
    state: boolean,
    created_at: Date,
    updated_at: Date|null
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

export interface ApiTaskResponse extends ApiResponse {
    task?: TaskResponse
}

export interface ApiTasksResponse extends ApiResponse {
    tasks?: TaskResponse[]
}

export interface UserResponse extends BasicResponse {
    name: string,
    gmail: string,
    image_url: string,
}

export interface TeamResponse<T extends number|UserResponse> extends BasicResponse {
    name: string,
    image_url: string,
    created_by: T
}

export interface TeamUsersResponse<T extends number|UserResponse> extends TeamResponse<T> {
    members: T extends number ? T : T[]
}

export interface TaskResponse extends BasicResponse {
    title: string,
    description: string,
    completed_at: Date|null
}